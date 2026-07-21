import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { useGetDoctorProfile } from "@/hooks/doctors/doctors"
import { EditDoctorByDoctor } from "@/services/doctor-service"
import axios from "axios"

export default function EditDoctorForm() {
  const { data: doctor } = useGetDoctorProfile();
  const [address, setAddress] = useState<string>(doctor?.data?.address ?? "");
  const [phoneNumber, setPhoneNumber] = useState<string>(doctor?.data?.phoneNumber ?? "")
  const [workPhoneNumber, setWorkPhoneNumber] = useState<string>(doctor?.data?.workPhoneNumber ?? "")
  const [bio, setBio] = useState<string>(doctor?.data?.bio ?? "")
  const [hospital, setHospital] = useState<string>(doctor?.data?.hospital ?? "")
  const [consultationFee, setConsultationFee] = useState<number | string>(doctor?.data?.consultationFee ?? "");

  const {mutate: editDoctorByDoctorMutation, isPending, error} = useMutation({
    mutationFn: (doctorData: {
      address: string;
      phoneNumber: string;
      bio: string,
      hospital: string;
      consultationFee: number;
      workPhoneNumber: string;
    }) => EditDoctorByDoctor(doctorData),
     onSuccess: () => {
      toast.success("Work information updated successfully");
    },
    onError: () => {
      toast.error("Failed to update your work information")
    }
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editDoctorByDoctorMutation({
      address,
      phoneNumber,
      workPhoneNumber,
      bio,
      hospital,
      consultationFee: Number(consultationFee)
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <span className="text-sm text-red-500">
             {axios.isAxiosError(error)
              ? error.response?.data?.error ?? error.message
              : error.message}
          </span>
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
            htmlFor="work-phone-number"
            className="label-class"
          >
           Work Phone Number
          </label>
          <input
            type="text"
            id="work-phone-number"
            placeholder="+123456780"
            required
            className="input-class"
            value={workPhoneNumber}
            onChange={(e) => setWorkPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="bio" className="label-class">Bio</label>
          <textarea
            id="bio"
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="resize-none w-full input-class"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="hospital" className="label-class">
            Hospital
          </label>
          <input
            placeholder="City Hospital"
            id="hospital"
            type="text"
            required
            className="input-class"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="consultation-fee" className="label-class">
            Consultation Fee
          </label>
          <input
            id="consultation-fee"
            type="number"
            required
            className="input-class"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
         <button
          type="submit"
          disabled={isPending}
          className="edit-button"
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
