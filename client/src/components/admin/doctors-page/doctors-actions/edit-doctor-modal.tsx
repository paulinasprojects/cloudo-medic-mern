import { Doctor } from "@/types/types";
import { X } from "lucide-react";
import { useReducer, useState } from "react";
import { doctorProfileFormReducer } from "@/reducers/doctor-profile-form-reducer";
import { DoctorProfileFormData } from "@/types/doctor-profile-types";
import AddDoctorPersonalInfoStep from "./add-doctor-personal-info-step";
import AddDoctorWorkInfoStep from "./add-doctor-work-info-step";
import EditDoctorSubmitInfoStep from "./edit-doctor-submit-info-step";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Doctor;
}

const STEPS = ["Personal Info", "Work Info", "Review"];

function buildInitialState(data: Doctor): DoctorProfileFormData {
  return {
    personalInfo: {
      userId: data.userId,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      bio: data.bio ?? "",
    },
    workInfo: {
      education: data.education,
      specialization: data.specialization,
      hospital: data.hospital,
      doctorLevel: data.doctorLevel,
      consultationFee: data.consultationFee,
      licenseNumber: data.licenseNumber,
      yearsOfExperience: data.yearsOfExperience
    },
  };
};

export default function EditDoctorModal({ data, isOpen, onClose }: Props) {
  const [step, setStep] = useState(0)
  const [state, dispatch] = useReducer(doctorProfileFormReducer, buildInitialState(data))

  if (!isOpen) return null;

  function handleClose() {
    setStep(0);
    onClose();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black rounded-sm border border-slate-700 w-full max-w-xl">
        <div className="flex items-center justify-between px-4 py-5">
          <h2 className="text-lg font-bold text-gray-500">Edit Doctor</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <div className="flex items-center gap-4 px-5 py-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`text-sm ${i === step ? "text-black font-bold dark:text-white" : "text-gray-600 font-medium dark:text-white/50"}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="text-gray-600 text-xs">,</span>}
            </div>
          ))}
        </div>
        <div className="px-4 py-6">
          {step === 0 && (
            <AddDoctorPersonalInfoStep
              state={state.personalInfo}
              dispatch={dispatch}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <AddDoctorWorkInfoStep
              state={state.workInfo}
              dispatch={dispatch}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <EditDoctorSubmitInfoStep
              state={state}
              doctorId={data.id}
              onBack={() => setStep(1)}
              onSuccess={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}