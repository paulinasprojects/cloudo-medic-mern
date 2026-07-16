import { useState } from "react";
import { toast } from "sonner";
import { MedicalTests } from "@/types/types";
import { CopyIcon, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/common/dropdown-menu";
import EditMedicalTestModal from "../medical-tests-actions/edit-medical-test-modal";
import DeleteMedicalTestConfirmationModal from "../medical-tests-actions/delete-medical-test-confirmation-modal";

interface Props {
  data: MedicalTests
}

export default function CellAction({data}: Props) {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState<boolean>(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Medical test id copied to the clipboard");
  };


  function handleEditMedicalTest() {
    setIsEditingModalOpen(true)
  }

  function handleCloseModal() {
    setIsEditingModalOpen(false)
  }


   function handleDeleteMedicalTest() {
    setIsDeletingModalOpen(true)
  }

  function handleCloseDeletingModal() {
    setIsDeletingModalOpen(false);
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
        <DropdownMenuContent
          align="center"
          className="bg-white text-black dark:bg-black dark:text-white rounded-md"
        >
          <DropdownMenuItem onClick={() => onCopy(data.id)} className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer">
            <CopyIcon className="h-4 w-4"/>
              Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem  className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer" onClick={handleEditMedicalTest}>
            <Pencil className="h-4 w-4"/>
              Edit
          </DropdownMenuItem>
          <DropdownMenuItem  className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer" onClick={handleDeleteMedicalTest}>
            <Trash2 className="h-4 w-4"/>
              Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditMedicalTestModal
        data={data}
        isOpen={isEditingModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteMedicalTestConfirmationModal
        isOpen={isDeletingModalOpen}
        data={data}
        onCancel={handleCloseDeletingModal}
      />
    </>
  )
}