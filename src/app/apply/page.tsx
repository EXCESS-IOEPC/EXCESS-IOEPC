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
export default function ApplyPage() {
	// Toggle this to enable/disable event registration
	const EVENTS_ACTIVE = true;

	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null;
		message: string;
		submissionId?: string;
	}>({ type: null, message: '' });

	const [csrfToken, setCsrfToken] = useState<string>('');
	const [alreadySubmitted, setAlreadySubmitted] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	// Check submission status and get CSRF token on mount
	useEffect(() => {
		const initialize = async () => {
			try {
				// Check if user has already submitted
				const statusResponse = await fetch('/api/submission-status');
				const statusData = await statusResponse.json();

				if (statusData.submitted) {
					setAlreadySubmitted(true);
					setSubmitStatus({
						type: 'success',
						message: 'You have already submitted a registration.',
						submissionId: statusData.submissionId,
					});
				}

				// Get CSRF token
				const csrfResponse = await fetch('/api/csrf-token');
				const csrfData = await csrfResponse.json();
				if (csrfData.csrfToken) {
					setCsrfToken(csrfData.csrfToken);
				}
			} catch (error) {
				// Silent fail - form can still work without CSRF in dev mode
			} finally {
				setCheckingStatus(false);
			}
		};

		initialize();
	}, []);

	const handleSubmitAnother = async () => {
		try {
			const response = await fetch('/api/submission-status', {
				method: 'DELETE',
			});

			const result = await response.json();

			if (response.ok) {
				toast.success('You can now submit another response!');
				setAlreadySubmitted(false);
				setSubmitStatus({ type: null, message: '' });

				// Get new CSRF token
				const csrfResponse = await fetch('/api/csrf-token');
				const csrfData = await csrfResponse.json();
				if (csrfData.csrfToken) {
					setCsrfToken(csrfData.csrfToken);
				}

				// Scroll to form
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		} catch (error) {
			toast.error('Failed to reset submission status. Please try again.');
		}
	};

	const handleFormSubmit = async (data: EventRegistrationFormData) => {
		const loadingToast = toast.loading('Submitting your registration...');

		try {
			// Process file uploads
			const paymentFile = await processFileList(data.paymentScreenshot as any);
			const membershipFile = await processFileList(data.membershipCard as any);

			// Prepare submission data
			const submissionData = {
				...data,
				csrfToken,
				paymentFile,
				membershipFile,
				// Remove FileList objects
				paymentScreenshot: undefined,
				membershipCard: undefined,
			};

			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submissionData),
			});

			const result = await response.json();

			if (!response.ok) {
				// Handle already submitted case
				if (result.alreadySubmitted) {
					setAlreadySubmitted(true);
					setSubmitStatus({
						type: 'success',
						message: 'You have already submitted a registration.',
						submissionId: result.submissionId,
					});
				}
				throw new Error(result.error || 'Submission failed');
			}

			toast.success(result.message || 'Registration successful!', {
				id: loadingToast,
				duration: 5000,
			});

			setAlreadySubmitted(true);
			setSubmitStatus({
				type: 'success',
				message: result.message,
				submissionId: result.submissionId,
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
		<div className="min-h-screen bg-gradient-to-br from-offWhite via-white to-offBlueTrans">
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

			<div className="container mx-auto px-4 py-12 pt-10">
				{/* Loading State */}
				{checkingStatus ? (
					<div className="max-w-2xl mx-auto text-center py-16">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue mb-4"></div>
						<p className="text-gray-600">Checking submission status...</p>
					</div>
				) : !EVENTS_ACTIVE ? (
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
						<div className="text-center mb-6 md:mb-12">
							<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-offBlack mb-2 md:mb-4">
								Register:{' '}
								<span className="text-primaryBlue">IoT with Raspberry Pi</span>
							</h1>
							<p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3">
								Join us for an exciting learning experience. Fill out the form
								below to secure your spot.
							</p>
							{/* Syllabus Link */}
							<p className="text-sm md:text-base text-gray-700">
								<Link
									href=""
									target="_blank"
									className="text-primaryBlue hover:underline font-medium">
									Click here to view event syllabus
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
												{submitStatus.submissionId && (
													<p className="text-sm text-green-600">
														Reference ID:{' '}
														<span className="font-mono font-medium">
															{submitStatus.submissionId}
														</span>
													</p>
												)}
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
						{!alreadySubmitted && submitStatus.type !== 'success' && (
							<MultiSectionForm
								config={eventRegistrationConfig}
								validationSchema={eventRegistrationSchema}
								onSubmit={handleFormSubmit}
							/>
						)}

						{/* Success Actions */}
						{alreadySubmitted && submitStatus.type === 'success' && (
							<div className="max-w-4xl mx-auto text-center mt-8">
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<a
										href="/"
										className="inline-flex items-center justify-center px-6 py-3 bg-primaryBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
										<svg
											className="w-5 h-5 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
										Back to Home
									</a>
									<button
										onClick={handleSubmitAnother}
										className="inline-flex items-center justify-center px-6 py-3 bg-white text-offBlack border-2 border-gray-200 rounded-lg font-medium hover:border-primaryBlue hover:bg-gray-50 transition-all duration-200">
										<svg
											className="w-5 h-5 mr-2"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4v16m8-8H4"
											/>
										</svg>
										Submit Another Response
									</button>
								</div>
							</div>
						)}

						{/* Footer Info */}
						<div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
							<div className="bg-blue-50 border border-primaryBlue/20 rounded-lg p-6">
								<h3 className="text-lg font-semibold text-offBlack mb-3 flex items-center">
									<svg
										className="w-5 h-5 mr-2 text-primaryBlue"
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
								<ul className="space-y-2 text-sm text-gray-700">
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
						</div>
					</>
				)}
			</div>
		</div>
	);
}
