import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate } from "react-router-dom"
import { getDoctorProfile } from "@/services/profile-service"

const DoctorGuard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && (isError || !data?.data)) {
      navigate("/doctor/profile", { replace: true })
    }
  }, [isLoading, isError, data, navigate]);


  if (isLoading) return <div>Loading...</div>

  if (!isError || data?.data) return <Outlet />





}

export default DoctorGuard