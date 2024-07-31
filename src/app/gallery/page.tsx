import type { Metadata } from "next";
import "@/src/app/globals.css";
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from "@/src/components/Navbar";
import Gallery from "@/src/components/Gallery";

export const metadata: Metadata = {
  title: "EXCESS - Our Moments",
  description: "IOE Purwanchal Campus - EXCESS - Moments Together",
};

export default function Home() {
  return (
    <>
      <section id="header">
        <HeaderTop />
        <Navbar />
      </section>

      <Gallery />
    </>
  );
}
