import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatientProfileFormAction, PatientProfileFormData } from "@/types/patient-profile-types"
import { createPatient } from "@/services/admin-service";

interface Props {
  state: PatientProfileFormData;
  dispatch: React.Dispatch<PatientProfileFormAction>;
  onBack: () => void;
  onSuccess: () => void;
}



export default function AddPatientSubmitInfoStep({
  state,
  dispatch,
  onBack,
  onSuccess
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: createPatientByAdmin, isPending } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Patient created successfully")
      queryClient.invalidateQueries({ queryKey: ["patients"]});
      dispatch({ type: "RESET_FORM" })
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create a patient")
    }
  });

  const handleSubmit = () => {
    createPatientByAdmin({
      userId: state.personalInfo.userId!,
      address: state.personalInfo.address,
      bio: state.personalInfo.bio,
      dateOfBirth: state.personalInfo.dateOfBirth,
      gender: state.personalInfo.gender,
      phoneNumber: state.personalInfo.phoneNumber,
      bloodType: state.medicalInfo.bloodType,
      emergencyContactNumber: state.medicalInfo.emergencyContactNumber,
      emergencyContactName: state.medicalInfo.emergencyContactName,
      allergies: state.medicalInfo.allergies
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold text-black dark:text-white">
        Review Information
      </h3>
      <div className="flex flex-col gap-4 text-sm text-gray-400">
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">UserId:</span>
          {state.personalInfo.userId}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Address:</span>
          {state.personalInfo.address}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Bio:</span>
          {state.personalInfo.bio}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Date of Birth:</span>
          {state.personalInfo.dateOfBirth}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="submit-class">Gender:</span>
          {state.personalInfo.gender}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Phone:</span>
          {state.personalInfo.phoneNumber}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Blood Type:</span>
          {state.medicalInfo.bloodType}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="submit-class">Allergies:</span>
          {state.medicalInfo.allergies}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Medical History:</span>
          {state.medicalInfo.medicalHistory}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Emergency Contact Name:</span>
          {state.medicalInfo.emergencyContactName}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Emergency Contact Number:</span>
          {state.medicalInfo.emergencyContactNumber}
        </p>
      </div>
      <div className="flex *:basis-1/2 gap-4">
        <button
          onClick={onBack}
          disabled={isPending}
          className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black duration-500 dark:hover:bg-white"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black duration-500 dark:hover:bg-white"
        >
          {isPending ? "Creating..." : "Create Patient"}
        </button>
      </div>
    </div>
  )
}