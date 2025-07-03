import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../lib/reactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarLayout } from "@/components/navigation/SidebarLayout";
import { auth0 } from "@/lib/auth/auth0";
import { AuthLogin } from "@/lib/auth/AuthLogin";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Private Chef",
  description: "Your personal recipe assistant",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth0.getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
          {session ? <SidebarLayout>{children}</SidebarLayout> : <AuthLogin />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
