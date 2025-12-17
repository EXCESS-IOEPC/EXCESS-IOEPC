import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * Generate CSRF token with HMAC signature
 */
function generateCsrfToken(): string {
	const secret =
		process.env.CSRF_SECRET || 'default-secret-change-in-production';
	const timestamp = Date.now().toString(36);
	const randomBytes = crypto.randomBytes(32).toString('hex');

	// Create HMAC signature
	const hmac = crypto.createHmac('sha256', secret);
	hmac.update(`${timestamp}.${randomBytes}`);
	const signature = hmac.digest('hex');

	return `${timestamp}.${randomBytes}.${signature}`;
}

/**
 * GET CSRF Token
 * Generates a new CSRF token for form protection with cookie
 */
export async function GET(request: NextRequest) {
	try {
		// Generate token
		const token = generateCsrfToken();

		const response = NextResponse.json({
			success: true,
			csrfToken: token,
		});

		// Set the CSRF cookie for double-submit pattern
		response.cookies.set('excess-csrf', token, {
			sameSite: 'lax',
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 60 * 60, // 1 hour
		});

		return response;
	} catch (error) {
		console.error('CSRF token generation error:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to generate security token',
			},
			{ status: 500 }
		);
	}
}
