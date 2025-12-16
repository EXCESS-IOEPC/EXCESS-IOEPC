import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/src/lib/formSecurity';

/**
 * GET CSRF Token
 * Generates a new CSRF token for form protection
 */
export async function GET() {
	try {
		const csrfToken = generateCsrfToken();

		return NextResponse.json({
			success: true,
			csrfToken,
		});
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
