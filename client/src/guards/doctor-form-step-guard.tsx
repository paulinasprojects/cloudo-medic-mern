import { Navigate } from "react-router-dom";
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context";

interface Props {
  children: React.ReactNode;
  requiredStep: "personalInfo" | "workInfo";
}

const DoctorFormStepGuard = ({
  children,
  requiredStep
}: Props) => {

  const { state } = useDoctorProfileFormContext();

  const isPersonalInfoCompleted =
    state.personalInfo.address !== "" &&
    state.personalInfo.dateOfBirth !== "" &&
    state.personalInfo.gender !== "" &&
    state.personalInfo.phoneNumber !== "" &&
    state.personalInfo.bio !== "";

  if (requiredStep === "workInfo" && !isPersonalInfoCompleted) {
    return <Navigate to="/doctor/profile/personal-info" replace />
  }


  return <>
    {children}
  </>
}

export default DoctorFormStepGuard;