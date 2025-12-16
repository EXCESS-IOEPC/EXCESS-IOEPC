'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
	FaMagnifyingGlassPlus,
	FaCircleXmark,
	FaArrowRightLong,
	FaArrowLeftLong,
	FaDownload,
} from 'react-icons/fa6';
import '@/src/app/gallery/gallery.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/bootstrap.css';

interface Image {
	width: number;
	height: number;
	asset_folder: string;
	url: string;
	secure_url: string;
}

const View = ({ images }: { images: Image[] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [filteredImages, setFilteredImages] = useState(images);
	const [activeFilter, setActiveFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const imagesPerPage = 20;

	// Image controls in selected mode.
	const openImage = (index: number) => {
		setCurrentIndex(index);
		setIsOpen(true);
	};

	const closeImage = () => {
		setIsOpen(false);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % paginatedImages.length);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + paginatedImages.length) % paginatedImages.length
		);
	};

	// Handle keypresses for navigation and closing
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isOpen) {
				switch (e.key) {
					case 'ArrowRight':
						handleNext();
						break;
					case 'ArrowLeft':
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
	}, [isOpen, handleNext, handlePrev]);

	// Filtering the image based on filters
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
		'CS50 AI Orientation',
		'CS50 AI Classes',
		'X-Hack 3.0',
		'CS50 AI Closing Ceremony',
		'Robo Ramailo',
		'Flutter Training',
	];
	const handleFilterChange = (filter: string) => {
		setActiveFilter(filter);
		setCurrentPage(1);
		if (filter === 'All') {
			setFilteredImages(images);
		} else {
			setFilteredImages(
				images.filter((image) => image.asset_folder === filter)
			);
		}
	};

	// Pagination Logic
	const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
	const paginatedImages = filteredImages.slice(
		(currentPage - 1) * imagesPerPage,
		currentPage * imagesPerPage
	);

	// To enter fullscreen mode with selected image
	const imageRef = useRef(null);
	const handleFullScreen = () => {
		const el = imageRef.current;
		if (el) {
			if ((el as any).webkitRequestFullscreen) {
				(el as any).webkitRequestFullscreen();
			} else if ((el as any).webkitRequestFullscreen) {
				(el as any).webkitRequestFullscreen(); // Safari
			} else if ((el as any).msRequestFullscreen) {
				(el as any).msRequestFullscreen(); // IE
			}
		}
	};

	const [downloadError, setDownloadError] = useState(false);
	const handleDownload = async () => {
		const imageUrl =
			paginatedImages[currentIndex].secure_url ||
			paginatedImages[currentIndex].url;

		try {
			const response = await fetch(imageUrl, { mode: 'cors' });
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = blobUrl;
			link.download = `EXCESS-${currentIndex + 1}.jpg`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			setDownloadError(true);
			console.error('Download error:', error);
			setTimeout(() => {
				setDownloadError(false);
			}, 3000);
		}
	};

	return (
		<>
			<section
				className={`h-auto mx-auto py-16 lg:py-20 ${isOpen ? 'hidden' : ''}`}>
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

				<div className="container mx-auto mt-10 lg:mt-16">
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
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 py-4 w-full">
						{paginatedImages.map((image, idx) => (
							<motion.div
								key={idx}
								initial="hidden"
								animate="visible"
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: { duration: 0.1, delay: idx * 0.1 },
									},
								}}
								className="w-full"
								custom={idx}>
								<Image
									className="w-full h-[300px] cursor-pointer object-cover rounded-lg"
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
				</div>
				<div className="container mx-auto flex justify-center items-center font-bold gap-6 pt-4">
					<ResponsivePagination
						current={currentPage}
						total={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</section>
			{isOpen && (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
						onClick={closeImage}>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="bg-slate-50 fixed w-full border max-h-[90vh] max-w-[90vw] p-4 rounded-xl shadow-lg sm:max-w-5xl sm:rounded-lg z-50 overflow-auto"
							onClick={(e) => e.stopPropagation()}>
							<div className="flex justify-between items-start p-2 gap-3">
								<div className="flex justify-center items-start p-2 gap-3 py-2">
									<button className="p-2 bg-offBlack text-white rounded-full text-lg hover:bg-primaryBlue duration-300 transition-colors">
										<FaArrowLeftLong onClick={handlePrev} />
									</button>
									<button className="p-2 bg-offBlack text-white rounded-full text-lg hover:bg-primaryBlue duration-300 transition-colors">
										<FaArrowRightLong onClick={handleNext} />
									</button>
								</div>
								<div className="flex justify-end items-start py-2 px-2 z-50 gap-3">
									<button
										onClick={handleFullScreen}
										className="p-2 bg-offBlack text-white rounded-full text-lg hover:bg-primaryBlue duration-300 transition-colors">
										<FaMagnifyingGlassPlus />
									</button>
									<button
										onClick={handleDownload}
										className="p-2 bg-offBlack text-white rounded-full text-lg hover:bg-primaryBlue duration-300 transition-colors">
										<FaDownload />
									</button>
									<button
										className="p-2 bg-offBlack text-white rounded-full text-lg hover:bg-primaryBlue duration-300 transition-colors"
										onClick={closeImage}>
										<FaCircleXmark />
									</button>
								</div>
							</div>
							<Image
								src={
									paginatedImages[currentIndex].secure_url
										? paginatedImages[currentIndex].secure_url
										: paginatedImages[currentIndex].url
								}
								alt={`Fullscreen Image ${currentIndex + 1}`}
								width={1200}
								ref={imageRef}
								height={1200}
								quality={100}
								className="w-full h-auto object-contain object-center rounded-lg"
								unoptimized
							/>
							{downloadError && (
								<div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
									Failed to download Image.
								</div>
							)}
						</motion.div>
					</motion.div>
				</AnimatePresence>
			)}
		</>
	);
};

export default View;
