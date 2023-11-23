"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      const savedMode = localStorage.getItem('theme') === 'dark';
      setDarkMode(savedMode);
      document.documentElement.classList.toggle('dark', savedMode);
    }, []);

    const toggleDarkMode = () => {
      const newMode = !darkMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      setDarkMode(newMode);
    };


  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>co:valance</p>
          </Link>
          <div>
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? <Sun /> : <Moon />}
          </button>
          </div>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
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
