import { toast } from "sonner";
import { Doctor } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctorByAdmin } from "@/services/admin-service";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  data: Doctor;
}

export default function DeleteDoctorConfirmationModal({
  isOpen,
  onCancel,
  data
}: Props) {
  const queryClient = useQueryClient();
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: () => deleteDoctorByAdmin(data.id),
    onSuccess: () => {
      toast.success("Doctor deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
      handleClose();
    },
    onError: () => {
      toast.error("Failed to delete doctor")
    }
  })

  if (!isOpen || !data) return null;


  function handleClose() {
    onCancel();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }




  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-sm border border-slate-800 p-6 flex flex-col gap-4 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold dark:text-white">Delete user</h2>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete{" "}
          <span className="font-medium text-black dark:text-white">
            {data.user.firstName} {data.user.lastName}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-2 rounded-full border text-sm bg-white text-black dark:bg-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 duration-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            disabled={isPending}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-500/60 duration-400 transition-colors text-white text-sm disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}