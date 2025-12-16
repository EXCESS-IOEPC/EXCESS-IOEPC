import { z } from 'zod';
import { FormConfig } from '@/src/types/formTypes';
import {
	emailValidator,
	nepalesePhoneValidator,
	fullNameValidator,
	selectValidator,
	textWithLimit,
	paragraphWithLimit,
	checkboxGroupValidator,
	termsValidator,
	fileValidator,
} from '@/src/lib/formValidation';

// Predefined options for security - users cannot add custom values
const YEAR_OPTIONS = [
	'1st Year',
	'2nd Year',
	'3rd Year',
	'4th Year',
	'Graduate',
	'Other',
] as const;

const FACULTY_OPTIONS = [
	'Electronics, Communication and Information Engineering',
	'Electrical Engineering',
	'Civil Engineering',
	'Computer Engineering',
	'Mechanical Engineering',
	'Agricultural Engineering',
	'Architecture',
	'Other',
] as const;

const SEMESTER_OPTIONS = [
	'1st Semester',
	'2nd Semester',
	'3rd Semester',
	'4th Semester',
	'5th Semester',
	'6th Semester',
	'7th Semester',
	'8th Semester',
	'Other',
] as const;

const PYTHON_EXPERIENCE = [
	'No Experience',
	'Beginner (Basic syntax and concepts)',
	'Intermediate (Can write scripts and programs)',
	'Advanced (Proficient with libraries and frameworks)',
	'Expert (Professional level)',
] as const;

const MICROCONTROLLER_OPTIONS = [
	'Arduino',
	'ESP32/ESP8266',
	'Raspberry Pi',
	'STM32',
	'PIC Microcontroller',
	'ATmega',
	'NodeMCU',
	'None - No prior experience',
] as const;

const LINUX_FAMILIARITY = [
	'No Experience',
	'Beginner (Basic commands)',
	'Intermediate (Comfortable with terminal)',
	'Advanced (System administration)',
	'Expert (Professional level)',
] as const;

const SESSION_PREFERENCES = ['Morning Session', 'Evening Session'] as const;

// Validation Schema
export const eventRegistrationSchema = z.object({
	// Personal Information
	fullName: fullNameValidator,
	email: emailValidator,
	phone: nepalesePhoneValidator,
	contactInfo: textWithLimit(500, 'Contact Information'),
	addressInfo: textWithLimit(100, 'Address Information'),

	// Academic Information
	yearOfStudy: selectValidator(YEAR_OPTIONS, 'Year of Study'),
	semester: selectValidator(SEMESTER_OPTIONS, 'Semester'),
	faculty: selectValidator(FACULTY_OPTIONS, 'Faculty'),

	// Technical Background
	pythonExperience: selectValidator(PYTHON_EXPERIENCE, 'Python Experience'),
	microcontrollerExperience: checkboxGroupValidator(
		MICROCONTROLLER_OPTIONS,
		1,
		8
	),
	linuxFamiliarity: selectValidator(LINUX_FAMILIARITY, 'Linux Familiarity'),
	iotProjectExperience: paragraphWithLimit(0, 500, 'IoT Project Experience'),

	//Expectations and Improvements
	expectations: paragraphWithLimit(300, 1500, 'Expectations'),
	improvementSuggestions: paragraphWithLimit(20, 500, 'Improvement Suggestions')
		.optional()
		.or(z.literal('')),
	sessionPreference: selectValidator(SESSION_PREFERENCES, 'Session Preference'),

	// File Uploads
	paymentScreenshot: fileValidator(5, [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/webp',
		'image/heic',
		'image/heif',
		'application/pdf',
	]),
	transactionCode: textWithLimit(100, 'Transaction Code'),
	membershipCard: fileValidator(5, [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/webp',
		'image/heic',
		'image/heif',
		'application/pdf',
	]),

	// Terms and Conditions
	agreeToCodeOfConduct: termsValidator,
});

export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;

// Form Configuration
export const eventRegistrationConfig: FormConfig = {
	title: 'IoT with Raspberry Pi Training',
	description:
		'Register for the IoT with Raspberry Pi Training program. All fields marked with * are required.',
	showProgressBar: true,
	allowSaveProgress: false,
	submitButtonText: 'Complete Registration',

	sections: [
		{
			id: 'personal-info',
			title: 'Personal Information',
			description: 'Tell us about yourself',
			fields: [
				{
					name: 'fullName',
					label: 'Full Name',
					type: 'text',
					placeholder: 'Enter your full name',
					required: true,
					gridSpan: 2,
					helperText: 'As per your official documents',
				},
				{
					name: 'email',
					label: 'Email Address',
					type: 'email',
					placeholder: 'your.email@example.com',
					required: true,
					gridSpan: 1,
					helperText: 'We will send confirmation to this email',
				},
				{
					name: 'phone',
					label: 'Phone Number',
					type: 'phone',
					placeholder: '98XXXXXXXX',
					required: true,
					gridSpan: 1,
					helperText: 'Nepalese phone number (98XXXXXXXX or 97XXXXXXXX)',
				},
				{
					name: 'contactInfo',
					label:
						'Contact Information (LinkedIn, GitHub, Facebook, Instagram, etc.)',
					type: 'textarea',
					placeholder:
						'LinkedIn: https://linkedin.com/in/yourprofile\nGitHub: https://github.com/yourusername\nFacebook: https://facebook.com/yourprofile',
					required: true,
					rows: 4,
					maxLength: 500,
					showCharCount: true,
					gridSpan: 2,
					helperText:
						'Provide links to your professional and social media profiles (one per line)',
				},
				{
					name: 'addressInfo',
					label: 'Address Information',
					type: 'textarea',
					placeholder: 'Your current address.',
					required: true,
					rows: 2,
					maxLength: 100,
					showCharCount: true,
					gridSpan: 2,
					helperText:
						'Provide from where would you commute to the training venue.',
				},
			],
		},
		{
			id: 'academic-info',
			title: 'Academic Information',
			description: 'Your educational background',
			fields: [
				{
					name: 'yearOfStudy',
					label: 'Year of Study',
					type: 'select',
					required: true,
					gridSpan: 1,
					options: YEAR_OPTIONS.map((year) => ({ label: year, value: year })),
					helperText: 'Select your current year of study',
				},
				{
					name: 'semester',
					label: 'Semester',
					type: 'select',
					required: true,
					gridSpan: 1,
					options: SEMESTER_OPTIONS.map((semester) => ({
						label: semester,
						value: semester,
					})),
					helperText: 'Select your current semester',
				},
				{
					name: 'faculty',
					label: 'Faculty/Department',
					type: 'select',
					required: true,
					gridSpan: 1,
					options: FACULTY_OPTIONS.map((faculty) => ({
						label: faculty,
						value: faculty,
					})),
					helperText: 'Select your faculty or department',
				},
			],
		},
		{
			id: 'technical-background',
			title: 'Technical Background',
			description: 'Help us understand your technical skills',
			fields: [
				{
					name: 'pythonExperience',
					label: 'Rate your Experience with Python Programming',
					type: 'radio',
					required: true,
					gridSpan: 2,
					helperText:
						'Select the level that best describes your Python experience',
					options: PYTHON_EXPERIENCE.map((level) => ({
						label: level,
						value: level,
					})),
				},
				{
					name: 'microcontrollerExperience',
					label:
						"Have you worked with microcontrollers before? If yes, check the ones that you've used.",
					type: 'checkboxGroup',
					required: true,
					gridSpan: 2,
					helperText:
						'Select all microcontrollers you have experience with (select "None" if no experience)',
					minSelections: 1,
					maxSelections: 8,
					options: MICROCONTROLLER_OPTIONS.map((mc) => ({
						label: mc,
						value: mc,
					})),
				},
				{
					name: 'linuxFamiliarity',
					label:
						'Rate your Familiarity with Linux Environment or with Shell/Terminal/Bash',
					type: 'radio',
					required: true,
					gridSpan: 2,
					helperText:
						'How comfortable are you with Linux command line and terminal?',
					options: LINUX_FAMILIARITY.map((level) => ({
						label: level,
						value: level,
					})),
				},
				{
					name: 'iotProjectExperience',
					label:
						'Have you done any projects with Microcontroller or IoT Related Projects? Explain.',
					type: 'textarea',
					placeholder:
						'Describe your IoT or microcontroller projects in detail. If no prior experience, write "None" and explain what you hope to build.',
					required: false,
					rows: 6,
					maxLength: 500,
					showCharCount: true,
					gridSpan: 2,
					helperText:
						'Share details about your projects, technologies used, and outcomes',
				},
			],
		},
		{
			id: 'expectations-improvements',
			title: 'Expectations and Improvements',
			description: 'Tell us why you want to join this training',
			fields: [
				{
					name: 'expectations',
					label:
						'What do you expect to learn or achieve from this training? (minimum 400 words)',
					type: 'textarea',
					placeholder:
						'Describe in detail what you hope to learn, skills you want to develop, projects you want to build, and how this training will help your growth...',
					required: true,
					rows: 10,
					maxLength: 1500,
					showCharCount: true,
					gridSpan: 2,
					helperText:
						'Minimum 300 words - provide detailed expectations and learning goals',
				},
				{
					name: 'improvementSuggestions',
					label:
						'Based on your experience with past trainings, what improvements or support would you expect from the organizing committee to make this training more effective?',
					type: 'textarea',
					placeholder:
						'Share your suggestions for improving the training experience, resources needed, teaching methods, etc.',
					required: false,
					rows: 5,
					maxLength: 1000,
					showCharCount: true,
					gridSpan: 2,
					helperText: 'Optional - Your feedback helps us improve',
				},
				{
					name: 'sessionPreference',
					label:
						'In case of multiple sessions, which sessions would you prefer?',
					type: 'radio',
					required: true,
					gridSpan: 2,
					helperText: 'Select preferred session timings',
					options: SESSION_PREFERENCES.map((session) => ({
						label: session,
						value: session,
					})),
				},
			],
		},
		{
			id: 'payment-membership',
			title: 'Payment & Membership',
			description:
				'Scan the QR code below to make payment and upload the screenshot',
			fields: [
				{
					name: 'paymentScreenshot',
					label: 'Upload the screenshot of the payment',
					type: 'file',
					required: true,
					gridSpan: 1,
					accept: '.jpg,.jpeg,.png,.pdf,.webp,.heic,.heif',
					maxSizeMB: 5,
					helperText:
						'Upload payment screenshot (JPG, PNG, PDF, WEBP, HEIC - Max 5MB)',
				},
				{
					name: 'transactionCode',
					label: 'Transaction Code',
					type: 'text',
					placeholder: 'Enter your payment transaction code',
					required: true,
					gridSpan: 1,
					maxLength: 100,
					helperText: 'Enter the transaction/reference code from your payment',
				},
				{
					name: 'membershipCard',
					label: 'Upload the image of Membership Card',
					type: 'file',
					required: false,
					gridSpan: 2,
					accept: '.jpg,.jpeg,.png,.pdf,.webp,.heic,.heif',
					maxSizeMB: 5,
					helperText:
						'Upload your membership card image (JPG, PNG, PDF, WEBP, HEIC - Max 5MB)',
				},
			],
		},
		{
			id: 'code-of-conduct',
			title: 'Code of Conduct',
			description: 'Please review and accept the code of conduct',
			fields: [
				{
					name: 'agreeToCodeOfConduct',
					label: 'Code of Conduct of IoT with Raspberry Pi Training',
					type: 'checkbox',
					required: true,
					gridSpan: 2,
					checkboxLabel:
						'I have read and agree to abide by the Code of Conduct for the IoT with Raspberry Pi Training. I understand that violations may result in removal from the program.',
					helperText:
						'You must accept the Code of Conduct to complete registration',
				},
			],
		},
	],
};
