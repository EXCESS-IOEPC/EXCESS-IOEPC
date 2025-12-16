import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { doubleCsrf } from 'csrf-csrf';

// Initialize CSRF protection
const { generateCsrfToken } = doubleCsrf({
	getSecret: () =>
		process.env.CSRF_SECRET || 'default-secret-change-in-production',
	cookieName: '__Host.excess-csrf',
	cookieOptions: {
		sameSite: 'lax',
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
	},
	size: 64,
	getSessionIdentifier: (req: any) => {
		const forwarded =
			req.headers?.get?.('x-forwarded-for') || req.headers?.['x-forwarded-for'];
		const ip = forwarded
			? typeof forwarded === 'string'
				? forwarded.split(',')[0]
				: forwarded
			: 'unknown';
		const userAgent =
			req.headers?.get?.('user-agent') ||
			req.headers?.['user-agent'] ||
			'unknown';
		return `${ip}-${userAgent}`;
	},
});

/**
 * GET CSRF Token
 * Generates a new CSRF token for form protection with cookie
 */
export async function GET(request: NextRequest) {
	try {
		// Generate token with csrf-csrf library
		const token = generateCsrfToken(request as any, {} as any);

		const response = NextResponse.json({
			success: true,
			csrfToken: token,
		});

		// Set the CSRF cookie manually for Next.js
		response.cookies.set('__Host.excess-csrf', token, {
			sameSite: 'lax',
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 60 * 60, // 1 hour
		});

		return response;
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to generate security token',
			},
			{ status: 500 }
		);
	}
}
