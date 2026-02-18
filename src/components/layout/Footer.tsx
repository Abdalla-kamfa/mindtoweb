import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#0B0E14] border-t border-white/5 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/50">
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-bold text-white">MindToWeb</span>
                    </div>

                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} MindToWeb. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
