"use client"

import * as React from "react"
import {
    flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import LoaderStyle from "@/style/loader.module.css";
import PaginatedItems from "./Pagination";




export function DataTableDemo({ data = [], columns = [], loading = false, itemsNumber, onPageChange }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pageCount, setPageCount] = React.useState(1)

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting, columnFilters, columnVisibility, rowSelection,
        },
    })




    const handlePageChange = (e) => {
        setPageCount(e.selected + 1)
    }


    React.useEffect(() => {
        if (pageCount >= 1) {
            onPageChange(pageCount)
        }
    }, [pageCount])


    return (

        <div className="w-full border rounded-md">

            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (<TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>)
                            })}
                        </TableRow>))}
                    </TableHeader>
                    <TableBody className="min-h-[500px]">
                        {
                            loading ?
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-[500px]">
                                        <div className={`${LoaderStyle.loader}`}></div>
                                    </TableCell>
                                </TableRow>
                                : table?.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-[500px] text-center text-[30px] font-mono "
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <PaginatedItems itemNumber={itemsNumber} onPageChange={handlePageChange} />
        </div>)
}
