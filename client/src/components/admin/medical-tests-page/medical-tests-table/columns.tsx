import { MedicalTests } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/utils";
import CellAction from "./cell-action";

export const columns: ColumnDef<MedicalTests>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 120,
    cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.id}
      </div>
    )
  },
  {
    accessorKey: `${"doctorProfile.user.firstName"} ${"doctorProfile.user.lastName"}`,
    header: "Doctor Full Name",
    cell: ({row}) => (
      <span>
        {row.original.doctorProfile?.user.firstName} {row.original.doctorProfile?.user.lastName}
      </span>
    )
  },
  {
    accessorKey: `${"patientProfile.user.firstName"} ${"patientProfile.user.lastName"}`,
    header: "Patient Full Name",
    cell: ({row}) => (
      <span>
        {row.original.patientProfile?.user.firstName} {row.original.patientProfile?.user.lastName}
      </span>
    )
  },
  {
    accessorKey: "date",
    size: 120,
    header: "Date",
    cell: ({row}) => (
      <span className="text-sm">
        {formatDate(row.original.date)}
      </span>
    )
  },
  {
    accessorKey: "bloodTests",
    header: "Blood Tests",
  },
  {
    accessorKey: "biochemistryTests",
    header: "Biochemistry Tests",
  },
  {
    accessorKey: "imagingTests",
    header: "Imaging Tests",
  },
  {
    accessorKey: "urineTests",
    header: "Urine Tests",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.notes}
      </div>
    )
  },
   {
    accessorKey: "status",
    header: "Status",
     cell: ({row}) => (
      <div>
        {row.original.status == "scheduled" && (
          <span className="text-white bg-blue-500 rounded-full p-1.5">{row.original.status}</span>
        )}
        {row.original.status == "pending" && (
          <span className="text-white bg-purple-500 rounded-full p-1.5">{row.original.status}</span>
        )}
        {row.original.status == "completed" && (
          <span className="text-white bg-green-500 rounded-full p-1.5">{row.original.status}</span>
        )}
        {row.original.status == "cancelled" && (
          <span className="text-white bg-red-500 rounded-full p-1.5">{row.original.status}</span>
        )}
      </div>
    )
  },
  {
      accessorKey: "action",
      header: "Action",
      id: "actions",
      cell: ({row}) => <CellAction data={row.original}/>
    }
]