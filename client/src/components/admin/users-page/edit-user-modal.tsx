import { X } from "lucide-react";
import EditUserForm from "./edit-user-form";
import { User } from "@/types/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: User;
}

export default function EditUserModal({ isOpen, onClose, data }: Props) {

  if (!isOpen) return null

  function handleClose() {
    onClose();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-sm border border-slate-700 w-full max-w-xl">
        <div className="flex items-center justify-between px-4 py-5">
          <h2 className="text-lg font-bold text-gray-500">Edit User</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <EditUserForm onSuccess={handleClose} data={data} />
      </div>
    </div>
  )
}