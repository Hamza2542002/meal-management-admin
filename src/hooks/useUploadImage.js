import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;
const DEFAULT_ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function useUploadImage({
	maxSize = DEFAULT_MAX_SIZE,
	acceptedTypes = DEFAULT_ACCEPTED_TYPES,
	onUpload,
} = {}) {
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const [error, setError] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const objectUrlRef = useRef("");

	const clearPreviewUrl = useCallback(() => {
		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = "";
		}
	}, []);

	const selectImage = useCallback((nextFile) => {
		setError("");

		if (!nextFile) {
			return false;
		}

		if (!acceptedTypes.includes(nextFile.type)) {
			setError("Please select a JPG, PNG, or WebP image.");
			return false;
		}

		if (nextFile.size > maxSize) {
			setError(`Image must be smaller than ${Math.round(maxSize / 1024 / 1024)} MB.`);
			return false;
		}

		clearPreviewUrl();
		const nextPreviewUrl = URL.createObjectURL(nextFile);
		objectUrlRef.current = nextPreviewUrl;
		setFile(nextFile);
		setPreviewUrl(nextPreviewUrl);
		return true;
	}, [acceptedTypes, clearPreviewUrl, maxSize]);

	const clearImage = useCallback(() => {
		clearPreviewUrl();
		setFile(null);
		setPreviewUrl("");
		setError("");
	}, [clearPreviewUrl]);

	const uploadImage = useCallback(async () => {
		if (!file) {
			setError("Please select an image first.");
			return null;
		}

		if (!onUpload) {
			return file;
		}

		setIsUploading(true);
		setError("");

		try {
			return await onUpload(file);
		} catch (uploadError) {
			setError(uploadError.message || "The image could not be uploaded.");
			return null;
		} finally {
			setIsUploading(false);
		}
	}, [file, onUpload]);

	useEffect(() => clearPreviewUrl, [clearPreviewUrl]);

	return {
		file,
		previewUrl,
		error,
		isUploading,
		selectImage,
		clearImage,
		uploadImage,
	};
}
