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
      <main className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="w-full max-w-4xl px-4 md:px-8 lg:px-16">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;