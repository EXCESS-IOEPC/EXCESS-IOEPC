import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HackathonIM from './assets/hackathon.png';
import XHack from './assets/X Hack - white.svg';
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
						<div className="flex items-center justify-center">
							<Image src={XHack} width={200} height={100} alt="X Hack Logo" />
						</div>
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
