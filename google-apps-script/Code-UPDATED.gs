/******************** CONFIG ********************/
const RESPONSE_SHEET_NAME = 'Form Responses 1';
const TIMEZONE = 'Asia/Kathmandu';
const WEBSITE_UPLOAD_ROOT = 'Website Uploads';

/******************** WEBSITE SUBMISSION ********************/
function doPost(e) {
	try {
		const data = JSON.parse(e.postData.contents);
		const sheet = getResponseSheet();

		// Duplicate email check
		if (emailExists(data.email)) {
			return jsonResponse(false, 'Email already registered');
		}

		// Helper function to format array or string
		const formatArrayOrString = (value) => {
			if (!value) return '';
			if (Array.isArray(value)) return value.join(', ');
			return value.toString();
		};

		// Handle file uploads - check both old and new field names
		const paymentUrl =
			data.paymentFile || data.paymentScreenshot
				? uploadFile(
						data.paymentFile || data.paymentScreenshot,
						'Payment Screenshot'
				  )
				: '';

		const membershipUrl =
			data.membershipFile || data.membershipCard
				? uploadFile(
						data.membershipFile || data.membershipCard,
						'Membership Card'
				  )
				: '';

		const row = [
			new Date(), // Timestamp
			data.fullName || '',
			data.email || '',
			data.phone || '',
			data.contactInfo || '',
			data.addressInfo || '',
			data.yearOfStudy || '',
			data.semester || '',
			data.faculty || '',
			data.pythonExperience || '',
			formatArrayOrString(data.microcontrollerExperience),
			data.linuxFamiliarity || '',
			data.iotProjectExperience || '',
			data.expectations || '',
			data.improvementSuggestions || '',
			data.sessionPreference || '',
			paymentUrl,
			data.transactionCode || '',
			membershipUrl,
			data.agreeToCodeOfConduct ? 'Yes' : 'No',
			true, // Website Submission
		];

		sheet.appendRow(row);
		return jsonResponse(true, 'Submitted successfully', {
			rowNumber: sheet.getLastRow(),
		});
	} catch (err) {
		Logger.log('Error in doPost: ' + err.toString());
		return jsonResponse(false, err.toString());
	}
}

/******************** GOOGLE FORM SUBMISSION ********************/
function onFormSubmit(e) {
	try {
		const sheet = e.range.getSheet();
		if (sheet.getName() !== RESPONSE_SHEET_NAME) return;

		const row = e.range.getRow();
		const email = sheet.getRange(row, 3).getValue(); // Email column

		// Duplicate check (ignore current row)
		if (emailExists(email, row)) {
			sheet.getRange(row, sheet.getLastColumn()).setValue('DUPLICATE');
			return;
		}

		// Mark as Google Form submission
		sheet.getRange(row, sheet.getLastColumn()).setValue(false);
	} catch (err) {
		Logger.log(err);
	}
}

/******************** DUPLICATE EMAIL CHECK ********************/
function emailExists(email, ignoreRow) {
	if (!email) return false;

	const sheet = getResponseSheet();
	const lastRow = sheet.getLastRow();
	if (lastRow < 2) return false;

	const emails = sheet.getRange(2, 3, lastRow - 1).getValues();

	for (let i = 0; i < emails.length; i++) {
		const rowNumber = i + 2;
		if (ignoreRow && rowNumber === ignoreRow) continue;
		if (emails[i][0].toString().toLowerCase() === email.toLowerCase()) {
			return true;
		}
	}
	return false;
}

/******************** FILE UPLOAD ********************/
function uploadFile(file, folderName) {
	if (!file || typeof file !== 'object') return '';
	if (!file.base64 || !file.mimeType || !file.name) return '';

	const root = getOrCreateFolder(WEBSITE_UPLOAD_ROOT);
	const fieldFolder = getOrCreateFolder(folderName, root);

	const blob = Utilities.newBlob(
		Utilities.base64Decode(file.base64),
		file.mimeType,
		file.name
	);

	const createdFile = fieldFolder.createFile(blob);
	createdFile.setSharing(
		DriveApp.Access.ANYONE_WITH_LINK,
		DriveApp.Permission.VIEW
	);

	return createdFile.getUrl();
}

/******************** HELPERS ********************/
function getResponseSheet() {
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const sheet = ss.getSheetByName(RESPONSE_SHEET_NAME);
	if (!sheet) throw new Error('Response sheet not found');
	return sheet;
}

function getOrCreateFolder(name, parent) {
	const folders = (parent || DriveApp).getFoldersByName(name);
	return folders.hasNext()
		? folders.next()
		: (parent || DriveApp).createFolder(name);
}

function jsonResponse(success, message, data = {}) {
	return ContentService.createTextOutput(
		JSON.stringify({ success, message, ...data })
	).setMimeType(ContentService.MimeType.JSON);
}

/******************** SIMPLE TEST ********************/
function testWebsiteSubmission() {
	const fake = {
		postData: {
			contents: JSON.stringify({
				fullName: 'Website User',
				email: 'test' + Date.now() + '@test.com',
				phone: '9800000000',
				contactInfo: 'LinkedIn: test',
				addressInfo: 'Test Address',
				yearOfStudy: '2nd Year',
				semester: '3rd Semester',
				faculty: 'Computer Engineering',
				pythonExperience: 'Beginner',
				microcontrollerExperience: 'ESP32/ESP8266, Arduino', // Test as string
				linuxFamiliarity: 'Beginner',
				iotProjectExperience: 'None',
				expectations: 'Learn IoT',
				improvementSuggestions: 'More projects',
				sessionPreference: 'Morning Session',
				transactionCode: 'TEST123',
				agreeToCodeOfConduct: true,
			}),
		},
	};

	Logger.log(doPost(fake).getContent());
}

function testWebsiteSubmissionWithArray() {
	const fake = {
		postData: {
			contents: JSON.stringify({
				fullName: 'Array Test User',
				email: 'array' + Date.now() + '@test.com',
				phone: '9800000001',
				contactInfo: 'LinkedIn: test',
				addressInfo: 'Test Address',
				yearOfStudy: '2nd Year',
				semester: '3rd Semester',
				faculty: 'Computer Engineering',
				pythonExperience: 'Beginner',
				microcontrollerExperience: ['ESP32/ESP8266', 'Arduino', 'Raspberry Pi'], // Test as array
				linuxFamiliarity: 'Beginner',
				iotProjectExperience: 'None',
				expectations: 'Learn IoT',
				improvementSuggestions: 'More projects',
				sessionPreference: 'Morning Session',
				transactionCode: 'TEST123',
				agreeToCodeOfConduct: true,
			}),
		},
	};

	Logger.log(doPost(fake).getContent());
}
