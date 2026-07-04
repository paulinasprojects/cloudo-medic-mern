import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoctorProfileFormAction, DoctorProfileFormData } from "@/types/doctor-profile-types";
import { createDoctor } from "@/services/admin-service";

interface Props {
  state: DoctorProfileFormData;
  dispatch: React.Dispatch<DoctorProfileFormAction>;
  onBack: () => void;
  onSuccess: () => void
}

export default function AddDoctorSubmitInfoStep({ state, dispatch, onBack, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate: createDoctorByAdmin, isPending } = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      toast.success("Doctor created successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      dispatch({ type: "RESET_FORM" })
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to create a doctor")
    }
  });

  const handleSubmit = () => {
    createDoctorByAdmin({
      userId: state.personalInfo.userId!,
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
          <span className="submit-class">Work Phone:</span>
          {state.workInfo.workPhoneNumber}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Hospital:</span>
          {state.workInfo.hospital}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="submit-class">Education:</span>
          {state.workInfo.education}
        </p>
        <p className="inline-flex gap-2 items-center capitalize">
          <span className="submit-class">Doc Level:</span>
          {state.workInfo.doctorLevel}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Specialization:</span>
          {state.workInfo.specialization}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">License:</span>
          {state.workInfo.licenseNumber}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Consultation Fee:</span>
          {state.workInfo.consultationFee}
        </p>
        <p className="inline-flex gap-2 items-center">
          <span className="submit-class">Experience:</span>
          {state.workInfo.yearsOfExperience} years
        </p>
      </div>

      <div className="flex *:basis-1/2 gap-4">
        <button
          onClick={onBack}
          disabled={isPending}
          className="p-2 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="p-2 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Doctor"}
        </button>
      </div>
    </div>
  )
}