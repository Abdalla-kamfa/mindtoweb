"use client";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to start the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Transformation?
                            </span>
                        </h2>
                        <p className="text-gray-400">
                            Tell me about your idea. I'll help you refine it, design it, and build it.
                        </p>
                    </div>

                    <GlassCard className="p-8 md:p-12 border-primary/20 bg-gradient-to-b from-white/5 to-transparent">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Project Type</label>
                                <select className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                                    <option>Web Design & Development</option>
                                    <option>MVP Development</option>
                                    <option>UI/UX Design</option>
                                    <option>AI Consultation</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                />
                            </div>

                            <Button size="lg" className="w-full md:w-auto">
                                Send Message
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </form>

                        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>hello@mindtoweb.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <MessageSquare className="w-5 h-5 text-accent" />
                                <span>Live Chat Available</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
