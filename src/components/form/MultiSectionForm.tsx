'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormConfig } from '@/src/types/formTypes';
import { FormSection } from './FormSection';

interface MultiSectionFormProps {
	config: FormConfig;
	validationSchema: z.ZodObject<any>;
	onSubmit: (data: any) => Promise<void>;
}

const FORM_STORAGE_KEY = 'event_registration_form_data';
const FORM_STATE_KEY = 'event_registration_form_state';

export const MultiSectionForm: React.FC<MultiSectionFormProps> = ({
	config,
	validationSchema,
	onSubmit,
}) => {
	const [currentSection, setCurrentSection] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [completedSections, setCompletedSections] = useState<Set<number>>(
		new Set()
	);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		trigger,
		watch,
		reset,
		setValue,
	} = useForm({
		resolver: zodResolver(validationSchema),
		mode: 'onBlur',
		defaultValues: (() => {
			if (typeof window !== 'undefined') {
				const savedData = localStorage.getItem(FORM_STORAGE_KEY);
				if (savedData) {
					try {
						return JSON.parse(savedData);
					} catch (e) {
						// Invalid saved data, start fresh
					}
				}
			}
			return {};
		})(),
	});

	// Watch all form values to save them
	const formValues = watch();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedState = localStorage.getItem(FORM_STATE_KEY);
			if (savedState) {
				try {
					const {
						currentSection: savedSection,
						completedSections: savedCompleted,
					} = JSON.parse(savedState);
					setCurrentSection(savedSection || 0);
					setCompletedSections(new Set(savedCompleted || []));
				} catch (e) {}
			}
		}
	}, []);

	// Save form data to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== 'undefined' && formValues) {
			// Filter out file objects as they can't be serialized
			const serializableData = Object.entries(formValues).reduce(
				(acc, [key, value]) => {
					// Skip File objects
					if (value instanceof File || value instanceof FileList) {
						return acc;
					}
					acc[key] = value;
					return acc;
				},
				{} as any
			);

			localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(serializableData));
		}
	}, [formValues]);

	// Save form state (current section and completed sections) whenever they change
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const stateToSave = {
				currentSection,
				completedSections: Array.from(completedSections),
			};
			localStorage.setItem(FORM_STATE_KEY, JSON.stringify(stateToSave));
		}
	}, [currentSection, completedSections]);

	const totalSections = config.sections.length;
	const isLastSection = currentSection === totalSections - 1;
	const isFirstSection = currentSection === 0;

	const handleNext = async () => {
		// Validate current section fields before proceeding
		const currentFields = config.sections[currentSection].fields.map(
			(f) => f.name
		);
		const isValid = await trigger(currentFields as any);

		if (isValid) {
			// Mark current section as completed
			setCompletedSections((prev) => new Set(prev).add(currentSection));
			setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handlePrevious = () => {
		setCurrentSection((prev) => Math.max(prev - 1, 0));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleSectionClick = async (sectionIndex: number) => {
		// Allow navigation to any section
		setCurrentSection(sectionIndex);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleFormSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			await onSubmit(data);
			// Clear saved form data and state after successful submission
			if (typeof window !== 'undefined') {
				localStorage.removeItem(FORM_STORAGE_KEY);
				localStorage.removeItem(FORM_STATE_KEY);
				Object.keys(localStorage).forEach((key) => {
					if (key.startsWith('form_file_metadata_')) {
						localStorage.removeItem(key);
					}
				});
			}
		} catch (error) {
			// Error handling is done by parent component
		} finally {
			setIsSubmitting(false);
		}
	};

	const progressPercentage = ((currentSection + 1) / totalSections) * 100;

	return (
		<div className="w-full max-w-4xl mx-auto">
			{/* Progress Bar */}
			{config.showProgressBar && totalSections > 1 && (
				<div className="mb-8">
					<div className="flex justify-between items-center mb-2">
						<span className="text-sm font-medium text-offBlack">
							Section {currentSection + 1} of {totalSections}
						</span>
						<span className="text-sm text-gray-600">
							{Math.round(progressPercentage)}% Complete
						</span>
					</div>
					<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							className="h-full bg-primaryBlue transition-all duration-500 ease-out rounded-full"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>

					{/* Section Indicators */}
					<div className="grid grid-cols-3 sm:grid-cols-6 mt-4">
						{config.sections.map((section, index) => {
							const isCompleted = completedSections.has(index);
							const isCurrent = index === currentSection;

							return (
								<button
									key={section.id}
									type="button"
									onClick={() => handleSectionClick(index)}
									className="flex flex-col items-center flex-1 group cursor-pointer transition-all duration-200 hover:scale-105">
									<div
										className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
											isCompleted
												? 'bg-green-500 text-white shadow-md group-hover:shadow-lg group-hover:bg-green-600'
												: isCurrent
												? 'bg-primaryBlue text-white ring-4 ring-primaryBlue/30 shadow-lg scale-110'
												: 'bg-gray-200 text-gray-500 group-hover:bg-gray-300 group-hover:text-gray-700'
										}`}>
										{isCompleted ? (
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										) : (
											index + 1
										)}
									</div>
									<span
										className={`text-xs mt-2 text-center hidden md:block transition-all duration-200 ${
											isCurrent
												? 'text-primaryBlue font-semibold'
												: isCompleted
												? 'text-green-600 font-medium'
												: 'text-gray-600 group-hover:text-gray-800'
										}`}>
										{section.title}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Form */}
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="space-y-4 sm:space-y-6 md:space-y-8">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
					{config.sections.map((section, index) => (
						<FormSection
							key={section.id}
							section={section}
							register={register}
							errors={errors}
							control={control}
							setValue={setValue}
							watch={watch}
							isActive={index === currentSection}
						/>
					))}
				</div>

				{/* Navigation Buttons */}
				<div className="flex justify-between items-center gap-4">
					<button
						type="button"
						onClick={handlePrevious}
						disabled={isFirstSection}
						className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${
								isFirstSection
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-white text-offBlack border-2 border-gray-200 hover:border-primaryBlue hover:bg-gray-50'
							}
            `}>
						<span className="flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							Previous
						</span>
					</button>

					{!isLastSection ? (
						<button
							type="button"
							onClick={handleNext}
							className="px-6 py-3 bg-primaryBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
							<span className="flex items-center">
								Next
								<svg
									className="w-5 h-5 ml-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</span>
						</button>
					) : (
						<button
							type="submit"
							disabled={isSubmitting}
							className={`
                px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg
                ${
									isSubmitting
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-primaryBlue text-white hover:bg-blue-600'
								}
              `}>
							{isSubmitting ? (
								<span className="flex items-center">
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										fill="none"
										viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Submitting...
								</span>
							) : (
								config.submitButtonText || 'Submit Application'
							)}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
