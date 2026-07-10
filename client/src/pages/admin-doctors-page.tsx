import axios from "axios";
import { useState } from "react";
import { Doctor01Icon, PrescriptionIcon, Appointment02Icon } from "@hugeicons/core-free-icons";
import { Plus } from "lucide-react";
import { useGetAllAppointments, useGetAllDoctors, useGetAllPrescriptions } from "@/hooks/admins/admins";
import { DoctorsDataTable } from "@/components/admin/doctors-page/doctors-table/doctors-data-table";
import { columns } from "@/components/admin/doctors-page/doctors-table/columns";
import AddDoctorsModal from "@/components/admin/doctors-page/doctors-actions/add-doctors-modal";
import AdminDashboardCard from "@/components/admin/admin-dashboard-card"


const AdminDoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: doctors, isLoading: isDoctorsLoading, isError: isDoctorsError, error: errorDoctors } = useGetAllDoctors();

  const { data: appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();

  const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();

  const isLoading = isDoctorsLoading || isAppointmentsLoading || isPrescriptionsLoading;
  const isError = isDoctorsError || isAppointmentsError || isPrescriptionsError;
  const error = errorDoctors || errorAppontments || errorPrescriptions;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {axios.isAxiosError(error) ? error.response?.data?.error ?? error.message: error?.message}</div>
  if (!doctors?.data || !appointments?.data || !prescriptions?.data) return <div>Not found</div>


  function handleAddNewDoctor() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }


  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium text-2xl xl:text-[42px]">Doctors Overview</h1>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddNewDoctor} className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black/65 dark:hover:bg-white/90 transition-colors duration-500 max-sm:py-2 sm:py-4 px-3 rounded-full">
            <Plus className="size-5" />
            Add new Doctor
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
       <AdminDashboardCard
					title="Total Doctors"
					data={doctors.data.length}
					description="Stay informed real-time data of total doctors"
					icon={Doctor01Icon}
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
      <DoctorsDataTable columns={columns} data={doctors.data} />
      <AddDoctorsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div >
  )
}

export default AdminDoctorsPage