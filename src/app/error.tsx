"use client";
import React from 'react';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import Image from 'next/image';
import serverDownImage from '@/public/images/server_down.svg'; 


const ErrorComponent: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <>
        <section id="header">
            <HeaderTop />
            <Navbar />
        </section>

        <div className="w-screen h-auto mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 text-center">
            <div className="max-w-2xl lg:max-w-4xl mx-auto">
                <Image
                src={serverDownImage}
                alt="Server Down"
                className="mx-auto"
                width={250}  // Adjusted width
                height={250} // Adjusted height to keep the aspect ratio
                priority={true} 
                />
                <h2 className="text-3xl font-extrabold text-red-600 mt-8">Oops! Something went wrong.</h2>
                <p className="mt-4 text-md text-offBlack">
                {message || "We couldn't load the gallery at this time. Please try again later."}
                </p>
            </div>
        </div>
    </>
  );
};

export default ErrorComponent;
