'use client';

import React, { useState, useEffect } from 'react';
import { MultiSectionForm } from '@/src/components/form/MultiSectionForm';
import {
	eventRegistrationConfig,
	eventRegistrationSchema,
	EventRegistrationFormData,
} from '@/src/config/eventRegistrationForm';
import Navbar from '@/src/components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { processFileList } from '@/src/lib/fileUtils';
import '@/src/app/form-mobile.css';
import Link from 'next/link';
import Image from 'next/image';
export default function ApplyPage() {
	// Toggle this to enable/disable event registration
	const EVENTS_ACTIVE = false;

	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({ type: null, message: '' });

	const handleFormSubmit = async (data: EventRegistrationFormData) => {
		const loadingToast = toast.loading('Submitting your registration...');

		try {
			// Process file uploads
			const paymentFile = await processFileList(data.paymentScreenshot as any);
			const membershipFile = await processFileList(data.membershipCard as any);

			// Prepare submission data with correct field names for Google Sheets
			const submissionData = {
				...data,
				// Use the same field names as defined in the schema
				paymentScreenshot: paymentFile,
				membershipCard: membershipFile,
			};

			console.log('Submitting data:', submissionData);
			console.log('Faculty value:', submissionData.faculty);
			console.log('Year value:', submissionData.yearOfStudy);

			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submissionData),
			});

			let result;
			try {
				result = await response.json();
			} catch (parseError) {
				console.error('Failed to parse response:', parseError);
				throw new Error('Invalid response from server. Please try again.');
			}

			if (!response.ok) {
				throw new Error(result.error || 'Submission failed');
			}
			toast.success(result.message || 'Registration successful!', {
				id: loadingToast,
				duration: 5000,
			});

			setSubmitStatus({
				type: 'success',
				message: result.message,
			});

			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error: any) {
			toast.error(error.message || 'An error occurred. Please try again.', {
				id: loadingToast,
				duration: 5000,
			});
			setSubmitStatus({
				type: 'error',
				message: error.message || 'An error occurred. Please try again.',
			});
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-offWhite via-white to-offBlueTrans">
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 5000,
					style: {
						background: '#fff',
						color: '#1f2937',
					},
					success: {
						iconTheme: {
							primary: '#10b981',
							secondary: '#fff',
						},
					},
					error: {
						iconTheme: {
							primary: '#ef4444',
							secondary: '#fff',
						},
					},
				}}
			/>
			<Navbar />

			<div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
				{!EVENTS_ACTIVE ? (
					// No Events Available
					<div className="max-w-2xl mx-auto text-center py-16">
						<div className="inline-block p-4 bg-gray-100 rounded-full mb-6">
							<svg
								className="w-16 h-16 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h1 className="text-3xl font-bold text-offBlack mb-3">
							No Active Events
						</h1>
						<p className="text-gray-600 mb-8">
							There are no events currently open for registration. Please check
							back later.
						</p>
						<a
							href="/"
							className="inline-flex items-center justify-center px-6 py-3 bg-primaryBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
							Back to Home
						</a>
					</div>
				) : (
					// Events are active - Show normal registration form
					<>
						{/* Header */}
						<div className="max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-12">
							{/* Logos */}
							<div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
								<div className="flex items-center justify-center">
									<Image
										src="/images/forms/taranga.png"
										alt="Digital Pathshala Logo"
										width={100}
										height={80}
										className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
									/>
								</div>
								<div className="h-12 sm:h-14 md:h-16 lg:h-20 w-px bg-gray-300"></div>
								<div className="flex items-center justify-center">
									<Image
										src="/images/forms/logo-aces.webp"
										alt="ACES Logo"
										width={100}
										height={80}
										className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
									/>
								</div>
								<div className="h-12 sm:h-14 md:h-16 lg:h-20 w-px bg-gray-300"></div>
								<div className="flex items-center justify-center">
									<Image
										src="/images/icon.png"
										alt="EXCESS Logo"
										width={100}
										height={80}
										className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
									/>
								</div>
							</div>

							<div className="text-center mb-6 md:mb-8">
								<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primaryBlue mb-3 md:mb-4 px-2">
									IoT with Raspberry Pi Training
								</h1>
								{/* Supported by */}
								<div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 md:mb-4">
									<span className="text-xs sm:text-sm text-gray-600">
										Supported by
									</span>
									<Link
										href="https://robotics.ioepc.edu.np/"
										target="_blank"
										className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline">
										Robotics Club
									</Link>
								</div>
								<p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto px-2">
									Pre-event of{' '}
									<span className="font-semibold">
										Taranga: The Wave of Technology
									</span>{' '}
									— A hands-on bootcamp to explore IoT fundamentals and advanced
									concepts in robotics and microelectronics. Jointly coordinated
									by <span className="font-semibold">EXCESS</span> and{' '}
									<span className="font-semibold">ACES</span>, title sponsored
									by <span className="font-semibold">Digital Pathshala</span>.
								</p>
							</div>

							{/* Key Details */}
							<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 mb-4 md:mb-6">
								<div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
									<div>
										<p className="text-gray-600 mb-0.5 sm:mb-1 text-xs sm:text-sm">
											📅 Event Begins
										</p>
										<p className="font-semibold text-offBlack text-xs sm:text-sm">
											Poush 8, 2082
										</p>
									</div>
									<div>
										<p className="text-gray-600 mb-0.5 sm:mb-1 text-xs sm:text-sm">
											💸 Registration Fee
										</p>
										<p className="font-semibold text-offBlack text-xs sm:text-sm">
											Card Holders: Rs. 250 | Non-Card: Rs. 300
										</p>
									</div>
									<div>
										<p className="text-gray-600 mb-0.5 sm:mb-1 text-xs sm:text-sm">
											🎯 Seats
										</p>
										<p className="font-semibold text-offBlack text-xs sm:text-sm">
											Limited (First Come First Serve)
										</p>
									</div>
									<div>
										<p className="text-gray-600 mb-0.5 sm:mb-1 text-xs sm:text-sm">
											📍 Venue & Time
										</p>
										<p className="font-semibold text-offBlack text-xs sm:text-sm">
											Communicated via email
										</p>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
								<Link
									href="https://drive.google.com/drive/folders/11hyC2VmJ9n2SGy95aa8W8lGZaa3oh1fp?usp=drive_link"
									target="_blank"
									className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
									<svg
										className="w-4 h-4 sm:w-5 sm:h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									View Syllabus
									<svg
										className="w-3.5 h-3.5 sm:w-4 sm:h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</Link>
							</div>

							{/* Alternative Form Link */}
							<p className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6 px-2">
								Having trouble with the form?{' '}
								<Link
									href="https://forms.gle/iJ9EGvkGXDdcyaeZ6"
									target="_blank"
									className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
									Click here to use Google Forms instead
								</Link>
							</p>
						</div>

						{/* Status Messages */}
						{submitStatus.type && (
							<div className="max-w-4xl mx-auto mb-8">
								{submitStatus.type === 'success' ? (
									<div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 shadow-md">
										<div className="flex items-start">
											<svg
												className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-green-800 mb-1">
													Registration Successful!
												</h3>
												<p className="text-green-700 mb-2">
													{submitStatus.message}
												</p>
											</div>
										</div>
									</div>
								) : (
									<div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 shadow-md">
										<div className="flex items-start">
											<svg
												className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
													clipRule="evenodd"
												/>
											</svg>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-red-800 mb-1">
													Submission Failed
												</h3>
												<p className="text-red-700">{submitStatus.message}</p>
											</div>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Form */}
						<MultiSectionForm
							config={eventRegistrationConfig}
							validationSchema={eventRegistrationSchema}
							onSubmit={handleFormSubmit}
						/>

						{/* Footer Info */}
						<div className="max-w-4xl mx-auto mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
							<div className="bg-blue-50 border border-primaryBlue/20 rounded-lg p-4 sm:p-5 md:p-6">
								<h3 className="text-base sm:text-lg font-semibold text-offBlack mb-2 sm:mb-3 flex items-center">
									<svg
										className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primaryBlue"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clipRule="evenodd"
										/>
									</svg>
									Important Information
								</h3>
								<ul className="space-y-2 text-xs sm:text-sm text-gray-700">
									<li className="flex items-start">
										<svg
											className="w-4 h-4 mr-2 text-primaryBlue mt-0.5 flex-shrink-0"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										You will be notified via email about your registration
										status.
									</li>
									<li className="flex items-start">
										<svg
											className="w-4 h-4 mr-2 text-primaryBlue mt-0.5 flex-shrink-0"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										Your information is secure and will only be used for event
										purposes.
									</li>
									<li className="flex items-start">
										<svg
											className="w-4 h-4 mr-2 text-primaryBlue mt-0.5 flex-shrink-0"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										For questions, contact us at excessnepal@ioepc.edu.np
									</li>
								</ul>
							</div>

							{/* Developer Credit */}
							<p className="text-center text-xs text-gray-500 mt-4">
								Developed by{' '}
								<Link
									href="https://www.abhishekniraula2004.com.np/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
									Abhishek Niraula
								</Link>
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
