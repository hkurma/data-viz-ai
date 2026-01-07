"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Table2,
} from "lucide-react";
import { DataRow } from "@/types/chart";

interface DataTableProps {
  columns: string[];
  data: DataRow[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnDefs: ColumnDef<DataRow>[] = React.useMemo(
    () =>
      columns.map((col) => ({
        accessorKey: col,
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="flex items-center gap-2 px-2 py-1 -ml-2 rounded-lg hover:bg-surface-hover transition-colors font-semibold text-sm"
            >
              {col}
              <ArrowUpDown className="w-3.5 h-3.5 text-muted" />
            </button>
          );
        },
        cell: ({ row }) => {
          const value = row.getValue(col);
          return (
            <span className="text-sm font-mono">{String(value ?? "—")}</span>
          );
        },
      })),
    [columns]
  );

  const table = useReactTable({
    data,
    columns: columnDefs,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-2xl glass overflow-hidden border border-border">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left bg-surface/50"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border/50 hover:bg-surface-hover transition-colors ${
                      index % 2 === 0 ? "" : "bg-surface/30"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-32 text-center text-muted"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Table2 className="w-8 h-8" />
                      <span>No data available</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">
            {table.getFilteredRowModel().rows.length.toLocaleString()}
          </span>{" "}
          total rows
        </p>

        <div className="flex items-center gap-6">
          <p className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronsLeft className="w-4 h-4" />
              <span className="sr-only">First page</span>
            </button>
            
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="sr-only">Previous page</span>
            </button>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="sr-only">Next page</span>
            </button>
            
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronsRight className="w-4 h-4" />
              <span className="sr-only">Last page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
