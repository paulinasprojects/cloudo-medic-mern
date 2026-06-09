import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "@/services/admin-service";
import { DoctorsDataTable } from "@/components/admin/doctors-table/doctors-data-table";
import { columns } from "@/components/admin/doctors-table/columns";

const AdminDoctorsPage = () => {
  const { data: doctors, isLoading, isError, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(),
    staleTime: 5 * 50 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error {error.message}</div>
  if (!doctors?.data) return <div>Doctors not found</div>

  return (
    <div className="py-10">
      <div className="py-8 flex items-center justify-between">
        <h1 className="font-medium text-[42px]">Doctors Overview</h1>
        <div className="flex gap-2 items-center">
          <button className="inline-flex items-center gap-2 text-[16px] bg-black text-white dark:bg-white dark:text-black py-4 px-3 rounded-full">
            <Plus className="size-5" />
            Add new Doctor
          </button>
        </div>
      </div>
      <div className="pb-8 grid grid-cols-4">
        <div>
          card
        </div>
        <div>
          card
        </div>
        <div>
          card
        </div>
        <div>
          card
        </div>
      </div>
      <DoctorsDataTable columns={columns} data={doctors.data} />
    </div>
  )
}

export default AdminDoctorsPage