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
    cell: ({row}) => (
      <span>
        {row.original.doctorProfile?.user.firstName}
      </span>
    )
  },
  {
    accessorKey: `${"doctorProfile.user.lastName"}`,
    header: "Doctor Last Name",
    cell: ({row}) => (
      <span>
        {row.original.doctorProfile?.user.lastName}
      </span>
    )
  },
  {
    accessorKey: `${"patientProfile.user.firstName"}`,
    header: "Patient First Name",
    cell: ({row}) => (
      <span>
        {row.original.patientProfile?.user.firstName}
      </span>
    )
  },
  {
    accessorKey: `${"patientProfile.user.lastName"}`,
    header: "Patient Last Name",
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
    header: "Status"
  },
  {
    accessorKey: "appointmentDate",
    size: 170,
    header: "Appointment Date",
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