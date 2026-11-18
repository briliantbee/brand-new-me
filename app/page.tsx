import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Cta } from "@/components/sections/Cta";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SiteStaggeredMenu } from "@/components/SiteStaggeredMenu";
import { ScrollBackground } from "@/components/ScrollBackground";

export const metadata = {
  title: "Abisam Hazim — Multidisciplinary Developer & Designer",
  description:
    "Portfolio of Abisam Hazim, a multidisciplinary developer and designer based in Indonesia. Clean, fast web interfaces, product design, and creative front-end development.",
  openGraph: {
    title: "Abisam Hazim — Multidisciplinary Developer & Designer",
    description:
      "Multidisciplinary developer and designer crafting clean, fast, and usable digital experiences. Based in Indonesia.",
    type: "website",
    url: "https://beefolio.me",
    siteName: "Abisam Hazim",
    images: [{ url: "/gwehj.png", width: 420, height: 480, alt: "Abisam Hazim" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abisam Hazim — Multidisciplinary Developer & Designer",
    images: ["/gwehj.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abisam Hazim",
  description: "Multidisciplinary developer and designer based in Indonesia.",
  url: "https://beefolio.me/",
  image: "https://beefolio.me/gwehj.png",
  email: "abisamhazim04@gmail.com",
  sameAs: [
    "https://github.com/briliantbee",
  ],
  jobTitle: "Developer & Designer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
