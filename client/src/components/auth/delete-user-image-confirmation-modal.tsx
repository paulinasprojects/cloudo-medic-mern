import { AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}


export default function DeleteUserImageConfirmationModal({ isOpen, onCancel, onConfirm, isDeleting }: Props) {
  if (!isOpen) return null;

  const handleClickOutside =(e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onCancel();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={handleClickOutside}>
      <div className="bg-white dark:bg-black rounded-sm border border-slate-800 p-6 flex flex-col gap-4 max-w-md w-full mx-4">
        <div className="flex flex-col items-center justify-center gap-3  py-4 border-b border-slate-800">
          <div className="p-2 bg-red-900/20 rounded-sm">
            <AlertTriangle className="size-6 text-red-400" />
          </div>
          <div>
            <p>Are you sure you want to delete this image? This action cannot be undone</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded-full border text-sm bg-white text-black dark:bg-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 duration-400 transition-colors"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-500/60 duration-400 transition-colors text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
