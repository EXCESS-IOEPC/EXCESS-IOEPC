'use client';

import React, { useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormFieldProps } from '@/src/types/formTypes';

interface TextareaFieldProps extends FormFieldProps {
	rows?: number;
	maxLength?: number;
	showCharCount?: boolean;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
	field,
	register,
	error,
	rows = 4,
	maxLength,
	showCharCount = true,
	value,
}) => {
	const [charCount, setCharCount] = useState(0);

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
			<textarea
				id={field.name}
				rows={rows}
				placeholder={field.placeholder}
				maxLength={maxLength}
				disabled={field.disabled}
				{...register(field.name, {
					onChange: (e) => {
						if (showCharCount && maxLength) {
							setCharCount(e.target.value.length);
						}
					},
				})}
				className={`
          w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 transition-all duration-300
          bg-white text-offBlack placeholder-gray-400 resize-none text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-primaryBlue/20
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
						error
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-200 hover:border-gray-300 focus:border-primaryBlue'
					}
        `}
			/>
			<div className="flex justify-between items-start mt-1">
				<div className="flex-1">
					{field.helperText && !error && (
						<p className="text-xs text-gray-500">{field.helperText}</p>
					)}
					{error && (
						<p className="text-xs text-red-500 flex items-center">
							<svg
								className="w-3 h-3 mr-1 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20">
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
				{showCharCount && maxLength && (
					<p
						className={`text-xs ml-2 flex-shrink-0 ${
							charCount > maxLength * 0.9 ? 'text-red-500' : 'text-gray-400'
						}`}>
						{charCount}/{maxLength}
					</p>
				)}
			</div>
		</div>
	);
};
