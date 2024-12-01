import styles from "./updatePhoto.module.scss";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {AxiosError} from "axios";
import Image from "next/image";
import {loggedMediaAxios} from "@/services/axios";
import {API} from "@/services/api/api";
import {compressImage} from "@/services/helpers";
import {useOpen} from "@/hooks/useOpen";
import appConfig from "@/config/app.config";

const MAX_FILE_SIZE_MB = 10
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"]

export const UpdatePhoto: FC<{ image?: string }> = ({image}) => {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(image || null)
	const [error, setError] = useState<string | null>(null)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const loading = useOpen()

	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0]
		if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
			setImageFile(file)
			setError(null)
		} else {
			setImageFile(null)
			setError("Invalid file type. Please select a .jpg, .jpeg, or .png image.")
		}
	}

	useEffect(() => {
		if (imageFile) {
			const reader = new FileReader()
			reader.onloadend = () => {
				if (reader.result) setPreview(reader.result as string)
			}
			reader.readAsDataURL(imageFile)
		} else if (image) setPreview(`${appConfig.apiUrl}${image}`)
		else setPreview(null)
	}, [imageFile, image])

	const updatingImage = async (file: File) => {
		if (!file) return

		const fileSizeMB = file.size / 1024 / 1024
		if (!ALLOWED_FILE_TYPES.includes(file.type)) return console.error("Only image files (JPEG, PNG) are allowed")
		if (fileSizeMB > MAX_FILE_SIZE_MB) return console.error("File size should not exceed 10 MB")

		const compressedFile = await compressImage(file, loading)

		if (compressedFile) {
			const formData = new FormData()
			formData.append("image", compressedFile);

			try {
				const response = await loggedMediaAxios.patch(API.updateAvatar, formData)
				setSuccessMessage("Profile image updated successfully.")
				setError(null)
				setPreview(URL.createObjectURL(compressedFile))
				return {isError: false, response: response.data}
			} catch (error) {
				if (error instanceof AxiosError) {
					const errorMessage = error.response?.data?.fields?.image?.[0] || error.response?.data?.detail
					setError(errorMessage || "An error occurred while uploading the image.")
					return {isError: true, response: errorMessage}
				}
			}
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccessMessage(null);
		if (imageFile) {
			await updatingImage(imageFile)
		} else {
			setError("Please choose an image to upload.")
		}
	}


	return (
		<div className={styles.avatar}>
			<h2>Update Your Avatar</h2>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.previewContainer}>
					{preview ? (
						<Image
							className={styles.preview}
							src={preview}
							alt="avatar preview"
							width={150}
							height={150}
							priority
						/>
					) : (
						<div className={styles.placeholder}>No Image Selected</div>
					)}
				</div>
				<p className={styles.instructions}>Please use a .png, .jpg, or .jpeg file.</p>
				<div className={styles.btns}>
					<label className={styles.fileInputLabel}>
						<span>Choose file</span>
						<input
							className={styles.fileInput}
							type="file"
							accept=".jpg, .jpeg, .png"
							onChange={inputHandler}
						/>
					</label>
					<button type="submit" className={styles.uploadButton}>
						Upload
					</button>
				</div>
			</form>
			{error && <p className={styles.error}>{error}</p>}
			{successMessage && <p className={styles.success}>{successMessage}</p>}
		</div>
	);
}
