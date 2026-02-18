"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
    LayoutDashboard,
    PlusCircle,
    FolderOpen,
    MessageSquare,
    Settings,
    LogOut,
    Sparkles
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Submit Request", href: "/dashboard/submit", icon: PlusCircle },
    { name: "My Projects", href: "/dashboard/projects", icon: FolderOpen },

    { name: "Profile", href: "/dashboard/profile", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <div className="hidden md:flex h-full w-64 flex-col bg-[#0f1219]/90 backdrop-blur-xl border-r border-white/5">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors">
                        <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        MindToWeb
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-primary/10 border border-primary/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-primary" : "text-gray-500 group-hover:text-white"
                                )}
                            />
                            {item.name}

                            {isActive && (
                                <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse-glow pointer-events-none" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group"
                >
                    <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
