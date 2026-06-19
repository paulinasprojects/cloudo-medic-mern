import { X } from "lucide-react";
import { useReducer, useState } from "react";
import { doctorProfileFormReducer, initialFormState } from "@/reducers/doctor-profile-form-reducer";
import AddDoctorPersonalInfoStep from "./add-doctor-personal-info-step";
import AddDoctorWorkInfoStep from "./add-doctor-work-info-step";
import AddDoctorSubmitInfoStep from "./add-doctor-submit-info-step";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = ["Personal Info", "Work Info", "Review"];

export default function AddDoctorsModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(doctorProfileFormReducer, initialFormState);

  if (!isOpen) return null;

  function handleClose() {
    setStep(0)
    dispatch({ type: "RESET_FORM" })
    onClose();
  }

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }


  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-black rounded-sm border border-slate-800 w-full max-w-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-bold text-gray-500">Add New Doctor</h2>
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
            <AddDoctorSubmitInfoStep
              state={state}
              onBack={() => setStep(1)}
              onSuccess={handleClose}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </div>
  )
}