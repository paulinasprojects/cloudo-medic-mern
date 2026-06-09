import { useNavigate } from "react-router-dom"
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context"

const DoctorPersonalInfoPage = () => {
  const { state, dispatch } = useDoctorProfileFormContext();
  const navigate = useNavigate();

  function nextPage(e: React.FormEvent) {
    e.preventDefault();
    navigate("/doctor/profile/work-info")
  }

  return (
    <form onSubmit={nextPage} className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold dark:text-white text-black">Personal Information</h1>
      <div className="flex flex-col gap-y-2">
        <label
          className="font-bold text-white"
          htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Main Street 111"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          required
          value={state.personalInfo.address}
          onChange={(e) => dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { address: e.target.value }
          })}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="dateOfBirth">Date of birth</label>
        <input
          type="date"
          id="dateOfBirth"
          required
          value={state.personalInfo.dateOfBirth}
          onChange={(e) => dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { dateOfBirth: e.target.value }
          })}
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.personalInfo.gender} onChange={(e) => dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { gender: e.target.value as "male" | "female" }
          })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          type="text"
          id="phoneNumber"
          required
          value={state.personalInfo.phoneNumber}
          onChange={(e) => dispatch({
            type: "UPDATE_PERSONAL_INFO",
            payload: { phoneNumber: e.target.value }
          })}
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
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
          className="resize-none w-full px-4 py-1 border border-slate-700 rounded-lg text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
        />
      </div>
      <button
        className="p-2 border border-slate-700 rounded-lg transition-colors hover:bg-slate-600 hover:text-slate-400"
        type="submit">
        Next
      </button>
    </form>
  )
}

export default DoctorPersonalInfoPage