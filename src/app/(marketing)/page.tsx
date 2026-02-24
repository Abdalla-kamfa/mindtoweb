import { Hero } from "@/components/marketing/sections/Hero";
import { Services } from "@/components/marketing/sections/Services";
import { Process } from "@/components/marketing/sections/Process";
import { About } from "@/components/marketing/sections/About";
import { Contact } from "@/components/marketing/sections/Contact";
import { LocalBusinessCTA } from "@/components/marketing/sections/LocalBusinessCTA";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-primary/30 relative z-10">
      <Hero />

      {/* Local Business Entry Point */}
      <LocalBusinessCTA />

      {/* Placeholder for other sections */}
      <Services />

      {/* Placeholder for Process */}
      <Process />

      {/* Placeholder for About */}
      <About />

      {/* Placeholder for Contact */}
      <Contact />
    </main>
  );
}
