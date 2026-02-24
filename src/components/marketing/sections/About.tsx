"use client";

import { motion } from "framer-motion";
import { User, Code, Palette, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const skills = [
    { name: "Development", icon: Code, desc: "React, Next.js, Node.js" },
    { name: "Design", icon: Palette, desc: "Figma, UI/UX, Motion" },
    { name: "Strategy", icon: Zap, desc: "Product, SEO, Growth" },
];

export function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                <User size={16} />
                                <span>About Me</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Not just a Coder. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                    A Product Builder.
                                </span>
                            </h2>

                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                I bridge the gap between design and engineering. While most developers stop at code,
                                I obsess over the user experience, the visual details, and the business goals.
                            </p>

                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Using AI-assisted workflows, I deliver agency-level quality at startup speed.
                                Whether you have a rough napkin sketch or a detailed roadmap, I can help you build it.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <skill.icon className="w-6 h-6 text-primary mb-2" />
                                        <h4 className="font-bold text-white">{skill.name}</h4>
                                        <p className="text-xs text-gray-400">{skill.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual/Image Side */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <GlassCard className="p-2 bg-gradient-to-br from-white/10 to-transparent border-white/20">
                                <div className="rounded-xl overflow-hidden bg-black/50 aspect-square relative flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Abstract Representation of "The Builder" */}
                                    <div className="relative z-10 text-center">
                                        <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-50 mb-4 animate-pulse" />
                                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                                            The Creative Hybrid
                                        </h3>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
