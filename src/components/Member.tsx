'use client';
import React from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/src/app/member.css';
import '@/src/app/globals.css';
import {
	FaGoogle,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedin,
} from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa6';

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		duration: 0.8,
		y: 0,
		opacity: 1,
	},
};

type MemberData = {
	id?: number;
	name: string;
	img?: string;
	review: string;
	gmailLink?: string;
	fbLink?: string;
	instaLink?: string;
	linkedLink?: string;
	githubLink?: string;
	websiteLink?: string;
};

const excess_fbLink = 'https://www.facebook.com/excessnepal/';
const excess_linkedinLink = 'https://www.linkedin.com/company/excessioepc/';
const excess_gmailLink = 'mailto:excessnepal@ioepc.edu.np';
const data = [
	{
		name: 'Kaji Ram Karki',
		img: '/images/member/kajisir.svg',
		review: 'Campus Chief / Patron',
		fbLink: 'https://www.facebook.com/kaji.karki.9',
		instaLink: 'https://www.instagram.com/kaji9831',
		linkedLink: 'https://www.linkedin.com/in/kaji-ram-karki-69524a1a',
	},
	{
		name: 'Er. Manoj Kumar Guragain',
		img: '/images/member/manojsir.jpg',
		review: 'Head Of Department / Mentor',
		fbLink: 'https://www.facebook.com/manojkumar.guragai',
	},
	{
		name: 'Er. Dharti Raj Shah',
		img: '/images/member/dhartisir.png',
		review: 'Deputy Head Of Department / Mentor',
		fbLink: 'https://www.facebook.com/dhartiraj',
	},
	{
		name: 'Bijaya Giri',
		img: '/images/member/Bijaya.jpg',
		review: 'President',
		gmailLink: 'mailto: 079bei013@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/bijaya.giribro',
		linkedLink: 'https://www.linkedin.com/in/bijaya-giri-927266251',
	},
	{
		name: 'Suwarna Pyakurel',
		img: '/images/member/suwarna.jpeg',
		review: 'Advisor',
		gmailLink: 'mailto:Suwarna.079bei@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/pyakurel.suwarna',
		instaLink: ' https://www.instagram.com/pyakurel.suwarna/',
		linkedLink: 'https://www.linkedin.com/in/suwarnapyakurel/',
		githubLink: 'https://github.com/suwarna-wave',
		websiteLink: 'https://www.suwarnapyakurel.com.np/',
	},
	{
		name: 'Sneha Karna',
		img: '/images/member/Sneha.png',
		review: 'Vice President',
		gmailLink: 'mailto: 080bei042@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/sneha.karna.633797',
		instaLink: 'https://www.instagram.com/snehahahhaa90/',
		linkedLink: 'https://www.linkedin.com/in/sneha-karna-9119a82a5/',
	},
	{
		name: 'Abhishek Niraula',
		img: '/images/member/Abhishek.jpg',
		review: 'Secretary',
		gmailLink: 'mailto: 080bei004@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/abhisek.niraula.2025',
		instaLink: 'https://www.instagram.com/niraula_abhi07/',
		linkedLink: 'https://www.linkedin.com/in/abhishekniraula/',
		githubLink: 'https://github.com/AbhishekNiraula',
		websiteLink: 'https://www.abhishekniraula2004.com.np/',
	},
	{
		name: 'Bibhav Acharya',
		img: '/images/member/Bibhav.jpg',
		review: 'Vice Secretary',
		gmailLink: 'mailto: bibhavacharya9@gmail.com',
		linkedLink: 'https://www.linkedin.com/in/bibhav-acharya-b71815320',
	},
	{
		name: 'Shitala Adhikari',
		img: '/images/member/Shitala.jpg',
		review: 'Treasurer',
		gmailLink: 'mailto: 081bei030@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/shitala.adhikari',
	},
	{
		name: 'Kiran Upadhyay',
		img: '/images/member/Kiran.jpg',
		review: 'Project Manager',
		gmailLink: 'mailto: 080bei020@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/upadhyay.kiran.7',
	},
	{
		name: 'Saugat Rijal',
		img: '/images/member/Saugat.jpg',
		review: 'Project Manager',
		gmailLink: 'mailto: 081bei028@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/saughat.rizal',
	},
	{
		name: 'Sandesh Shrestha',
		img: '/images/member/Sandesh.jpg',
		review: 'Project Manager',
		gmailLink: 'mailto: 081bei027@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/sandesh.shrestha.612511',
	},
	{
		name: 'Aayush Gautam',
		img: '/images/member/Aayush.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 079bei003@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/share/1H8UreYWWF/',
	},
	{
		name: 'Prashan Chenta Rai',
		img: '/images/member/Prashan.png',
		review: 'Executive Member',
		gmailLink: 'mailto: 080bei030@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/Prashan.Raiii',
		linkedLink: 'https://www.linkedin.com/in/prashanrai/',
	},
	{
		name: 'Rabiya Ansari',
		img: '/images/member/Rabiya.png',
		review: 'Executive Member',
		gmailLink: 'mailto: 081bei023@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/share/1au3KXijPN/',
	},
	{
		name: 'Nitik Rauniyar',
		img: '/images/member/Nitik.webp',
		review: 'Executive Member',
		gmailLink: 'mailto: 081bei020@ioepc.edu.np',
		websiteLink: 'https://nitikrauniyar.com.np/',
	},
	{
		name: 'Matin Niroula',
		img: '/images/member/Matin.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: martinniraula2@gmail.com',
		linkedLink: 'http://www.linkedin.com/in/matin-niroula',
	},
	{
		name: 'Reeya Pokharel',
		img: '/images/member/Reeya.png',
		review: 'Executive Member',
		gmailLink: 'mailto: reeyyaapokharel@gmail.com',
	},
];

const Card = ({ d }: { d: MemberData }) => (
	<div className="text-black rounded-3xl bg-offWhite shadow-lg shadow-slate-300 w-auto py-4 px-2">
		<div className="rounded-t-3xl flex justify-center items-center">
			<Image
				src={d.img ? d.img : './images/groot.jpg'}
				width={112}
				height={112}
				quality={100}
				alt={d.name}
				className="testimonial-image flex-shrink-0 object-cover rounded-full w-28 h-28"
			/>
		</div>
		<div className="flex flex-col justify-center text-center items-center">
			<p className="bg-offBlue font-semibold text-md min-w-44 px-2 py-1.5 rounded border-x-4 border-primaryBlue text-primaryBlue mt-3">
				{d.name}
			</p>
			<p className="mt-2 font-regular text-md text-offBlack">{d.review}</p>
			<div className="flex flex-row mt-2 text-offBlack">
				<a href={d.fbLink ?? excess_fbLink}>
					<FaFacebook
						size={18}
						className="m-2 hover:text-blue-800 transition duration-500"
					/>
				</a>
				<a href={d.gmailLink ?? excess_gmailLink}>
					<FaGoogle
						size={18}
						className="m-2 hover:text-blue-800 transition duration-500"
					/>
				</a>
				{d.githubLink && (
					<a href={d.githubLink}>
						<FaGithub
							size={18}
							className="m-2 hover:text-black transition duration-500"
						/>
					</a>
				)}
				{d.instaLink && (
					<a href={d.instaLink}>
						<FaInstagram
							size={18}
							className="m-2 hover:text-pink-600 transition duration-500"
						/>
					</a>
				)}
				<a href={d.linkedLink ?? excess_linkedinLink}>
					<FaLinkedin
						size={18}
						className="m-2 hover:text-blue-800 transition duration-500"
					/>
				</a>
				{d.websiteLink && (
					<a href={d.websiteLink}>
						<FaGlobe
							size={18}
							className="m-2 hover:text-blue-800 transition duration-500"
						/>
					</a>
				)}
			</div>
		</div>
	</div>
);

const Member = () => {
	const first = data.slice(0, 3);
	const second = data.slice(3, 6);
	const third = data.slice(6);
	return (
		<div className="py-10 members">
			<div className=" container m-auto text-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-offBlack sm:text-4xl xl:text-3xl">
						Our <span className="text-primaryBlue">Committee</span> Members
					</h2>
					<h2 className="text-offBlack text-sm mt-2">
						EXCESS 12&apos;th Executive Committee
					</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 container gap-9 mt-8">
					{first.map((d, idx) => (
						<Card key={idx} d={d} />
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-9 container mt-4">
					{second.map((d, idx) => (
						<Card key={idx} d={d} />
					))}
				</div>
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 container mt-4">
					{third.map((d, idx) => (
						<Card key={idx} d={d} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Member;
