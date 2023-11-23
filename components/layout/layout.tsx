import React from 'react';
import Navbar from './navbar'; // Adjust the path as necessary
import Footer from './footer'; // Adjust the path as necessary

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
