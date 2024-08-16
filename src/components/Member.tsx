"use client";
import React from 'react';
import Image from 'next/image'
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/src/app/member.css";
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { FaFacebook , FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    duration: 0.8,
    y: 0,
    opacity: 1
  }
};

// twitterLink is actually LinkedIn link. I was too lazy to fix it. :)
const excess_fbLink = "https://www.facebook.com/excessnepal/";
const excess_instaLink = "https://www.instagram.com/excess.ioe/";
const excess_githubLink = "https://github.com/EXCESS-IOEPC/EXCESS-IOEPC";
const excess_linkedinLink = "https://www.linkedin.com/company/excessioepc/"
const data =[
  {
    id: -1,
    name:"Kaji Ram Karki",
    img:"./images/member/kajisir.svg",
    review:"Campus Chief / Patron",
    fbLink: "https://www.facebook.com/kaji.karki.9",
    instaLink: "https://www.instagram.com/kaji9831",
    twitterLink: "https://www.linkedin.com/in/kaji-ram-karki-69524a1a",
  },
  {
    id:0,
    name:"Pravin Sangroula",
    img:"./images/member/pravinsir.jpg",
    review:"Head Of Department / Mentor",
    fbLink: "https://www.facebook.com/pravin.sangroula",
    instaLink: "https://www.instagram.com/pravin.sangroula",
    twitterLink: "https://www.linkedin.com/in/pravinsangroula/",
  },
  {
    id:1,
    name:"Mahesh Chaudhary",
    img:"./images/member/Mahesh.jpg",
    review:"President",
    fbLink: "https://www.facebook.com/immahesh1/",
    githubLink: "https://github.com/im-mahesh1",
    instaLink: "https://www.instagram.com/immahesh_1",
    twitterLink: "https://www.linkedin.com/in/immahesh1/",
  },
  {
    id:2,
    name:"Sudip Parajuli",
    img:"./images/member/Sudip.jpg",
    review:"Advisor",
    fbLink: "https://facebook.com/sudipnext",
    githubLink: "https://github.com/sudipnext",
    instaLink: "https://instagram.com/sudipnext/",
    twitterLink: "https://linkedin.com/in/sudipnext/",

  },
  {
    id:3,
    name:"Safal Raj Basnet",
    img:"./images/member/Safal.jpg",
    review:"Secretary",
    fbLink: " https://www.facebook.com/safalrajbasnet/",
  },
  {
    id:4,
    name:"Nisha Karn",
    img:"./images/member/Nisha.jpg",
    review:"Vice President",
  },
  {
    id:5,
    name:"Sita Limbu",
    img:"./images/member/Sita.jpg",
    review:"Treasurer",
    fbLink: "https://www.facebook.com/profile.php?id=100067208462139&mibextid=kFxxJD",
  },
  {
    id:6,
    name:"Aman Kumar Shah",
    img:"./images/member/Aman.jpg",
    review:"Vice Secretary",
    fbLink: "https://www.facebook.com/profile.php?id=100016915351599&mibextid=kFxxJD",
    twitterLink: "https://www.linkedin.com/in/aman-kumar-sah-20204128b/",
  },
  {
    id:7,
    name:"Bijay Raj Acharya",
    img:"./images/member/Bijay.jpg",
    review:"Project Manager",
  },
  {
    id:8,
    name:"Yogendra Kumar Karn",
    img:"./images/member/Yogendra.jpeg",
    review:"Project Manager",
    fbLink: "https://www.facebook.com/profile.php?id=100005985134977&mibextid=LQQJ4d",
    instaLink: "https://www.instagram.com/ayushkarn37?igsh=bmR5amNpdXNlZHJ0&utm_source=qr",
  },
  {
    id:9,
    name:"Bijaya Giri",
    img:"./images/member/Bijaya.jpg",
    review:"Project Manager",
    fbLink: "https://www.facebook.com/bijaya.giribro",
  },
  {
    id:10,
    name:"Arati Shrestha",
    img:"./images/member/Arati.jpg",
    review:"Executive Member",
    fbLink: "https://www.facebook.com/arati.shrestha.148553",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:12,
    name:"Ditish Acharya",
    img:"./images/member/Ditish.jpg",
    review:"Executive Member",
    fbLink: "https://www.facebook.com/ditish.acharya.54",
  },
  {
    id:12,
    name:"Uddhav Sapkota",
    img:"./images/member/Uddhav.png",
    review:"Executive Member",
    fbLink: "https://www.facebook.com/uddhav.sapkota.144",
  },
  {
    id:13,
    name:"Rishav Senchury",
    img:"./images/member/Rishav.jpeg",
    review:"Executive Member",
    fbLink: "https://www.facebook.com/shadowz.hawker",
    githubLink: "https://github.com/itsmerishi35",
    instaLink: "https://www.instagram.com/rish_shav?igsh=MW9tdjR4bGxka2FkOA%3D%3D&utm_source=qr",
    twitterLink: "https://www.linkedin.com/in/rishav-senchury-b13247313",
  },
  {
    id:14,
    name:"Saubhagya Rajbhandari",
    img:"./images/member/Saubhagya.jpg",
    review:"Executive Member",
    fbLink: "https://www.facebook.com/saubhagyarajbhandari11?mibextid=ZbWKwL",
  },
]
const Member = () => {
  return (
    <div className="w-full h-full py-10 members">
        <div className="w-[90%] sm:w-[85%] md:w-[80%]  m-auto text-center">
        <div className="text-center">
                    <h2 className="text-2xl font-bold text-offWhite sm:text-4xl xl:text-3xl">Our Members</h2>
                    <h2 className='text-offWhite text-sm mt-2'>EXCESS 11&apos;th Executive Committee</h2>
        </div>
        <motion.div initial="hidden" whileInView="visible" className="container" viewport={{ once: true }}  variants={container}>
        <Swiper
            spaceBetween={5}
            slidesPerView={1}
            navigation
            mousewheel={{ sensitivity: 0.5, thresholdDelta: 50}}
            pagination={{ clickable: true, dynamicBullets: true,}}
            modules={[Autoplay, Pagination, Navigation, Mousewheel]}
            breakpoints={{
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 3,
                },
            }}
            >
            {data.map((d, idx)=>(
                <SwiperSlide key={idx}>
                <motion.div variants={item} className='mb-4 bg-transparent'>
                <div className="text-black rounded-3xl">
                    <div className="rounded-t-3xl flex justify-center items-center">
                        <Image
                            loader={({ src }) => src}
                            src={d.img ? d.img : "./images/groot.jpg"}
                            width={32}
                            height={32}
                            alt={d.name}
                            className="flex-shrink-0 object-cover rounded-full mt-10 mb-2 w-28 h-28 sm:w-32 sm:h-32 border-4 border-offWhite"
                            />
                    </div>

                    <div className="flex flex-col justify-center text-center items-center">
                    <p className="bg-offBlue font-semibold text-md min-w-44 px-2 py-1.5 rounded border-x-4 border-primaryBlue text-primaryBlue mt-3">{d.name}</p>
                    <p className="mt-2 font-regular text-md text-offBlack">{d.review}</p>

                    <div className='flex flex-row mt-2 text-offBlack'>
                        <a href={d.fbLink ? d.fbLink : excess_fbLink}>          
                            <FaFacebook size={18} className="m-1 hover:text-blue-800  transition duration-500" />
                        </a>
                        <a href={d.githubLink ? d.githubLink : excess_githubLink}>
                            <FaGithub size={18} className="m-1 hover:text-black  transition duration-500" />
                        </a>
                        <a href={d.instaLink ? d.instaLink : excess_instaLink}>
                            <FaInstagram size={18} className="m-1 hover:text-pink-600  transition duration-500" />
                        </a>
                        <a href={ d.twitterLink ? d.twitterLink : excess_linkedinLink }>
                            <FaLinkedin  size={18} className="m-1 hover:text-blue-800  transition duration-500" />
                        </a>
                    </div>
                    </div>
                </div>
                </motion.div>
                </SwiperSlide>
            ))}
            </Swiper>
        </motion.div>
        </div>
    </div>
  )
}

export default Member;