import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from './navbar'; // Adjust the path as necessary
import Footer from './footer'; // Adjust the path as necessary

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession(); // Get the session data

  return (
    <>
      <Navbar session={session} />
      <main className="items-center justify-center py-22 px-4 md:px-8">
        <div className="max-w">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
