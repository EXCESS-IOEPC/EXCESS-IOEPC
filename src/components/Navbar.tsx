"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaXmark, FaBars } from "react-icons/fa6";

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
    <div>
      <nav className="w-full h-auto md:h-14 bg-offWhite text-offBlack top-0 left-0 right-0 z-10">
        <div className="justify-end align-center h-full md:items-center md:flex px-2 sm:px-9">
            <div className="flex items-center justify-end py-3 md:py-5 md:block">
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 rounded-md text-xl hover:text-primaryBlue transition duration-500 ease"
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
          <div>
          <div
            className={`flex-1 justify-self-center md:block md:pb-0 md:mt-0 ${
              navbar ? 'md:p-0 block py-8' : 'hidden'
            }`}
          >
              <ul className="md:h-auto items-center justify-center md:flex font-semibold ">
                {navItems.map(([link, title], index) => (
                  <li key={index}  className = {`text-sm py-2 max-[910px]:px-2 px-6  overflow-hidden nav-item h-14 content-center text-center hover:text-primaryBlue ${ pathname == link ? 'active' : ''}`}>
                    <Link href={link} onClick={() => setNavbar(!navbar)}> 
                      {title}
                    </Link>
                  </li>
                   
                  ))}
                  <div className="md:flex md:ml-2 text-sm gap-2 max-[550px]:gap-1 md:mt-0 mt-2 md:space-y-0 space-y-2 justify-center content-center items-center">
                    <li>
                      <Link onClick={() => setNavbar(!navbar)}  href="https://excess.ioepc.edu.np/xtech/">
                        <button className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-all duration-500 bg-xyellow border-2 border-transparent md:w-auto rounded-md hover:bg-transparent hover:border-xyellow hover:text-xyellow">XTech</button>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setNavbar(!navbar)} href="https://cs50xnepal.ioepc.edu.np/">
                        <button className="inline-flex items-center justify-center w-full px-4 py-2 text-white transition-all duration-500 bg-cs50red border-2 border-transparent md:w-auto rounded-md hover:bg-transparent hover:border-cs50red hover:text-cs50red font-bold">CS50xNepal</button>
                      </Link>
                    </li>

                  </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;