"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Additional logic to persist the theme choice goes here
    // e.g., update a state management store, or use local storage
  };

  
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-900/50 backdrop-blur-xl"
            : "bg-white/0 dark:bg-gray-900/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/">
            <div className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Precedent logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              />
              <p>Precedent</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="focus:outline-none">
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-gray-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-500" />
              )}
            </button>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black dark:border-white bg-black dark:bg-white p-1.5 px-4 text-sm text-white dark:text-black transition-all hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}