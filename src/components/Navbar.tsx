"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaXmark, FaBars } from "react-icons/fa6";
import { motion } from "framer-motion"

const Path = ({...props}) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 20%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const variants = {
  open: {
    opacity: [0, 1],
    y: [50, 0],
    transition: { 
      opacity: { duration: 1 },
      y: { stiffness: 1000, velocity: -100, duration: 0.5 },
    },
  },
  closed: {
    y: 0,
    x: 0,
  },
};

const navUL = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

function NavBar() {
  const pathname = usePathname();
  const [navbar, setNavbar] = useState(false);

  const navItems = [
    ['/', 'Home'],
    ['/#about-us', 'About Us'],
    ['/#members', 'Members'],
    ['/#testimonial', 'Testimonials'],
    ['/gallery', 'Gallery'],
    ['/contact-us', 'Contact Us'],
  ];

  return (
    <div className='overflow-hidden'>
      <motion.nav animate={navbar ? "open" : "closed"} className="w-full h-auto md:h-14 bg-offWhite text-offBlack top-0 left-0 right-0 z-10">
        <div className="justify-end align-center h-full md:items-center md:flex px-2 sm:px-9">
          <div className="flex items-center justify-end py-3 md:py-5 md:block">
            {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="md:hidden flex items-center justify-center align-middle">
              <button onClick={() => setNavbar(!navbar)}>
                <svg width="23" height="23" viewBox="0 0 23 23">
                  <Path
                    variants={{
                      closed: { d: "M 2 2.5 L 20 2.5" },
                      open: { d: "M 3 16.5 L 17 2.5" }
                    }}
                  />
                  <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  <Path
                    variants={{
                      closed: { d: "M 2 16.346 L 20 16.346" },
                      open: { d: "M 3 2.5 L 17 16.346" }
                    }}
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center md:block md:pb-0 md:mt-0 ${
                navbar ? 'md:p-0 block py-8' : 'hidden'
              }`}
            >
              <motion.ul variants={navUL} className="md:h-auto items-center justify-center md:flex font-semibold ">
                {navItems.map(([link, title], index) => (
                  <motion.li key={index} variants={variants} className={`text-sm py-2 max-[910px]:px-2 px-6 overflow-hidden nav-item h-14 content-center text-center hover:text-primaryBlue ${pathname == link ? 'active' : ''}`}>
                    <Link href={link}>
                      {title}
                    </Link>
                  </motion.li>
                ))}
                <div className="md:flex md:ml-2 text-sm gap-2 max-[550px]:gap-1 md:mt-0 mt-2 md:space-y-0 space-y-2 justify-center content-center items-center">
                  <motion.li variants={variants}>
                    <Link href="https://excess.ioepc.edu.np/xtech/">
                      <button className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-all duration-500 bg-xyellow border-2 border-transparent md:w-auto rounded-md hover:bg-transparent hover:border-xyellow hover:text-xyellow">XTech</button>
                    </Link>
                  </motion.li>
                  <motion.li variants={variants}>
                    <Link href="https://cs50xnepal.ioepc.edu.np/">
                      <button className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-all duration-500 bg-cs50red border-2 border-transparent md:w-auto rounded-md hover:bg-transparent hover:border-cs50red hover:text-cs50red font-bold">CS50xNepal</button>
                    </Link>
                  </motion.li>
                </div>
              </motion.ul>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

export default NavBar;
