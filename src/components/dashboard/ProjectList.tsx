"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

import {
    Search,
    Filter,
    ArrowUpDown,
    Calendar,
    Clock,
    DollarSign,
    ArrowRight,
    Briefcase,
    MoreHorizontal,
    CheckCircle2,
    Loader2,
    AlertCircle,
    Layout
} from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: string;
    project_title: string;
    business_name: string;
    status: string;
    budget_range: string;
    expected_timeline: string;
    created_at: string;
    updated_at: string;
    service_type: string;
}

interface ProjectListProps {
    projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const filteredProjects = useMemo(() => {
        return projects
            .filter((project) => {
                const matchesSearch =
                    project.project_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.business_name?.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesStatus = statusFilter === "All" || project.status === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
            });
    }, [projects, searchQuery, statusFilter, sortOrder]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "text-green-400 bg-green-500/10 border-green-500/20";
            case "In Progress": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
            case "In Planning": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
            case "Awaiting Feedback": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
            default: return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        }
    };

    const StatusBadge = ({ status }: { status: string }) => (
        <span className={clsx(
            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center gap-1.5",
            getStatusColor(status)
        )}>
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {status || "Pending Review"}
        </span>
    );

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-all font-light"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-primary/50 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="In Planning">In Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Awaiting Feedback">Awaiting Feedback</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <button
                        onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors whitespace-nowrap"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                        {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                    </button>
                </div>
            </div>

            {/* List */}
            {filteredProjects.length > 0 ? (
                <motion.div layout className="grid gap-4">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link href={`/dashboard/projects/${project.id}`}>
                                    <GlassCard className="p-0 hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            {/* Left Info */}
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                                                    <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                                                        {project.project_title}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                                                        {project.business_name}
                                                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                        {project.service_type || "General Request"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Middle Stats */}
                                            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400 md:border-l md:border-white/10 md:pl-8">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4 text-gray-600" />
                                                    <span>{project.budget_range}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-600" />
                                                    <span>{project.expected_timeline}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            {/* Right Status */}
                                            <div className="flex items-center justify-between md:justify-end gap-4 min-w-[140px]">
                                                <StatusBadge status={project.status} />
                                                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Progress Bar for In Progress */}
                                        {project.status === "In Progress" && (
                                            <div className="h-1 bg-white/5 w-full">
                                                <div className="h-full bg-blue-500/50 w-1/2" />
                                            </div>
                                        )}
                                        {/* Completion Bar */}
                                        {project.status === "Completed" && (
                                            <div className="h-1 bg-green-500/50 w-full" />
                                        )}
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <EmptyState searchQuery={searchQuery} />
            )}
        </div>
    );
}

function EmptyState({ searchQuery }: { searchQuery: string }) {
    if (searchQuery) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400">No projects found matching "{searchQuery}"</p>
                <Button variant="ghost" className="mt-2" onClick={() => window.location.reload()}>Clear Search</Button>
            </div>
        );
    }

    return (
        <GlassCard className="p-12 text-center border-dashed border-2 border-white/10 flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                <Layout className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2 max-w-md">
                <h3 className="text-2xl font-bold text-white">No Projects Yet</h3>
                <p className="text-gray-400">
                    Ready to bring your vision to life? Start your first project and let's build something amazing together.
                </p>
            </div>
            <Link href="/dashboard/submit">
                <Button size="lg" className="px-8 shadow-lg shadow-primary/20">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Submit Your First Project
                </Button>
            </Link>
        </GlassCard>
    );

    function PlusCircle({ className }: { className?: string }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
            </svg>
        );
    }
}
