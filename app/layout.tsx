import type { Metadata } from "next";
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
            <main className="lg:pl-64">{children}</main>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
