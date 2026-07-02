import { Patient } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Patient>[] = [
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
		header: "Last Name"
	},
	{
		accessorKey: "bloodType",
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
		cell: ({row}) => (
			<div className="line-clamp-1">
				{row.original.medicalHistory}
			</div>
		)
	},
	{
		accessorKey: "emergencyContactName",
		header: "Emergency Contact Name"
	},
	{
		accessorKey: "emergencyContactNumber",
		header: "Emergency Contact Number"
	},
	{
		accessorKey: "action",
		header:"Action",
		id: "actions",
		cell: ({row}) => <CellAction data={row.original}/>
	}
];