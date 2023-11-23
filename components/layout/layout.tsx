import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react'; // Import the useSession hook
import Navbar from './navbar';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession(); // Get the session data

  return (
    <>
      <Navbar session={session} /> {/* Pass the session to Navbar */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
