import { Navbar } from "@/components/layout/marketing/Navbar";
import { Footer } from "@/components/layout/marketing/Footer";
import { TubesAnimation } from "@/components/ui/TubesAnimation";
import { ChatWidget } from "@/components/layout/marketing/ChatWidget";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TubesAnimation />
            <Navbar />
            {children}
            <Footer />
            <ChatWidget />
        </>
    );
}
