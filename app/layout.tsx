import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Trainer AI",
  description: "Train your skills with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-wrap
         bg-background text-foreground`}
      >
        <nav className="p-4 flex flex-col gap-4 w-[20%]">
          <h3 className="text-2xl font-bold mb-8">Trainer AI</h3>
          <Link href="/">New Goal</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <main className="w-[80%]">{children}</main>
      </body>
    </html>
  );
}
