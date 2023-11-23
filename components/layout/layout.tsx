import "app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import React from 'react';
import Nav from "@/components/layout/nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
