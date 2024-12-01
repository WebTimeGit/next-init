import {ROUTES} from "@/routes/routes";
import {TUseOpen} from "@/hooks/useOpen";
import {appConfig} from "@/config";

export const handleHomeRedirect = (push: any) => {
	push(ROUTES.home)
}

export const compressImage = (file: File, loader: TUseOpen): Promise<File | null> => {
	loader.onOpen()
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (event) => {
			if (!event.target?.result) return reject(new Error("Failed to read file"))

			const img = document.createElement("img") as HTMLImageElement;
			img.src = event.target.result as string
			img.onload = () => {
				const canvas = document.createElement("canvas")
				const ctx = canvas.getContext("2d")

				if (!ctx) return reject(new Error("Failed to get canvas context"))

				const maxWidth = img.width // you can change size img (img.width * .5) - 50%
				const maxHeight = img.height // you can change size img (img.height * .5) - 50%
				canvas.width = maxWidth
				canvas.height = maxHeight

				ctx.drawImage(img, 0, 0, maxWidth, maxHeight)

				canvas.toBlob(
					(blob) => {
						if (blob) {
							const compressedFile = new File([blob], file.name, {type: "image/jpeg"})
							resolve(compressedFile)
						} else {
							reject(new Error("Failed to create blob"))
						}
					},
					"image/jpeg",
					0.7
				)
				loader.onClose()
			}
			img.onerror = (error) => reject(error)
		}
		reader.onerror = (error) => reject(error)
	})
}

export const trimmer = (text: string | undefined, length = 10) => {
	let trimmedText = ''
	if (text) {
		trimmedText = text
	}
	if (typeof text === 'string' && text?.length > length) {
		trimmedText = text.slice(0, length) + '..'
	}
	return trimmedText
}

export const getImgHandler = (src: string | undefined | null) => {
	return src
		? src.includes('http')
			? src
			: appConfig.serverUrl + src
		: undefined
}