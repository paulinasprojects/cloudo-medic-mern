import { patientProfileFormReducer } from "@/reducers/patient-profile-form-reducer";
import { PatientProfileFormData } from "@/types/patient-profile-types";
import { Patient } from "@/types/types";
import { X } from "lucide-react";
import { useReducer, useState } from "react";
import AddPatientPersonalInfoStep from "./add-patient-personal-info-step";
import AddPatientMedicalInfoStep from "./add-patient-medical-info-step";
import EditPatientSubmitInfoStep from "./edit-patient-submit-info";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Patient
}

const STEPS = ["Personal Info", "Medical Info", "Review"];

function buildInitialState(data: Patient): PatientProfileFormData {
  return {
    personalInfo: {
      userId: data.userId,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      bio: data.bio ?? "",
    },
    medicalInfo: {
      bloodType: data.bloodType,
      emergencyContactNumber: data.emergencyContactNumber,
      emergencyContactName: data.emergencyContactName,
      medicalHistory: data.medicalHistory,
      allergies: data.allergies
    }
  }
}

export default function EditPatientModal({ data, isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(patientProfileFormReducer, buildInitialState(data));
  
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
          <h2 className="text-lg font-bold text-gray-500">Edit Patient</h2>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800">
            <X className="size-5"/>
          </button>
        </div>
        <div className="flex items-center gap-4 px-5 py-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`text-sm ${i === step ? "text-black font-bold dark:text-white" : "text-gray-600 font-medium dark:text-white/50"}`}>
                {label}
              </span>
              {i < STEPS.length -1 && (
                <span className="text-gray-600 text-xs">,</span>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-6">
          {step === 0 && (
            <AddPatientPersonalInfoStep
              state={state.personalInfo}
              dispatch={dispatch}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <AddPatientMedicalInfoStep
              state={state.medicalInfo}
              dispatch={dispatch}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <EditPatientSubmitInfoStep
              state={state}
              patientId={data.id}
              onBack={() => setStep(1)}
              onSuccess={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}