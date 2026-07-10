import axios from "axios";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Doctor01Icon, PatientIcon, UserMultiple02Icon } from "@hugeicons/core-free-icons";
import { useGetAllUsers, useGetAllDoctors, useGetAllPatients } from "@/hooks/admins/admins";
import AddUsersModal from "@/components/admin/users-page/users-actions/add-users-modal";
import { UsersDataTable } from "@/components/admin/users-page/users-table/users-data-table";
import { columns } from "@/components/admin/users-page/users-table/columns";
import AdminDashboardCard from "@/components/admin/admin-dashboard-card"


const AdminUsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: users, isLoading: isUsersLoading, isError: isUsersError, error: errorUsers } = useGetAllUsers();
  const { data: doctors, isLoading: isDoctorsLoading, isError: isDoctorsError, error: errorDoctors } = useGetAllDoctors();
  const { data: patients, isLoading: isPatientsLoading, isError: isPatientsError, error: errorPatients } = useGetAllPatients();

  const isLoading = isUsersLoading || isDoctorsLoading || isPatientsLoading;
  const isError = isUsersError || isDoctorsError || isPatientsError;
  const error = errorUsers || errorDoctors || errorPatients;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {axios.isAxiosError(error) ? error.response?.data?.error ?? error.message: error?.message} </div>
  if (!users?.data || !doctors?.data || !patients?.data) return <div>Not found</div>

  function handleAddNewUser() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }


  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium  text-2xl xl:text-[42px]">Users Overview</h1>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddNewUser} className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black hover:bg-black/65 dark:hover:bg-white/90 transition-colors duration-500 max-sm:py-2 sm:py-4 px-3 rounded-full">
            <Plus className="size-5" />
            Add new User
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
        <AdminDashboardCard
					title="Total Users"
					data={users.data.length}
					description="Stay informed real-time data of total users"
					icon={UserMultiple02Icon}
				/>
        <AdminDashboardCard
					title="Total Doctors"
					data={doctors.data.length}
					description="Stay informed real-time data of total doctors"
					icon={Doctor01Icon}
				/>
       	<AdminDashboardCard
					title="Total Patients"
					data={patients.data.length}
					description="Stay informed real-time data of total patients"
					icon={PatientIcon}
				/>
      </div>
      <UsersDataTable columns={columns} data={users.data} />
      <AddUsersModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default AdminUsersPage