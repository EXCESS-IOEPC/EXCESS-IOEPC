"use client";

import React from 'react';
import Image from 'next/image';
import { FaArrowRightLong, FaArrowLeftLong, FaQuoteLeft } from "react-icons/fa6";
import { Parallax, Mousewheel, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "@/src/app/testimonial.css";
import { motion } from 'framer-motion';

export default function Testimonial() {

    const testimonials = [
        {
            "user_id": 1,
            "name": "Mahesh Chaudhary",
            "body": "We at EXCESS are devoted to developing the skill of Electronics Engineering students in a broad way by providing them with a platform to broaden their knowledge of the digital world so that they can be at the forefront of future technologies. We have been active in helping students learn new skills so they can deal with the implementation of applications, principles, and algorithms developed within many related fields.",
            "profile": "./images/member/Mahesh.jpg",
            "post": "EXCESS President 11'th Committee"
        },
        {
            "user_id": 2,
            "name": "Ujwal Neupane",
            "body": "As a founding member of EXCESS, I'm incredibly proud of how the society has flourished over the past decade. Watching it grow and inspire students fills me with immense joy.",
            "profile": "./images/testimonial/UjwalNeupane.jpg",
            "post": "EXCESS President 1'st Committee"
        },
        {
            "user_id": 3,
            "name": "Bharat Bhatta",
            "body": "Leading EXCESS was a transformative journey. We focused on cutting-edge training and innovative projects, ensuring our students excelled in the digital realm. The camaraderie and dedication within our community were truly inspiring.",
            "profile": "./images/testimonial/BharatBhatta.jpg",
            "post": "EXCESS President 2'nd and 3'rd Committee"
        },
        {
            "user_id": 4,
            "name": "Suresh Bhandari",
            "body": "EXCESS was a cornerstone of my university experience. We fostered innovation and community, developing skills that extended beyond the classroom. The opportunities to lead and innovate shaped my career trajectory.",
            "profile": "./images/testimonial/SureshBhandari.jpg",
            "post": "EXCESS President 4'th Committee"
        },
        {
            "user_id": 5,
            "is_campus": true,
            "name": "Baikuntha Acharya",
            "body": "EXCESS provided a supportive community and valuable learning opportunities. We focused on growth and innovation in electronics engineering, preparing students for real-world challenges.",
            "profile": "./images/testimonial/BaikunthaAcharya.jpg",
            "post": "EXCESS President 5'th Committee"
        },
        {
            "user_id": 6,
            "name": "Ram Binay Sharma",
            "body": "Working with EXCESS has shown me the power of collaboration and the impact we can make through teamwork and shared goals.",
            "profile": "./images/testimonial/RamBinaySharma.jpg",
            "post": "EXCESS President 6'th Committee"
        },
        {
            "user_id": 7,
            "name": "Sunil Pokharel",
            "body": "As president of EXCESS, I've seen firsthand the transformative impact of our society on our members' skills and confidence. We strive to foster an environment where everyone can excel.",
            "profile": "./images/testimonial/SunilPokharel.jpg",
            "post": "EXCESS President 7'th Committee"
        },
        {
            "user_id": 8,
            "name": "Sushan Kattel",
            "body": "EXCESS stands at the forefront of innovation in electronics engineering. It's a privilege to steer this society toward new achievements that define the future of technology.",
            "profile": "./images/testimonial/SushanKattel.jpg",
            "post": "EXCESS President 8'th Committee"
        },
        {
            "user_id": 9,
            "name": "Gokarna Baskota",
            "body": "EXCESS was a cornerstone of my university experience. We fostered innovation and community, developing skills that extended beyond the classroom. The opportunities to lead and innovate shaped my career trajectory.",
            "profile": "./images/testimonial/Gokarna.jpg",
            "post": "EXCESS President 9'th Committee"
        },
        {
            "user_id": 10,
            "name": "Suraj Bhattarai",
            "body": "Leading EXCESS was an honor. We introduced groundbreaking initiatives like CS50x, shaping our students' technical expertise. The spirit of collaboration and commitment to excellence defined our achievements.",
            "profile": "./images/testimonial/SurajBhattarai.png",
            "post": "EXCESS President 10'th Committee"
        },
    ]

    const fadeInFromBottom = {
        hidden: { opacity: 0, y: 120 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <section className="py-14 sm:py-10 bg-offWhite lg:py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center relative space-y-6">
                    <motion.div
                        className="text-center z-10"
                        variants={fadeInFromBottom}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-offBlack sm:text-4xl xl:text-3xl">
                            <span className="highlight"> EXCESS</span> President&apos;s Reflections
                        </h2>
                    </motion.div>
                    <FaQuoteLeft className="w-24 h-24 absolute top-[-10%] md:top-[-12%] max-[550px]:top-[-14%] text-offBlueTrans" />

                    <motion.div
                        className="relative md:mt-12 w-full bg-offWhite rounded-3xl"
                        variants={fadeInFromBottom}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="relative w-full max-w-lg max-[550px]:max-w-md max-[470px]:max-w-sm max-[410px]:max-w-xs bg-wave bg-no-repeat bg-cover shadow-xl rounded-3xl text-offBlack mx-auto md:max-w-none" >
                            <div className="flex flex-col overflow-hidden">
                                <motion.div
                                    className="previous w-12 h-12 ml-4 md:ml-14"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <FaArrowLeftLong className="icon" />
                                </motion.div>

                                <Swiper
                                    direction={'horizontal'}
                                    navigation={{ enabled: true, nextEl: ".next", prevEl: ".previous" }}
                                    parallax={true}
                                    pagination={{ el: ".swiper-pagination", type: "bullets", clickable: true, dynamicBullets: true }}
                                    mousewheel={{ sensitivity: 0.5, thresholdDelta: 50 }}
                                    loop={true}
                                    watchSlidesProgress={true}
                                    slidesPerView="auto"
                                    modules={[Parallax, Mousewheel, Autoplay, Navigation, Pagination]}
                                >
                                    {testimonials.map((testimonial, idx) => (
                                        <SwiperSlide className="flex flex-col justify-between max-[640px]:my-auto lg:pt-8 lg:px-7" key={idx}>
                                            <div className="w-[75%] mx-auto mt-6 max-[640px]:mt-3 md:mt-6 lg:mt-0">
                                                <blockquote>
                                                    <p className="text-sm max-[550px]:text-xs text-center text-offBlack">
                                                        {testimonial.body}
                                                    </p>
                                                </blockquote>
                                            </div>

                                            <div className="flex flex-col items-center mt-8" >
                                                <Image
                                                    loader={({ src }) => src}
                                                    src={testimonial.profile ? testimonial.profile : "./images/groot.jpg"}
                                                    width={32}
                                                    height={32}
                                                    alt={testimonial.name}
                                                    onError={(event) => {
                                                        event.target.id = "./images/groot.jpg";
                                                        event.target.srcset = "./images/groot.jpg";
                                                    }}
                                                    className="testimonial-image flex-shrink-0 object-cover rounded-full w-20 h-20 sm:w-32 sm:h-32"
                                                />
                                                <div className="mt-4 text-center">
                                                    <p className="font-bold text-primaryBlue max-[550px]:text-md">{testimonial.name}</p>
                                                    <p className="mt-0.5 text-sm max-[550px]:text-xs text-gray-600">{testimonial.post}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-pagination my-4">
                                        <span className="swiper-pagination-bullet"></span>
                                    </div>
                                </Swiper>

                                <motion.div
                                    className="next w-12 h-12 right-0 mr-4 md:mr-14"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <FaArrowRightLong className="icon" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
