'use client'

import React from 'react'
import Image from 'next/image'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {

    const footerNavs = [
        {
            href: '/#about-us',
            name: 'About'
        },
        {
            href: '/#members',
            name: 'Members'
        },
        {
            href: '/contact-us',
            name: 'Contact Us'
        },
        {
            href: 'https://excess.ioepc.edu.np/xtech/',
            name: 'X-Tech'
        },
        {
            href: 'https://cs50xnepal.ioepc.edu.np/',
            name: 'CS50xNepal'
        },

        {
            href: 'https://robotics.ioepc.edu.np/',
            name: 'Robotics Club'
        },
        {
            href: 'https://ioepc.edu.np',
            name: 'Purwanchal Campus'
        }
    ]

    return (
        <footer className="text-gray-400 bg-white px-4 py-5 mx-auto md:px-8">
            <div className="max-w-lg   sm:mx-auto sm:text-center">
                <Image width={12} height={12} src="/icon.png" alt='Excess Icon' className="w-12 sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[13px]">
                    EXCESS commits to remain at the forefront of growth, excellancy and innovation preparing students to shape a meaningful future.
                    <br />
                    Email:   <a className="text-primaryBlue" href="mailto:excess@ioepc.edu.np">excessnepal@ioepc.edu.np</a>
                    <br />
                    56700 Gangalal Marga Tinkune,
                    <br />Dharan-8, Sunsari,
                    <br />Nepal.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item, idx) => (
                        <li key={idx} className=" hover:text-primaryBlue transition duration-500 text-[14px]">
                            <a href={item.href}>
                                { item.name }
                            </a>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-8 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0 text-[15px]">
                    &copy; Designed and Developed by <a href="https://www.facebook.com/profile.php?id=100083009736365" className='text-primaryBlue'>Abhishek Niraula</a> and <a href='https://www.facebook.com/niraj.bista.92' className="text-primaryBlue">Niraj Bista</a>
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-2">
                        {[
                            ['facebook', "https://www.facebook.com/excessnepal/"],
                            ['instagram', "https://www.instagram.com/excess.ioe/"],
                            ['linkedin', "https://www.linkedin.com/company/excessioepc/"],
                            ['github', "https://github.com/EXCESS-IOEPC/EXCESS-IOEPC"],
                            ].map(([network, url], index) => (
                            <SocialIcon key={index} url={url} className="hover:cursor-pointer" network={network} style={{ height: 30, width: 30 }}/>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;