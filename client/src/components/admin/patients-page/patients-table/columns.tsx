import { Patient } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "userId",
    header: "User Id",
		 meta: { label: "User ID" },
    size: 190,
    cell: ({ row }) => (
        <div className="line-clamp-1">
        {row.original.userId}
        </div> 
    )
  },
	{
		accessorKey: "user.firstName",
		meta: { label: "First Name" },
		header: ({ column}) => {
			return (
				<button
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center"
				>
					First Name
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
		accessorKey: "bloodType",
		meta: { label: "Blood Type" },
		header: ({ column }) => {
			return (
				<button
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center"
				>
					Blood Type
					<ArrowUpDown className="ml-2 h-3 w-3"/>
				</button>
			)
		}
	},
	{
		accessorKey: "allergies",
		header: "Allergies"
	},
	{
		accessorKey: "medicalHistory",
		header: "Medical History",
		meta: { label: "Medical History" },
		size: 190,
		cell: ({row}) => (
			<div className="line-clamp-1">
				{row.original.medicalHistory}
			</div>
		)
	},
	{
		accessorKey: "emergencyContactName",
		header: "Emergency Contact Name",
		meta: { label: "Emergency Contact Name" },
	},
	{
		accessorKey: "emergencyContactNumber",
		header: "Emergency Contact Number",
		meta: { label: "Emergency Contact Number" },
	},
	{
		accessorKey: "action",
		header:"Action",
		id: "actions",
		cell: ({row}) => <CellAction data={row.original}/>
	}
];