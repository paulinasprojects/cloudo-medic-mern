import { getAllAppointments, getAllDoctors, getAllPrescriptions, getAllUsers, getAllPatients } from "@/services/admin-service";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

export const useGetAllDoctors = () => useQuery({
  queryKey: ["doctors"],
  queryFn: getAllDoctors,
  staleTime: ms("24h")
})

export const useGetAllPatients = () => useQuery({
  queryKey: ["patients"],
  queryFn: getAllPatients,
  staleTime: ms("24h")
})
export const useGetAllUsers = () => useQuery({
  queryKey: ["users"],
  queryFn: getAllUsers,
  staleTime: ms("24h")
})
export const useGetAllAppointments = () => useQuery({
  queryKey: ["appointments"],
  queryFn: getAllAppointments,
  staleTime: ms("24h")
})

export const useGetAllPrescriptions = () => useQuery({
  queryKey: ["appointments"],
  queryFn: getAllPrescriptions,
  staleTime: ms("24h")
})