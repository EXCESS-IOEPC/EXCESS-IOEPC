import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HackathonIM from './assets/hackathon.png';
import { FaLaptopCode } from 'react-icons/fa';
import Timer from './Timer';

export default function HackathonRegister() {
	return (
		<>
			<div
				className="w-full flex flex-row justify-center items-center relative"
				style={{
					backgroundImage: `url(${HackathonIM.src})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}>
				<div className="absolute inset-0 bg-black bg-opacity-65 backdrop-blur-sm"></div>
				<div className="relative z-10 text-white text-2xl py-4">
					<div className="justify-center flex flex-col items-center gap-6">
						<div className="flex items-center justify-center bg-black bg-opacity-50 p-4 rounded-full shadow-md">
							<FaLaptopCode className="text-3xl text-offWhite drop-shadow-lg" />
						</div>

						<h1 className="text-4xl text-center font-black items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-900 to-red-800 drop-shadow-sm uppercase">
							CS50 AI Hackathon 2025
						</h1>
						<Timer />
						<p className="text-sm py-2 px-6 sm:px-28 lg:w-[75%] mx-auto text-center text-gray-200 font-medium">
							✨ Ready to unleash your creativity? Dive into an
							adrenaline-packed coding adventure where your ideas come to life.
							💻 Join now and be part of something extraordinary! 🌟
						</p>

						<Link
							href="https://cs50xnepal.ioepc.edu.np/hackathon"
							className="bg-red-600 text-offWhite px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">
							Register Now 🚀
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
