"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
    Utensils,
    Stethoscope,
    Store,
    Wrench,
    Smartphone,
    Zap,
    Search,
    MapPin,
    MessageCircle,
    CheckCircle2,
    ArrowRight,
    Star
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LocalBusinessLandingPage() {
    return (
        <main className="min-h-screen text-white selection:bg-primary/30 relative z-10">
            <Navbar />



            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 opacity-30 animate-pulse-glow" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 opacity-30" />

                <div className="container mx-auto px-6 text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-primary mb-6 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Perfect for Local Businesses
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            Get a Website That Actually <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Gets You Customers
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Stop losing sales to competitors. We build fast, mobile-friendly websites designed to turn visitors into bookings and calls.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#demo">
                                <Button size="lg" className="w-full sm:w-auto group">
                                    View Demo
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/dashboard/submit">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                    Get a Free Quote
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* WHO IT'S FOR */}
            <section className="py-20 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-3xl font-bold text-center mb-12">Who is this for?</h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Utensils, label: "Restaurants & Cafes" },
                            { icon: Stethoscope, label: "Clinics & Dentists" },
                            { icon: Store, label: "Retail Shops" },
                            { icon: Wrench, label: "Service Providers" }
                        ].map((item, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} width="100%">
                                <GlassCard className="p-6 flex flex-col items-center text-center justify-center gap-4 hover:border-primary/30 transition-colors h-full">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-semibold text-gray-200">{item.label}</span>
                                </GlassCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET (FEATURES) */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal direction="right">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Everything you need to <br />
                                <span className="text-primary">Grow Online</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                We include all the premium features that agencies charge thousands for—standard.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { icon: MessageCircle, text: "WhatsApp Chat Integration" },
                                    { icon: MapPin, text: "Google Maps & SEO Location" },
                                    { icon: Smartphone, text: "100% Mobile Optimized" },
                                    { icon: Zap, text: "Lightning Fast Loading" },
                                    { icon: Search, text: "Google Search Ready (SEO)" },
                                    { icon: Utensils, text: "Menu / Services Showcase" }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.2}>
                            <div className="relative">
                                {/* Abstract Visual Representation of a Phone/Feature */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
                                <GlassCard className="p-8 relative border-white/10 bg-[#0B0E14]/80">
                                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            <div className="w-3 h-3 rounded-full bg-green-400" />
                                        </div>
                                        <div className="h-2 w-20 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-32 bg-white/5 rounded-lg w-full animate-pulse" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-20 bg-white/5 rounded-lg w-full" />
                                            <div className="h-20 bg-white/5 rounded-lg w-full" />
                                        </div>
                                        <div className="h-8 bg-primary/20 rounded-lg w-1/3 mx-auto mt-4" />
                                    </div>
                                </GlassCard>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[2.5rem] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                        {[
                            { step: "01", title: "Send Details", desc: "Fill out a simple form with your business info." },
                            { step: "02", title: "We Build", desc: "Our team designs and builds your site in 3-5 days." },
                            { step: "03", title: "Launch 🚀", desc: "We go live and you start getting customers." }
                        ].map((item, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.2}>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-[#0B0E14] border border-white/20 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-xl shadow-black/50">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 max-w-xs">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Simple Pricing</h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Starter",
                                price: "$499",
                                features: ["One Page Website", "Mobile Friendly", "Contact Form", "Hosting Included"]
                            },
                            {
                                name: "Standard",
                                price: "$999",
                                popular: true,
                                features: ["5 Page Website", "SEO Optimization", "Google Maps Integration", "WhatsApp Chat Button", "1 Month Support"]
                            },
                            {
                                name: "Premium",
                                price: "$1,999",
                                features: ["10+ Pages / Custom", "Booking System", "Blog Integration", "Advanced SEO", "3 Months Support"]
                            }
                        ].map((plan, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.1} width="100%" direction="up">
                                <GlassCard className={`p-8 h-full flex flex-col relative ${plan.popular ? 'border-primary/50 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]' : ''}`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full border border-white/20">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="text-3xl font-bold text-white mb-6">{plan.price}</div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/dashboard/submit" className="w-full">
                                        <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </GlassCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEMO SECTION */}
            <section id="demo" className="py-20 bg-white/5 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <ScrollReveal>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8">See What's Possible</h2>
                            <GlassCard className="p-2 bg-[#0B0E14]/40 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden group cursor-pointer relative">
                                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                                    {/* Placeholder for Demo Image - using a gradient/abstract for now */}
                                    {/* In a real scenario, this would be a screenshot or iframe */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                        <span className="text-gray-600 font-mono">Live Demo Preview</span>
                                    </div>

                                    {/* Overlay Button */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <Button size="lg" className="shadow-xl">
                                            Explore Live Demo <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Scale Your Business?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Don't let another customer slip away. Get a professional website today.
                        </p>
                        <Link href="/dashboard/submit">
                            <Button size="lg" className="w-full sm:w-auto px-12 py-4 text-lg shadow-[0_0_30px_rgba(139,92,246,0.5)] animate-pulse-glow">
                                Start Your Website Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
