import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisScroll";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dinesh Rajan Pandian | Software Engineer",
  description: "Portfolio of Dinesh Rajan Pandian, a full-stack software engineer specializing in AI orchestration and system architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${inter.variable} antialiased bg-background text-foreground`}>
        <LenisProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LenisProvider>
      </body>
    </html>
  );
}
