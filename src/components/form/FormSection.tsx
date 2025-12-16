'use client';

import React, { useState } from 'react';
import { FormSection as FormSectionType } from '@/src/types/formTypes';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { CheckboxField } from './CheckboxField';
import { CheckboxGroupField } from './CheckboxGroupField';
import { DateField } from './DateField';
import { FileField } from './FileField';
import {
	UseFormRegister,
	FieldErrors,
	Control,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';
import Image from 'next/image';

interface FormSectionProps {
	section: FormSectionType;
	register: UseFormRegister<any>;
	errors: FieldErrors;
	control: Control<any>;
	setValue: UseFormSetValue<any>;
	watch: UseFormWatch<any>;
	isActive: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
	section,
	register,
	errors,
	control,
	setValue,
	watch,
	isActive,
}) => {
	const [isQRModalOpen, setIsQRModalOpen] = useState(false);

	if (!isActive) return null;

	return (
		<div className="animate-fadeIn">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-offBlack mb-2">
					{section.title}
				</h2>
				{section.description && (
					<p className="text-gray-600 text-sm">{section.description}</p>
				)}
			</div>

			{/* Payment QR Code Section */}
			{section.id === 'payment-membership' && (
				<>
					<div className="mb-8 lg:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
						{/* Fee Structure */}
						<div className="mb-6 p-4 bg-white rounded-lg border-2 border-primaryBlue/30">
							<h3 className="text-lg font-bold text-primaryBlue mb-4 flex items-center">
								<svg
									className="w-5 h-5 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
										clipRule="evenodd"
									/>
								</svg>
								Registration Fees
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-xs text-gray-600 mb-1">
												ACES/EXCESS Card Holders
											</p>
											<p className="text-2xl font-bold text-green-700">
												Rs. --
											</p>
										</div>
										<div className="bg-green-200 p-2 rounded-full">
											<svg
												className="w-6 h-6 text-green-700"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
								<div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-xs text-gray-600 mb-1">
												Non-Card Holders
											</p>
											<p className="text-2xl font-bold text-blue-700">Rs. --</p>
										</div>
										<div className="bg-blue-200 p-2 rounded-full">
											<svg
												className="w-6 h-6 text-blue-700"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fillRule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
							<p className="text-xs text-gray-500 mt-3 text-center italic">
								* Exact fees will be updated soon. Please check back later.
							</p>
						</div>

						{/* QR Code and Instructions */}
						<div className="flex flex-col md:flex-row gap-6 items-center">
							<div className="flex-shrink-0 relative group">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<Image
										src="/images/Treasurer-EXCESS.jpeg"
										width={224}
										height={224}
										alt="Payment QR Code"
										className="w-48 h-48 md:w-56 md:h-56 object-contain"
									/>
								</div>
								{/* Expand Button Overlay */}
								<button
									type="button"
									onClick={() => setIsQRModalOpen(true)}
									className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
									<div className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
										<svg
											className="w-5 h-5 text-primaryBlue"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
											/>
										</svg>
										<span className="text-sm font-semibold text-primaryBlue">
											Expand QR
										</span>
									</div>
								</button>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h3 className="text-xl font-bold text-primaryBlue mb-3">
									Scan to Pay
								</h3>
								<div className="space-y-2 text-sm text-gray-700">
									<p className="flex items-center justify-center md:justify-start">
										<svg
											className="w-5 h-5 mr-2 text-green-600"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="font-medium">
											Scan the QR code using any payment app
										</span>
									</p>
									<p className="flex items-center justify-center md:justify-start">
										<svg
											className="w-5 h-5 mr-2 text-green-600"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="font-medium">Complete the payment</span>
									</p>
									<p className="flex items-center justify-center md:justify-start">
										<svg
											className="w-5 h-5 mr-2 text-green-600"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="font-medium">
											Upload the payment screenshot below
										</span>
									</p>
								</div>
								<div className="mt-4 p-3 bg-white rounded-lg border border-blue-300">
									<p className="text-xs text-gray-600">
										<strong className="text-primaryBlue">Note:</strong> After
										payment, save the screenshot and enter the transaction code
										in the fields below.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* QR Code Modal */}
					{isQRModalOpen && (
						<div
							className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
							onClick={() => setIsQRModalOpen(false)}>
							<div
								className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative"
								onClick={(e) => e.stopPropagation()}>
								{/* Close Button */}
								<button
									onClick={() => setIsQRModalOpen(false)}
									className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
									<svg
										className="size-4 sm:size-6 text-gray-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>

								{/* Modal Content */}
								<div className="text-center">
									<h3 className="text-lg sm:text-2xl font-bold text-primaryBlue mb-2">
										Payment QR Code
									</h3>
									<p className="text-gray-600 mb-6">
										Scan with your payment app to complete the transaction
									</p>
									<div className="flex justify-center mb-4">
										<div className="bg-white p-4 rounded-xl shadow-lg border-2 border-primaryBlue/20">
											<Image
												src="/images/Treasurer-EXCESS.jpeg"
												width={400}
												height={400}
												alt="Payment QR Code - Enlarged"
												className="w-full h-auto max-w-md"
											/>
										</div>
									</div>
									<p className="text-sm text-gray-500">
										Click outside or press the × button to close
									</p>
								</div>
							</div>
						</div>
					)}
				</>
			)}

			<div className="grid grid-cols-2 gap-6">
				{section.fields.map((field) => {
					const error = errors[field.name];

					switch (field.type) {
						case 'text':
						case 'email':
						case 'url':
							return (
								<InputField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									type={field.type}
									maxLength={(field as any).maxLength}
								/>
							);

						case 'phone':
							return (
								<InputField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									type="phone"
								/>
							);

						case 'textarea':
							return (
								<TextareaField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									rows={(field as any).rows}
									maxLength={(field as any).maxLength}
									showCharCount={(field as any).showCharCount}
								/>
							);

						case 'select':
							return (
								<SelectField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									options={(field as any).options}
								/>
							);

						case 'radio':
							return (
								<RadioField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									options={(field as any).options}
								/>
							);

						case 'checkbox':
							return (
								<CheckboxField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									checkboxLabel={(field as any).checkboxLabel}
								/>
							);

						case 'checkboxGroup':
							return (
								<CheckboxGroupField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									options={(field as any).options}
									minSelections={(field as any).minSelections}
									maxSelections={(field as any).maxSelections}
									control={control}
								/>
							);

						case 'date':
							return (
								<DateField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									min={(field as any).min}
									max={(field as any).max}
								/>
							);

						case 'file':
							return (
								<FileField
									key={field.name}
									field={field}
									register={register}
									error={error as any}
									accept={(field as any).accept}
									maxSizeMB={(field as any).maxSizeMB}
									setValue={setValue}
									watch={watch}
								/>
							);
						default:
							return null;
					}
				})}
			</div>
		</div>
	);
};
