import { MedicalTests } from "@/types/types";
import { X } from "lucide-react";
import EditMedicalTestForm from "./edit-medical-test-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: MedicalTests;
}

export default function EditMedicalTestModal({ 
  isOpen, 
  onClose, 
  data 
}: Props) {

   if (!isOpen) return null;
   
   function handleClose() {
    onClose()
   }

   function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
   }

  return (
    <div 
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white dark:bg-black rounded-sm border border-stone-700 w-full max-w-xl">
        <div className="flex items-center justify-between px-4 py-5">
        <h2 className="text-lg font-bold text-gray-500">Edit Medical Test</h2>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800"
          >
          <X className="size-5"/>
        </button>
        </div>
        <EditMedicalTestForm onSuccess={handleClose} data={data}/>
      </div>
    </div>
  )
}
