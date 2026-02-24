"use client";

import { motion } from "framer-motion";
import { Lightbulb, Map, Code2, Rocket } from "lucide-react";
import { clsx } from "clsx";

const steps = [
    {
        title: "Discovery & Idea",
        description: "We start by understanding your vision. No technical knowledge required—just your idea.",
        icon: Lightbulb,
    },
    {
        title: "Strategy & Design",
        description: "Creating the blueprint. UX wireframes, UI design systems, and technical architecture.",
        icon: Map,
    },
    {
        title: "Development & AI",
        description: "Building the product with clean code and AI-assisted workflows for speed and precision.",
        icon: Code2,
    },
    {
        title: "Launch & Scale",
        description: "Deploying to the world. Performance optimization, SEO, and handover.",
        icon: Rocket,
    },
];

export function Process() {
    return (
        <section id="process" className="py-24 bg-[#0F141C] relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        From Concept to <span className="text-primary">Launch</span>
                    </h2>
                    <p className="text-gray-400">Simple, transparent, and efficient workflow.</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-purple-500 to-transparent opacity-30" />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={clsx(
                                    "flex items-center justify-between w-full relative",
                                    index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                {/* Content Side */}
                                <div className="w-5/12">
                                    <div className={clsx(
                                        "p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm",
                                        index % 2 === 0 ? "text-left" : "text-right"
                                    )}>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-400 text-sm">{step.description}</p>
                                    </div>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#0B0E14] border border-primary shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] z-10">
                                    <step.icon className="w-5 h-5 text-primary" />
                                </div>

                                {/* Empty Side (Spacer) */}
                                <div className="w-5/12" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
