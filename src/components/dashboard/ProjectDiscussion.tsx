"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Send, User, Loader2 } from "lucide-react";
import { clsx } from "clsx";

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    profiles?: {
        full_name: string;
        avatar_url: string;
    };
}

interface ProjectDiscussionProps {
    projectId: string;
    currentUserId: string;
}

export function ProjectDiscussion({ projectId, currentUserId }: ProjectDiscussionProps) {
    const supabase = createClient();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetchComments();

        // Real-time subscription could go here
        const channel = supabase
            .channel('project_discussions')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'project_discussions',
                filter: `project_id=eq.${projectId}`
            }, (payload) => {
                fetchComments(); // Refresh on new comment
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [projectId]);

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from("project_discussions")
                .select(`
                    id,
                    content,
                    created_at,
                    user_id
                `)
                .eq("project_id", projectId)
                .order("created_at", { ascending: true });

            if (data) {
                // Fetch profiles manually since we might not have the relation set up perfectly in the types yet
                // Or if foreign keys are tricky with RLS. 
                // Ideally we use .select('*, profiles(*)') but let's be safe and simple first or assumes profiles fetch works
                // Actually, let's try to fetch profiles separately for these users to avoid relation issues if not defined in Supabase console

                const userIds = [...new Set(data.map(c => c.user_id))];
                const { data: profiles } = await supabase
                    .from('profiles')
                    .select('id, full_name, avatar_url')
                    .in('id', userIds);

                const commentsWithProfiles = data.map(comment => {
                    const profile = profiles?.find(p => p.id === comment.user_id);
                    return {
                        ...comment,
                        profiles: profile
                    };
                });

                setComments(commentsWithProfiles);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSending(true);
        try {
            const { error } = await supabase
                .from("project_discussions")
                .insert({
                    project_id: projectId,
                    user_id: currentUserId,
                    content: newComment
                });

            if (error) throw error;
            setNewComment("");
            await fetchComments();
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <GlassCard className="p-6 md:p-8 flex flex-col h-[600px]">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Project Discussion</h3>
                    <p className="text-sm text-gray-400">Ask questions, share updates, or request changes.</p>
                </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-4 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50">
                        <MessageSquare className="w-12 h-12 text-gray-600" />
                        <p className="text-gray-400">No messages yet. Start the discussion!</p>
                    </div>
                ) : (
                    comments.map((comment) => {
                        const isMe = comment.user_id === currentUserId;
                        return (
                            <div key={comment.id} className={clsx("flex gap-3", isMe ? "flex-row-reverse" : "flex-row")}>
                                {/* Avatar */}
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {comment.profiles?.avatar_url ? (
                                        <img src={comment.profiles.avatar_url} alt="Ava" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-bold text-gray-400">
                                            {comment.profiles?.full_name?.charAt(0) || "U"}
                                        </span>
                                    )}
                                </div>

                                <div className={clsx(
                                    "flex flex-col max-w-[80%]",
                                    isMe ? "items-end" : "items-start"
                                )}>
                                    <div className={clsx(
                                        "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                        isMe
                                            ? "bg-primary/20 text-white rounded-tr-sm border border-primary/20"
                                            : "bg-white/5 text-gray-300 rounded-tl-sm border border-white/5"
                                    )}>
                                        {comment.content}
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-1 px-1">
                                        {comment.profiles?.full_name || "User"} • {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="mt-6 pt-4 border-t border-white/5 flex gap-3">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button type="submit" disabled={isSending || !newComment.trim()} size="sm" className="w-10 h-10 p-0 rounded-lg">
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
            </form>
        </GlassCard>
    );
}
