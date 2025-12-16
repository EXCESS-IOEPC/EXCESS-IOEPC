/**
 * Form Security Utilities
 * 
 * Provides security measures for form submissions:
 * - Rate limiting to prevent spam (in-memory, use Redis in production)
 * - XSS prevention through input sanitization
 * - CSRF token generation and validation
 * - Submission tracking to prevent duplicates
 * 
 * PRODUCTION NOTE: Replace in-memory Maps with Redis or database
 * for persistent rate limiting and submission tracking across server restarts.
 */

// In-memory rate limiter (use Redis in production)
const submissionTracker = new Map<
	string,
	{ count: number; resetTime: number }
>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Maximum 3 submissions per hour per IP/identifier

/**
 * Check if user has exceeded rate limit
 */
export function checkRateLimit(identifier: string): {
	allowed: boolean;
	remainingTime?: number;
} {
	const now = Date.now();
	const userRecord = submissionTracker.get(identifier);

	if (!userRecord || now > userRecord.resetTime) {
		// Reset or create new record
		submissionTracker.set(identifier, {
			count: 1,
			resetTime: now + RATE_LIMIT_WINDOW,
		});
		return { allowed: true };
	}

	if (userRecord.count >= MAX_SUBMISSIONS_PER_WINDOW) {
		const remainingTime = Math.ceil((userRecord.resetTime - now) / 1000 / 60); // minutes
		return { allowed: false, remainingTime };
	}

	userRecord.count += 1;
	return { allowed: true };
}

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
 * Generate a simple fingerprint for rate limiting
 * In production, combine with IP address from request headers
 */
export function generateUserFingerprint(): string {
	// Browser fingerprint (basic - for production use a library like FingerprintJS)
	const nav = typeof navigator !== 'undefined' ? navigator : null;
	const screen = typeof window !== 'undefined' ? window.screen : null;

	const fingerprint = [
		nav?.userAgent || '',
		nav?.language || '',
		screen?.colorDepth || '',
		screen?.width || '',
		screen?.height || '',
		new Date().getTimezoneOffset(),
	].join('|');

	// Simple hash function
	let hash = 0;
	for (let i = 0; i < fingerprint.length; i++) {
		const char = fingerprint.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}

	return Math.abs(hash).toString(36);
}

/**
 * Validate email domain (optional extra security)
 */
export function isValidEmailDomain(
	email: string,
	allowedDomains?: string[]
): boolean {
	if (!allowedDomains || allowedDomains.length === 0) return true;

	const domain = email.split('@')[1]?.toLowerCase();
	return allowedDomains.some((allowed) => domain === allowed.toLowerCase());
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

// Store submitted users (in production, use Redis or database)
const submittedUsers = new Map<
	string,
	{ submittedAt: number; submissionId: string }
>();

/**
 * Generate CSRF token for form protection
 */
export function generateCsrfToken(): string {
	const timestamp = Date.now().toString(36);
	const randomBytes = crypto.getRandomValues(new Uint8Array(32));
	const randomStr = Array.from(randomBytes, (byte) =>
		byte.toString(16).padStart(2, '0')
	).join('');
	return `${timestamp}.${randomStr}`;
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(
	token: string,
	maxAge: number = 3600000
): boolean {
	if (!token) return false;

	const parts = token.split('.');
	if (parts.length !== 2) return false;

	const timestamp = parseInt(parts[0], 36);
	if (isNaN(timestamp)) return false;

	// Check if token is expired (default 1 hour)
	const now = Date.now();
	if (now - timestamp > maxAge) return false;

	return true;
}

/**
 * Mark user as submitted
 */
export function markUserSubmitted(
	identifier: string,
	submissionId: string
): void {
	submittedUsers.set(identifier, {
		submittedAt: Date.now(),
		submissionId,
	});
}

/**
 * Check if user has already submitted
 */
export function hasUserSubmitted(identifier: string): {
	submitted: boolean;
	submissionId?: string;
	submittedAt?: number;
} {
	const submission = submittedUsers.get(identifier);
	if (!submission) {
		return { submitted: false };
	}

	return {
		submitted: true,
		submissionId: submission.submissionId,
		submittedAt: submission.submittedAt,
	};
}

/**
 * Clear user submission status (for "submit another response")
 */
export function clearUserSubmission(identifier: string): void {
	submittedUsers.delete(identifier);
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
