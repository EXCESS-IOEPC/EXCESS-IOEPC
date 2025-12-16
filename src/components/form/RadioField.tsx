'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormFieldProps, FormFieldOption } from '@/src/types/formTypes';

interface RadioFieldProps extends FormFieldProps {
	options: FormFieldOption[];
}

export const RadioField: React.FC<RadioFieldProps> = ({
	field,
	register,
	error,
	options,
}) => {
	return (
		<div
			className={`flex flex-col ${
				field.gridSpan === 2 ? 'col-span-2' : 'col-span-2 md:col-span-1'
			}`}>
			<label className="text-sm font-medium text-offBlack mb-3">
				{field.label}
				{field.required && <span className="text-primaryBlue ml-1">*</span>}
			</label>
			<div className="space-y-2">
				{options.map((option) => (
					<label
						key={option.value}
						className={`
              flex items-center p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
              hover:bg-gray-50 hover:border-gray-300
              ${field.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}>
						<input
							type="radio"
							value={option.value}
							disabled={field.disabled}
							{...register(field.name)}
							className="w-4 h-4 text-primaryBlue border-gray-300 focus:ring-2 focus:ring-primaryBlue/20 cursor-pointer"
						/>
						<span className="ml-2 sm:ml-3 text-xs sm:text-sm text-offBlack">
							{option.label}
						</span>
					</label>
				))}
			</div>
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
