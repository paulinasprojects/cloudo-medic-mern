import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { ImageIcon, Loader2,  UploadCloud, X } from "lucide-react";

interface Props {
  onSuccess: () => void;
}

export default function UserImageForm({ onSuccess }: Props) {
  const { uploadImage, error, isLoading } = useAuthStore();
	const [image, setImage] = useState<File | undefined>(undefined);
	const [preview, setPreview] = useState<string | undefined>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		setImage(file)
		const reader = new FileReader();

		reader.onloadend = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(file);
	}

	function handleRemove() {
		setImage(undefined);
		setPreview(undefined);
		if (inputRef.current) inputRef.current.value = "";
	}

	async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!image) return;

		await uploadImage(image);

		if (!error) {
			toast.success("Image updated successfully")
			onSuccess();
		} else {
			toast.error("Failed to upload an image")
		}
	}

	return (
    <form onSubmit={handleUpload} className="flex flex-col gap-6 m-4">
      <div
				onClick={() => inputRef.current?.click()}
				className="relative flex flex-col items-center justify-center gap-3 border-2 border-gray-300 rounded-xl p-8 cursor-pointer hover:border-gray-500 hover:bg-grey-400/14 transition-colors"
			>
				{preview ? (
					<>
						<img src={preview} alt="preview image" className="w-full max-h-122.5 object-cover rounded-lg" />
						<button
							type="button"
							onClick={(e) => { e.stopPropagation(); handleRemove() }}
							className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
						>
							<X className="size-4 text-red-500"/>
						</button>
					</>
				) : (
					<>
						<UploadCloud className="size-10 text-black dark:text-white"/>
						<div className="text-center">
							<p className="text-sm font-medium text-black dark:text-white">
								Click to upload an image
							</p>
							<p className="text-xs text-gray-900 dark:text-gray-50 mt-1">JPEG, JPG, PNG or WEBP - max 5MB</p>
						</div>
					</>
				)}
				<input 
					type="file"
					ref={inputRef}
					accept="image/jpeg,image/jpg,image/png,image/webp"
					className="hidden"	
					onChange={handleFileChange}
				/>
			</div>
			{image && (
				<div className="flex items-center gap-2 text-sm text-black dark:text-white">
					<ImageIcon className="size-4 text-black dark:text-white"/>
					<span className="truncate">{image.name}</span>
					<span>({(image.size / 1024 / 1024).toFixed(2)} MB)</span>
				</div>
			)}
			{error && (
				<p className="text-sm text-red-500">{error}</p>
			)}
			<button 
				type="submit"
				disabled={isLoading}
				className="inline-flex items-center justify-center gap-2 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-black/60 dark:hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm font-medium transition-colors duration-500"
			>
				{isLoading ? (
					<>
						<Loader2 className="animate-spin size-4"/>
						Uploading...
					</>
				) : (
					<>
						<UploadCloud className="size-4"/>
						Upload Image
					</>
				)}
			</button>
    </form>
  )
}