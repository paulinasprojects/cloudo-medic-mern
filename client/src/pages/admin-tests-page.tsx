import { useState } from "react"
import axios from "axios"
import { Plus } from "lucide-react"
import { Appointment02Icon, PrescriptionIcon, TestTube01Icon } from "@hugeicons/core-free-icons"
import { useGetAllAppointments, useGetAllPrescriptions, useGetAllTests } from "@/hooks/admins/admins"
import AdminDashboardCard from "@/components/admin/admin-dashboard-card"
import AddMedicalTestModal from "@/components/admin/medical-tests-page/medical-tests-actions/add-medical-test-modal"

const AdminTestsPage = () => {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const { data: tests, isLoading: isTestsLoading, isError: isTestsError, error: errorTests } = useGetAllTests();
  const { data: appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();
  const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();

  const isLoading = isTestsLoading || isAppointmentsLoading || isPrescriptionsLoading;
  const isError = isTestsError || isAppointmentsError || isPrescriptionsError;
  const error = errorTests || errorAppontments || errorPrescriptions;


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error:  {axios.isAxiosError(error) ? error.response?.data?.error ?? error.message : error?.message}</div>
  if (!tests?.data || !appointments?.data || !prescriptions?.data) return <div>Not found</div>


  function handleAddNewMedicalTest() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }


  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium text-2xl xl:text-[42px]">Medical Tests Overview</h1>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddNewMedicalTest} className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black dark:hover:bg-white/90 transition-colors max-sm:py-2 sm:py-4 px-3 rounded-full">
            <Plus className="size-5"/>
            Add New Test
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
        <AdminDashboardCard
          title="Total Tests"
          data={tests.data.length}
          description="Stay informed real-time data of total tests"
          icon={TestTube01Icon}
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
          description="Stay informed real-time data of total Prescriptions"
          icon={PrescriptionIcon}
        />
      </div>
      <AddMedicalTestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default AdminTestsPage