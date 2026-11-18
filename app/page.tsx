import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Cta } from "@/components/sections/Cta";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SiteStaggeredMenu } from "@/components/SiteStaggeredMenu";
import { ScrollBackground } from "@/components/ScrollBackground";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <SiteStaggeredMenu isFixed />
      <span id="home" className="block h-0" />
      <ScrollBackground
        stops={[
          { trigger: "home",     color: "var(--background)" },
          { trigger: "projects", color: "var(--background)" },
          { trigger: "cta",      color: "var(--primary)" },
          { trigger: "footer",   color: "var(--background)" },
        ]}
      />
      <Hero />
      <main className="flex-1">
        {/* About + Services stacking-slide wrapper:
            About (100vh sticky, z:1) + Services (430vh, z:2)
            Wrapper height = 530vh so sticky About unpins at 530vh-100vh = 430vh scroll */}
        <div style={{ position: 'relative' }}>
          <About />
          <Services />
        </div>
        <Projects />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
