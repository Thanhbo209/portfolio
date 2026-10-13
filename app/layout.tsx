import type { Metadata, Viewport } from "next";
import { Inter_Tight, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { NavigationProvider } from "@/components/layout/NavigationProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { primaryNav } from "@/constants/navigation";

// Body copy — see AGENTS.md §12/design-taste skill: Inter is discouraged
// as a bare default, Inter Tight is the deliberate pairing choice instead.
const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Headings only — mapped to `--font-heading` and applied globally to
// h1-h6 in globals.css, not used for body copy.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thanh's Portfolio",
  description: "Pham Viet Thanh porfolio website",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1C1E" },
  ],
};

const sectionIds = primaryNav.map((item) => item.id);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth motion-reduce:scroll-auto"
      suppressHydrationWarning
    >
      <body
        className={`${interTight.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <NavigationProvider sectionIds={sectionIds}>
            <Sidebar />
            <MobileNavDrawer />
            <main className="lg:pl-64">
              <div className="@container mx-auto w-full max-w-[var(--content-max)] px-5 sm:px-8 lg:px-12">
                {children}
              </div>
            </main>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
