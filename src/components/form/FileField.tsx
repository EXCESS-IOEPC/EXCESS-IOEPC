'use client';

import React, { useState, useEffect } from 'react';
import {
	UseFormRegister,
	FieldError,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';
import { FormFieldProps } from '@/src/types/formTypes';
import Image from 'next/image';

/**
 * File Upload Field Component
 *
 * Features:
 * - Drag and drop support
 * - Image preview with thumbnail
 * - File metadata display
 * - localStorage persistence for file metadata
 * - Customizable file size limits and accepted formats
 */

interface FileFieldProps extends FormFieldProps {
	accept?: string;
	maxSizeMB?: number;
	setValue: UseFormSetValue<any>;
	watch: UseFormWatch<any>;
}

const FILE_STORAGE_KEY = 'form_file_metadata_';

export const FileField: React.FC<FileFieldProps> = ({
	field,
	register,
	error,
	accept = '.jpg,.jpeg,.png,.pdf,.webp,.heic,.heif',
	maxSizeMB = 5,
	setValue,
	watch,
}) => {
	const [preview, setPreview] = useState<string | null>(null);
	const [fileMetadata, setFileMetadata] = useState<{
		name: string;
		size: number;
		type: string;
	} | null>(null);

	const currentFile = watch(field.name);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem(FILE_STORAGE_KEY + field.name);
			if (saved) {
				try {
					const metadata = JSON.parse(saved);
					setFileMetadata(metadata);
					if (metadata.preview) {
						setPreview(metadata.preview);
					}
				} catch (e) {
					// Invalid saved metadata, ignore
				}
			}
		}
	}, [field.name]);

	// Update preview when file changes
	useEffect(() => {
		if (
			currentFile &&
			currentFile instanceof FileList &&
			currentFile.length > 0
		) {
			const file = currentFile[0];
			const metadata = {
				name: file.name,
				size: file.size,
				type: file.type,
			};
			setFileMetadata(metadata);

			// Generate preview for images
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onloadend = () => {
					const result = reader.result as string;
					setPreview(result);
					// Save to localStorage
					if (typeof window !== 'undefined') {
						localStorage.setItem(
							FILE_STORAGE_KEY + field.name,
							JSON.stringify({ ...metadata, preview: result })
						);
					}
				};
				reader.readAsDataURL(file);
			} else {
				setPreview(null);
				// Save metadata without preview
				if (typeof window !== 'undefined') {
					localStorage.setItem(
						FILE_STORAGE_KEY + field.name,
						JSON.stringify(metadata)
					);
				}
			}
		}
	}, [currentFile, field.name]);

	const handleRemove = () => {
		setPreview(null);
		setFileMetadata(null);
		setValue(field.name, null);
		if (typeof window !== 'undefined') {
			localStorage.removeItem(FILE_STORAGE_KEY + field.name);
		}
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	};

	return (
		<div
			className={`flex flex-col ${
				field.gridSpan === 2 ? 'col-span-2' : 'col-span-2 md:col-span-1'
			}`}>
			<label
				htmlFor={field.name}
				className="text-sm font-medium text-offBlack mb-2">
				{field.label}
				{field.required && <span className="text-primaryBlue ml-1">*</span>}
			</label>

			{fileMetadata ? (
				// File preview
				<div className="relative rounded-lg border-2 border-gray-300 bg-white overflow-hidden">
					<div className="flex items-center p-3 gap-3">
						{preview ? (
							<div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
								<Image
									src={preview}
									width={500}
									height={500}
									alt="Preview"
									className="w-full h-full object-cover"
								/>
							</div>
						) : (
							<div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
								<svg
									className="w-8 h-8 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
							</div>
						)}
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-offBlack truncate">
								{fileMetadata.name}
							</p>
							<p className="text-xs text-gray-500 mt-0.5">
								{formatFileSize(fileMetadata.size)}
							</p>
						</div>
						<button
							type="button"
							onClick={handleRemove}
							className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			) : (
				// Upload area
				<div className="relative">
					<input
						id={field.name}
						type="file"
						accept={accept}
						disabled={field.disabled}
						{...register(field.name)}
						className="hidden"
					/>
					<label
						htmlFor={field.name}
						className={`
							flex items-center justify-center w-full px-4 py-6 rounded-lg border-2 border-dashed
							transition-all duration-300 cursor-pointer
							${
								field.disabled
									? 'opacity-50 cursor-not-allowed bg-gray-100'
									: 'hover:bg-gray-50 hover:border-primaryBlue'
							}
							${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
						`}>
						<div className="flex flex-col items-center text-center">
							<svg
								className={`w-10 h-10 mb-3 ${
									error ? 'text-red-500' : 'text-gray-400'
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<span className="text-sm text-offBlack mb-1">
								<span className="font-semibold text-primaryBlue">
									Click to upload
								</span>{' '}
								or drag and drop
							</span>
							<span className="text-xs text-gray-500">
								JPG, PNG, PDF, WEBP, HEIC (Max {maxSizeMB}MB)
							</span>
						</div>
					</label>
				</div>
			)}

			{field.helperText && !error && (
				<p className="text-xs text-gray-500 mt-2">{field.helperText}</p>
			)}
			{error && (
				<p className="text-xs text-red-500 mt-2 flex items-center">
					<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					{error.message}
				</p>
			)}
		</div>
	);
};
