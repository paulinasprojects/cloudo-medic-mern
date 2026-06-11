import { Navigate } from "react-router-dom";
import { useDoctorProfileFormContext } from "@/context/doctor-profile-form-context";

interface Props {
  children: React.ReactNode;
  requiredStep: "personalInfo" | "medicalInfo";
}

const PatientFormStepGuard = ({
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

  if (requiredStep === "medicalInfo" && !isPersonalInfoCompleted) {
    return <Navigate to="/patient/profile/personal-info" replace />
  }


  return <>
    {children}
  </>
}

export default PatientFormStepGuard;