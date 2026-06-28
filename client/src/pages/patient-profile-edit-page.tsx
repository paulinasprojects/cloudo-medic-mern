/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getPatientProfile, updatePatient } from "@/services/profile-service"

const PatientProfileEdit = () => {
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState<string>("");
  const [emergencyContactName, setEmergencyContactName] = useState<string>("");


  const { data, isLoading } = useQuery({
    queryKey: ["patientProfile"],
    queryFn: getPatientProfile
  });

  useEffect(() => {
    if (data?.data) {
      const patient = data.data;
      setAddress(patient.address ?? "")
      setPhoneNumber(patient.phoneNumber ?? "")
      setEmergencyContactName(patient.emergencyContactName ?? "");
      setEmergencyContactNumber(patient.emergencyContactNumber ?? "");
    }
  }, [data]);

  const { mutate: updatePatientMutation, error, isPending } = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      toast.success("Profile updated successfully")
    },
    onError: () => {
      toast.error("Failed to update your profile")
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePatientMutation({
      address: address,
      phoneNumber: phoneNumber,
      emergencyContactNumber: emergencyContactNumber,
      emergencyContactName: emergencyContactName,
    });
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="w-full mx-auto px-4 py-8 sm:px-4">
      <div className="border border-[#e8e8e8] rounded-xl p-5">
        <h1 className="text-4xl font-bold dark:text-white text-black">
          Update Your Information
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <p className="text-red-500">{error.message}</p>
          )}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="address" className="label-class">
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
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="phone-number" className="label-class">
                Phone Number
              </label>
              <input
                type="text"
                id="phone-number"
                className="input-class"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="emergency-contact-number" className="label-class">
                Emergency Contact Number
              </label>
              <input
                type="text"
                id="emergency-contact-number"
                className="input-class"
                required
                value={emergencyContactNumber}
                onChange={(e) => setEmergencyContactNumber(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="emergency-contact-name" className="label-class">
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergency-contact-name"
                className="input-class"
                required
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-full dark:bg-white dark:text-black bg-black hover:bg-black/80 dark:hover:bg-white/80 text-white  transition-colors cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PatientProfileEdit