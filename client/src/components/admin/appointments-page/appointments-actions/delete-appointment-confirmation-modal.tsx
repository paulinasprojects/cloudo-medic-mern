import { Appointment } from "@/types/types"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAppointmentByAdmins } from "@/services/admin-service"

interface  Props {
  data: Appointment;
  isOpen: boolean;
  onCancel: () => void;
}

export default function DeleteAppointmentConfirmationModal({
  data,
  isOpen,
  onCancel
}: Props) {

  const queryClient = useQueryClient();
  const { mutate: handleDeleteAppointment, isPending } = useMutation({
    mutationFn: () => deleteAppointmentByAdmins(data.id),
    onSuccess: () => {
      toast.success("Appointment deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["appointment"] })
      handleClose()
    },
    onError: () => {
      toast.error("Failed to delete appointment")
    }
  });

  if (!isOpen || !data) return null;

  function handleClose() {
    onCancel();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" 
      onClick={handleClickOutside}>
       <div className="bg-white dark:bg-black rounded-sm border border-slate-800 p-6 flex flex-col gap-4 max-w-md w-full mx-4">
        <h2 className="text-lg font-bold dark:text-white">Delete appointment</h2>
          <p className="font-medium text-black dark:text-white">
            Are you sure you want to delete this appointment ? This action cannot  be undone
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
              onClick={() => handleDeleteAppointment()}
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
