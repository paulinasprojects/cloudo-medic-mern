import { getPatientProfile } from "@/services/profile-service";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const PatientPage = () => {
  const navigate = useNavigate();
  const { data: patientProfile, isLoading, isError, error } = useQuery({
    queryKey: ["patientProfile"],
    queryFn: getPatientProfile,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>

  if (!patientProfile?.data) {
    navigate("/patient/profile", { replace: true })
  }

  if (isError) {
    return <div>
      {error.message}
    </div>
  }


  return (
    <div>Patient Dashboard</div>
  )
}

export default PatientPage