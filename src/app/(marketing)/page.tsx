import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { LocalBusinessCTA } from "@/components/sections/LocalBusinessCTA";

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
