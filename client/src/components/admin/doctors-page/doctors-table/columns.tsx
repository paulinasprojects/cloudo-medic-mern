import { Doctors } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Doctors>[] = [
  {
    accessorKey: "userId",
    header: "User Id",
    size: 80,
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.original.userId}
      </div>
    )
  },
  {
    accessorKey: "user.firstName",
    header: "First name"
  },
  {
    accessorKey: "user.lastName",
    header: "Last name"
  },
  {
    accessorKey: "education",
    header: "Education"
  },
  {
    accessorKey: "doctorLevel",
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
    accessorKey: "hospital",
    header: "Hospital"
  },
  {
    accessorKey: "consultationFee",
    header: "Consultation Fee",
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