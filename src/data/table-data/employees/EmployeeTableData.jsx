'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteEmployee, GetAllEmployees } from "@/redux/Slices/employe-slice/EmploySlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";

import allIcons from "@/lib/all-icons";
import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import { downloadCSV } from "@/lib/downloads";

const EmployeeTableData = () => {

    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector(state => state.employees);

    useEffect(() => {
        if (searchValue.length > 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllEmployees({ search: searchValue }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);

    // ---------------- Global Function ----------------------
    function handleDeleteEmployee(EmployeeID) {
        dispatch(DeleteEmployee(EmployeeID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Employee  Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllEmployees({ search: searchValue }));
            } else {
                toast.error("Error Occur When Deleting This Drivers", {
                    action: {
                        label: "Hide",
                        onClick: () => toast.dismiss(),
                    }
                })
            }
        });
    }

    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const handlePagination = (pageNumber) => {
        dispatch(GetAllEmployees({
            page: pageNumber,
            search: searchValue
        }));
    }
    const data = employees?.results?.map((employee) => {
        return {
            id: employee?.id,
            first_name: employee?.first_name,
            phone: employee?.phone,
            gender: employee?.gender,
            email: employee?.email,
            is_verified: employee?.is_verified,
            address: employee?.address,
            accept_cash: employee?.accept_cash,
            balance: employee?.balance,
        }
    }) || [];


    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div className="text-center font-medium">{row.getValue("id")}</div>
        },
        {
            accessorKey: "first_name",
            header: "Employee name",
            cell: ({ row }) => <div className="text-center font-medium">{row.getValue("first_name")}</div>
        },
        {
            accessorKey: "phone",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Phone number
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "gender",
            header: () => <div className="text-center">gender</div>,
            cell: ({ row }) => {
                return <div className="text-center font-medium">{row.getValue("gender")}</div>
            },
        }, {
            accessorKey: "email",
            header: () => <div className="text-center font-medium">Email</div>,
            cell: ({ row }) => {
                return <div className="text-center font-medium">
                     {row.getValue("email")}
                </div>
            },
        },
        {
            accessorKey: "is_verified",
            header: () => <div className="text-center font-medium">Is verified</div>,
            cell: ({ row }) => {
                return <div className="text-center font-medium">
                     {row.getValue("is_verified")}
                </div>
            },
        },
        {
            accessorKey: "accept_cash",
            header: () => <div className="text-center font-medium">Accept cash</div>,
            cell: ({ row }) => {
                return <div className="text-center font-medium">
                     {row.getValue("accept_cash")}
                </div>
            },
        },
        

        {
            id: "actions",
            enableHiding: true,
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-full px-4 flex justify-end ">
                                <span className="sr-only">Open menu</span>
                                <p className="h-4 text-[20px] font-bold max-w-fit ">{allIcons.horizental_dots_icon}</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                <Link href={`/employees/updateEmployee/${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full hover:bg-red-500 cursor-pointer hover:text-white"
                                    onClick={() => handleDeleteEmployee(row.getValue("id"))}
                                >
                                    Delete
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]


    return (
        <div className="w-full">

            {/* Table Header */}
            <header className="flex items-center justify-between w-full flex-col lg:flex-row">
                <div className="flex items-center gap-4">
                    <Image src={Pdf} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={()=> window.print()}/>
                    <Image src={Exel} alt="excel" width={30} height={30} className="cursor-pointer" onClick={()=> downloadCSV(data)}/>
                </div>
                <div className="flex items-center justify-center flex-col lg:flex-row py-4 gap-4">
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] flex-1 focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                    <Link
                        href="/employees/addNewEmployees"
                        className="bg-blue-900 text-gray-200 hover:bg-blue-900 text-[16px] px-4 py-2 rounded-md"
                    >
                        Add New Employee
                    </Link>
                </div>
            </header>

            {/* Table Data */}
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={employees?.count} onPageChange={handlePagination} />
        </div>
    )
};

export default EmployeeTableData;