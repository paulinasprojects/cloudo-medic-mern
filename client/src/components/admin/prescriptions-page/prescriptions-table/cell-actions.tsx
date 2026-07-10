import { useState } from "react";
import { toast } from "sonner";
import { Prescription } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/common/dropdown-menu";
import { CopyIcon, Ellipsis, Pencil, Trash2 } from "lucide-react";
import EditPrescriptionModal from "../prescriptions-actions/edit-prescription-modal";

interface Props {
  data: Prescription
}

export default function CellAction({ data }: Props) {
  const [ isEditingModalOpen, setIsEditingModalOpen ] = useState<boolean>(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Prescriptions id copied to clipboard")
  }

  function handleEditPrescription() {
    setIsEditingModalOpen(true)
  }

  function handleCloseModal() {
    setIsEditingModalOpen(false);
  }
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Ellipsis/>
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="bg-white text-black dark:bg-black dark:text-white rounded-md">
          <DropdownMenuItem onClick={() => onCopy(data.id)} className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer">
            <CopyIcon className="h-4 w-4"/>
              Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer" onClick={handleEditPrescription}>
            <Pencil className="h-4 w-4"/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer">
            <Trash2 className="h-4 w-4"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditPrescriptionModal data={data} isOpen={isEditingModalOpen} onClose={handleCloseModal}/>
    </>
  )
}