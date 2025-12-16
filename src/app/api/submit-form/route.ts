import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';
import {
	checkRateLimit,
	sanitizeInput,
	prepareDataForSheets,
	markUserSubmitted,
	hasUserSubmitted,
} from '@/src/lib/formSecurity';

/**
 * Verify CSRF token with HMAC signature
 */
function verifyCsrfToken(token: string, cookie: string): boolean {
	if (!token || !cookie || token !== cookie) return false;

	const parts = token.split('.');
	if (parts.length !== 3) return false;

	const [timestampStr, randomStr, receivedSignature] = parts;

	// Verify timestamp (not expired - 1 hour)
	const timestamp = parseInt(timestampStr, 36);
	if (isNaN(timestamp)) return false;

	const now = Date.now();
	const maxAge = 60 * 60 * 1000; // 1 hour
	if (now - timestamp > maxAge) return false;

	// Verify HMAC signature
	const secret =
		process.env.CSRF_SECRET || 'default-secret-change-in-production';
	const hmac = crypto.createHmac('sha256', secret);
	hmac.update(`${timestampStr}.${randomStr}`);
	const expectedSignature = hmac.digest('hex');

	// Constant-time comparison
	try {
		return crypto.timingSafeEqual(
			Buffer.from(receivedSignature),
			Buffer.from(expectedSignature)
		);
	} catch {
		return false;
	}
}

export async function POST(request: NextRequest) {
	try {
		// Get user identifier for rate limiting and submission tracking
		const forwarded = request.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
		const userAgent = request.headers.get('user-agent') || 'unknown';
		const identifier = `${ip}-${userAgent}`;

		// Parse request body
		const rawData = await request.json();

		// Verify CSRF token with cookie validation
		const csrfToken = rawData.csrfToken;
		const csrfCookie = request.cookies.get('__Host.excess-csrf')?.value;

		if (!csrfToken || !csrfCookie) {
			return NextResponse.json(
				{
					success: false,
					error:
						'Missing security token. Please refresh the page and try again.',
				},
				{ status: 403 }
			);
		}

		// Validate CSRF token against cookie
		if (!verifyCsrfToken(csrfToken, csrfCookie)) {
			return NextResponse.json(
				{
					success: false,
					error:
						'Invalid or expired security token. Please refresh the page and try again.',
				},
				{ status: 403 }
			);
		}

		// Check if user has already submitted
		const submissionStatus = hasUserSubmitted(identifier);
		if (submissionStatus.submitted) {
			return NextResponse.json(
				{
					success: false,
					error:
						'You have already submitted a response. Please use "Submit Another Response" if you need to submit again.',
					alreadySubmitted: true,
					submissionId: submissionStatus.submissionId,
				},
				{ status: 409 }
			);
		}

		// Check rate limit
		const rateLimitCheck = checkRateLimit(identifier);
		if (!rateLimitCheck.allowed) {
			return NextResponse.json(
				{
					success: false,
					error: `Too many submissions. Please try again in ${rateLimitCheck.remainingTime} minutes.`,
				},
				{ status: 429 }
			);
		}

		// Sanitize input
		const sanitizedData = sanitizeInput(rawData);

		// Prepare data for Google Sheets
		const sheetsData = prepareDataForSheets(sanitizedData);

		const sheetsResponse = await sendToGoogleSheets(sheetsData);
		if (!sheetsResponse.success) {
			throw new Error(
				sheetsResponse.error || 'Failed to save to Google Sheets'
			);
		}

		// Generate submission ID and mark user as submitted
		const submissionId = generateSubmissionId();
		markUserSubmitted(identifier, submissionId);

		// Send success response
		return NextResponse.json({
			success: true,
			message:
				'Registration submitted successfully! You will receive a confirmation email shortly.',
			submissionId,
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Form submission error:', error);
		}
		return NextResponse.json(
			{
				success: false,
				error:
					'An error occurred while processing your submission. Please try again later.',
			},
			{ status: 500 }
		);
	}
}

/**
 * Generate a unique submission ID
 */
function generateSubmissionId(): string {
	const timestamp = Date.now().toString(36);
	const randomStr = Math.random().toString(36).substring(2, 9);
	return `SUB-${timestamp}-${randomStr}`.toUpperCase();
}

async function sendToGoogleSheets(
	data: any
): Promise<{ success: boolean; error?: string; rowNumber?: number }> {
	try {
		const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

		if (!scriptUrl) {
			return {
				success: false,
				error: 'Google Sheets integration not configured',
			};
		}

		// Send data to Google Apps Script
		const response = await fetch(scriptUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Google Apps Script returned ${response.status}: ${errorText}`
			);
		}

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.message || 'Failed to save to Google Sheets');
		}

		return {
			success: true,
			rowNumber: result.rowNumber,
		};
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to send data to Google Sheets:', error);
		}
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

// Prevent GET requests
export async function GET() {
	return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
