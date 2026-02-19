"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Store, ArrowRight, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function LocalBusinessCTA() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Decor - Left */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Background Decor - Right (New) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal width="100%">
                    <GlassCard className="max-w-5xl mx-auto p-10 md:p-16 border-white/10 bg-white/[0.02] backdrop-blur-md relative overflow-hidden group">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 text-center md:text-left relative z-10">

                            {/* Icon & Text */}
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                                    <Store className="w-4 h-4" />
                                    <span>New Service</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                                    Websites for <span className="text-primary">Local Businesses</span>
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                                    Restaurants, clinics, shops — get a fast, beautiful website that converts visitors into customers.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 min-w-fit">
                                <Link href="/local-business-websites">
                                    <Button size="lg" className="min-w-[180px] h-12 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                                        View Packages <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <Link href="/local-business-websites#demo">
                                    <Button variant="outline" size="lg" className="min-w-[180px] h-12 text-base bg-white/5 hover:bg-white/10 border-white/10">
                                        See Demo <ExternalLink className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Subtle Gradient Glow on Right Side of Card */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-50" />
                    </GlassCard>
                </ScrollReveal>
            </div>
        </section>
    );
}
