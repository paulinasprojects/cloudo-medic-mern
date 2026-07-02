import { getPatientProfile } from "@/services/profile-service";
import { useQuery } from "@tanstack/react-query";

 export const useGetPatientProfile = () => useQuery({
    queryKey: ["patientProfile"],
    queryFn: getPatientProfile,
  });