import { X } from "lucide-react";
import AddAppointmentForm from "./add-appointment-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAppointmentModal({isOpen, onClose}: Props) {
  if (!isOpen) return null;

  function handleClose(){
    onClose()
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
  
  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-sm border border-slate-800 w-full max-w-xl">
        <div className="flex items-center justify-between px-4 py-5">
          <h2 className="text-lg font-bold text-gray-500">Add New Appointment</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5"/>
          </button>
        </div>
        <AddAppointmentForm onSuccess={handleClose}/>
      </div>
    </div>
  )
}
