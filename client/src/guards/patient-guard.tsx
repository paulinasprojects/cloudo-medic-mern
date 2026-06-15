import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate } from "react-router-dom"
import { getPatientProfile } from "@/services/profile-service"

const PatientGuard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientProfile"],
    queryFn: getPatientProfile,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && (isError || !data?.data)) {
      navigate("/patient/profile", { replace: true })
    }
  }, [isLoading, isError, data, navigate]);


  if (isLoading) return <div>Loading...</div>

  if (!isError || data?.data) return <Outlet />





}

export default PatientGuard