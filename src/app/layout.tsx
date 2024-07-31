import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/src/app/globals.css";
import Footer from "@/src/components/Footer";


const poppins = Poppins({ 
  weight: '400',
  subsets: ["latin"] }
);

export const metadata: Metadata = {
  title: "EXCESS - Electronics and Communication Engineering Student Society",
  description: "IOE Purwanchal Campus - EXCESS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
      </head>
      <body className={poppins.className}>
        {children}
        <section id="footer">
            <Footer />
        </section> 
      </body>
      </html>
  );
}
