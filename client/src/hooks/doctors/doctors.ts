import { getDoctorProfile } from "@/services/profile-service";
import { useQuery } from "@tanstack/react-query";

 export const useGetDoctorProfile = () => useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
    retry: false,
  });