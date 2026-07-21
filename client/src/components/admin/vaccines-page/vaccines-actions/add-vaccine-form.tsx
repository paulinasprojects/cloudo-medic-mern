import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { createVaccine } from "@/services/admin-service";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { VaccineStatus } from "@/types/types";
import DatePicker from "@/components/common/date-picker";

interface Props {
  onSuccess: () => void;
}


export default function AddVaccineForm({ onSuccess }: Props) {
  const [patientId, setPatientId] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [vaccinationName, setVaccinationName] = useState<string>("");
  const [vaccinationDate, setVaccinationDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const { mutate: createVaccineMutation, isPending, error } = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      toast.success("Vaccine created successfuly")
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create a vaccine")
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createVaccineMutation({
      doctorId,
      patientId,
      vaccinationName,
      vaccinationDate,
      notes,
      status
    });
  }


 return (
   <div className="col-span-3 sm:col-span-3 flex flex-col gap-6 p-6">
    <form  onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          <label className="label-class">
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
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger placeholder="Select status"/>
            <SelectContent>
              {VaccineStatus.map((status) => (
                <SelectOption
                  key={status.id}
                  value={status.value}
                >
                  {status.placeholder}
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
          className="create-button"
          type="submit">
          Create
        </button>
    </form>
  </div>
 )
}