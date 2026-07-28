import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { usePatientProfileFormContext } from "@/context/patient-profile-form-context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPatient } from "@/services/profile-service"

const PatientSubmitInfoPage = () => {
  const { state, dispatch } = usePatientProfileFormContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createPatientMutation, isPending, error } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Profile created successfully")
      dispatch({ type: "RESET_FORM" })
      queryClient.invalidateQueries({ queryKey: ["patientProfile"] });
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
    })
  }

  return (
    <section className="flex flex-col gap-8">
       {error && (
          <span className="text-red-500">
            {axios.isAxiosError(error)
            ? error.response?.data?.error ?? error.message
            : error.message}
          </span>
        )}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid gap-6 grid-cols-2">
          <div className="flex flex-col gap-2">
            <p>
              Address
            </p>
            <p>{state.personalInfo.address}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Phone Number
            </p>
            <p>{state.personalInfo.phoneNumber}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Date Of Birth
            </p>
            <p>{state.personalInfo.dateOfBirth}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Bio
            </p>
            <p>{state.personalInfo.bio}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Gender
            </p>
            <p className="capitalize">{state.personalInfo.gender}</p>
          </div>

        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Medical Information</h2>
        <div className="grid gap-2 grid-cols-2">
          <div className="flex flex-col gap-2">
            <p>
              Blood type
            </p>
            <p>{state.medicalInfo.bloodType}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Emergency Contact Name
            </p>
            <p>{state.medicalInfo.emergencyContactName}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Emergency Contact Number
            </p>
            <p>{state.medicalInfo.emergencyContactNumber}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Known Allergies
            </p>
            <p>{state.medicalInfo.allergies}</p>
          </div>
        </div>
      </div>
      <button className="submit-info-button" onClick={() => navigate("/patient/profile/medical-info")}>Back</button>
      <button className="submit-info-button" onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </section>
  )
}

export default PatientSubmitInfoPage