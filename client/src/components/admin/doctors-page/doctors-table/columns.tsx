import { Doctor,} from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "userId",
    header: "User Id",
    meta: { label: "User ID" },
    size: 80,
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.original.userId}
      </div>
    )
  },
  {
    accessorKey: "user.firstName",
    meta: { label: "First Name" },
    header: ({column}) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          First name
          <ArrowUpDown className="ml-2 h-3 w-3"/>
        </button>
      )
    }
  },
  {
    accessorKey: "user.lastName",
    meta: { label: "Last Name" },
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Last name
          <ArrowUpDown className="ml-2 h-3 w-3"/>
        </button>
      )
    }
  },
  {
    accessorKey: "education",
    header: "Education"
  },
  {
    accessorKey: "doctorLevel",
    meta: { label: "Doctor Level" },
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Doctor Level
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      )
    }
  },
  {
    accessorKey: "specialization",
    header: "Specialization"
  },
  {
    accessorKey: "workPhoneNumber",
    header: "Work Phone",
    meta: { label: "Work Phone" },
  },
  {
    accessorKey: "hospital",
    header: "Hospital"
  },
  {
    accessorKey: "consultationFee",
    header: "Consultation Fee",
    meta: { label: "Consultation Fee" },
    cell: ({ row }) => (
      <span>${row.original.consultationFee}</span>
    )
  },

  {
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]