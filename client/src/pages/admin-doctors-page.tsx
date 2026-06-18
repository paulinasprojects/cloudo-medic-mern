import { Doctor01Icon, Calendar03Icon, PrescriptionsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plus } from "lucide-react";
import { useGetAllAppointments, useGetAllDoctors, useGetAllPrescriptions } from "@/hooks/admins/admins";
import { DoctorsDataTable } from "@/components/admin/doctors-table/doctors-data-table";
import { columns } from "@/components/admin/doctors-table/columns";

const AdminDoctorsPage = () => {
  const { data: doctors, isLoading: isDoctorsLoading, isError: isDoctorsError, error: errorDoctors } = useGetAllDoctors();

  const { data: appointments, isLoading: isAppointmentsLoading, isError: isAppointmentsError, error: errorAppontments } = useGetAllAppointments();

  const { data: prescriptions, isLoading: isPrescriptionsLoading, isError: isPrescriptionsError, error: errorPrescriptions } = useGetAllPrescriptions();

  const isLoading = isDoctorsLoading || isAppointmentsLoading || isPrescriptionsLoading;
  const isError = isDoctorsError || isAppointmentsError || isPrescriptionsError;
  const error = errorDoctors || errorAppontments || errorPrescriptions;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error {error?.message}</div>
  if (!doctors?.data || !appointments?.data || !prescriptions?.data) return <div>Not found</div>

  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium text-2xl xl:text-[42px]">Doctors Overview</h1>
        <div className="flex gap-2 items-center">
          <button className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black/65 dark:hover:bg-white/90 transition-colors duration-500 max-sm:py-2 sm:py-4 px-3 rounded-full">
            <Plus className="size-5" />
            Add new Doctor
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
        <div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full bg-[#191b27]">
                <HugeiconsIcon icon={Doctor01Icon} className="size-6 text-white" />
              </div>
              <span>Total Doctors</span>
            </div>
            <span className="text-[26px]">{doctors.data.length}</span>
          </div>
          <div className="pt-10">
            <span className="text-center">Stay informed with real-time data of total doctors.</span>
          </div>
        </div>
        <div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full bg-[#191b27]">
                <HugeiconsIcon icon={Calendar03Icon} className="size-6 text-white" />
              </div>
              <span>Total Appointments</span>
            </div>
            <span className="text-[26px]">{appointments.data.length}</span>
          </div>
          <div className="pt-10">
            <span className="text-center">Stay informed with real-time data of total appointments.</span>
          </div>
        </div>
        <div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full bg-[#191b27]">
                <HugeiconsIcon icon={PrescriptionsIcon} className="size-6 text-white" />
              </div>
              <span>Total Prescriptions</span>
            </div>
            <span className="text-[26px]">{prescriptions.data.length}</span>
          </div>
          <div className="pt-10">
            <span className="text-center">Stay informed with real-time data of total prescriptions.</span>
          </div>
        </div>
      </div>
      <DoctorsDataTable columns={columns} data={doctors.data} />
    </div >
  )
}

export default AdminDoctorsPage