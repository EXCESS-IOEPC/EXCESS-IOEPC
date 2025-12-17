import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sanitizeInput, prepareDataForSheets } from '@/src/lib/formSecurity';

export async function POST(request: NextRequest) {
	try {
		// Parse request body
		let rawData;
		try {
			rawData = await request.json();
		} catch (parseError) {
			if (process.env.NODE_ENV === 'development') {
				console.error('JSON Parse Error:', parseError);
			}
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid request data. Please try again.',
				},
				{ status: 400 }
			);
		}

		// Sanitize input
		const sanitizedData = sanitizeInput(rawData);

		if (process.env.NODE_ENV === 'development') {
			console.log('Sanitized Data:', JSON.stringify(sanitizedData, null, 2));
		}

		// Prepare data for Google Sheets
		const sheetsData = prepareDataForSheets(sanitizedData);

		if (process.env.NODE_ENV === 'development') {
			console.log('Sheets Data:', JSON.stringify(sheetsData, null, 2));
		}
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
					error instanceof Error
						? error.message
						: 'An error occurred while processing your submission. Please try again later.',
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
			if (process.env.NODE_ENV === 'development') {
				console.error('Google Apps Script Error Response:', errorText);
			}
			throw new Error(
				`Google Apps Script returned ${response.status}: ${errorText.substring(
					0,
					200
				)}`
			);
		}

		let result;
		try {
			const responseText = await response.text();
			if (process.env.NODE_ENV === 'development') {
				console.log('Google Apps Script Response:', responseText);
			}
			result = JSON.parse(responseText);
		} catch (parseError) {
			if (process.env.NODE_ENV === 'development') {
				console.error(
					'Failed to parse Google Apps Script response:',
					parseError
				);
			}
			throw new Error('Invalid response from Google Sheets service');
		}

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
