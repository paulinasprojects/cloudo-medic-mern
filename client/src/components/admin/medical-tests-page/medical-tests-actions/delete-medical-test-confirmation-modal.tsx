import { toast } from "sonner";
import { MedicalTests } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedicalTestByAdmins } from "@/services/admin-service";


interface  Props {
  data: MedicalTests;
  isOpen: boolean;
  onCancel: () => void;
}

export default function DeleteMedicalTestConfirmationModal({data, isOpen, onCancel}: Props) {
  
  const queryClient = useQueryClient();
  const { mutate: handleDeleteMedicalTest, isPending } = useMutation({
    mutationFn: () => deleteMedicalTestByAdmins(data.id),
    onSuccess:() => {
      toast.success("Medical test deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["medicaltest"] })
      handleClose()
    },
    onError: () => {
      toast.error("Failed to delete medical test")
    }
  })

  if (!isOpen || !data) return null;

  function handleClose() {
    onCancel()
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
      <div className="bg-white dark:bg-black rounded-sm border border-slate-800 p-6 flex flex-col gap-4 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold dark:text-white">Delete medical test</h2>
        <p className="font-medium text-black dark:text-white">
          Are you sure you want to delete this medical test ? This action cannot  be undone
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            disabled={isPending}
            className="px-4 py-4 rounded-full border text-sm bg-white text-black dark:bg-black dark:text-white hover:bg-black/5 dark:hover:bg-white/20 duration-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteMedicalTest()}
            disabled={isPending}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-500/60 duration-400 transition-colors text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
