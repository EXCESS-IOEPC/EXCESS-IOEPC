'use client';
import React, { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { FaXmark, FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import '@/src/app/gallery/gallery.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import Loading from '@/src/components/LoadingGallery';

interface Image {
	width: number;
	height: number;
	asset_folder: string;
	url: string;
	secure_url: string;
}

const View = ({
	images,
	initialSearch,
}: {
	images: Image[];
	initialSearch: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [filteredImages, setFilteredImages] = useState(images);
	const [activeFilter, setActiveFilter] = useState('All');
	const [loading, setLoading] = useState(false);

	const filters = [
		'All',
		'CS50xNepal',
		'CLI Training',
		'XTech 1.0',
		'XTech 3.0',
		'XTech  4.0',
		'Robotics Workshop',
		'Hardware Hackathon',
		'Handover Ceremony',
		'Python Training',
		'IOT Training',
		'Web Scraping',
		'Libre Office',
	];
	const openImage = (index: number) => {
		setLoading(true);
		setCurrentIndex(index);
		setIsOpen(true);
	};

	const closeImage = () => {
		setIsOpen(false);
		setLoading(false);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
		setLoading(true);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + filteredImages.length) % filteredImages.length
		);
		setLoading(true);
	};

	// Handle keypresses for navigation and closing
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isOpen) {
				switch (e.key) {
					case 'ArrowRight':
					case 'ArrowDown':
						handleNext();
						break;
					case 'ArrowLeft':
					case 'ArrowUp':
						handlePrev();
						break;
					case 'Escape':
						closeImage();
						break;
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	// Handle swipe gestures for navigation
	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			touchStartX = touch.clientX;
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isOpen) return;
			const touch = e.touches[0];
			const touchEndX = touch.clientX;

			if (touchStartX - touchEndX > 50) {
				handleNext();
			}

			if (touchStartX - touchEndX < -50) {
				handlePrev();
			}
		};

		let touchStartX = 0;

		document.addEventListener('touchstart', handleTouchStart);
		document.addEventListener('touchmove', handleTouchMove);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
		};
	}, [isOpen]);

	const handleFilterChange = (filter: string) => {
		setActiveFilter(filter);
		if (filter === 'All') {
			setFilteredImages(images);
		} else {
			setFilteredImages(
				images.filter((image) => image.asset_folder === filter)
			);
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (loading) setLoading(false); // Hide loader after 5 seconds
		}, 5000);

		return () => clearTimeout(timer);
	}, [loading]);

	return (
		<>
			<section
				className={`w-screen h-auto mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 ${
					isOpen ? 'hidden' : ''
				}`}>
				<div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
					<motion.h2
						className="text-3xl font-extrabold text-primaryBlue"
						initial="hidden"
						animate="visible"
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { duration: 0.6 } },
						}}>
						Our Story in Picture
					</motion.h2>
					<motion.p
						className="mt-4 text-md text-offBlack"
						initial="hidden"
						animate="visible"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
						}}>
						Our gallery is a testament to the experiences and milestones that
						shape us. Delve into a visual narrative that reflects our unique
						journey.
					</motion.p>
				</div>

				<div className="mt-10 lg:mt-16 gallery">
					<div className="gallery-menu">
						{filters.map((filter) => (
							<button
								key={filter}
								className={`text-sm ${
									filter === activeFilter ? 'gallery-active' : ''
								}`}
								onClick={() => handleFilterChange(filter)}>
								{filter}
							</button>
						))}
					</div>

					{filteredImages.map((image, idx) => (
						<motion.div
							key={idx}
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { duration: 0.6, delay: idx * 0.2 },
								},
							}}
							custom={idx}>
							<Image
								className="h-auto max-w-full rounded-lg cursor-pointer object-cover"
								src={image.secure_url ? image.secure_url : image.url}
								alt="Gallery Image"
								width="300"
								height="300"
								quality={100}
								loading="eager"
								onClick={() => openImage(idx)}
							/>
							<p className="text-center text-xs mt-2 text-offBlack">
								{image.asset_folder}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{isOpen && (
				<section
					className={`w-screen relative h-[100%] top-0 items-center justify-center z-50 ${
						loading ? 'h-[85vh] py-10' : ''
					} `}>
					<div
						className="m-10 inset-0 z-50 flex items-center justify-center w-[80vh] bg-black bg-opacity-90"
						onClick={closeImage}
						tabIndex={0}>
						<button
							className="absolute top-0 mt-2 md:mt-4 scroll-button cross z-50"
							onClick={closeImage}>
							<FaXmark />
						</button>
						<button
							className="scroll-button absolute left-0 ml-4 md:ml-14 z-50"
							onClick={(e) => {
								e.stopPropagation();
								handlePrev();
							}}>
							<FaArrowLeftLong />
						</button>

						<Image
							className={`object-contain ${loading ? 'hidden' : ''}`}
							src={
								filteredImages[currentIndex].secure_url
									? filteredImages[currentIndex].secure_url
									: filteredImages[currentIndex].url
							}
							alt={`Fullscreen Image ${currentIndex + 1}`}
							width={1200}
							height={400}
							quality={100}
							loading="lazy"
							onLoad={() => setLoading(false)}
						/>
						{loading && (
							<div className="flex items-center justify-center bg-offWhite z-50 py-10">
								<Loading />
							</div>
						)}

						<button
							className="scroll-button absolute right-0 mr-4 md:mr-14"
							onClick={(e) => {
								e.stopPropagation();
								handleNext();
							}}>
							<FaArrowRightLong />
						</button>
					</div>
				</section>
			)}
		</>
	);
};

export default View;
