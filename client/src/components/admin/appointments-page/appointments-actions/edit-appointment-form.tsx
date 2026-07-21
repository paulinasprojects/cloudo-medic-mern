import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAppointmentByAdmins } from "@/services/admin-service";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { Appointment, AppointmentStatus } from "@/types/types";
import DatePicker from "@/components/common/date-picker";

interface Props {
  onSuccess: () => void;
  data: Appointment;
}

export default function EditAppointmentForm({
  onSuccess,
  data
}: Props) {
  const [patientId, setPatientId] = useState<string>(data.patientId ?? "");
  const [doctorId, setDoctorId] = useState<string>(data.doctorId ?? "");
  const [appointmentDate, setAppointmentDate] = useState<string>(data.appointmentDate ?? "");
  const [status, setStatus] = useState< string>(data.status ?? "")
  const [notes, setNotes] = useState<string>(data.notes ?? "")
  const queryClient = useQueryClient();

  const { mutate: editAppointmentMutation, isPending, error} = useMutation({
    mutationFn: (
      appointmentData: {
        appointmentDate: string;
        status: string;
        notes: string;
      }
    ) => editAppointmentByAdmins(data.id, appointmentData),
    onSuccess: () => {
      toast.success("Appointment updated successfully")
      queryClient.invalidateQueries({ queryKey: ["appointment"] })
      onSuccess()
    },
    onError: () => {
      toast.error("Failed to update appointment")
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAppointmentMutation({
      appointmentDate,
      notes,
      status
    });
  }
  
  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <span className="text-red-500">
            {axios.isAxiosError(error)
            ? error.response?.data?.error ?? error.message
          : error.message}
          </span>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="doctor-id" className="label-class">
              Doctor Id
            </label>
            <input 
              type="text" 
              id="doctor-id" 
              placeholder="d67cdba2-8731-4e28-aa03-fda59bf16b31" 
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              disabled={true}
              className="input-class"
            />
          </div>
           <div className="flex flex-col gap-2">
            <label htmlFor="patient-id" className="label-class">
              Patient Id
            </label>
            <input 
              type="text" 
              id="patient-id" 
              placeholder="e50cdba2-8731-4e28-aa03-fda59bf16b31" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              disabled={true}
              className="input-class"
            />
          </div>
           <div className="flex flex-col gap-2">
            <label className="label-class">
              Appointment Date
            </label>
            <DatePicker
              placeholder="Pick a date"
              value={appointmentDate ? new Date(appointmentDate) : undefined}
              onChange={(date) => setAppointmentDate(date
                  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                  : "")}
            />
          </div>
          <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="label-class">
                Notes
              </label>
              <textarea 
                id="notes" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isPending}
                required
                className="resize-none w-full py-4 input-class"
              />
          </div>
            <div className="flex flex-col gap-y-2">
            <label
              className="label-class"
            >
              Status
            </label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger placeholder="Select status" />
            <SelectContent>
              {AppointmentStatus.map((status) => (
                <SelectOption key={status.id} value={status.value}>{status.placeholder}</SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>
        </div>
          <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-foreground text-background hover:bg-foreground/65 dark:hover:bg-foreground/90  rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            "Updating..."
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  )
}