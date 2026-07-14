import axios from "axios"
import { Plus } from "lucide-react"
import { Appointment02Icon, VaccineIcon, PrescriptionIcon } from "@hugeicons/core-free-icons"
import { useGetAllAppointments, useGetAllPrescriptions, useGetAllVaccines } from "@/hooks/admins/admins"
import AdminDashboardCard from "@/components/admin/admin-dashboard-card"

const AdminVaccinesPage = () => {
  const { data: appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();
  const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();
  const { data: vaccines, isLoading: isVaccinesLoading, isError: isVaccinesError, error: errorVaccines } = useGetAllVaccines();

  const isLoading = isVaccinesLoading || isAppointmentsLoading || isPrescriptionsLoading;
  const isError = isVaccinesError || isAppointmentsError || isPrescriptionsError;
  const error = errorVaccines || errorAppontments || errorPrescriptions;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {axios.isAxiosError(error) ? error.response?.data?.error ?? error.message : error?.message}</div>
  if (!vaccines?.data || !appointments?.data || !prescriptions?.data) return <div>Not found</div>

  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium text-2xl xl:text-[42px]">Vaccines Overview</h1>
        <div className="flex gap-2 items-center">
          <button className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black/65 dark:hover:bg-white/90 transition-colors max-sm:py-2 sm:py-4 px-3 rounded-full">
            <Plus className="size-5"/>
            Add New Vaccine
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
        <AdminDashboardCard
          title="Total Vaccines"
          data={vaccines.data.length}
          description="Stay informed real-time data of total vaccines"
          icon={VaccineIcon}
        />
        <AdminDashboardCard
          title="Total Appointments"
          data={appointments.data.length}
          description="Stay informed real-time data of total appointments"
          icon={Appointment02Icon}
        />
        <AdminDashboardCard
          title="Total Prescriptions"
          data={prescriptions.data.length}
          description="Stay informed real-time data of total prescriptions"
          icon={PrescriptionIcon}
        />
      </div>
    </div>
  )
}

export default AdminVaccinesPage