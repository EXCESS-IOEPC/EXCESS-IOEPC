'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormFieldProps, FormFieldOption } from '@/src/types/formTypes';

interface SelectFieldProps extends FormFieldProps {
	options: FormFieldOption[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
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
			<label
				htmlFor={field.name}
				className="text-sm font-medium text-offBlack mb-2">
				{field.label}
				{field.required && <span className="text-primaryBlue ml-1">*</span>}
			</label>
			<select
				id={field.name}
				disabled={field.disabled}
				{...register(field.name)}
				className={`
          w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 transition-all duration-300
          bg-white text-offBlack text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-primaryBlue/20
          disabled:bg-gray-100 disabled:cursor-not-allowed
          appearance-none cursor-pointer
          ${
						error
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-200 hover:border-gray-300 focus:border-primaryBlue'
					}
        `}
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%233B3C3D' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
					backgroundPosition: 'right 0.5rem center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '1.5em 1.5em',
					paddingRight: '2.5rem',
				}}>
				<option value="">{field.placeholder || 'Select an option'}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
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
