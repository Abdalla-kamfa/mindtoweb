"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Briefcase,
    DollarSign,
    Clock,
    Target,
    Users,
    Sparkles,
    FileText,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Layers,
    Lightbulb,
    Paperclip,
    AlertCircle,
    Save
} from "lucide-react";
import { clsx } from "clsx";

const STEPS = [
    { title: "Basics", icon: Briefcase },
    { title: "Scope", icon: DollarSign },
    { title: "Details", icon: FileText },
    { title: "Extras", icon: Paperclip },
];

const STORAGE_KEY = "mindtoweb_intake_draft";

export default function SubmitRequestPage() {
    const router = useRouter();
    const supabase = createClient();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submissionId, setSubmissionId] = useState<string | null>(null);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const [formData, setFormData] = useState({
        project_title: "",
        business_name: "",
        industry: "",
        website_url: "",
        service_type: "",
        budget_range: "",
        expected_timeline: "",
        urgency_level: "",
        description: "",
        goals: "",
        target_audience: "",
        key_features: "",
        inspiration_links: "",
        additional_notes: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load draft on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData(parsed);
                setLastSaved(new Date());
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
            setLastSaved(new Date());
        }, 1000);
        return () => clearTimeout(timeout);
    }, [formData]);

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (step === 0) {
            if (!formData.project_title.trim()) newErrors.project_title = "Project Title is required";
            if (!formData.business_name.trim()) newErrors.business_name = "Business Name is required";
            if (formData.website_url && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website_url)) {
                newErrors.website_url = "Invalid URL format";
            }
        } else if (step === 1) {
            if (!formData.service_type) newErrors.service_type = "Please select a service type";
            if (!formData.budget_range) newErrors.budget_range = "Please select a budget range";
            if (!formData.expected_timeline) newErrors.expected_timeline = "Please select a timeline";
            if (!formData.urgency_level) newErrors.urgency_level = "Please select an urgency level";
        } else if (step === 2) {
            if (!formData.description.trim()) newErrors.description = "Please provide a project description";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(c => Math.min(STEPS.length - 1, c + 1));
        }
    };

    const prevStep = () => {
        setCurrentStep(c => Math.max(0, c - 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep(currentStep)) return;

        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { data, error } = await supabase.from("service_requests").insert({
            user_id: user.id,
            status: "Pending Review",
            ...formData
        }).select().single();

        setLoading(false);

        if (error) {
            alert("Error submitting request: " + error.message);
        } else {
            localStorage.removeItem(STORAGE_KEY); // Clear draft
            setSubmissionId(data.id);
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/10 mb-4 animate-[bounce_1s_ease-in-out_1]">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Project Submitted!
                    </h2>
                    <p className="text-gray-400 text-lg">Your vision is now in our hands.</p>
                </div>

                <GlassCard className="p-8 max-w-md mx-auto w-full space-y-6 bg-white/5 border-white/10 shadow-2xl">
                    <div className="border-b border-white/10 pb-4 mb-2">
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Project</p>
                        <h3 className="text-xl font-semibold text-white">{formData.project_title}</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Submission ID</span>
                            <span className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded">
                                {submissionId?.slice(0, 8).toUpperCase() || "PENDING"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Status</span>
                            <span className="text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                Pending Review
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Est. Response</span>
                            <span className="text-green-400 font-medium">Within 24-48 Hours</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button onClick={() => router.push("/dashboard/projects")} className="w-full py-6 text-lg">
                            Go to My Projects
                        </Button>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Start New Project
                    </h1>
                    <p className="text-gray-400">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}</p>
                </motion.div>
                {lastSaved && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 animate-pulse">
                        <Save className="w-3 h-3" />
                        Draft saved automatically
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full z-0" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                />

                <div className="relative z-10 flex justify-between">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index <= currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => index < currentStep && setCurrentStep(index)}>
                                <div className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isActive
                                        ? "bg-[#0B0E14] border-primary text-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                        : "bg-[#0B0E14] border-white/10 text-gray-500 group-hover:border-white/30"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={clsx(
                                    "text-xs font-medium transition-colors duration-300 hidden md:block",
                                    isCurrent ? "text-white" : "text-gray-500"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <GlassCard className="p-8 min-h-[400px]">
                            {/* Step 1: Basics */}
                            {currentStep === 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                                        <Briefcase className="w-5 h-5 text-primary" />
                                        Project Basics
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Project Title *</label>
                                                {errors.project_title && <span className="text-xs text-red-400">{errors.project_title}</span>}
                                            </div>
                                            <input
                                                type="text"
                                                name="project_title"
                                                value={formData.project_title}
                                                placeholder="e.g. AI Content Platform"
                                                className={clsx(
                                                    "w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all",
                                                    errors.project_title ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Business Name *</label>
                                                {errors.business_name && <span className="text-xs text-red-400">{errors.business_name}</span>}
                                            </div>
                                            <input
                                                type="text"
                                                name="business_name"
                                                value={formData.business_name}
                                                placeholder="e.g. Acme Corp"
                                                className={clsx(
                                                    "w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all",
                                                    errors.business_name ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Industry / Niche</label>
                                            <input
                                                type="text"
                                                name="industry"
                                                value={formData.industry}
                                                placeholder="e.g. Healthcare, FinTech"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Website (Optional)</label>
                                                {errors.website_url && <span className="text-xs text-red-400">{errors.website_url}</span>}
                                            </div>
                                            <input
                                                type="text"
                                                name="website_url"
                                                value={formData.website_url}
                                                placeholder="e.g. www.yoursite.com"
                                                className={clsx(
                                                    "w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all",
                                                    errors.website_url ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Scope */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                        Scope & Budget
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Service Type *</label>
                                                {errors.service_type && <span className="text-xs text-red-400">{errors.service_type}</span>}
                                            </div>
                                            <select
                                                name="service_type"
                                                value={formData.service_type}
                                                className={clsx(
                                                    "w-full bg-[#1A1F2E] border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all",
                                                    errors.service_type ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a service...</option>
                                                <option value="Website Development">Website Development</option>
                                                <option value="AI Automation">AI Automation</option>
                                                <option value="Branding">Branding</option>
                                                <option value="Full Digital System">Full Digital System</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Budget Range *</label>
                                                {errors.budget_range && <span className="text-xs text-red-400">{errors.budget_range}</span>}
                                            </div>
                                            <select
                                                name="budget_range"
                                                value={formData.budget_range}
                                                className={clsx(
                                                    "w-full bg-[#1A1F2E] border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all",
                                                    errors.budget_range ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a range...</option>
                                                <option value="Under $500">Under $500</option>
                                                <option value="$500 - $1,500">$500 - $1,500</option>
                                                <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                                                <option value="$5,000+">$5,000+</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Expected Timeline *</label>
                                                {errors.expected_timeline && <span className="text-xs text-red-400">{errors.expected_timeline}</span>}
                                            </div>
                                            <select
                                                name="expected_timeline"
                                                value={formData.expected_timeline}
                                                className={clsx(
                                                    "w-full bg-[#1A1F2E] border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all",
                                                    errors.expected_timeline ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select timeline...</option>
                                                <option value="ASAP">ASAP (Urgent)</option>
                                                <option value="1 month">Within 1 month</option>
                                                <option value="1-3 months">1-3 months</option>
                                                <option value="Flexible">Flexible</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Urgency Level *</label>
                                                {errors.urgency_level && <span className="text-xs text-red-400">{errors.urgency_level}</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                {['Low', 'Medium', 'High'].map((level) => (
                                                    <button
                                                        key={level}
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData({ ...formData, urgency_level: level });
                                                            if (errors.urgency_level) setErrors({ ...errors, urgency_level: "" });
                                                        }}
                                                        className={clsx(
                                                            "flex-1 py-3 px-4 rounded-lg border text-sm transition-all",
                                                            formData.urgency_level === level
                                                                ? "bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10",
                                                            errors.urgency_level && !formData.urgency_level && "border-red-500/30"
                                                        )}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Details */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                                        <Layers className="w-5 h-5 text-primary" />
                                        Deep Details
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-sm font-medium text-gray-300">Project Description *</label>
                                                {errors.description && <span className="text-xs text-red-400">{errors.description}</span>}
                                            </div>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                rows={4}
                                                placeholder="Tell us everything about your vision..."
                                                className={clsx(
                                                    "w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:ring-1 outline-none transition-all resize-none",
                                                    errors.description ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-primary focus:ring-primary"
                                                )}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Main Goals & Objectives</label>
                                                <textarea
                                                    name="goals"
                                                    value={formData.goals}
                                                    rows={3}
                                                    placeholder="What does success look like?"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Target Audience</label>
                                                <textarea
                                                    name="target_audience"
                                                    value={formData.target_audience}
                                                    rows={3}
                                                    placeholder="Who is this for?"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Key Features Required</label>
                                            <textarea
                                                name="key_features"
                                                value={formData.key_features}
                                                rows={2}
                                                placeholder="List the absolute must-haves..."
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Extras */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        Assets & Extras
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Inspiration / Reference Links</label>
                                            <input
                                                type="text"
                                                name="inspiration_links"
                                                value={formData.inspiration_links}
                                                placeholder="e.g. competitor websites, dribbble links..."
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="p-8 border-2 border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors cursor-pointer group">
                                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                <Paperclip className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                                            </div>
                                            <p className="text-white font-medium">Upload File Assets</p>
                                            <p className="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Additional Notes</label>
                                            <textarea
                                                name="additional_notes"
                                                value={formData.additional_notes}
                                                rows={4}
                                                placeholder="Anything else we should know?"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={clsx(currentStep === 0 && "opacity-0 pointer-events-none")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>

                    {currentStep === STEPS.length - 1 ? (
                        <Button
                            loading={loading}
                            className="px-8 shadow-lg shadow-primary/20"
                        >
                            Submit Project Request <Send className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="px-8"
                        >
                            Next Step <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
