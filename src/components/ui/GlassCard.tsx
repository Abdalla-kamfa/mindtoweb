"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
    return (
        <div
            className={twMerge(
                clsx(
                    "glass rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group",
                    hoverEffect && "hover:bg-white/10 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-1",
                    className
                )
            )}
            {...props}
        >
            {hoverEffect && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
