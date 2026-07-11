import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPrescriptionByAdmins } from "@/services/admin-service";
import { Prescription } from "@/types/types";
import DatePicker from "@/components/common/date-picker";

interface Props {
  onSuccess: () => void;
  data: Prescription;
}

export default function EditPresctiptionForm({data, onSuccess}: Props) {
  const [patientId, setPatientId] = useState<string>(data?.patientId ?? "");
  const [doctorId, setDoctorId] = useState<string>(data?.doctorId ?? "");
  const [medication, setMedication] = useState<string | string[]>(data?.medication ?? "");
  const [dosage, setDosage] = useState<string | string[]>(data?.dosage ?? "");
  const [instructions, setInstructions] = useState<string>(data?.instructions ?? "");
  const [startDate, setStartDate] = useState<string>(data?.startDate ?? "");
  const [endDate, setEndDate] = useState<string>(data?.endDate ?? "");
  const queryClient = useQueryClient();

  const { mutate: editPrescriptionMutation, isPending, error } = useMutation({
    mutationFn: (prescriptionData: {
      medication: string | string[];
      dosage: string | string[] | null;
      instructions: string;
      endDate: string;
    }) => editPrescriptionByAdmins(data.id, prescriptionData),
    onSuccess: () => {
      toast.success("Prescription updated successfuly")
      queryClient.invalidateQueries({queryKey: ["prescription"] })
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update prescription")
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editPrescriptionMutation({
      dosage,
      instructions,
      medication,
      endDate,
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
            <label htmlFor="medication" className="label-class">
              Medication
            </label>
            <input 
              type="text" 
              id="medication" 
              placeholder="Ibuprofen" 
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              disabled={isPending}
              required
              className="input-class"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dosage" className="label-class">
              Dosage
            </label>
            <input 
              type="text" 
              id="dosage" 
              placeholder="500mg" 
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              disabled={isPending}
              required
              className="input-class"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="instructions" className="label-class">
              Instructions
            </label>
            <textarea 
              id="instructions" 
              placeholder="500mg" 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              disabled={isPending}
              required
              className="resize-none w-full py-4 input-class"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="start-date" className="label-class">
              Start Date
            </label>
            <DatePicker
              disabled={true}
              placeholder="Pick a start date"
              value={startDate ? new Date(startDate) : undefined}
              onChange={(date) => setStartDate(date
                  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                  : "")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="end-date" className="label-class">
              End Date
            </label>
            <DatePicker
              classNameTwo="-top-48"
              placeholder="Pick a end date"
              value={endDate ? new Date(endDate) : undefined}
              onChange={(date) => setEndDate(date
                  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
              : "")}
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
