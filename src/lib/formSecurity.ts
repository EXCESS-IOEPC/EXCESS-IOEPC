/**
 * Form Security Utilities
 *
 * Provides basic security for form submissions:
 * - XSS prevention through input sanitization
 * - Data preparation for Google Sheets
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: any, isFileData = false): any {
	if (typeof input === 'string') {
		// Don't sanitize base64 data - it needs to stay intact
		if (isFileData) {
			return input;
		}

		// Remove XSS vectors and normalize whitespace
		return input
			.replace(/[<>]/g, '')
			.replace(/javascript:/gi, '')
			.replace(/on\w+\s*=/gi, '')
			.replace(/data:text\/html/gi, '')
			.trim();
	}

	if (Array.isArray(input)) {
		return input.map((item) => sanitizeInput(item, isFileData));
	}

	if (typeof input === 'object' && input !== null) {
		// Check if this is a file object with base64 data
		const isFileObject =
			'base64' in input && 'mimeType' in input && 'name' in input;

		const sanitized: any = {};
		for (const [key, value] of Object.entries(input)) {
			// Don't sanitize base64 data in file objects
			const shouldPreserve = isFileObject && key === 'base64';
			sanitized[key] = sanitizeInput(value, shouldPreserve);
		}
		return sanitized;
	}

	return input;
}

/**
 * Validate that checkbox/select values are from predefined options
 */
export function validatePredefinedOptions(
	value: string | string[],
	allowedOptions: readonly string[]
): boolean {
	if (Array.isArray(value)) {
		return value.every((item) => allowedOptions.includes(item));
	}
	return allowedOptions.includes(value);
}

/**
 * Clean and prepare data for Google Sheets
 */
export function prepareDataForSheets(data: any): any {
	const cleaned = sanitizeInput(data);

	// Prepare data for Google Sheets format
	const prepared: any = {};

	for (const [key, value] of Object.entries(cleaned)) {
		// Skip CSRF token - not needed in sheets
		if (key === 'csrfToken') continue;

		// Handle File/FileList objects - skip them entirely (except for our prepared file objects)
		if (typeof value === 'object' && value !== null) {
			// Check if it's a prepared file object (has base64, mimeType, name properties)
			const isPreparedFile =
				'base64' in value && 'mimeType' in value && 'name' in value;

			if (isPreparedFile) {
				// Keep prepared file objects - they need to be sent to Google Apps Script
				prepared[key] = value;
				continue;
			}

			if (
				(typeof FileList !== 'undefined' && value instanceof FileList) ||
				(typeof File !== 'undefined' && value instanceof File) ||
				('type' in value && 'size' in value && !isPreparedFile)
			) {
				// Skip browser File/FileList objects
				continue;
			}
		}

		// Handle arrays - convert to comma-separated strings
		if (Array.isArray(value)) {
			prepared[key] = value.join(', ');
		}
		// Handle booleans
		else if (typeof value === 'boolean') {
			prepared[key] = value ? 'Yes' : 'No';
		}
		// Handle null/undefined
		else if (value === null || value === undefined) {
			prepared[key] = '';
		}
		// Handle objects (like {0: {}})
		else if (typeof value === 'object') {
			// Skip complex objects that aren't arrays
			continue;
		}
		// Handle regular values
		else {
			prepared[key] = String(value);
		}
	}

	// Add metadata
	prepared.submittedAt = new Date().toISOString();
	prepared.timestamp = new Date().toLocaleString('en-US', {
		timeZone: 'Asia/Kathmandu',
	});

	return prepared;
}

/**
 * Get security headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
	return {
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
		'X-XSS-Protection': '1; mode=block',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
	};
}
