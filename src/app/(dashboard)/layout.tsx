"use client";

import { Sidebar } from "@/components/layout/dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-[#0B0E14] overflow-hidden">
            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-20 h-full">
                <Sidebar />
            </div>

            <main className="flex-1 relative z-10 overflow-y-auto">
                <div className="container mx-auto px-6 py-8 md:py-12 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
