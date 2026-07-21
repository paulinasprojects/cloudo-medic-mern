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
    <div className="background">
      <form onSubmit={nextPage} className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-foreground">
          Medical Information
        </h1>
        <div className="flex flex-col gap-y-2">
          <label
            className="label-class">
            Blood Type
          </label>
          <Select
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
            className="label-class"
          >
            Emergency Contact Number
          </label>
          <input
            type="text"
            id="emergency-contact-number"
            className="input-class"
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
            className="label-class"
          >
            Emergency Contact Name
          </label>
          <input
            type="text"
            id="emergency-contact-name"
            className="input-class"
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
            className="label-class"
          >
            Allergies
          </label>
          <input
            type="text"
            id="allergies"
            className="input-class"
            value={state.medicalInfo.allergies}
            onChange={(e) => dispatch({
              type: "UPDATE_MEDICAL_INFO",
              payload: { allergies: e.target.value }
            })}
          />
        </div>
        <div className="flex *:basis-1/2 gap-4">
          <button
            className="add-work-medical-button"
            type="button"
            onClick={() => navigate("/patient/profile/personal-info")}
          >
            Back
          </button>
          <button
            className="add-work-medical-button"
            type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatientMedicalInfoPage