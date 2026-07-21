import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { createAppointment } from "@/services/admin-service";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { AppointmentStatus } from "@/types/types";
import DatePicker from "@/components/common/date-picker";

interface Props {
  onSuccess: () => void;
}

export default function AddAppointmentForm({ onSuccess }: Props) {
  const [patientId, setPatientId] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [status, setStatus] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const { mutate: createAppointmentMutation, isPending, error } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("Appointment created successfully")
      onSuccess()
    },
    onError: () => {
      toast.error("Failed to create appointment")
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAppointmentMutation({
      doctorId,
      patientId,
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
              disabled={isPending}
              required
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
              disabled={isPending}
              required
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
          className="create-button"
          type="submit">
          Create
        </button>
      </form>
    </div>
  )
}
