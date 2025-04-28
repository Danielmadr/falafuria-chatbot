/**
 * Root Layout Component
 *
 * This file defines the base layout structure for the entire application.
 * It sets up fonts, metadata, and theme provider that will be shared across all pages.
 *
 * @module layout
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

/**
 * Geist Sans font configuration
 * Sets up the Geist Sans font with appropriate variable name and subset
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono font configuration
 * Sets up the Geist Mono font with appropriate variable name and subset
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application metadata
 * Defines SEO and browser metadata like title, description, and various icons
 */
export const metadata: Metadata = {
  title: "Fala Furia AI Chat",
  description:
    "Fala Furia AI Chat é um assistente virtual inteligente desenvolvido como projeto para a vaga de assistente em engenharia de software na FURIA",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/**
 * Root Layout Component
 *
 * Serves as the base layout wrapper for all pages in the application.
 * Sets up fonts, language, and theme provider.
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render within the layout
 * @returns {JSX.Element} The root layout structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
