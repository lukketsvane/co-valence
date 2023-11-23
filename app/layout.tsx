"use client";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import React, { ReactNode, useEffect } from "react";
import { useDarkMode } from "@/lib/hooks/useDarkMode";




type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const [darkMode, toggleDarkMode] = useDarkMode();

  const metadata = {
    title: "Co:valence - Building blocks for your Next.js project",
    description: "Co:valence is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    metadataBase: new URL("https://precedent.dev"),
    themeColor: "#FFF",
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={cx(sfPro.variable, inter.variable, darkMode ? 'dark' : '')}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <Nav />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
