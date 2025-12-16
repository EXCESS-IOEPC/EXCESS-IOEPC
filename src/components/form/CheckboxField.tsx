'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormFieldProps } from '@/src/types/formTypes';

interface CheckboxFieldProps extends FormFieldProps {
	checkboxLabel?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
	field,
	register,
	error,
	checkboxLabel,
}) => {
	return (
		<div
			className={`flex flex-col ${
				field.gridSpan === 2 ? 'col-span-2' : 'col-span-2 md:col-span-1'
			}`}>
		<label
			className={`
          flex items-start p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
          hover:bg-gray-50 hover:border-gray-300
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}
          ${field.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
				<input
					type="checkbox"
					disabled={field.disabled}
					{...register(field.name)}
					className="w-5 h-5 text-primaryBlue border-gray-300 rounded focus:ring-2 focus:ring-primaryBlue/20 cursor-pointer mt-0.5 flex-shrink-0"
				/>
			<div className="ml-2 sm:ml-3 flex-1">
				<span className="text-xs sm:text-sm text-offBlack">
						{checkboxLabel || field.label}
						{field.required && <span className="text-primaryBlue ml-1">*</span>}
					</span>
					{field.helperText && !error && (
						<p className="text-xs text-gray-500 mt-1">{field.helperText}</p>
					)}
				</div>
			</label>
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
