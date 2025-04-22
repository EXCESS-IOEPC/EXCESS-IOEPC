'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from '@/src/app/icon.png';
import { motion } from 'framer-motion';
import Binary from '@/public/images/Binary.svg';
import { CommitteeList } from '@/src/app/committee/committee_list';
import {
	Parallax,
	Mousewheel,
	Autoplay,
	Navigation,
	Pagination,
	Keyboard,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import '@/src/app/testimonial.css';

export default function Committee() {
	let key = 0;
	return (
		<section
			className={`w-screen h-auto mx-auto py-16 lg:py-20  bg-white flex flex-col items-center justify-center relative`}>
			<div className="max-w-2xl flex flex-col mx-auto justify-center px-4 sm:px-6 lg:px-8 items-center text-center">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 0, y: -10 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6 },
						},
					}}
					className="flex flex-col items-center">
					<Image
						src={Icon}
						alt="EXCESS ICON"
						width={100}
						height={20}
						className="w-24"
					/>
					<div className="w-full mx-auto relative px-2">
						<div className="diamond-divider-container">
							<div className="diamond"></div>
							<hr className="center-diamond" />
						</div>
					</div>
				</motion.div>
				<motion.h2
					className="text-3xl font-extrabold text-primaryBlue"
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 0, y: -10 },
						visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
					}}>
					Electronics and Communication Engineering Student Society
				</motion.h2>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 0, y: -10 },
						visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
					}}
					className="flex flex-col items-center mt-4">
					<p className="text-md text-primaryBlue font-bold text-xl">
						2024-2025
					</p>
				</motion.div>
			</div>
			<div className="relative flex flex-col items-center mt-4 w-full px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
				<div
					className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
					style={{ backgroundImage: `url(${Binary.src})` }}></div>

				<div className="relative z-10">
					<Swiper
						cssMode={true}
						navigation={true}
						pagination={true}
						mousewheel={true}
						keyboard={true}
						modules={[Navigation, Mousewheel, Keyboard]}
						className="mySwiper"></Swiper>
				</div>
			</div>
		</section>
	);
}
