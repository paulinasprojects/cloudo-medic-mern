import axios from "axios"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Appointment02Icon, PatientIcon, PrescriptionIcon } from "@hugeicons/core-free-icons"
import { useGetAllAppointments, useGetAllPatients, useGetAllPrescriptions } from "@/hooks/admins/admins"
import PatientsDataTable from "@/components/admin/patients-page/patients-table/patients-data-table"
import { columns } from "@/components/admin/patients-page/patients-table/columns";
import AddPatientsModal from "@/components/admin/patients-page/patients-actions/add-patients-modal"
import AdminDashboardCard from "@/components/admin/admin-dashboard-card"

const AdminPatientsPage = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const { data: patients, isLoading: isPatientsLoading, isError: isPatientsError, error: errorPatients } = useGetAllPatients()
	const { data:  appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();
	const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();


	const isLoading = isPatientsLoading || isAppointmentsLoading || isPrescriptionsLoading;
	const isError = isPatientsError || isAppointmentsError || isPrescriptionsError;
	const error = errorPatients || errorAppontments || errorPrescriptions;

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error: {axios.isAxiosError(error) ? error.response?.data?.error ?? error.message: error?.message}</div>
	if (!patients?.data || !appointments?.data || !prescriptions?.data) return <div>Not found</div>;


	function handleAddNewPatient(){
		setIsModalOpen(true)
	}

	function handleCloseModal(){
		setIsModalOpen(false)
	}


  return (
    <div className="py-10">
			<div className="py-8 flex items-center justify-between">
				<h1 className="font-medium text-2xl xl:text-[42px]">Patients Overview</h1>
				<div className="flex gap-2 items-center">
					<button onClick={handleAddNewPatient} className="add-button">
						<Plus className="size-5"/>
						Add new Patient
					</button>
				</div>
			</div>
			<div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
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
			<PatientsDataTable columns={columns} data={patients.data}/>
			<AddPatientsModal isOpen={isModalOpen} onClose={handleCloseModal}/>
		</div>
  )
}

export default AdminPatientsPage