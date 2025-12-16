'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormFieldProps } from '@/src/types/formTypes';

interface DateFieldProps extends FormFieldProps {
	min?: string;
	max?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
	field,
	register,
	error,
	min,
	max,
}) => {
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
			<input
				id={field.name}
				type="date"
				min={min}
				max={max}
				disabled={field.disabled}
				{...register(field.name)}
				className={`
          w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
          bg-white text-offBlack
          focus:outline-none focus:ring-2 focus:ring-primaryBlue/20
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
						error
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-200 hover:border-gray-300 focus:border-primaryBlue'
					}
        `}
			/>
			{field.helperText && !error && (
				<p className="text-xs text-gray-500 mt-1">{field.helperText}</p>
			)}
			{error && (
				<p className="text-xs text-red-500 mt-1 flex items-center">
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
