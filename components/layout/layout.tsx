import React, { ReactNode } from 'react';
import Navbar from './navbar'; // Adjust the path as necessary
import Footer from './footer'; // Adjust the path as necessary

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
