"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Moon, Sun } from 'lucide-react';

export default function NavBarWrapper() {
  return (
    <SessionProvider session={null}>
      <NavBar />
    </SessionProvider>
  );
}

function NavBar() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { data: session, status } = useSession();
  const scrolled = useScroll(50);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') === 'dark';
    setDarkMode(savedMode);
    document.documentElement.setAttribute('data-theme', savedMode ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    setDarkMode(newMode);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/50"
            : "bg-white/0 dark:bg-gray-800/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" passHref>
            <div className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Precedent logo"
                width={30}
                height={30}
                className="mr-2 rounded-sm"
              />
              <span>co:valence</span>
            </div>
          </Link>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="mr-4 p-2 text-xl text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black dark:border-white bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
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
