import { useNavigate } from "react-router-dom"
import { usePatientProfileFormContext } from "@/context/patient-profile-form-context"
import { BloodTypes } from "@/types/types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";

const PatientMedicalInfoPage = () => {
  const { state, dispatch } = usePatientProfileFormContext();
  const navigate = useNavigate();

  function nextPage(e: React.FormEvent) {
    e.preventDefault();
    navigate("/patient/profile/submit-info")
  }

  return (
    <form onSubmit={nextPage} className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold dark:text-white text-black">
        Medical Information
      </h1>
      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="bloodType"
          className="font-bold dark:text-white text-black">
          Blood Type
        </label>
        <Select
          id="bloodType"
          value={state.medicalInfo.bloodType}
          onValueChange={(value) => dispatch({
            type: "UPDATE_MEDICAL_INFO",
            payload: { bloodType: value as BloodTypes }
          })}
        >
          <SelectTrigger placeholder="Select your blood type" />
          <SelectContent>
            {Object.values(BloodTypes).map((type) => (
              <SelectOption key={type} value={type}>{type}</SelectOption>
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
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.medicalInfo.emergencyContactNumber}
          onChange={(e) => dispatch({
            type: "UPDATE_MEDICAL_INFO",
            payload: { emergencyContactNumber: e.target.value }
          })}
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
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.medicalInfo.emergencyContactName}
          onChange={(e) => dispatch({
            type: "UPDATE_MEDICAL_INFO",
            payload: { emergencyContactName: e.target.value }
          })}
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
          id="eallergies"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.medicalInfo.allergies}
          onChange={(e) => dispatch({
            type: "UPDATE_MEDICAL_INFO",
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
        <textarea
          id="medical-history"
          required
          value={state.medicalInfo.medicalHistory}
          onChange={(e) => dispatch({
            type: "UPDATE_MEDICAL_INFO",
            payload: { medicalHistory: e.target.value }
          })}
          className="resize-none w-full px-4 py-1 border border-slate-700 rounded-lg text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
        />
      </div>
      <div className="flex *:basis-1/2 gap-4">
        <button
          className="p-2 border border-[#fff] rounded-sm transition-colors hover:bg-[#fff] hover:text-[#2A004E]"
          onClick={() => navigate("/patient/profile/personal-info")}
          type="button"
        >
          Back
        </button>
        <button
          className="p-2 border border-[#fff] rounded-sm transition-colors hover:bg-[#fff] hover:text-[#2A004E]"
          type="submit">
          Next
        </button>
      </div>
    </form>
  )
}

export default PatientMedicalInfoPage