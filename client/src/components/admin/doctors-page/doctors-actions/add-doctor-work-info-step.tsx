import { DoctorLevel, Education } from "@/types/types";
import { DoctorProfileFormAction, DoctorProfileFormData } from "@/types/doctor-profile-types";
import { Select, SelectContent, SelectOption, SelectTrigger } from "@/components/common/select";

interface Props {
  state: DoctorProfileFormData["workInfo"];
  dispatch: React.Dispatch<DoctorProfileFormAction>;
  onNext: () => void;
  onBack: () => void
}


export default function AddDoctorWorkInfoStep({ state, dispatch, onNext, onBack }: Props) {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNext();
  }

  function goBack() {
    onBack();
  }

  return (
    <div className="col-span-3 sm:col-span-3 flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="education"
            className="font-bold text-black dark:text-white text-[12px]"
          >
            Education
          </label>
          <Select
            id="education"
            value={state.education}
            onValueChange={(value) => dispatch({
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
          <label
            htmlFor="specialization"
            className="font-bold text-black dark:text-white text-[12px]"
          >
            Specialization
          </label>
          <input
            id="specialization"
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            value={state.specialization}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { specialization: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="hospital" className="font-bold text-black dark:text-white text-[12px]">
            Hospital
          </label>
          <input
            id="hospital"
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            value={state.hospital}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { hospital: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="font-bold text-black dark:text-white text-[12px]">
            Doctor Level
          </label>
          <Select
            id="doctor-level"
            value={state.doctorLevel}
            onValueChange={(value) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { doctorLevel: value as DoctorLevel }
            })}
          >
            <SelectTrigger placeholder="Select doctor level" />
            <SelectContent>
              {Object.values(DoctorLevel).map((level) => (
                <SelectOption
                  key={level}
                  value={level}
                >
                  {level}
                </SelectOption>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="license-number" className="font-bold text-black dark:text-white text-[12px]">
            License Number
          </label>
          <input
            id="license-number"
            type="text"
            className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            value={state.licenseNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { licenseNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="consultation-fee" className="font-bold text-black dark:text-white text-[12px]">
            Consultation Fee
          </label>
          <input
            id="consultation-fee"
            type="number"
            className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            value={state.consultationFee}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { consultationFee: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="years-of-experience" className="font-bold text-black dark:text-white text-[12px]">
            Years of experience
          </label>
        <input
          id="years-of-experience"
          type="number"
          className="px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-[11px] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
          value={state.yearsOfExperience}
          onChange={(e) => dispatch({
            type: "UPDATE_WORK_INFO",
            payload: { yearsOfExperience: e.target.value }
          })}
        />
        </div>
        <div className="flex *:basis-1/2 gap-4">
          <button
            type="button"
            onClick={goBack}
            className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black  duration-500 dark:hover:bg-white"
          >
            Back
          </button>
          <button
            type="submit"
            className="p-2 border border-black dark:border-white rounded-sm transition-colors hover:bg-black hover:text-white dark:hover:text-black  duration-500 dark:hover:bg-white"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}