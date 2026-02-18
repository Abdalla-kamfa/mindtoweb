"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { User, Building2, Mail, Save, Loader2, Camera, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

interface ProfileFormProps {
    user: any;
    profile: any;
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        full_name: profile?.full_name || "",
        business_name: profile?.business_name || "",
    });

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    ...formData,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;

            setMessage({ type: 'success', text: "Profile updated successfully!" });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to update profile." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-primary">
                                {formData.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                    {/* Placeholder for real upload */}
                    <input type="file" className="hidden" />
                </div>
                <p className="text-sm text-gray-400 mt-3">Click to change avatar</p>
            </div>

            <div className="grid gap-6 max-w-2xl mx-auto">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Business Name</label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={formData.business_name}
                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="Acme Inc."
                        />
                    </div>
                </div>

                {/* Email (Read Only) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            disabled
                            className="w-full bg-white/5 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex flex-col gap-4">
                    {message && (
                        <div className={clsx(
                            "p-3 rounded-lg text-sm flex items-center gap-2",
                            message.type === 'success' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                        )}>
                            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : null}
                            {message.text}
                        </div>
                    )}

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
