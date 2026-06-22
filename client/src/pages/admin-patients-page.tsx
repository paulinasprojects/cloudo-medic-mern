import { useState } from "react"
import { Plus } from "lucide-react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, PatientIcon, PrescriptionIcon } from "@hugeicons/core-free-icons"
import { useGetAllAppointments, useGetAllPatients, useGetAllPrescriptions } from "@/hooks/admins/admins"
import PatientsDataTable from "@/components/admin/patients-page/patients-table/patients-data-table"
import {columns} from "@/components/admin/patients-page/patients-table/columns";
import AddPatientsModal from "@/components/admin/patients-page/patients-actions/add-patients-modal"

const AdminPatientsPage = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const { data: patients, isLoading: isPatientsLoading, isError: isPatientsError, error: errorPatients } = useGetAllPatients()
	const { data:  appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();
	const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();


	const isLoading = isPatientsLoading || isAppointmentsLoading || isPrescriptionsLoading;
	const isError = isPatientsError || isAppointmentsError || isPrescriptionsError;
	const error = errorPatients || errorAppontments || errorPrescriptions;

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error: {error?.message}</div>
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
					<button onClick={handleAddNewPatient} className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black/65 dark:hover:bg-white/90 transition-colors duration-500 max-sm:py-2 sm:py-4 px-3 rounded-full">
						<Plus className="size-5"/>
						Add new Patient
					</button>
				</div>
			</div>
			<div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
				<div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="p-2.5 rounded-full bg-[#191b27]">
								<HugeiconsIcon icon={PatientIcon} className="size-6 text-white"/>
							</div>
							<span>Total Patients</span>
						</div>
						<span className="text-[26px]">
							{patients.data.length}
						</span>
					</div>
					<div className="pt-10">
						<span className="text-center">Stay informed real-time data of total patients</span>
					</div>
				</div>
				<div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-xl">
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="p-2.5 rounded-full bg-[#191b27]">
								<HugeiconsIcon icon={Calendar03Icon} className="size-6 text-white"/>
							</div>
							<span>Total Appointments</span>
						</div>
						<span className="text-[26px]">
							{appointments.data.length}
						</span>
					</div>
					<div className="pt-10">
						<span className="text-center">Stay infromed real-time data of total appointments</span>
					</div>
				</div>
				<div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="p-2.5 rounded-full bg-[#191b27]">
								<HugeiconsIcon icon={PrescriptionIcon} className="size-6 text-white"/>
							</div>
							<span>Total Prescriptions</span>
						</div>
						<span className="text-[26px]">
							{prescriptions.data.length}
						</span>
					</div>
					<div className="pt-10">
						<span className="text-center">Stay informed real-time data of total prescriptions</span>
					</div>
				</div>
			</div>
			<PatientsDataTable columns={columns} data={patients.data}/>
			<AddPatientsModal isOpen={isModalOpen} onClose={handleCloseModal}/>
		</div>
  )
}

export default AdminPatientsPage