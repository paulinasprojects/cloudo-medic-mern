import { useState } from "react";
import { ChevronLeft, ChevronRight, Scaling } from "lucide-react";
import { cn } from "@/utils/utils";
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/common/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/common/dropdown-menu";


interface AppointmentsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[]
}

export default function AppointmentsDataTable<TData, TValue>({
  columns,
  data
}: AppointmentsTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        sorting,
        columnFilters,
        columnVisibility
      },
      columnResizeMode: "onChange",
      defaultColumn: {
        minSize: 60,
        maxSize: 380,
        size: 150,
      }
    })


   return (
    <div>
      <div className="flex items-center py-4">
        <input 
          type="text"
          placeholder="Find by status"
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value)}
          className="max-w-sm px-4 py-1 border border-slate-700 rounded-full text-black dark:text-white placeholder:text-sm placeholder:text-black dark:placeholder:text-white focus:outline-none focus:border-slate-300 transition-colors"
         />
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <button className="ml-auto px-3 py-2 border border-black dark:border-white rounded-full">
              Filter
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full">
            {table
            .getAllColumns()
            .filter((column) => column.getCanHide()
            ).map((column) => {
              return (
                <DropdownMenuCheckboxItem 
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
         </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border px-4 py-2">
        <Table style={{width: table.getCenterTotalSize()}}>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}
                      style={{width: header.getSize()}}
                      className="relative"
                    >
                      {header.isPlaceholder ? null : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute right-0 to-0 h-full flex items-center cursor-col-resize select-none touch-none px-0.5",
                            "opacity-0 hover:opacity-100 transition-opacity",
                            header.column.getIsResizing() && "opacity-100"
                          )}
                        >
                          <Scaling
                            className={cn(
                              "size-4 text-black dark:text-white transition-colors",
                              header.column.getIsResizing() && "text-black dark:text-white"
                            )}
                          />
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-break-spaces"
                      style={{width: cell.column.getSize()}}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md px-2 py-2 border hover:bg-white/5 transition-colors duration-200"
          >
            <ChevronLeft className="size-3"/>
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md px-2 py-2 border hover:bg-white/5 transition-colors duration-200"
          >
            <ChevronRight className="size-3"/>
          </button>
        </div>
      </div>
    </div>
  )
}