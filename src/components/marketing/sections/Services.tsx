"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Monitor, Paintbrush, Sparkles, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Website Design & Development",
        description: "Responsive, fast-loading websites built with modern standards. From landing pages to complex web apps.",
        icon: Monitor,
        color: "from-blue-500 to-cyan-400",
    },
    {
        title: "UI / UX Design",
        description: "User-centered design focused on conversion and aesthetics. Wireframing, prototyping, and visual systems.",
        icon: Paintbrush,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "AI-Powered Solutions",
        description: "Integrating AI to speed up development, generate content, and enhance user experience.",
        icon: Sparkles,
        color: "from-amber-400 to-orange-500", // Gold/Orange for "Intelligence"
    },
    {
        title: "Idea-to-Product",
        description: "Transforming raw concepts into launch-ready digital products. Full-cycle development partner.",
        icon: Rocket,
        color: "from-green-400 to-emerald-500",
    },
];

export function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Services built for the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Future of Web
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Combining aesthetic excellence with technical precision.
                        I help you build digital products that stand out.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ScrollReveal key={index} delay={index * 0.1} width="100%">
                            <GlassCard className="h-full flex flex-col items-start p-8 group transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)] hover:-translate-y-2">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} mb-6 shadow-lg shadow-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {service.description}
                                </p>
                            </GlassCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
