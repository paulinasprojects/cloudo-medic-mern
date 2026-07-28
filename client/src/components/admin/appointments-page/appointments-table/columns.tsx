import { Appointment } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { formatDate } from "@/utils/utils";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 190,
    cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.id}
      </div>
    )
  },
  {
    accessorKey: `${"doctorProfile.user.firstName"}`,
    header: "Doctor First Name",
    meta: { label: "Doctor First Name" },
    cell: ({row}) => (
      <span>
        {row.original.doctorProfile?.user.firstName}
      </span>
    )
  },
  {
    accessorKey: `${"doctorProfile.user.lastName"}`,
    header: "Doctor Last Name",
    meta: { label: "Doctor Last Name" },
    cell: ({row}) => (
      <span>
        {row.original.doctorProfile?.user.lastName}
      </span>
    )
  },
  {
    accessorKey: `${"patientProfile.user.firstName"}`,
    header: "Patient First Name",
    meta: { label: "Patient First Name" },
    cell: ({row}) => (
      <span>
        {row.original.patientProfile?.user.firstName}
      </span>
    )
  },
  {
    accessorKey: `${"patientProfile.user.lastName"}`,
    header: "Patient Last Name",
    meta: { label: "Patient Last Name" },
    cell: ({row}) => (
      <span>
        {row.original.patientProfile?.user.lastName}
      </span>
    )
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
    accessorKey: "appointmentDate",
    size: 170,
    header: "Appointment Date",
    meta: { label: "Appointment Date" },
    cell: ({row}) => (
      <span className="text-sm">
        {formatDate(row.original.appointmentDate)}
      </span>
    )
  },
  {
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]