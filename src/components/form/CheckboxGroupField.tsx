'use client';

import React, { useState } from 'react';
import {
	UseFormRegister,
	FieldError,
	useWatch,
	Control,
} from 'react-hook-form';
import { FormFieldProps, FormFieldOption } from '@/src/types/formTypes';

interface CheckboxGroupFieldProps extends FormFieldProps {
	options: FormFieldOption[];
	minSelections?: number;
	maxSelections?: number;
	control: Control<any>;
}

export const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
	field,
	register,
	error,
	options,
	minSelections,
	maxSelections,
	control,
}) => {
	const selectedValues =
		useWatch({
			control,
			name: field.name,
			defaultValue: [],
		}) || [];

	const isMaxReached = maxSelections
		? selectedValues.length >= maxSelections
		: false;

	return (
		<div
			className={`flex flex-col ${
				field.gridSpan === 2 ? 'col-span-2' : 'col-span-2 md:col-span-1'
			}`}>
			<label className="text-sm font-medium text-offBlack mb-3">
				{field.label}
				{field.required && <span className="text-primaryBlue ml-1">*</span>}
			</label>
			{field.helperText && (
				<p className="text-xs text-gray-500 mb-2">{field.helperText}</p>
			)}
			{(minSelections || maxSelections) && (
				<p className="text-xs text-gray-600 mb-2">
					{minSelections && maxSelections
						? `Select between ${minSelections} and ${maxSelections} options`
						: minSelections
						? `Select at least ${minSelections} option${
								minSelections > 1 ? 's' : ''
						  }`
						: `Select up to ${maxSelections} options`}
					{maxSelections && (
						<span
							className={`ml-2 ${
								isMaxReached ? 'text-red-500 font-medium' : 'text-primaryBlue'
							}`}>
							({selectedValues.length}/{maxSelections})
						</span>
					)}
				</p>
			)}
			<div className="space-y-2">
				{options.map((option) => {
					const isChecked = selectedValues.includes(option.value);
					const isDisabled = field.disabled || (isMaxReached && !isChecked);

					return (
						<label
							key={option.value}
							className={`
                flex items-center p-3 rounded-lg border-2 transition-all duration-200
                ${
									isDisabled
										? 'opacity-50 cursor-not-allowed bg-gray-50'
										: 'cursor-pointer hover:bg-gray-50 hover:border-gray-300'
								}
                ${
									isChecked
										? 'border-primaryBlue bg-blue-50'
										: 'border-gray-200'
								}
              `}>
							<input
								type="checkbox"
								value={option.value}
								disabled={isDisabled}
								{...register(field.name)}
								className="w-4 h-4 text-primaryBlue border-gray-300 rounded focus:ring-2 focus:ring-primaryBlue/20 cursor-pointer disabled:cursor-not-allowed"
							/>
							<span className="ml-3 text-sm text-offBlack">{option.label}</span>
						</label>
					);
				})}
			</div>
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
