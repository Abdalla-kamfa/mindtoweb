"use client";

import { useState } from "react";
import {
    MessageCircle,
    X,
    ChevronLeft,
    Send,
    Sparkles,
    ArrowRight,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { chatFaq } from "@/data/chatFaq";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export function ChatWidget() {
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'menu' | 'faq' | 'form'>('menu');
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        business_name: "",
        message: "",
        budget_range: "",
        timeline: ""
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = formData.name && formData.email && formData.message && formData.email.includes("@");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setFormStatus('submitting');
        try {
            const { error } = await supabase
                .from('leads')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    business_name: formData.business_name,
                    message: formData.message,
                    budget_range: formData.budget_range,
                    timeline: formData.timeline,
                    source: 'chat_widget'
                }]);

            if (error) throw error;
            setFormStatus('success');
            // Reset form after success logic if needed, but we show success screen
        } catch (error) {
            console.error("Error submitting lead:", error);
            setFormStatus('error');
        }
    };

    const currentFaq = chatFaq.find(q => q.id === activeQuestion);

    const resetWidget = () => {
        setView('menu');
        setActiveQuestion(null);
        setFormStatus('idle');
        setFormData({
            name: "",
            email: "",
            business_name: "",
            message: "",
            budget_range: "",
            timeline: ""
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="pointer-events-auto w-[380px] max-w-[calc(100vw-32px)] bg-[#0f1219]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[650px] h-[600px]"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between sticky top-0 z-10 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">MindToWeb Assistant</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

                            {/* MENU VIEW */}
                            {view === 'menu' && (
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-xl p-3 text-sm text-gray-300 border border-white/5">
                                        <p>👋 Hi! Im here to help. Ask a question or get a quick quote for your project.</p>
                                    </div>

                                    <div className="grid gap-2">
                                        {/* Quick Quote Button */}
                                        <button
                                            onClick={() => setView('form')}
                                            className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 border border-primary/30 hover:border-primary/50 text-sm text-white font-medium transition-all flex items-center justify-between group mb-2 shadow-lg shadow-primary/5"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-primary" /> Get a Quick Quote
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        {chatFaq.map((faq) => (
                                            <button
                                                key={faq.id}
                                                onClick={() => {
                                                    setActiveQuestion(faq.id);
                                                    setView('faq');
                                                }}
                                                className="text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/20 text-sm text-gray-200 transition-all flex items-center justify-between group"
                                            >
                                                {faq.question}
                                                <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180 group-hover:text-primary transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQ ANSWER VIEW */}
                            {view === 'faq' && currentFaq && (
                                <div className="space-y-6">
                                    <button
                                        onClick={() => {
                                            setActiveQuestion(null);
                                            setView('menu');
                                        }}
                                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 mb-2 transition-colors"
                                    >
                                        <ChevronLeft className="w-3 h-3" /> Back to menu
                                    </button>

                                    {/* User Question */}
                                    <div className="flex justify-end">
                                        <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                                            {currentFaq.question}
                                        </div>
                                    </div>

                                    {/* Bot Answer */}
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="bg-white/10 text-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-white/5 leading-relaxed">
                                            {currentFaq.answer}
                                        </div>
                                    </div>

                                    {/* CTAs */}
                                    <div className="pt-2 flex flex-col gap-2">
                                        <button
                                            onClick={() => setView('form')}
                                            className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                        >
                                            Start a Project <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <Link href="mailto:hello@mindtoweb.com">
                                            <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors">
                                                Talk to a Human
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* LEAD FORM VIEW */}
                            {view === 'form' && (
                                <div className="space-y-4 h-full flex flex-col">
                                    <button
                                        onClick={() => setView('menu')}
                                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors shrink-0"
                                    >
                                        <ChevronLeft className="w-3 h-3" /> Back to menu
                                    </button>

                                    {formStatus === 'success' ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">Received! 🚀</h3>
                                            <p className="text-sm text-gray-300">
                                                Thanks {formData.name.split(' ')[0]}. We've got your details and will be in touch within 24-48 hours.
                                            </p>
                                            <button
                                                onClick={resetWidget}
                                                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-3 flex-1 overflow-y-auto pr-1">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-400">Full Name *</label>
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-400">Email Address *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-400">Business / Brand</label>
                                                <input
                                                    name="business_name"
                                                    value={formData.business_name}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                                                    placeholder="Acme Inc."
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-400">Budget</label>
                                                    <select
                                                        name="budget_range"
                                                        value={formData.budget_range}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors text-gray-400"
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="$1k - $5k">$1k - $5k</option>
                                                        <option value="$5k - $10k">$5k - $10k</option>
                                                        <option value="$10k+">$10k+</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-400">Timeline</label>
                                                    <select
                                                        name="timeline"
                                                        value={formData.timeline}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors text-gray-400"
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="ASAP">ASAP</option>
                                                        <option value="1 month">1 month</option>
                                                        <option value="Flexible">Flexible</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-400">What are we building? *</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600 resize-none"
                                                    placeholder="I need a landing page for..."
                                                    required
                                                />
                                            </div>

                                            {formStatus === 'error' && (
                                                <p className="text-xs text-red-400 text-center">Something went wrong. Please try again.</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={!isFormValid || formStatus === 'submitting'}
                                                className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2 flex items-center justify-center gap-2"
                                            >
                                                {formStatus === 'submitting' ? (
                                                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                                ) : (
                                                    <><Send className="w-4 h-4" /> Send Request</>
                                                )}
                                            </button>

                                            <p className="text-[10px] text-center text-gray-500 mt-2">
                                                We usually respond within 24-48 hours.
                                            </p>
                                        </form>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Footer Input Placeholder (Only show on Menu or FAQ views) */}
                        {(view === 'menu' || view === 'faq') && (
                            <div className="p-3 border-t border-white/5 bg-white/5 shrink-0">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        disabled
                                        className="w-full bg-[#0B0E14] border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-gray-500 cursor-not-allowed"
                                    />
                                    <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow border border-white/10 z-50"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
