import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormFieldType =
	| 'text'
	| 'email'
	| 'phone'
	| 'textarea'
	| 'select'
	| 'radio'
	| 'checkbox'
	| 'checkboxGroup'
	| 'date'
	| 'file'
	| 'url';

export interface FormFieldOption {
	label: string;
	value: string;
}

export interface BaseFormField {
	name: string;
	label: string;
	type: FormFieldType;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	helperText?: string;
	gridSpan?: 1 | 2; // For responsive grid layout (1 = half width, 2 = full width)
}

export interface TextFormField extends BaseFormField {
	type: 'text' | 'email' | 'url';
	maxLength?: number;
}

export interface PhoneFormField extends BaseFormField {
	type: 'phone';
}

export interface TextareaFormField extends BaseFormField {
	type: 'textarea';
	rows?: number;
	maxLength?: number;
	showCharCount?: boolean;
}

export interface SelectFormField extends BaseFormField {
	type: 'select' | 'radio';
	options: FormFieldOption[];
}

export interface CheckboxFormField extends BaseFormField {
	type: 'checkbox';
	checkboxLabel?: string;
}

export interface CheckboxGroupFormField extends BaseFormField {
	type: 'checkboxGroup';
	options: FormFieldOption[];
	minSelections?: number;
	maxSelections?: number;
}

export interface DateFormField extends BaseFormField {
	type: 'date';
	min?: string;
	max?: string;
}

export interface FileFormField extends BaseFormField {
	type: 'file';
	accept?: string;
	maxSizeMB?: number;
}

export type FormField =
	| TextFormField
	| PhoneFormField
	| TextareaFormField
	| SelectFormField
	| CheckboxFormField
	| CheckboxGroupFormField
	| DateFormField
	| FileFormField;

export interface FormSection {
	id: string;
	title: string;
	description?: string;
	fields: FormField[];
}

export interface FormConfig {
	title: string;
	description?: string;
	sections: FormSection[];
	submitButtonText?: string;
	showProgressBar?: boolean;
	allowSaveProgress?: boolean;
}

export interface FormFieldProps {
	field: FormField;
	register: UseFormRegister<any>;
	error?: FieldError;
	value?: any;
	onChange?: (value: any) => void;
}
