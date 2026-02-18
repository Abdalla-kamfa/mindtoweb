"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, User, LayoutDashboard } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "../ui/Button";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/#process" },
    { name: "About", href: "/#about" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Check auth status
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [supabase.auth]);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                isScrolled
                    ? "bg-[#0B0E14]/80 backdrop-blur-md border-white/10 py-3 shadow-2xl shadow-black/20"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors border border-primary/50">
                        <Sparkles className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-all">
                        MindToWeb
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}

                    {user ? (
                        <Link href="/dashboard">
                            <Button size="sm" variant="primary" className="ml-4">
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4 ml-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" variant="primary">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B0E14] border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-gray-400 hover:text-white py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                        {user ? (
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block text-center text-gray-400 hover:text-white py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
