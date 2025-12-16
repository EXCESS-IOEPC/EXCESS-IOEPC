import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasUserSubmitted, clearUserSubmission } from '@/src/lib/formSecurity';

/**
 * GET Submission Status
 * Check if the current user has already submitted the form
 */
export async function GET(request: NextRequest) {
	try {
		// Get user identifier
		const forwarded = request.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
		const userAgent = request.headers.get('user-agent') || 'unknown';
		const identifier = `${ip}-${userAgent}`;

		const status = hasUserSubmitted(identifier);

		return NextResponse.json({
			success: true,
			...status,
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to check submission status',
			},
			{ status: 500 }
		);
	}
}

/**
 * DELETE Submission Status
 * Clear the submission status to allow "Submit Another Response"
 */
export async function DELETE(request: NextRequest) {
	try {
		// Get user identifier
		const forwarded = request.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
		const userAgent = request.headers.get('user-agent') || 'unknown';
		const identifier = `${ip}-${userAgent}`;

		clearUserSubmission(identifier);

		return NextResponse.json({
			success: true,
			message:
				'Submission status cleared. You can now submit another response.',
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to clear submission status',
			},
			{ status: 500 }
		);
	}
}
