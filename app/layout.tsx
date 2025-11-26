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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white`}
      >
        <div className="flex min-h-screen">
          <aside className="w-72 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-8 px-6 shadow-lg">
            <div className="flex items-center gap-2 mb-10">
              <span className="text-blue-600 text-3xl font-extrabold">Trainer AI</span>
            </div>
            <nav className="flex flex-col gap-4 w-full">
              <Link href="/" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium">New Goal</Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium">Dashboard</Link>
            </nav>
          </aside>
          <main className="flex-1 px-10 py-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
