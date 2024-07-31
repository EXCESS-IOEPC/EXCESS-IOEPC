'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaXmark, FaBars } from "react-icons/fa6";


const Navigation = () => {
  const pathname = usePathname();
  const [navbar, setNavbar] = useState(false);
  
  const navItems = [
    ['/', 'Home'],
    ['/about-us', 'About Us'],
    ['/#members', 'Members'],
    ['/#testimonials', 'Testimonials'],
    ['/gallery', 'Gallery'],
    ['/contact-us', 'Contact Us'],
  ];
  return (
    <>
      <div className="w-full h-14 bg-white z-10 top-0 px-3 sm:px-9 nav">
        <div className="container mx-auto h-full">
          <div className="flex gap-x-6 justify-end items-center h-full">

            {/* <ul className={`h-full overflow-visible md:overflow-hidden block md:flex md:pb-0 md:mt-0 md:space-x-2 space-y-20 text-offBlack text-sm font-semibold ${ navbar ? 'p-12 md:p-0 block' : 'hidden space-y-0' }`}> */}
            <ul
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <div className="h-screen md:h-auto items-center justify-center md:flex ">

              {navItems.map(([link, title], index) => (
                // className="nav-item active h-full content-center w-24 text-center hover:text-primaryBlue"
                <li key={index} onClick={() => setNavbar(!navbar)}  className = { pathname == link ? "active nav-item h-full content-center w-24 text-center hover:text-primaryBlue" : "nav-item h-full content-center w-24 text-center hover:text-primaryBlue"}  > <Link href={link}> <p>{title}</p> </Link> </li>
              ))} 
              <Link onClick={() => setNavbar(!navbar)}  href="https://excess.ioepc.edu.np/xtech/">
                <button className="w-40 h-10 rounded-md bg-xyellow transition text-offWhite duration-500 hover:bg-offWhite hover:border-[2px] hover:border-xyellow hover:text-xyellow font-bold">X-Tech</button>
              </Link>
              <Link onClick={() => setNavbar(!navbar)} href="https://cs50xnepal.ioepc.edu.np/">
                <button className="w-40 h-10 rounded-md bg-cs50red transition text-offWhite duration-500 hover:bg-offWhite hover:border-[2px] hover:border-cs50red hover:text-cs50red font-bold">CS50xNepal</button>
              </Link>
              </div>
            </ul>
            <div className="md:hidden">
                <button
                  className="text-offBlack text-3xl rounded-md cursor-pointer hover:text-primaryBlue transition duration-500 "
                  onClick={() => setNavbar(!navbar)}
                  >
                  {navbar ? (
                    <FaXmark />
                 ) : (
                    <FaBars />
                  )}
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
