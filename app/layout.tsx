import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LenisScrollProvider } from "@/components/LenisScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { PreloaderGate } from "@/components/PreloaderGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beefolio.me/"),
  title: {
    default: "Abisam Hazim — Multidisciplinary Developer & Designer",
    template: "%s | Abisam Hazim",
  },
  description:
    "Portfolio of Abisam Hazim, a multidisciplinary developer and designer based in Indonesia. Specializing in clean, fast web interfaces, product design, and creative front-end development.",
  keywords: [
    "Abisam Hazim",
    "web developer",
    "frontend developer",
    "UI designer",
    "creative developer",
    "portfolio",
    "Indonesia",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Abisam Hazim" }],
  creator: "Abisam Hazim",
  publisher: "Abisam Hazim",
  formatDetection: {
    email: true,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: "https://abisamhazim.com",
    siteName: "Abisam Hazim",
    title: "Abisam Hazim — Multidisciplinary Developer & Designer",
    description:
      "Multidisciplinary developer and designer crafting clean, fast, and usable digital experiences. Based in Indonesia.",
    images: [
      {
        url: "/gwehj.png",
        width: 420,
        height: 480,
        alt: "Abisam Hazim portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abisam Hazim — Multidisciplinary Developer & Designer",
    description:
      "Clean, fast interfaces. Shipped products people actually use.",
    images: ["/gwehj.png"],
    creator: "@abisamhazim",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {},
  category: "technology",
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

// Runs before the first paint: marks <html> as "loading" so the CSS cover
// (see globals.css) hides the page until the Preloader has taken over.
// The timeout is a safety net so the cover can never get stuck.
const loadingScript = `
  document.documentElement.classList.add('is-loading');
  setTimeout(function () {
    document.documentElement.classList.remove('is-loading');
  }, 5000);
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // class is changed by the inline script before hydration
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: loadingScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <Preloader />
        <PreloaderGate />
        <LenisScrollProvider>{children}</LenisScrollProvider>
      </body>
    </html>
  );
}