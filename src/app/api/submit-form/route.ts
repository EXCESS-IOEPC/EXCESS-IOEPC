import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sanitizeInput, prepareDataForSheets } from '@/src/lib/formSecurity';

export async function POST(request: NextRequest) {
	try {
		// Parse request body
		const rawData = await request.json();

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

		// Send success response
		return NextResponse.json({
			success: true,
			message: 'Registration submitted successfully!',
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
