/**
 * Convert File to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result as string;
			// Remove the data URL prefix (e.g., "data:image/png;base64,")
			const base64Data = base64.split(',')[1];
			resolve(base64Data);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

/**
 * Prepare file data for Google Apps Script
 */
export async function prepareFileForUpload(file: File): Promise<{
	base64: string;
	mimeType: string;
	name: string;
	size: number;
}> {
	const base64 = await fileToBase64(file);
	return {
		base64,
		mimeType: file.type,
		name: file.name,
		size: file.size,
	};
}

/**
 * Process FileList and prepare for upload
 */
export async function processFileList(
	fileList: FileList | File | null | undefined
): Promise<{
	base64: string;
	mimeType: string;
	name: string;
	size: number;
} | null> {
	if (!fileList) return null;

	const file = fileList instanceof FileList ? fileList[0] : fileList;
	if (!file) return null;

	return prepareFileForUpload(file);
}
