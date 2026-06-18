import { useState } from "react";
import { CopyIcon, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/common/dropdown-menu";
import EditUserModal from "../users-actions/edit-user-modal";
import DeleteUserConfirmationModal from "../users-actions/delete-user-confirmation-modal";


interface Props {
  data: User;
}

export function CellAction({ data }: Props) {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState<boolean>(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState<boolean>(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("User id copied to clipboard")
  }

  function handleEditUser() {
    setIsEditingModalOpen(true);
  }

  function handleCloseModal() {
    setIsEditingModalOpen(false);
  }

  function handleDeleteUser() {
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
            <Ellipsis />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="bg-white text-black dark:bg-black dark:text-white rounded-md">
          <DropdownMenuItem onClick={() => onCopy(data.id)} className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer">
            <CopyIcon className="h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer" onClick={handleEditUser}>
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-200 focus:text-black dark:focus:bg-white dark:focus:text-black cursor-pointer" onClick={handleDeleteUser}>
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserModal data={data} isOpen={isEditingModalOpen} onClose={handleCloseModal} />
      <DeleteUserConfirmationModal data={data} isOpen={isDeletingModalOpen} onCancel={handleCloseDeletingModal} />
    </>
  )
}