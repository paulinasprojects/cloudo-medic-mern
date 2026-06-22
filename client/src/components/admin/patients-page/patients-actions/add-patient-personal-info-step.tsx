import DatePicker from "@/components/common/date-picker";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";
import { PatientProfileFormAction, PatientProfileFormData } from "@/types/patient-profile-types"
import { Gender } from "@/types/types";

interface Props {
  state: PatientProfileFormData["personalInfo"];
  dispatch: React.Dispatch<PatientProfileFormAction>;
  onNext: () => void;
}

export default function AddPatientPersonalInfoStep({
  state, 
  dispatch,
  onNext
}: Props) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNext();
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-6">
      <form  onSubmit={handleSubmit} className="flex flex-co gap-4">
        <div className="flex flex-col gap-y-2">
          <label 
            htmlFor="user-id" 
            className="text-sm font-medium dark:text-white text-black"
          >
            User ID
          </label>
          <input 
            id="user-id"
            type="text"
						className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
            required
            value={state.userId}
            onChange={(e) => dispatch({
              type: "UPDATE_PERSONAL_INFO",
              payload: { userId: e.target.value }
            })}
           />
        </div>
        <div className="flex flex-col gap-y-2">
          <label 
						htmlFor="address"
						className="text-sm font-bold dark:text-white text-black"
						>
							Address
          </label>
					<input 
						id="address"
						type="text"
						required
						placeholder="Main Street 111"
						className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
						value={state.address}
						onChange={(e) => dispatch({
							type: "UPDATE_PERSONAL_INFO",
							payload: { address: e.target.value }
						})}
					/>
        </div>
				<div className="flex flex-col gap-y-2">
					<label className="font-bold text-black dark:text-white">
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
					<label className="text-sm font-bold dark:text-white text-black">
						Gender
					</label>
					<Select
						value={state.gender}
						onValueChange={(value) => dispatch({
							type: "UPDATE_PERSONAL_INFO",
							payload: { gender: value as Gender }
						})}
					>
						<SelectTrigger placeholder="Select gender"/>
						<SelectContent>
							{Object.values(Gender).map((gender) => (
								<SelectOption key={gender} value={gender}>
									{gender}
								</SelectOption>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-col gap-y-2">
					<label 
						htmlFor="phone-number"
						className="text-sm font-bold dark:text-white text-black"
					>
						Phone number
					</label>
					<input 
						type="text"
						id="phone-number"
						required
						className="px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
						value={state.phoneNumber}
						onChange={(e) => dispatch({
							type: "UPDATE_PERSONAL_INFO",
							payload: { phoneNumber: e.target.value }
						})}
					 />
				</div>
				<div className="flex flex-col gap-y-2">
					<label 
						htmlFor="bio" 
						className="text-sm font-bold dark:text-white text-black"
					>
						Bio
					</label>
					<textarea 
						id="bio"
						required
						className="resize-none w-full px-4 py-1 border border-slate-700 rounded-full dark:text-white focus:outline-none focus:border-slate-300 transition-colors"
						value={state.bio}
						onChange={(e) => dispatch({
							type: "UPDATE_PERSONAL_INFO",
							payload: { bio: e.target.value }
						})}
					/>
				</div>
				<button
					className="px-6 py-3 rounded-full dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
				>
					Next
				</button>
      </form>
    </div>
  )
}