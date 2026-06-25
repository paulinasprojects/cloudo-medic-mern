import { X } from "lucide-react";
import { useReducer, useState } from "react";
import { patientProfileFormReducer, initialFormState } from "@/reducers/patient-profile-form-reducer";
import AddPatientPersonalInfoStep from "./add-patient-personal-info-step";
import AddPatientMedicalInfoStep from "./add-patient-medical-info-step";
import AddPatientSubmitInfoStep from "./add-patient-submit-info-step";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}


const STEPS = ["Personal Info", "Medical Info", "Review"]


export default function AddPatientsModal({ isOpen, onClose }: Props) {
	const [step, setStep] = useState(0);
	const [ state, dispatch ] = useReducer(patientProfileFormReducer, initialFormState);

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
					<h2 className="text-lg font-bold text-gray-500">Add New Patient</h2>
					<button className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-sm hover:bg-slate-800" onClick={handleClose}>
						<X className="size-5"/>
					</button>
				</div>
				<div className="flex items-center gap-4 px-5 py-5">
					{STEPS.map((label, i) => (
						<div key={label} className="flex items-center gap-2">
							<span className={`text-sm ${i === step ? "text-black font-bold dark:text-white" : "text-gray-600 font-medium dark:text-white/50"}`}>
								{label}
							</span>
							{i < STEPS.length - 1 && (
								<span className="text-gray-600 text-xs">
									,
								</span>
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
						<AddPatientSubmitInfoStep
							state={state}
							dispatch={dispatch}
							onBack={() => setStep(1)}
							onSuccess={handleClose}
						/>
					)}
				</div>
			</div>
		</div>
	)
}