import { Prescription } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-actions";
import { formatDate } from "@/utils/utils";

export const columns: ColumnDef<Prescription>[] = [
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
    accessorKey: `${"doctorProfile.user.firstName"} ${"doctorProfile.user.lastName"}`,
    header: "Doctor Full Name",
    meta: { label: "Doctor Full Name" },
    cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.doctorProfile?.user.firstName} {row.original.doctorProfile?.user.lastName}
      </div>
    )
  },
  {
    accessorKey: `${"patientProfile.user.firstName"} ${"patientProfile.user.lastName"}`,
    header: "Patient Full Name",
    meta: { label: "Patient Full Name" },
    cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.patientProfile?.user.firstName} {row.original.patientProfile?.user.lastName}
      </div>
    )
  },
  {
    accessorKey: "medication",
    header: "Medication",
  },
  {
    accessorKey: "dosage",
    header: "Dosage",
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
     cell: ({row}) => (
      <div className="line-clamp-1">
        {row.original.instructions}
      </div>
    )
  },
  {
    accessorKey: "startDate",
    size: 170,
    header: "Start Date",
    meta: { label: "Start Date" },
     cell: ({ row }) => (
      <span className="text-sm">
        {formatDate(row.original.startDate)}
      </span>
    )
  },
  {
    accessorKey: "endDate",
    size: 170,
    header: "End Date",
    meta: { label: "End Date" },
     cell: ({ row }) => (
      <span className="text-sm">
        {formatDate(row.original.endDate)}
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