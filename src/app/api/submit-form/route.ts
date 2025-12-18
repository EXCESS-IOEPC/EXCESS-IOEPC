import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sanitizeInput, prepareDataForSheets } from '@/src/lib/formSecurity';

export async function POST(request: NextRequest) {
	try {
		// Validate Content-Type
		const contentType = request.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			if (process.env.NODE_ENV === 'development') {
				console.error('Invalid Content-Type:', contentType);
			}
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid request format. Expected JSON.',
				},
				{ status: 415 }
			);
		}

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
	data: any,
	retries = 3
): Promise<{ success: boolean; error?: string; rowNumber?: number }> {
	try {
		const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

		if (!scriptUrl) {
			if (process.env.NODE_ENV === 'development') {
				console.error('GOOGLE_SCRIPT_URL environment variable is not set');
			}
			return {
				success: false,
				error:
					'Google Sheets integration not configured. Please contact support.',
			};
		}

		// Retry logic for network failures
		for (let attempt = 1; attempt <= retries; attempt++) {
			try {
				if (process.env.NODE_ENV === 'development' && attempt > 1) {
					console.log(`Retry attempt ${attempt}/${retries}`);
				}

				// Send data to Google Apps Script with timeout
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

				const response = await fetch(scriptUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
					signal: controller.signal,
				});

				clearTimeout(timeoutId);

				if (!response.ok) {
					const errorText = await response.text();
					if (process.env.NODE_ENV === 'development') {
						console.error('Google Apps Script Error Response:', errorText);
					}

					// Don't retry on client errors (4xx)
					if (response.status >= 400 && response.status < 500) {
						return {
							success: false,
							error: `Invalid request: ${errorText.substring(0, 200)}`,
						};
					}

					// Retry on server errors (5xx)
					if (attempt < retries) {
						await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
						continue;
					}

					throw new Error(
						`Google Sheets service error (${response.status}). Please try again later.`
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
					if (attempt < retries) {
						await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
						continue;
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
				if (error instanceof Error && error.name === 'AbortError') {
					if (process.env.NODE_ENV === 'development') {
						console.error('Request timeout on attempt', attempt);
					}
					if (attempt < retries) {
						await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
						continue;
					}
					return {
						success: false,
						error:
							'Request timeout. Please check your internet connection and try again.',
					};
				}

				// For other errors, check if we should retry
				if (attempt < retries) {
					await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
					continue;
				}

				throw error;
			}
		}

		// This should never be reached, but TypeScript needs it
		return {
			success: false,
			error: 'Maximum retry attempts exceeded',
		};
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to send data to Google Sheets:', error);
		}
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Unknown error occurred. Please try again.',
		};
	}
}

// Prevent GET requests
export async function GET() {
	return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
