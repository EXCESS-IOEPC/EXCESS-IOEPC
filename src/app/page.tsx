"use client";

import "@/src/app/globals.css";
import HeaderTop from '@/src/components/HeaderTop';
import Main from "@/src/components/Main";
import Testimonial from "@/src/components/Testimonial";
import About from "@/src/components/About";
import Navbar from "@/src/components/Navbar";
import Member from "@/src/components/Member";
import { useRef } from "react";
import Progressbar from '@/src/components/ProgressBar';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Router } from "next/router";  // Import Router
import Loading from '@/src/components/Loading';

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

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
    <main ref={mainRef}>
      {isLoading ? <Loading /> : ""}
      <Progressbar target={mainRef} />
      <section id="header">
        <HeaderTop />
        <Navbar />
        <Main />
      </section>
      <section id="about-us">
        <About />
      </section>
      <section id="members">
        <Member />
      </section>
      <section id="testimonial">
        <Testimonial />
      </section>
    </main>
  );
}
