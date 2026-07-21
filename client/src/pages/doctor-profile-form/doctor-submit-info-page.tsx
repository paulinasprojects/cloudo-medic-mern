import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "@/services/profile-service";

const DoctorSubmitInfoPage = () => {
  const { state, dispatch } = useDoctorProfileFormContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createDoctorMutation, isPending, error } = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      toast.success("Profile created successfully");
      dispatch({ type: "RESET_FORM" });
      queryClient.invalidateQueries({ queryKey: ["doctorProfile"] });
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
      workPhoneNumber: state.workInfo.workPhoneNumber,
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
       {error && (
          <span className="text-red-500">
            {axios.isAxiosError(error)
            ? error.response?.data?.error ?? error.message
            : error.message}
          </span>
        )}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid gap-2 grid-cols-2">
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
              Work Phone Number
            </p>
            <p>{state.workInfo.workPhoneNumber}</p>
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
        <h2 className="text-2xl font-bold">Work Information</h2>
        <div className="grid gap-2 grid-cols-2">
          <div className="flex flex-col gap-2">
            <p>
              Education
            </p>
            <p>{state.workInfo.education}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Consultation Fee
            </p>
            <p>${state.workInfo.consultationFee}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Doctor Level
            </p>
            <p className="capitalize">{state.workInfo.doctorLevel}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Hospital
            </p>
            <p>{state.workInfo.hospital}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              License Number
            </p>
            <p>{state.workInfo.licenseNumber}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Specialization
            </p>
            <p>{state.workInfo.specialization}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Years of Experience
            </p>
            <p>{state.workInfo.yearsOfExperience}</p>
          </div>
        </div>
      </div>

      <button className="submit-info-button" onClick={() => navigate("/doctor/profile/work-info")}>Back</button>
      <button className="submit-info-button" onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </section>
  )
}

export default DoctorSubmitInfoPage