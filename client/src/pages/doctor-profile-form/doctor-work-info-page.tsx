import { useNavigate } from "react-router-dom"
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context"
import { DoctorLevel, Education } from "@/types/types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";

const DoctorWorkInfoPage = () => {
  const { state, dispatch } = useDoctorProfileFormContext();
  const navigate = useNavigate();

  function nextPage(e: React.FormEvent) {
    e.preventDefault();
    navigate("/doctor/profile/submit-info")
  }

  return (
    <form onSubmit={nextPage} className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold dark:text-white text-black">
        Work Information
      </h1>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="education">Education</label>
        <Select
          id="education"
          value={state.workInfo.education} onValueChange={(value) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { education: value as Education }
          })}>
          <SelectTrigger placeholder="Select education" />
          <SelectContent>
            {Object.values(Education).map((education) => (
              <SelectOption key={education} value={education}>
                {education}
              </SelectOption>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="specialization">Specialization</label>
        <input
          id="specialization"
          type="text"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.workInfo.specialization}
          onChange={(e) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { specialization: e.target.value }
          })}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="hospital">Hospital</label>
        <input
          id="hospital"
          type="text"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.workInfo.hospital}
          onChange={(e) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { hospital: e.target.value }
          })}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="doctorLevel">Doctor Level</label>
        <Select
          id="doctorLevel"
          value={state.workInfo.doctorLevel} onValueChange={(value) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { doctorLevel: value as DoctorLevel }
          })}>
          <SelectTrigger placeholder="Select doctor level" />
          <SelectContent>
            {Object.values(DoctorLevel).map((level) => (
              <SelectOption key={level} value={level}>{level}</SelectOption>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="licenseNumber">License Number</label>
        <input
          id="licenseNumber"
          type="text"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.workInfo.licenseNumber}
          onChange={(e) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { licenseNumber: e.target.value }
          })}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="consultationFee">Consultation Fee</label>
        <input
          id="consultationFee"
          type="number"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.workInfo.consultationFee}
          onChange={(e) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { consultationFee: e.target.value === "" ? "" : parseFloat(e.target.value) }
          })}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="yearsOfExperience">Years of experience</label>
        <input
          id="yearsOfExperience"
          type="number"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
          value={state.workInfo.yearsOfExperience}
          onChange={(e) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { yearsOfExperience: e.target.value === "" ? "" : parseFloat(e.target.value) }
          })}
        />
      </div>
      <div className="flex *:basis-1/2 gap-4">
        <button
          className="p-2 border border-[#fff] rounded-sm transition-colors hover:bg-[#fff] hover:text-[#2A004E]"
          onClick={() => navigate("/doctor/profile/personal-info")}
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

export default DoctorWorkInfoPage