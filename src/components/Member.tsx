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
		name: 'Er. Manoj Kumar Guragai',
		img: '/images/member/manojsir.jpg',
		review: 'Head Of Department / Mentor',
		fbLink: 'https://www.facebook.com/rajnish.rajbahak',
	},
	{
		name: 'Safal Raj Basnet',
		img: '/images/member/Safal.jpg',
		review: 'President',
		fbLink: 'https://www.facebook.com/share/12LdnbSJ2yT/',
		instaLink: 'https://www.instagram.com/safalrajbasnet/',
		gmailLink: 'mailto: safalbasnet12@gmail.com',
		linkedLink:
			'https://www.linkedin.com/in/safal-raj-basnet-730aa9281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
	},
	{
		name: 'Lokesh Kumar Mandal',
		img: '/images/member/Lokesh.jpg',
		review: 'Advisor',
		gmailLink: 'mailto: 078bei017@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/lalit.mandal.31924',
		instaLink:
			'https://www.instagram.com/lalitmandal27?igsh=MXd3d3J3OW1ydG1qag==',
	},
	{
		name: 'Aman Kumar Sah',
		img: '/images/member/Aman.jpeg',
		review: 'Vice-President',
		gmailLink: 'mailto: amansah112.as9@gmail.com',
		fbLink: 'https://www.facebook.com/share/19PkNC4UJp/',
		websiteLink: 'https://sahaman.com.np',
		linkedLink:
			'https://www.linkedin.com/in/aman-kumar-sah-20204128b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
	},
	{
		name: 'Bijaya Giri',
		img: '/images/member/Bijaya.jpg',
		review: 'Secretary',
		gmailLink: 'mailto: 079bei013@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/bijaya.giribro',
		linkedLink: 'https://www.linkedin.com/in/bijaya-giri-927266251',
	},
	{
		name: 'Suwarna Pyakurel',
		img: '/images/member/suwarna.jpeg',
		review: 'PR and Outreach Lead',
		gmailLink: 'mailto:Suwarna.079bei@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/pyakurel.suwarna',
		linkedLink: 'https://www.linkedin.com/in/suwarnapyakurel/',
		websiteLink: 'https://www.icrtai.com/',
	},
	{
		name: 'Abhishek Niraula',
		img: '/images/member/Abhishek.jpg',
		review: 'Vice-Secretary',
		gmailLink: 'mailto: 080bei004@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/abhisek.niraula.2025',
		instaLink: 'https://www.instagram.com/niraula_abhi07/',
		linkedLink: 'https://www.linkedin.com/in/abhisek-niraula-a92058224/',
		githubLink: 'https://github.com/AbhishekNiraula',
		websiteLink: 'https://www.abhishekniraula2004.com.np/',
	},
	{
		name: 'Nandini karn',
		img: '/images/member/Nandini.jpg',
		review: 'Treasurer',
		gmailLink: 'mailto: 080bei024@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/share/1GHiBPux4R/',
	},
	{
		name: 'Rohan Kumar Jha',
		img: '/images/member/Rohan.webp',
		review: 'Project Manager',
		gmailLink: 'mailto: 079bei033@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/rohan.jha.50411',
		githubLink: 'https://github.com/Qwax1',
	},
	{
		name: 'Kiran Upadhyay',
		img: '/images/member/Kiran.jpg',
		review: 'Project Manager',
		gmailLink: 'mailto: 080bei020@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/upadhyay.kiran.7',
	},
	{
		name: 'Bhagwati Prasad Thakur',
		img: '/images/member/Bhagwati.JPG',
		review: 'Project Manager',
		gmailLink: 'mailto: 080bei010@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/xplorerh',
		githubLink: 'https://www.github.com/xplorerh',
		instaLink: 'https://www.instagram.com/xplorerh/',
		linkedLink: 'https://www.linkedin.com/in/xplorerh',
	},
	{
		name: 'Sandeep Pandey',
		img: '/images/member/Sandeep.jpeg',
		review: 'Graphics Designer',
		gmailLink: 'mailto: 081bei026@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/sandeep.pandey.89008',
		instaLink: 'https://www.instagram.com/sndp.pandey.30/',
		linkedLink: 'https://www.linkedin.com/in/sandeep-pandey-157624282/',
	},
	{
		name: 'Sijan Adhikari',
		img: '/images/member/Sijan.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 078bei039@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/share/15mFWFxVEL/',
	},
	{
		name: 'Soniya Rajbanshi',
		img: '/images/member/Soniya.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 079bei039@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/share/19EnQeUHAK/',
	},
	{
		name: 'Sneha Karna',
		img: '/images/member/Sneha.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 080bei042@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/sneha.karna.633797',
		instaLink: 'https://www.instagram.com/snehahahhaa90/',
		linkedLink: 'https://www.linkedin.com/in/sneha-karna-9119a82a5/',
	},
	{
		name: 'Ritesh Bogati',
		img: '/images/member/Ritesh.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 080bei034@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/ritesh.bogati.559579?mibextid=ZbWKwL',
		instaLink: 'https://www.instagram.com/ritesh_bogati?igsh=bmNqZmZ3NXFta3ps',
		linkedLink: 'https://www.linkedin.com/in/ritesh-bogati-a423a32b4',
		githubLink: 'https://github.com/R-Bogati',
	},
	{
		name: 'Pravakar Jung Thapa',
		img: '/images/member/Pravakar.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 081bei022@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/share/1EPaBt5Zn1/',
	},
	{
		name: 'Diksha Jha',
		img: '/images/member/Diksha.jpg',
		review: 'Executive Member',
		gmailLink: 'mailto: 081bei013@ioepc.edu.np',
		fbLink: 'https://www.facebook.com/diksha.jha.942977/',
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
	const first = data.slice(0, 2);
	const second = data.slice(2, 5);
	const third = data.slice(5);
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
				<div className="grid grid-cols-1 sm:grid-cols-2 container gap-9 mt-8">
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
