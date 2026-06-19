import { toast } from "sonner";
import { useState } from "react";
import { Doctor } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/common/dropdown-menu";
import { CopyIcon, Ellipsis, Pencil, Trash2 } from "lucide-react";
import EditDoctorModal from "../doctors-actions/edit-doctor-modal";
import DeleteDoctorConfirmationModal from "../doctors-actions/delete-doctor-confirmation-modal";

interface Props {
  data: Doctor;
}


export const CellAction = ({ data }: Props) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState<boolean>(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Doctor id copied to clipboard")
  };

  function handleEditDoctor() {
    setIsEditingModalOpen(true)
  }

  function handleCloseModal() {
    setIsEditingModalOpen(false)
  }

  function handleDeleteDoctor() {
    setIsDeletingModalOpen(true);
  }

  function handleCloseDeletingModal() {
    setIsDeletingModalOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Ellipsis />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="bg-white text-black dark:bg-black dark:text-white rounded-md">
          <DropdownMenuItem onClick={() => onCopy(data.id)} className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer">
            <CopyIcon className="h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black  cursor-pointer" onClick={handleEditDoctor}>
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black  cursor-pointer" onClick={handleDeleteDoctor}>
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditDoctorModal data={data} isOpen={isEditingModalOpen} onClose={handleCloseModal} />
      <DeleteDoctorConfirmationModal data={data} isOpen={isDeletingModalOpen} onCancel={handleCloseDeletingModal} />
    </>
  )
}