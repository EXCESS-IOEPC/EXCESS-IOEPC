'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '@/src/app/icon.png';
import { motion } from 'framer-motion';
import Binary from '@/public/images/Binary.svg';
import { CommitteeList } from '@/src/app/committee/committee_list';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { Navigation, Keyboard } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

interface member {
	name: string;
	position: string;
	photo?: string;
}

const MemberCard = ({ member }: { member: member }) => (
	<motion.div
		variants={cardVariants}
		className=" shadow-xl rounded-lg px-8 py-4 flex flex-col justify-center items-center"
		style={{ width: '240px', height: '320px' }}>
		<div className="flex items-center justify-center">
			{member.photo ? (
				<div className="mb-3">
					<Image
						src={`/images/member/${member.photo}`}
						alt={member.name}
						width={128}
						height={128}
						className="testimonial-image flex-shrink-0 object-cover rounded-full w-28 h-28"
					/>
				</div>
			) : (
				<div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-3">
					<span className="text-gray-500 text-3xl font-bold">
						{member.name.charAt(0)}
					</span>
				</div>
			)}
		</div>
		<div className="flex flex-col gap-2 items-center text-center">
			<p className="text-primaryBlue font-bold text-lg mt-4 truncate max-w-full">
				{member.name}
			</p>
			<p className="text-offBlack font-semibold text-sm truncate max-w-full">
				{member.position}
			</p>
		</div>
	</motion.div>
);

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Committee() {
	const [activeIndex, setActiveIndex] = useState(0);
	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.activeIndex);
	};

	return (
		<section className="py-16 lg:py-20 bg-white">
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
					className="flex flex-col items-center my-4">
					<div className="flex flex-row justify-center items-center">
						<div className="previous w-12 h-12 rounded-ful flex items-center justify-center">
							<FaArrowLeftLong className="icon" />
						</div>
						<p className="text-md text-primaryBlue font-bold text-xl">
							{CommitteeList[activeIndex].year}
						</p>
						<div className=" next w-12 h-12 flex items-center justify-center">
							<FaArrowRightLong className="icon" />
						</div>
					</div>
				</motion.div>
			</div>
			<div className="relative py-8 lg:px-48 md:px-36 sm:px-16 overflow-hidden">
				<div
					className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
					style={{ backgroundImage: `url(${Binary.src})` }}></div>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 0, y: -10 },
						visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
					}}
					className="relative flex flex-row text-center items-center justify-center my-4 bg-white/90">
					<div className="flex items-center justify-center text-center max-w-max">
						<p className="font-bold text-primaryBlue text-xl my-0">
							{CommitteeList[activeIndex].committeeNumber}
						</p>
					</div>
				</motion.div>
				<Swiper
					cssMode={true}
					keyboard={true}
					onSlideChange={handleSlideChange}
					navigation={{ enabled: true, nextEl: '.next', prevEl: '.previous' }}
					modules={[Navigation, Keyboard]}
					className="relative w-full">
					{CommitteeList.map((committee, index) => (
						<div className="h-max w-full lg:px-48 md:px-36 sm:px-16 px-4">
							<SwiperSlide>
								{/* First Row - 3 Members */}
								<motion.div
									variants={containerVariants}
									initial="hidden"
									animate="show"
									className="flex justify-center items-center gap-4 flex-wrap mb-4">
									{CommitteeList[activeIndex].committeeMembers
										.slice(0, 3)
										.map((member, index2) => (
											<MemberCard key={index2} member={member} />
										))}
								</motion.div>

								{/* Remaining Members */}
								<motion.div
									variants={containerVariants}
									initial="hidden"
									animate="show"
									className="flex flex-wrap justify-center items-center gap-4 mb-4">
									{CommitteeList[activeIndex].committeeMembers
										.slice(3)
										.map((member, index2) => (
											<MemberCard key={index2} member={member} />
										))}
								</motion.div>
							</SwiperSlide>
						</div>
					))}
				</Swiper>
			</div>
		</section>
	);
}
