import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Vaccine, VaccineStatus } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVaccineByAdmins } from "@/services/admin-service";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import DatePicker from "@/components/common/date-picker";

interface Props {
  onSuccess: () => void;
  data: Vaccine;
}

export default function EditVaccineForm({
  onSuccess,
  data
}: Props) {
  const [patientId, setPatientId] = useState<string>(data.patientId ?? "");
  const [doctorId, setDoctorId] = useState<string>(data.doctorId ?? "");
  const [vaccinationName, setVaccinationName] = useState<string>(data.vaccinationName ?? "");
  const [vaccinationDate, setVaccinationDate] = useState<string>(data.vaccinationDate ?? "");
  const [status, setStatus] = useState<VaccineStatus | string>(data.status ?? "")
  const [notes, setNotes] = useState<string>(data.notes ?? "")
  const queryClient = useQueryClient();

  const { mutate: editVaccineMutation, isPending, error } = useMutation({
    mutationFn: (
      vaccineData: {
        vaccinationName: string;
        vaccinationDate: string;
        status: string;
        notes: string;
      }
    ) => editVaccineByAdmins(data.id, vaccineData),
    onSuccess: () => {
      toast.success("Vaccine updated successfully")
      queryClient.invalidateQueries({ queryKey: ["vaccine"] })
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update vaccine")
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editVaccineMutation({
      vaccinationDate,
      vaccinationName,
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
        <div className="flex flex-col gap-5">
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
          <label htmlFor="vaccination-name" className="label-class">
            Vaccination Name
          </label>
          <input 
            type="text"
            id="vaccination-name"
            placeholder="Influenza Vaccine"
            value={vaccinationName}
            onChange={(e) => setVaccinationName(e.target.value)}
            disabled={isPending}
            required
            className="input-class"
           />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="vaccination-date" className="label-class">
            Vaccination Date
          </label>
          <DatePicker
            placeholder="Pick a vaccination date"
            value={vaccinationDate ? new Date(vaccinationDate) : undefined}
            onChange={(date) => setVaccinationDate(date
              ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
              : "")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-class">
            Status
          </label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as VaccineStatus)}
          >
            <SelectTrigger placeholder="Select status"/>
            <SelectContent>
              {Object.values(VaccineStatus).map((status) => (
                <SelectOption
                  key={status}
                  value={status}
                >
                  {status}
                </SelectOption>
              ))}
            </SelectContent>
          </Select>
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
        </div>
         <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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