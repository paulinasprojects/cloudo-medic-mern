import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/utils/utils";
import { PatientProfileFormData } from "@/types/patient-profile-types";
import { editPatientByAdmin } from "@/services/admin-service";

interface Props {
  patientId: string;
  state: PatientProfileFormData;
  onBack: () => void;
  onSuccess: () => void;
}

export default function EditPatientSubmitInfoStep({
  patientId,
  state,
  onBack,
  onSuccess
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: editPatientByAdminMuttion, isPending } = useMutation({
    mutationFn: (patientData: {
      userId: string;
      address: string;
      phoneNumber: string;
      bio: string;
      dateOfBirth: string;
      gender: string;
      bloodType: string;
      allergies: string;
      medicalHistory: string;
      emergencyContactName: string;
      emergencyContactNumber: string;
    }) => editPatientByAdmin(patientId, patientData),
    onSuccess: () => {
      toast.success("Patient updated successfully");
      queryClient.invalidateQueries({ queryKey: ["patient"]})
      onSuccess();
    }
  });

  const handleSubmit = () => {
    editPatientByAdminMuttion({
      userId: state.personalInfo.userId!,
      address: state.personalInfo.address,
      bio: state.personalInfo.bio,
      dateOfBirth: state.personalInfo.dateOfBirth,
      gender: state.personalInfo.gender,
      phoneNumber: state.personalInfo.phoneNumber,
      bloodType: state.medicalInfo.bloodType,
      allergies: state.medicalInfo.allergies,
      medicalHistory: state.medicalInfo.medicalHistory!,
      emergencyContactName: state.medicalInfo.emergencyContactName,
      emergencyContactNumber: state.medicalInfo.emergencyContactNumber
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold text-black dark:text-white">
        Review Information
      </h3>
      <div className="flex flex-col gap-4 text-sm text-gray-400">
        <p className="inline-flex gap-2 items-center">
          <span className="text-black dark:text-white font-medium">UserId:</span>
          {state.personalInfo.userId}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-black dark:text-white font-medium">Address:</span>
          {state.personalInfo.address}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-black dark:text-white font-medium">Bio:</span>
          {state.personalInfo.bio}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-black dark:text-white font-medium">Date of Birth:</span>
          {formatDate(state.personalInfo.dateOfBirth)}
        </p>
         <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-black dark:text-white font-medium">Gender:</span>
          {state.personalInfo.gender}
        </p>
         <p className="inline-flex gap-2 items-center">
          <span className="text-black dark:text-white font-medium">Phone:</span>
          {state.personalInfo.phoneNumber}
        </p>
         <p className="inline-flex gap-2 items-center ">
          <span className="text-black dark:text-white font-medium">Blood Type:</span>
          {state.medicalInfo.bloodType}
        </p>
         <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-black dark:text-white font-medium">Allergies:</span>
          {state.medicalInfo.allergies}
        </p>
         <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-black dark:text-white font-medium">Medical History:</span>
          {state.medicalInfo.medicalHistory}
        </p>
         <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-black dark:text-white font-medium">Emergency Contact Name:</span>
          {state.medicalInfo.emergencyContactName}
        </p>
         <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-black dark:text-white font-medium">Emergency Contact Number:</span>
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
          {isPending ? "Editing..." : "Edit Patient"}
        </button>
      </div>
    </div>
  )
}