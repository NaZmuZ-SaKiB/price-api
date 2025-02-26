import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Layout/AppSidebar";
import Providers from "@/lib/providers/Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppSidebar />
          <main className="flex-1">
            <div className="border-b py-1 bg-transparent">
              <SidebarTrigger className="size-8" />
            </div>
            <div className="max-w-screen-2xl mx-auto p-2">{children}</div>
          </main>
        </Providers>
        <Toaster closeButton richColors />
      </body>
    </html>
  );
}
