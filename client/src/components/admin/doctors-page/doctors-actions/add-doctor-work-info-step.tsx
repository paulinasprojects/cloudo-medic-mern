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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="education"
            className="label-class text-[12px]"
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
            className="label-class text-[12px]"
          >
            Specialization
          </label>
          <input
            id="specialization"
            type="text"
            placeholder="Cardiology"
            required
            className="input-class"
            value={state.specialization}
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
            value={state.workPhoneNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { workPhoneNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="hospital" className="label-class text-[12px]">
            Hospital
          </label>
          <input
            placeholder="City Hospital"
            id="hospital"
            type="text"
            required
            className="input-class"
            value={state.hospital}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { hospital: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="label-class text-[12px]">
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
          <label htmlFor="license-number" className="label-class text-[12px]">
            License Number
          </label>
          <input
            placeholder="004919"
            id="license-number"
            type="text"
            required
            className="input-class"
            value={state.licenseNumber}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { licenseNumber: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="consultation-fee" className="label-class text-[12px]">
            Consultation Fee
          </label>
          <input
            id="consultation-fee"
            type="number"
            required
            className="input-class"
            value={state.consultationFee}
            onChange={(e) => dispatch({
              type: "UPDATE_WORK_INFO",
              payload: { consultationFee: e.target.value }
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="years-of-experience" className="label-class text-[12px]">
            Years of experience
          </label>
        <input
          id="years-of-experience"
          type="number"
          required
          className="input-class"
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
            className="p-2 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="submit"
            className="p-2 dark:bg-white hover:dark:bg-white/80 dark:text-black bg-black hover:bg-black/80 text-white rounded-full  transition-colors duration-400 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}