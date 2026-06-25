import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { PatientProfileFormAction, PatientProfileFormData } from "@/types/patient-profile-types"
import { BloodTypes } from "@/types/types";


interface Props {
  state: PatientProfileFormData["medicalInfo"];
  dispatch: React.Dispatch<PatientProfileFormAction>;
  onNext: () => void;
  onBack: () => void;
}

export default function AddPatientMedicalInfoStep({
  state,
  dispatch,
  onNext,
  onBack
}: Props) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNext();
  }

  function goBack() {
    onBack();
  }

  return (
    <div className="col-span-3 sm:cols-3 flex flex-col gap-2">
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-y-2">
          <label className="font-bold dark:text-white text-black">
            Blood Type
          </label>
          <Select
            value={state.bloodType}
            onValueChange={(value) => dispatch({
              type: "UPDATE_MEDICAL_INFO",
              payload: {bloodType: value as BloodTypes }
            })}
          >
            <SelectTrigger placeholder="Select blood type"/>
            <SelectContent>
              {Object.values(BloodTypes).map((type) => (
                <SelectOption 
                  key={type} 
                  value={type}
                >
                  {type}
                </SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="emergency-contact-number"
            className="font-bold dark:text-white text-black"
          >
            Emergency Contact Number
          </label>
          <input 
            type="text" 
            id="emergency-contact-number"
            className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
            value={state.emergencyContactNumber}
            onChange={(e) => dispatch({
              type:"UPDATE_MEDICAL_INFO",
              payload: { emergencyContactNumber: e.target.value }
            }) }  
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="emergency-contact-name"
            className="font-bold dark:text-white text-black"
          >
            Emergency Contact Name
          </label>
          <input 
            type="text" 
            id="emergency-contact-name"
            className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
            value={state.emergencyContactName}
            onChange={(e) => dispatch({
              type:"UPDATE_MEDICAL_INFO",
              payload: { emergencyContactName: e.target.value }
            }) }  
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="allergies"
            className="font-bold dark:text-white text-black"
          >
            Allergies
          </label>
          <input 
            type="text" 
            id="allergies"
            className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
            value={state.allergies}
            onChange={(e) => dispatch({
              type:"UPDATE_MEDICAL_INFO",
              payload: { allergies: e.target.value }
            })}  
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="medical-history"
            className="font-bold dark:text-white text-black"
          >
            Medical History
          </label>
          <input 
            type="text" 
            id="medical-history"
            className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
            value={state.medicalHistory}
            onChange={(e) => dispatch({
              type:"UPDATE_MEDICAL_INFO",
              payload: { medicalHistory: e.target.value }
            })}  
          />
        </div>
        <div className="flex *:basis-1/2 gap-4">
          <button
            type="button"
            onClick={goBack}
            className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black duration-500 dark:hover:bg-white"

          >
            Back
          </button>
          <button
            type="submit"
            className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black duration-500 dark:hover:bg-white"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}