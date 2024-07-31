import type { Metadata } from "next";
import "@/src/app/globals.css";
import Contact from '@/src/components/Contact';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "EXCESS - Contact Us",
  description: "IOE Purwanchal Campus - EXCESS - Moments Together",
};


export default function Home() {
  return (
    <>
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>
      <Contact />
    </>
  );
}