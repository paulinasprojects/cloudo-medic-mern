import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate } from "react-router-dom"
import { getPatientProfile } from "@/services/profile-service"

const PatientProfileGuard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientProfile"],
    queryFn: getPatientProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.data) {
    navigate("/patient", { replace: true })
    }
  }, [data, navigate])

  if (isLoading) return <div>Loading...</div>
  if (isError || !data?.data) return <Outlet />
}

export default PatientProfileGuard