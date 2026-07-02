import { useGetPatientProfile } from "@/hooks/patients/patients";
import { EditPatientByPatient } from "@/services/patient-service";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import { toast } from "sonner";

export default function EditPatientForm() {
  const  { data: patient } = useGetPatientProfile();
  const [address, setAddress] = useState<string>(patient?.data?.address ??  "");
  const [phoneNumber, setPhoneNumber] = useState<string>(patient?.data?.phoneNumber ?? "");
  const [emergencyContactName, setEmergencyContactName] = useState<string>(patient?.data?.emergencyContactName ??  "");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState<string>(patient?.data?.emergencyContactNumber ??  "");

  const {mutate: editPatientByPatientMutation, isPending, error} = useMutation({
    mutationFn: (patientData: {
      address: string;
      phoneNumber: string;
      emergencyContactNumber: string;
      emergencyContactName: string;
    }) => EditPatientByPatient(patientData),
    onSuccess: () => {
      toast.success("Medical information updated successfully");
    },
    onError: () => {
      toast.error("Failed to update your medical information")
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editPatientByPatientMutation({
      address,
      phoneNumber,
      emergencyContactName,
      emergencyContactNumber,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <span>{error.message}</span>
          )}
          <div className="flex flex-col gap-y-2">
          <label
            htmlFor="address"
            className="label-class"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Main Street 111"
            className="input-class"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
           <div className="flex flex-col gap-y-2">
          <label
            htmlFor="phone-number"
            className="label-class"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone-number"
            placeholder="+123456780"
            required
            className="input-class"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
         <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="emergency-contact-name"
            className="label-class"
          >
            Emergency Contact Name
          </label>
          <input 
            type="text" 
            id="emergency-contact-name"
            className="input-class"
            placeholder="Jane Doe"
            required
            value={emergencyContactName}
            onChange={(e) => setEmergencyContactName(e.target.value)}  
          />
        </div>
         <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="emergency-contact-number"
            className="label-class"
          >
            Emergency Contact Number
          </label>
          <input 
            type="text" 
            id="emergency-contact-number"
            className="input-class"
            placeholder="+1230301"
            required
            value={emergencyContactNumber}
            onChange={(e) => setEmergencyContactNumber(e.target.value)}  
          />
        </div>
        <div className="flex justify-end">
         <button
          type="submit"
          disabled={isPending}
          className="w-fit px-6 py-3 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            "Editing..."
          ) : (
            "Edit"
          )}
        </button>

        </div>
      </form>
    </div>
  )
}

