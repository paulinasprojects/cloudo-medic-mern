import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/types";
import { formatDate } from "@/utils/utils";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
    size: 370,
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.original.id}
      </div>
    )
  },
  {
    accessorKey: "firstName",
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
    accessorKey: "lastName",
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Email
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      )
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Role
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </button>
      )
    },
    cell: ({ row }) => (
      <span className="text-sm">
        {formatDate(row.original.createdAt)}
      </span>
    )
  },
  {
    accessorKey: "action",
    header: "Action",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]