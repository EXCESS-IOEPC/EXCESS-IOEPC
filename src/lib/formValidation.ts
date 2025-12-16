import { z } from 'zod';

// Custom validation for Nepalese phone numbers
export const nepalesePhoneValidator = z.string().refine(
	(val) => {
		// Nepal phone: starts with 98 or 97 and has 10 digits total
		const phoneRegex = /^(98|97)\d{8}$/;
		return phoneRegex.test(val);
	},
	{
		message:
			'Please enter a valid Nepalese phone number (98XXXXXXXX or 97XXXXXXXX)',
	}
);

// Email validation with strict checking
export const emailValidator = z
	.string()
	.min(1, 'Email is required')
	.email('Please enter a valid email address')
	.refine(
		(email) => {
			// Additional validation: must have proper domain
			const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			return emailRegex.test(email);
		},
		{
			message: 'Email must have a valid domain',
		}
	);

// Text field with character limit
export const textWithLimit = (maxChars: number, fieldName: string = 'Field') =>
	z
		.string()
		.min(1, `${fieldName} is required`)
		.max(maxChars, `${fieldName} must not exceed ${maxChars} characters`);

// Paragraph with character limit
export const paragraphWithLimit = (
	minChars: number = 10,
	maxChars: number = 500,
	fieldName: string = 'Description'
) =>
	z
		.string()
		.min(minChars, `${fieldName} must be at least ${minChars} characters`)
		.max(maxChars, `${fieldName} must not exceed ${maxChars} characters`);

// Dropdown/Select validation with predefined options
export const selectValidator = (
	options: readonly string[],
	fieldName: string = 'Selection'
) =>
	z.string().refine((val) => options.includes(val), {
		message: `Please select a valid ${fieldName.toLowerCase()}`,
	});

// Checkbox group validation
export const checkboxGroupValidator = (
	validOptions: readonly string[],
	minSelections: number = 0,
	maxSelections?: number
) =>
	z
		.array(z.string())
		.refine(
			(items) => {
				// Check if all items are valid options
				return items.every((item) => validOptions.includes(item));
			},
			{
				message:
					'Invalid selection detected. Please select from the available options only.',
			}
		)
		.refine((items) => items.length >= minSelections, {
			message: `Please select at least ${minSelections} option${
				minSelections > 1 ? 's' : ''
			}`,
		})
		.refine((items) => !maxSelections || items.length <= maxSelections, {
			message: `Please select no more than ${maxSelections} options`,
		});

// Terms and conditions validator
export const termsValidator = z.boolean().refine((val) => val === true, {
	message: 'You must accept the terms and conditions to proceed',
});

// Full name validator
export const fullNameValidator = z
	.string()
	.min(2, 'Name must be at least 2 characters')
	.max(100, 'Name must not exceed 100 characters')
	.refine(
		(name) => {
			// Must contain only letters, spaces, and common name characters
			const nameRegex = /^[a-zA-Z\s'-]+$/;
			return nameRegex.test(name);
		},
		{
			message:
				'Name can only contain letters, spaces, hyphens, and apostrophes',
		}
	);

// College/Institution validator
export const collegeValidator = z
	.string()
	.min(2, 'College/Institution name is required')
	.max(200, 'College/Institution name is too long');

// Year/Semester validator
export const yearValidator = z.string().refine(
	(val) => {
		const validYears = [
			'1st Year',
			'2nd Year',
			'3rd Year',
			'4th Year',
			'Graduate',
			'Other',
		];
		return validYears.includes(val);
	},
	{
		message: 'Please select a valid year',
	}
);

// URL validator (for social media links, etc.)
export const urlValidator = (optional: boolean = true) => {
	const schema = z.string().url('Please enter a valid URL');
	return optional ? schema.optional().or(z.literal('')) : schema;
};

// Date validator (for event dates, DOB, etc.)
export const dateValidator = (
	futureOnly: boolean = false,
	pastOnly: boolean = false
) => {
	let schema = z.string().refine(
		(val) => {
			const date = new Date(val);
			return !isNaN(date.getTime());
		},
		{
			message: 'Please enter a valid date',
		}
	);

	if (futureOnly) {
		schema = schema.refine(
			(val) => {
				const date = new Date(val);
				return date > new Date();
			},
			{
				message: 'Date must be in the future',
			}
		);
	}

	if (pastOnly) {
		schema = schema.refine(
			(val) => {
				const date = new Date(val);
				return date < new Date();
			},
			{
				message: 'Date must be in the past',
			}
		);
	}

	return schema;
};

// File upload validator
export const fileValidator = (
	maxSizeMB: number = 5,
	allowedTypes: string[] = [
		'image/jpeg',
		'image/png',
		'image/jpg',
		'application/pdf',
	]
) =>
	z
		.any()
		.optional()
		.refine(
			(files) => {
				if (!files) return true;
				// Handle FileList in browser
				if (typeof FileList !== 'undefined' && files instanceof FileList) {
					if (files.length === 0) return true;
					return files[0].size <= maxSizeMB * 1024 * 1024;
				}
				// Handle File object
				if (typeof File !== 'undefined' && files instanceof File) {
					return files.size <= maxSizeMB * 1024 * 1024;
				}
				return true;
			},
			{
				message: `File size must not exceed ${maxSizeMB}MB`,
			}
		)
		.refine(
			(files) => {
				if (!files) return true;
				// Handle FileList in browser
				if (typeof FileList !== 'undefined' && files instanceof FileList) {
					if (files.length === 0) return true;
					return allowedTypes.includes(files[0].type);
				}
				// Handle File object
				if (typeof File !== 'undefined' && files instanceof File) {
					return allowedTypes.includes(files.type);
				}
				return true;
			},
			{
				message: `File type must be one of: ${allowedTypes.join(', ')}`,
			}
		);
