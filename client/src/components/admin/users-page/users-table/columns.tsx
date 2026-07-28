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
    meta: { label: "ID" },
    cell: ({ row }) => (
      <div className="line-clamp-1">
        {row.original.id}
      </div>
    )
  },
  {
    accessorKey: "firstName",
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
    accessorKey: "lastName",
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
    accessorKey: "email",
    size: 210,
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
    },
    cell: ({row}) => (
      <div>
        {row.original.role === "admin" && (
          <span className="text-white bg-red-500 rounded-full p-1.5">{row.original.role}</span>
        )}
        {row.original.role === "patient" && (
          <span className="text-white bg-green-500 rounded-full p-1.5">{row.original.role}</span>
        )}
        {row.original.role === "doctor" && (
          <span className="text-white bg-blue-500 rounded-full p-1.5">{row.original.role}</span>
        )}
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    meta: { label: "Creation Date" },
    size: 270,
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
    meta: { label: "Action" },
    cell: ({ row }) => <CellAction data={row.original} />
  }
]