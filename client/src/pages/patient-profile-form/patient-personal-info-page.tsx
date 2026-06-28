import { useNavigate } from "react-router-dom"
import { usePatientProfileFormContext } from "@/context/patient-profile-form-context"
import { Gender } from "@/types/types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import DatePicker from "@/components/common/date-picker";

const PatientPersonalInfoPage = () => {
  const { state, dispatch } = usePatientProfileFormContext();
  const navigate = useNavigate();

  function nextPage(e: React.FormEvent) {
    e.preventDefault();
    navigate("/patient/profile/medical-info")
  }

  return (
    <div className="background">
      <form onSubmit={nextPage} className="flex flex-col gap-8">
        <h1 className="text-3xl label-class">Personal Information</h1>
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="address"
            className="label-class"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Main Street 111"
            className="input-class"
            required
            value={state.personalInfo.address}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { address: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="date-of-birth" className="label-class">
            Date of birth
          </label>
          <DatePicker
            placeholder="Pick a date of birth"
            id="date-of-birth"
            value={state.personalInfo.dateOfBirth
              ? new Date(state.personalInfo.dateOfBirth)
              : undefined
            }
            onChange={(date) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: {
                dateOfBirth: date
                  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                  : ""
              }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="gender"
            className="label-class"
          >
            Gender
          </label>
          <Select
            id="gender"
            value={state.personalInfo.gender}
            onValueChange={(value) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { gender: value as Gender }
            })}
          >
            <SelectTrigger placeholder="Select gender" />
            <SelectContent>
              {Object.values(Gender).map((gender) => (
                <SelectOption key={gender} value={gender}>{gender}</SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y">
          <label
            htmlFor="phone-number"
            className="label-class"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone-number"
            required
            className="input-class"
            value={state.personalInfo.phoneNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { phoneNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            required
            value={state.personalInfo.bio}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { bio: e.target.value }
            })}
            className="resize-none w-full px-4 py-1 border border-slate-700 rounded-lg text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          />
        </div>
        <button
          className="p-2 border border-slate-700 rounded-lg transition-colors hover:bg-slate-600 hover:text-slate-400"
          type="submit">
          Next
        </button>
      </form>
    </div>
  )
}

export default PatientPersonalInfoPage