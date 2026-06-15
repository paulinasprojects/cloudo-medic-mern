/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDoctorProfile, updateDoctor } from "@/services/profile-service";

const DoctorProfileEdit = () => {

  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");
  const [consultationFee, setConsultationFee] = useState<number | string>(0);
  // const navigate = useNavigate();


  const { data, isLoading } = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
  });

  useEffect(() => {
    if (data?.data) {
      const doctor = data.data;
      setAddress(doctor.address ?? "");
      setPhoneNumber(doctor.phoneNumber ?? "");
      setBio(doctor.bio ?? "");
      setHospital(doctor.hospital ?? "");
      setConsultationFee(doctor.consultationFee ?? 0);
    }
  }, [data]);


  const { mutate: updateDoctorMutation, isPending, error } = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      // navigate("/doctor")
    },
    onError: () => {
      toast.error("Failed to update your profile.")
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDoctorMutation({
      address: address,
      phoneNumber: phoneNumber,
      bio: bio,
      hospital: hospital,
      consultationFee: consultationFee,
    });
  }


  if (isLoading) return <div>Loading...</div>


  return (
    <div className="w-full mx-auto px-4 py-4 sm:px-4">
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
              <label htmlFor="address" className="text-sm font-bold text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Main street 111"
                className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="phone-number" className="text-sm font-bold text-black dark:text-white">Phone number</label>
              <input
                type="text"
                id="phone-number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="bio" className="text-sm font-bold text-black dark:text-white">Bio</label>
              <textarea
                id="bio"
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="resize-none w-full px-4 py-1 border border-slate-700 rounded-lg text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="hospital" className="text-sm font-bold text-black dark:text-white">Hospital</label>
              <input
                id="hospital"
                type="text"
                className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="consultation-fee" className="text-sm font-bold text-black dark:text-white">Consultation Fee</label>
              <input
                id="consultation-fee"
                type="number"
                className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value === "" ? "" : parseFloat(e.target.value))}
              />
            </div>
          </div>
          <button type="submit" disabled={isPending} className="px-6 py-3 rounded-full dark:bg-white dark:text-black bg-black hover:bg-black/80 dark:hover:bg-white/80 text-white  transition-colors cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default DoctorProfileEdit