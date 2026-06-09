// import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context"
import { useMutation } from "@tanstack/react-query";
import { createDoctor } from "@/services/profile-service";

const DoctorSubmitInfoPage = () => {
  const { state, dispatch } = useDoctorProfileFormContext();
  const navigate = useNavigate();

  const { mutate: createDoctorMutation, isPending, isError, error } = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      toast.success("Profile created successfully");
      dispatch({ type: "RESET_FORM" });
      navigate("/doctor")
    },
    onError: () => {
      toast.error("Failed to create profile. Please try again")
    }
  })

  const handleSubmit = () => {
    createDoctorMutation({
      address: state.personalInfo.address,
      bio: state.personalInfo.bio,
      dateOfBirth: state.personalInfo.dateOfBirth,
      gender: state.personalInfo.gender,
      phoneNumber: state.personalInfo.phoneNumber,
      hospital: state.workInfo.hospital,
      education: state.workInfo.education,
      doctorLevel: state.workInfo.doctorLevel,
      licenseNumber: state.workInfo.licenseNumber,
      specialization: state.workInfo.specialization,
      consultationFee: Number(state.workInfo.consultationFee),
      yearsOfExperience: Number(state.workInfo.yearsOfExperience),
    })
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <p>{state.personalInfo.address}</p>
          <p>{state.personalInfo.dateOfBirth}</p>
          <p>{state.personalInfo.bio}</p>
          <p>{state.personalInfo.gender}</p>
          <p>{state.personalInfo.phoneNumber}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Address</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <p>{state.workInfo.education}</p>
          <p>{state.workInfo.consultationFee}</p>
          <p>{state.workInfo.doctorLevel}</p>
          <p>{state.workInfo.hospital}</p>
          <p>{state.workInfo.licenseNumber}</p>
          <p>{state.workInfo.specialization}</p>
          <p>{state.workInfo.yearsOfExperience}</p>
        </div>
      </div>

      <button onClick={() => navigate("/doctor/profile/work-info")}>Back</button>
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {isError && (
        <p className="text-red-500">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}
    </section>
  )
}

export default DoctorSubmitInfoPage