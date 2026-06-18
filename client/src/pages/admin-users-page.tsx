import { useState } from "react";
import { Plus, UsersIcon } from "lucide-react";
import { useGetAllUsers, useGetAllDoctors, useGetAllPatients } from "@/hooks/admins/admins";
import AddUsersModal from "@/components/admin/users-page/users-actions/add-users-modal";
import { UsersDataTable } from "@/components/admin/users-page/users-table/users-data-table";
import { columns } from "@/components/admin/users-page/users-table/columns";

const AdminUsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: users, isLoading: isUsersLoading, isError: isUsersError, error: errorUsers } = useGetAllUsers();
  const { data: doctors, isLoading: isDoctorsLoading, isError: isDoctorsError, error: errorDoctors } = useGetAllDoctors();
  const { data: patients, isLoading: isPatientsLoading, isError: isPatientsError, error: errorPatients } = useGetAllPatients();

  const isLoading = isUsersLoading || isDoctorsLoading || isPatientsLoading;
  const isError = isUsersError || isDoctorsError || isPatientsError;
  const error = errorUsers || errorDoctors || errorPatients;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error {error?.message}</div>
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
        <div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full bg-[#191b27]">
                <UsersIcon className="size-6 text-white" />
              </div>
              <span className="text-[20px]">Total Users</span>
            </div>
            <span className="text-[26px]">{users.data.length}</span>
          </div>
          <div className="pt-10">
            <span className="text-center">Stay informed with real-time data of total users</span>
          </div>
        </div>
        <div className="dark:bg-[#0e121b] bg-white px-4 py-6 rounded-3xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-full bg-[#191b27]">
                <UsersIcon className="size-6 text-white" />
              </div>
              <span className="text-[20px]">Total Doctors</span>
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
                <UsersIcon className="size-6 text-white" />
              </div>
              <span className="text-[20px]">Total Patients</span>
            </div>
            <span className="text-[26px]">{patients.data.length}</span>
          </div>
          <div className="pt-10">
            <span className="text-center">Stay informed with real-time data of total patients</span>
          </div>
        </div>
      </div>
      <UsersDataTable columns={columns} data={users.data} />
      <AddUsersModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default AdminUsersPage