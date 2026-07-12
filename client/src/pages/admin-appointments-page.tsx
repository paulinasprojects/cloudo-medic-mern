import { useState } from "react";
import axios from "axios";
import { Appointment02Icon, PatientIcon, PrescriptionIcon } from "@hugeicons/core-free-icons"
import { useGetAllAppointments, useGetAllPatients, useGetAllPrescriptions } from "@/hooks/admins/admins"
import AdminDashboardCard from "@/components/admin/admin-dashboard-card"
import { Plus } from "lucide-react";
import AppointmentsDataTable from "@/components/admin/appointments-page/appointments-table/appointments-data-table";
import {columns} from "@/components/admin/appointments-page/appointments-table/columns";
import AddAppointmentModal from "@/components/admin/appointments-page/appointments-actions/add-appointment-modal";

const AdminAppointmentsPage = () => {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const { data: patients, isLoading: isPatientsLoading, isError: isPatientsError, error: errorPatients } = useGetAllPatients();
  const { data: appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();
  const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();


  const isLoading = isPatientsLoading || isAppointmentsLoading || isPrescriptionsLoading;
  const isError = isPatientsError || isAppointmentsError || isPrescriptionsError
  const error = errorPatients || errorAppontments || errorPrescriptions;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {axios.isAxiosError(error) ? error.response?.data?.error ?? error.message : error?.message}</div>
  if (!patients?.data || !appointments?.data || !prescriptions?.data) return <div>Not found</div>

  function handleAddNewAppointment() {
    setIsModalOpen(true);
  }

  function handleCloseModal(){
    setIsModalOpen(false)
  }

  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium text-2xl xl:text-[42px]">Appointments Overview</h1>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddNewAppointment} className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black/65 dark:hover:bg-white/90 transition-colors duration-500 max-sm:py-2 sm:py-4 px-3 rounded-full">
            <Plus className="size-5"/>
            Add new Appointment
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5">
        <AdminDashboardCard
          title="Total Patients"
          data={patients.data.length}
          description="Stay informed real-time data of total patients"
          icon={PatientIcon}
        />
        <AdminDashboardCard
          icon={Appointment02Icon}
          title="Total Appointments"
          data={appointments.data.length}
          description="Stay infromed real-time data of total appointments"
        />
        <AdminDashboardCard
          icon={PrescriptionIcon}
          title="Total Prescriptions"
          data={prescriptions.data.length}
          description="Stay infromed real-time data of total prescriptions"
        />
      </div>
      <AppointmentsDataTable columns={columns} data={appointments.data}/>
      <AddAppointmentModal isOpen={isModalOpen} onClose={handleCloseModal}/>
    </div>
  )
}

export default AdminAppointmentsPage