"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "./navbar";
import { getSession } from "next-auth/react";

export default function Nav() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  return <Navbar session={session} />;
}
