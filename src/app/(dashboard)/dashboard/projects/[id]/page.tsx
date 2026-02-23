import { createClient } from "@/utils/supabase/server";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ProjectDiscussion } from "@/components/dashboard/ProjectDiscussion";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    Clock,
    DollarSign,
    FileText,
    Globe,
    MessageSquare,
    CheckCircle2,
    Briefcase,
    Target,
    Users,
    Layers,
    Sparkles
} from "lucide-react";
import { clsx } from "clsx";
import { notFound } from "next/navigation";

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: request } = await supabase
        .from("service_requests")
        .select("*")
        .eq("id", params.id)
        .single();

    const { data: { user } } = await supabase.auth.getUser();

    if (!request || !user) {
        notFound();
    }

    if (!request) {
        notFound();
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "text-green-400 bg-green-500/10 border-green-500/20";
            case "In Progress": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
            case "In Planning": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
            case "Awaiting Feedback": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
            default: return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-10">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/projects">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                    </Button>
                </Link>
            </div>

            {/* Title & Status */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-white">{request.project_title}</h1>
                    <div className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {request.business_name}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{request.service_type}</span>
                    </div>
                </div>
                <div className={clsx(
                    "px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border flex items-center gap-2",
                    getStatusColor(request.status)
                )}>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {request.status || "Pending Review"}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Deep Dive */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Overview */}
                    <GlassCard className="p-8 space-y-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Project Overview
                        </h2>
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                            <p>{request.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Goals
                                </h3>
                                <p className="text-white">{request.goals || "Not specified"}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Users className="w-4 h-4" /> Target Audience
                                </h3>
                                <p className="text-white">{request.target_audience || "Not specified"}</p>
                            </div>
                        </div>

                        {request.key_features && (
                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Layers className="w-4 h-4" /> Key Features
                                </h3>
                                <p className="text-white bg-white/5 p-4 rounded-lg border border-white/5">
                                    {request.key_features}
                                </p>
                            </div>
                        )}

                        {request.additional_notes && (
                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Additional Notes
                                </h3>
                                <p className="text-gray-400 italic">
                                    "{request.additional_notes}"
                                </p>
                            </div>
                        )}
                    </GlassCard>

                    <div id="discussion-section" className="scroll-mt-20">
                        <ProjectDiscussion projectId={request.id} currentUserId={user.id} />
                        <div className="text-center mt-2">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-400 border border-green-500/20">
                                Discussion loaded ✅
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Meta & Actions */}
                <div className="space-y-6">
                    <GlassCard className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Project Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Budget
                                </span>
                                <span className="text-white font-medium">{request.budget_range}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Timeline
                                </span>
                                <span className="text-white font-medium">{request.expected_timeline}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Urgency
                                </span>
                                <span className={clsx(
                                    "font-medium",
                                    request.urgency_level === 'High' ? "text-red-400" : "text-white"
                                )}>{request.urgency_level || "Standard"}</span>
                            </div>
                            {request.website_url && (
                                <div className="flex items-center justify-between py-2 border-b border-white/5">
                                    <span className="text-gray-400 flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> Website
                                    </span>
                                    <a href={request.website_url} target="_blank" className="text-primary hover:underline truncate max-w-[150px]">
                                        {request.website_url}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Submitted
                                </span>
                                <span className="text-white text-sm">{new Date(request.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>


                    </GlassCard>

                    {/* Timeline Placeholder (Static for now) */}
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Activity Log</h3>
                        <div className="space-y-6 relative border-l border-white/10 ml-2 pl-6">
                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-[#0B0E14]" />
                                <p className="text-white text-sm font-medium">Project Submitted</p>
                                <p className="text-xs text-gray-500">{new Date(request.created_at).toLocaleString()}</p>
                            </div>
                            {/* Future timeline items would go here */}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}

function AlertCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    );
}
