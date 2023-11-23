import React from 'react';
import { useSession } from 'next-auth/react';
import Navbar from './navbar'; 
import Footer from './footer'; 

interface LayoutProps {
  children: React.ReactNode; 
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession(); 

  return (
    <>
      <Navbar session={session} />
      <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="flex flex-col items-center justify-center w-full min-h-screen pt-32">
        <div className="w-full max-w-4xl px-4 md:px-8 lg:px-16">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;