import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { usePatientProfileFormContext } from "@/context/patient-profile-form-context"
import { useMutation } from "@tanstack/react-query"
import { createPatient } from "@/services/profile-service"

const PatientSubmitInfoPage = () => {
  const { state, dispatch } = usePatientProfileFormContext();
  const navigate = useNavigate();

  const { mutate: createPatientMutation, isPending, isError, error } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Profile created successfully")
      dispatch({ type: "RESET_FORM" })
      navigate("/patient")
    },
    onError: () => {
      toast.error("Failed to create profile. Please try again")
    }
  })

  const handleSubmit = () => {
    createPatientMutation({
      address: state.personalInfo.address,
      bio: state.personalInfo.bio,
      dateOfBirth: state.personalInfo.dateOfBirth,
      gender: state.personalInfo.gender,
      phoneNumber: state.personalInfo.phoneNumber,
      bloodType: state.medicalInfo.bloodType,
      emergencyContactNumber: state.medicalInfo.emergencyContactNumber,
      emergencyContactName: state.medicalInfo.emergencyContactName,
      allergies: state.medicalInfo.allergies,
      medicalHistory: state.medicalInfo.medicalHistory,
    })
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <p>{state.personalInfo.address}</p>
          <p>{state.personalInfo.phoneNumber}</p>
          <p>{state.personalInfo.dateOfBirth}</p>
          <p>{state.personalInfo.bio}</p>
          <p>{state.personalInfo.gender}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Medical Information</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <p>{state.medicalInfo.bloodType}</p>
          <p>{state.medicalInfo.emergencyContactName}</p>
          <p>{state.medicalInfo.emergencyContactNumber}</p>
          <p>{state.medicalInfo.allergies}</p>
          <p>{state.medicalInfo.medicalHistory}</p>
        </div>
      </div>
      <button onClick={() => navigate("/patient/profile/medical-info")}>Back</button>
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

export default PatientSubmitInfoPage