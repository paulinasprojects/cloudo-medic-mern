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
    <div className="background">
      <form onSubmit={nextPage} className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold dark:text-white text-black">
          Work Information
        </h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="education" className="label-class">Education</label>
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
          <label htmlFor="specialization" className="label-class">Specialization</label>
          <input
            id="specialization"
            type="text"
            className="input-class"
            value={state.workInfo.specialization}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { specialization: e.target.value }
            })}
          />
        </div>
       <div className="flex flex-col gap-y-2">
          <label
            htmlFor="work-phone-number"
            className="label-class text-[12px]"
          >
            Work Phone Number
          </label>
          <input
            id="work-phone-number"
            type="text"
            placeholder="+123141294"
            required
            className="input-class"
            value={state.workInfo.workPhoneNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { workPhoneNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="hospital" className="label-class">Hospital</label>
          <input
            id="hospital"
            type="text"
            className="input-class"
            value={state.workInfo.hospital}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { hospital: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="doctor-level" className="label-class">Doctor Level</label>
          <Select
            id="doctor-level"
            value={state.workInfo.doctorLevel} onValueChange={(value) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { doctorLevel: value as DoctorLevel }
            })}>
            <SelectTrigger placeholder="Select doctor level" className="text-[11px]" />
            <SelectContent>
              {Object.values(DoctorLevel).map((level) => (
                <SelectOption key={level} value={level}>{level}</SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="license-number" className="label-class">License Number</label>
          <input
            id="license-number"
            type="text"
            className="input-class"
            value={state.workInfo.licenseNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { licenseNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="consultation-fee" className="label-class">Consultation Fee</label>
          <input
            id="consultation-fee"
            type="number"
            className="input-class"
            value={state.workInfo.consultationFee}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { consultationFee: e.target.value === "" ? "" : parseFloat(e.target.value) }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="years-of-experience" className="label-class">Years of experience</label>
          <input
            id="years-of-experience"
            type="number"
            className="input-class"
            value={state.workInfo.yearsOfExperience}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { yearsOfExperience: e.target.value === "" ? "" : parseFloat(e.target.value) }
            })}
          />
        </div>
        <div className="flex *:basis-1/2 gap-4">
          <button
            className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black  duration-500 dark:hover:bg-white"
            onClick={() => navigate("/doctor/profile/personal-info")}
            type="button"
          >
            Back
          </button>
          <button
            className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black  duration-500 dark:hover:bg-white"
            type="submit">
            Next
          </button>

        </div>
      </form>
    </div>
  )
}

export default DoctorWorkInfoPage