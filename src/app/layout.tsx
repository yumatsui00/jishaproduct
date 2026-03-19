import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import TopBar from "@/components/common/TopBar";

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
  title: "Jisha",
  description: "Initial project page for the Jisha application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = true;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background text-foreground">
          <TopBar isLoggedIn={isLoggedIn} />
          {children}
        </div>
      </body>
    </html>
  );
}
