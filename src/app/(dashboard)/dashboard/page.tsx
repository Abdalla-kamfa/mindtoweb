import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
    Clock,
    PlusCircle,
    Calendar,
    FileText
} from "lucide-react";
import { clsx } from "clsx";

async function getServiceRequests() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data } = await supabase
        .from("service_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return data || [];
}

async function getUserProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const requests = await getServiceRequests();
    const user = await getUserProfile();
    const latestProject = requests[0];

    // Determine greeting based on time of day
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const displayName = user?.email?.split('@')[0] || "Client";

    return (
        <div className="space-y-8">
            {/* Validated Header: Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {greeting}, <span className="capitalize">{displayName}</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        Welcome to your client dashboard. Track your projects and collaborative success.
                    </p>
                </div>
                {requests.length > 0 && (
                    <Link href="/dashboard/submit">
                        <Button variant="outline" className="border-primary/50 hover:bg-primary/20">
                            <PlusCircle className="w-5 h-5 mr-2" />
                            New Request
                        </Button>
                    </Link>
                )}
            </div>

            {/* Dashboard Content */}
            {requests.length === 0 ? (
                // Empty State
                <GlassCard className="p-10 text-center space-y-6 border-dashed border-2 border-white/10 hover:border-primary/30 transition-colors">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <PlusCircle className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">No active projects</h2>
                        <p className="text-gray-400 max-w-md mx-auto mt-2">
                            You haven't submitted any service requests yet. Start your journey with us by creating your first project.
                        </p>
                    </div>
                    <Link href="/dashboard/submit">
                        <Button size="lg" className="mt-4">
                            Start New Project
                        </Button>
                    </Link>
                </GlassCard>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Section: Active Project Status */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Active Project Status
                        </h2>

                        <GlassCard className="p-6 md:p-8 space-y-6 relative overflow-hidden group">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/15 transition-colors" />

                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-sm font-medium text-primary mb-1 uppercase tracking-wider">
                                                {latestProject.status || "Pending Review"}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">
                                                {latestProject.project_title || latestProject.business_name || "Untitled Project"}
                                            </h3>
                                        </div>
                                        <div className={clsx(
                                            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border",
                                            latestProject.status === 'Completed' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                latestProject.status === 'In Progress' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                    latestProject.status === 'In Planning' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                                        latestProject.status === 'Awaiting Feedback' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                                            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        )}>
                                            {latestProject.status || "Pending"}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Progress</span>
                                            <span>{latestProject.status === 'Completed' ? '100%' : latestProject.status === 'In Progress' ? '50%' : '10%'}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                                                style={{ width: latestProject.status === 'Completed' ? '100%' : latestProject.status === 'In Progress' ? '50%' : '10%' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 mt-6">
                                        <div>
                                            <p className="text-gray-400 text-sm">Target Audience</p>
                                            <p className="text-white font-medium">{latestProject.target_audience || "Not specified"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Budget</p>
                                            <p className="text-white font-medium">{latestProject.budget_range || "Not specified"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Recent Activity List */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                            <div className="space-y-3">
                                {requests.slice(1).map((req: any) => (
                                    <GlassCard key={req.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                                <FileText className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{req.project_title || req.business_name}</h4>
                                                <p className="text-xs text-gray-500">{new Date(req.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400 capitalize">
                                            {req.status}
                                        </div>
                                    </GlassCard>
                                ))}
                                {requests.length === 1 && (
                                    <p className="text-gray-500 text-sm">No other projects found.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Quick Stats/Actions */}
                    <div className="space-y-6">
                        <GlassCard className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-gray-400">Total Projects</span>
                                    <span className="text-white font-bold text-xl">{requests.length}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                    <span className="text-gray-400">Active</span>
                                    <span className="text-white font-bold text-xl">
                                        {requests.filter((r: any) => r.status !== 'Completed').length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Completed</span>
                                    <span className="text-green-400 font-bold text-xl">
                                        {requests.filter((r: any) => r.status === 'Completed').length}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                            <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Have questions about your project timeline or deliverables?
                            </p>
                            <Button size="sm" variant="secondary" className="w-full">
                                Contact Support
                            </Button>
                        </GlassCard>
                    </div>
                </div>
            )}
        </div>
    );
}
