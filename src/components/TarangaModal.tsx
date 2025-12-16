'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Confetti {
	x: number;
	y: number;
	rotation: number;
	rotationSpeed: number;
	velocityX: number;
	velocityY: number;
	size: number;
	color: string;
}

const TarangaModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const letters = [
		'/images/notice/excess_letter.jpg',
		'/images/notice/aces_letter.jpg',
	];

	// Confetti effect
	useEffect(() => {
		if (!isOpen || !canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const confettiColors = [
			'#3b82f6',
			'#60a5fa',
			'#93c5fd',
			'#2563eb',
			'#1d4ed8',
		];
		const confettiPieces: Confetti[] = [];
		const confettiCount = 100;

		// Create confetti
		for (let i = 0; i < confettiCount; i++) {
			confettiPieces.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height - canvas.height,
				rotation: Math.random() * 360,
				rotationSpeed: Math.random() * 4 - 2,
				velocityX: Math.random() * 2 - 1,
				velocityY: Math.random() * 3 + 2,
				size: Math.random() * 8 + 4,
				color:
					confettiColors[Math.floor(Math.random() * confettiColors.length)],
			});
		}

		let animationFrameId: number;

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Filter out confetti that has gone off screen
			const activeConfetti = confettiPieces.filter(
				(confetti) => confetti.y <= canvas.height
			);

			// Stop animation when all confetti has fallen off screen
			if (activeConfetti.length === 0) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				return;
			}

			confettiPieces.forEach((confetti) => {
				confetti.y += confetti.velocityY;
				confetti.x += confetti.velocityX;
				confetti.rotation += confetti.rotationSpeed;

				// Only draw if still on screen
				if (confetti.y <= canvas.height) {
					ctx.save();
					ctx.translate(confetti.x, confetti.y);
					ctx.rotate((confetti.rotation * Math.PI) / 180);
					ctx.fillStyle = confetti.color;
					ctx.fillRect(
						-confetti.size / 2,
						-confetti.size / 2,
						confetti.size,
						confetti.size
					);
					ctx.restore();
				}
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [isOpen]);

	useEffect(() => {
		// Show modal after a brief delay on mount
		const timer = setTimeout(() => {
			setIsOpen(true);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		// Auto-slide between letters every 5 seconds
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % letters.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isOpen, letters.length]);

	const handleClose = () => {
		setIsOpen(false);
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
			onClick={handleClose}>
			{/* Confetti Canvas */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none"
				style={{ zIndex: 51 }}
			/>
			<div
				className="relative w-[95%] max-w-xl max-h-[95vh] overflow-y-auto bg-white rounded-lg shadow-2xl animate-modal-pop"
				onClick={(e) => e.stopPropagation()}>
				{/* Close Button */}
				<button
					onClick={handleClose}
					className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-105"
					aria-label="Close modal">
					<svg
						className="w-5 h-5 text-gray-700"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>

				{/* Content */}
				<div className="p-4 sm:p-8">
					{/* Logo and Header */}
					<div className="flex flex-col items-center mb-4 sm:mb-6">
						<div className="mb-4">
							<Image
								src="/images/notice/taranga_logo.svg"
								alt="Taranga Logo"
								width={150}
								height={150}
								className="object-contain"
							/>
						</div>
						<h2 className="text-lg sm:text-xl font-semibold text-center mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
							Taranga: The Wave of Technology
						</h2>
						<p className="text-center text-gray-600 text-xs sm:text-sm max-w-2xl mb-4 sm:mb-6 px-2">
							In coordinated efforts of{' '}
							<span className="font-semibold text-blue-600">EXCESS</span>{' '}
							(Electronics and Communication Engineering Student Society) and{' '}
							<span className="font-semibold text-blue-600">ACES</span>{' '}
							(Association of Computer Engineering Students), we welcome you to{' '}
							<span className="font-semibold text-blue-600">
								Taranga: The Wave of Technology
							</span>{' '}
							at IOE, Purwanchal Campus.
						</p>

						{/* Registration Button */}
						<div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
							<Link
								href="/apply"
								className="inline-block px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:scale-[1.02]">
								PreEvents: Registration
							</Link>
							<Link
								href="https://taranga.ioepc.edu.np/"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-transparent bg-clip-padding rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.05] relative before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:-z-10"
								style={{
									background: 'white',
									backgroundClip: 'padding-box',
								}}
								aria-label="Visit Taranga Website">
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 -z-10"></div>
								<svg
									className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white relative z-10 transition-colors duration-200"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
									<polyline points="15 3 21 3 21 9"></polyline>
									<line x1="10" y1="14" x2="21" y2="3"></line>
								</svg>
							</Link>
						</div>
					</div>

					{/* Letter Carousel */}
					<div className="relative w-full aspect-[3/4] sm:aspect-[4/3] max-h-[350px] sm:max-h-[500px] bg-gray-50 rounded-lg overflow-hidden">
						{letters.map((letter, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-700 ${
									currentSlide === index ? 'opacity-100' : 'opacity-0'
								}`}>
								<Image
									src={letter}
									alt={`Letter ${index + 1}`}
									fill
									className="object-contain p-2"
									priority={index === 0}
								/>
							</div>
						))}

						{/* Slide Indicators */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
							{letters.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentSlide(index)}
									className={`w-2 h-2 rounded-full transition-all duration-300 ${
										currentSlide === index
											? 'bg-blue-500 w-6'
											: 'bg-gray-300 hover:bg-gray-400'
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TarangaModal;
