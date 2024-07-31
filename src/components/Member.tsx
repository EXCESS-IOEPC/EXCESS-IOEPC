"use client";
import React from 'react';
import Image from 'next/image'
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/src/app/member.css";
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { FaFacebook , FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const data =[
  {
    id: -1,
    name:"Kaji Ram Karki",
    img:"./images/member/kajisir.svg",
    review:"Purwanchal Campus Chief",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:0,
    name:"Pravin Sangroula",
    img:"./images/member/pravinsir.jpg",
    review:"Head Of Department / Mentor",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
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
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",

  },
  {
    id:3,
    name:"Safal Raj Basnet",
    img:"./images/member/Safal.jpg",
    review:"Secretary",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:4,
    name:"Nisha Karn",
    img:"./images/member/Nisha.jpg",
    review:"Vice President",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:5,
    name:"Sita Limbu",
    img:"./images/member/Sita.jpg",
    review:"Treasurer",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:6,
    name:"Aman Kumar Shah",
    img:"./images/member/Aman.jpg",
    review:"Vice Secretary",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:7,
    name:"Bijay Raj Acharya",
    img:"./images/member/Bijay.jpg",
    review:"Project Manager",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:8,
    name:"Yogendra Kumar Karn",
    img:"./images/member/Yogendra.jpeg",
    review:"Project Manager",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:9,
    name:"Bijaya Giri",
    img:"./images/member/Bijaya.jpg",
    review:"Project Manager",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:10,
    name:"Arati Shrestha",
    img:"./images/member/Arati.jpg",
    review:"Executive Member",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:11,
    name:"Subash Pathak",
    img:"./images/member/Subash.jpg",
    review:"Executive Member",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:12,
    name:"Ditish Acharya",
    img:"./images/member/Ditish.jpg",
    review:"Executive Member",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:12,
    name:"Uddhav Sapkota",
    img:"./images/member/Uddhav.png",
    review:"Executive Member",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:13,
    name:"Rishav Senchury",
    img:"./images/member/Rishav.jpeg",
    review:"Executive Member",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
  {
    id:14,
    name:"Saubhagya Rajbhandari",
    img:"./images/member/Saubhagya.jpg",
    review:"Executive Member",
    fbLink: "https://facebook.com",
    githubLink: "https://github.com",
    instaLink: "https://instagram.com",
    twitterLink: "https://twitter.com",
  },
]
const Member = () => {
  return (
    <div className="w-full h-full py-10 members">
        <div className="w-[75%]  m-auto text-center">
        <div className="text-center">
                    <h2 className="text-2xl font-bold text-offWhite sm:text-4xl xl:text-3xl">Our Members</h2>
                    <h2 className='text-offWhite text-sm mt-2'>EXCESS 11&apos;th Executive Committee</h2>
        </div>
        <div className="">
        <Swiper
            spaceBetween={5}
            slidesPerView={1}
            navigation
            mousewheel={{ sensitivity: 0.5, thresholdDelta: 50}}
            pagination={{ clickable: true}}
            modules={[Pagination, Navigation, Mousewheel]}
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
            {data.map((d)=>(
                <SwiperSlide key={d.id}>
                <div className='mb-4 bg-transparent'>
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
                    <p className="bg-offBlue font-semibold text-md min-w-48 py-1.5 rounded border-x-4 border-primaryBlue text-primaryBlue mt-3">{d.name}</p>
                    <p className="mt-2 font-regular text-md text-offBlack">{d.review}</p>

                    <div className='flex flex-row mt-2 text-offBlack'>
                        <a href={d.fbLink}>          
                            <FaFacebook size={18} className="m-1 hover:text-blue-800  transition duration-500" />
                        </a>
                        <a href={d.githubLink}>
                            <FaGithub size={18} className="m-1 hover:text-black  transition duration-500" />
                        </a>
                        <a href={d.instaLink}>
                            <FaInstagram size={18} className="m-1 hover:text-pink-600  transition duration-500" />
                        </a>
                        <a href={d.twitterLink}>
                            <FaLinkedin  size={18} className="m-1 hover:text-blue-800  transition duration-500" />
                        </a>
                    </div>
                    </div>
                </div>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        </div>
    </div>
  )
}

export default Member;