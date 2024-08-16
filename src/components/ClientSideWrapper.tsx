"use client";
import React, { useState, useEffect, ReactNode } from 'react';
import Loading from '@/src/components/Loading';
import { useRouter } from "next/navigation";
import { Router } from "next/router";

interface ClientSideWrapperProps {
  children: ReactNode;
}

const ClientSideWrapper: React.FC<ClientSideWrapperProps> = ({ children }) => {

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
    <>
      {isLoading && <Loading />}
      {children}
    </>
  );
};

export default ClientSideWrapper;
