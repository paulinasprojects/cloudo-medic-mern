import { getDoctorProfile } from "@/services/profile-service";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
  const navigate = useNavigate();
  const { data: doctorProfile, isLoading, isError, error } = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>

  if (!doctorProfile?.data) {
    navigate("/doctor/profile", { replace: true })
  }

  if (isError) {
    return <div>
      {error.message}
    </div>
  }

  return (
    <div>
      Doctor Dashboard
    </div>
  )


}

export default DoctorPage