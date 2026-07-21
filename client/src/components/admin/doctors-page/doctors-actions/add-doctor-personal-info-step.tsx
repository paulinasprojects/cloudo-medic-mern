import { DoctorProfileFormAction, DoctorProfileFormData } from "@/types/doctor-profile-types"
import { Gender } from "@/types/types";
import DatePicker from "@/components/common/date-picker";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";

interface Props {
  state: DoctorProfileFormData["personalInfo"];
  dispatch: React.Dispatch<DoctorProfileFormAction>;
  onNext: () => void;
}

export default function AddDoctorPersonalInfoStep({ state, dispatch, onNext }: Props) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNext();
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="user-id" className="label-class">User ID</label>
          <input
            id="user-id"
            type="text"
            required
            placeholder="10401041"
            value={state.userId}
            onChange={(e) => dispatch({ type: "UPDATE_PERSONAL_INFO", payload: { userId: e.target.value } })}
            className="input-class"
         />
        </div>
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
            value={state.address}
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
            value={state.dateOfBirth
              ? new Date(state.dateOfBirth)
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
            className="label-class"
          >
            Gender
          </label>
          <Select
            value={state.gender}
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
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="phone-number"
            className="label-class"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone-number"
            placeholder="+123456780"
            required
            className="input-class"
            value={state.phoneNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { phoneNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="bio" className="label-class">Bio</label>
          <textarea
            id="bio"
            required
            value={state.bio}
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