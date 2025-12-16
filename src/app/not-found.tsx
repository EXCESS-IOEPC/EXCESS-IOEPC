'use client';
import React from 'react';
import HeaderTop from '@/src/components/HeaderTop';
import Navbar from '@/src/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
	return (
		<>
			<section id="header">
				<HeaderTop />
				<Navbar />
			</section>

			<div className="w-screen min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto text-center">
					{/* 404 Number */}
					<div className="mb-8">
						<h1 className="text-[150px] md:text-[200px] font-extrabold leading-none bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
							404
						</h1>
					</div>

					{/* Fun Text */}
					<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
						Oops! You&apos;ve drifted off course
					</h2>
					<p className="text-gray-600 mb-2 text-lg">
						Looks like this page got swept away by the waves! 🌊
					</p>
					<p className="text-gray-500 mb-8">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved.
					</p>

					{/* Back Button */}
					<Link
						href="/"
						className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
						Ride Back Home
					</Link>
				</div>
			</div>
		</>
	);
};

export default NotFound;
