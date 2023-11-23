"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import useDarkSide from "@/lib/hooks/use-dark-mode"; // Import the custom dark mode hook
import { Moon, Sun } from 'lucide-react'; // Import Moon and Sun icons

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [colorTheme, toggleDarkMode] = useDarkSide(); // Use the custom dark mode hook

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
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className={`rounded-full border ${
                  colorTheme === "dark"
                    ? "border-white bg-white text-black"
                    : "border-black bg-black text-white"
                } p-1.5 px-4 text-sm transition-all hover:bg-black hover:text-white`}
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
          <div>
            <button onClick={toggleDarkMode} className="p-2">
              {colorTheme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
