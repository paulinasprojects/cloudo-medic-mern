import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate } from "react-router-dom"
import { getDoctorProfile } from "@/services/profile-service"

const DoctorProfileGuard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.data) {
      navigate("/doctor", { replace: true })
    }
  }, [data, navigate])

  if (isLoading) return <div>Loading...</div>
  if (isError || !data?.data) return <Outlet />
}

export default DoctorProfileGuard