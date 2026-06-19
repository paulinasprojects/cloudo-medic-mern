import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoctorProfileFormData } from "@/types/doctor-profile-types";
import { editDoctorByAdmin } from "@/services/admin-service";
import { formatDate } from "@/utils/utils";


interface Props {
  doctorId: string;
  state: DoctorProfileFormData;
  onBack: () => void;
  onSuccess: () => void
}


export default function EditDoctorSubmitInfoStep({
  doctorId,
  state,
  onBack,
  onSuccess
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: editDoctorByAdminMutation, isPending } = useMutation({
    mutationFn: (doctorData: {
      userId: string;
      address: string;
      phoneNumber: string;
      bio: string;
      dateOfBirth: string;
      education: string;
      doctorLevel: string;
      gender: string;
      specialization: string;
      hospital: string;
      licenseNumber: string;
      consultationFee: number;
      yearsOfExperience: number;
    }) => editDoctorByAdmin(doctorId, doctorData),
    onSuccess: () => {
      toast.success("Doctor updated successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] })
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update the doctors information")
    }
  })

  const handleSubmit = () => {
    editDoctorByAdminMutation({
      userId: state.personalInfo.userId!,
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
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold text-black dark:text-white">
        Review Information
      </h3>
      <div className="flex flex-col gap-4 text-sm text-gray-400">
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">UserId:</span>
          {state.personalInfo.userId}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Address:</span>
          {state.personalInfo.address}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Bio:</span>
          {state.personalInfo.bio}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Date of Birth:</span>
          {formatDate(state.personalInfo.dateOfBirth)}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-white font-medium">Gender:</span>
          {state.personalInfo.gender}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Phone:</span>
          {state.personalInfo.phoneNumber}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Hospital:</span>
          {state.workInfo.hospital}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-white font-medium">Education:</span>
          {state.workInfo.education}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="text-white font-medium">Doc Level:</span>
          {state.workInfo.doctorLevel}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Specialization:</span>
          {state.workInfo.specialization}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">License:</span>
          {state.workInfo.licenseNumber}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="text-white font-medium">Experience:</span>
          {state.workInfo.yearsOfExperience} years
        </p>
      </div>

      <div className="flex *:basis-1/2 gap-4">
        <button
          onClick={onBack}
          disabled={isPending}
          className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black  duration-500 dark:hover:bg-white"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black  duration-500 dark:hover:bg-white"
        >
          {isPending ? "Editing..." : "Edit Doctor"}
        </button>
      </div>
    </div>
  )
}