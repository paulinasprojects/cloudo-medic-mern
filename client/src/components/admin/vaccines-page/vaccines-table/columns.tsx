import { Vaccine } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/utils";
import CellAction from "./cell-action";

export const columns: ColumnDef<Vaccine>[] = [
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
    accessorKey: "vaccinationName",
    header: "Vaccination Name"
  },
  {
    accessorKey: "vaccinationDate",
    size: 170,
    header: "Vaccination Date",
    cell: ({row}) => (
      <span className="text-sm">
        {formatDate(row.original.vaccinationDate)}
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
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]