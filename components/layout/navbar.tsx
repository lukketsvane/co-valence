"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { Moon, Sun } from 'lucide-react';

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  let darkMode = false;
  if (typeof window !== "undefined") {
    darkMode = localStorage.getItem('dark-mode') === 'true';
    document.body.classList.toggle('dark', darkMode);
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('dark-mode', newMode.toString());
    document.body.classList.toggle('dark', newMode);
  };

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
