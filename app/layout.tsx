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
        <div className="flex flex-col md:flex-row min-h-screen">
          <aside className="w-full md:w-72 bg-gray-950 border-b md:border-b-0 md:border-r border-gray-800 flex flex-row md:flex-col items-center py-4 md:py-8 px-4 md:px-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 md:mb-10">
              <Link href="/" className="text-blue-600 text-2xl md:text-3xl font-extrabold min-w-max">Trainer AI</Link>
            </div>
            <nav className="flex flex-row md:flex-col gap-2 justify-end md:gap-4 w-full">
              <Link href="/" className="px-2 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-800 transition font-medium text-sm md:text-base">New Goal</Link>
              <Link href="/dashboard" className="px-2 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-800 transition font-medium text-sm md:text-base">Dashboard</Link>
            </nav>
          </aside>
          <main className="flex-1 px-4 md:px-10 py-4 md:py-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
