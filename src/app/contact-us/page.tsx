"use client";

import "@/src/app/globals.css";
import Contact from '@/src/components/Contact';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from "@/src/components/Navbar";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Router } from "next/router"; 
import Loading from '@/src/components/Loading';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
    });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    Router.events.on("routeChangeStart", handleStart);  // Use Router.events
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);  // Use Router.events
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);


  return (
    <main>
      {isLoading ? <Loading /> : ""}
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>
      <Contact isLoading = {isLoading} />
    </main>
  );
}