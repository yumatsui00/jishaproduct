import type { Metadata } from "next";

import TopBar from "@/components/common/TopBar";

import "./globals.css";

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
      <body className="antialiased">
        <div className="min-h-screen bg-background text-foreground">{children}</div>
      </body>
    </html>
  );
}
