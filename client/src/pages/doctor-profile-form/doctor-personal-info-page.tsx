import { useNavigate } from "react-router-dom"
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context"
import { Gender } from "@/types/types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import DatePicker from "@/components/common/date-picker";

const DoctorPersonalInfoPage = () => {
  const { state, dispatch } = useDoctorProfileFormContext();
  const navigate = useNavigate();

  function nextPage(e: React.FormEvent) {
    e.preventDefault();
    navigate("/doctor/profile/work-info")
  }


  return (
    <div className="background">
      <form onSubmit={nextPage} className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold dark:text-white text-black">Personal Information</h1>
        <div className="flex flex-col gap-y-2">
          <label
            className="label-class"
            htmlFor="address">
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
          <label className="label-class">
            Date of birth
          </label>
          <DatePicker
            placeholder="Pick a date of birth"
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
          <label className="label-class">Gender</label>
          <Select
            value={state.personalInfo.gender}
            onValueChange={(value) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { gender: value as Gender }
            })}>
            <SelectTrigger placeholder="Select gender" />
            <SelectContent>
              {Object.values(Gender).map((gender) => (
                <SelectOption key={gender} value={gender}>{gender}</SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="phone-number" className="label-class">Phone number</label>
          <input
            type="text"
            id="phone-number"
            required
            value={state.personalInfo.phoneNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { phoneNumber: e.target.value }
            })}
            className="input-class"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="bio" className="label-class">Bio</label>
          <textarea
            id="bio"
            required
            value={state.personalInfo.bio}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { bio: e.target.value }
            })}
            className="resize-none w-full input-class"
          />
        </div>
        <button
          className="create-button"
          type="submit">
          Next
        </button>
      </form>
    </div>
  )
}

export default DoctorPersonalInfoPage