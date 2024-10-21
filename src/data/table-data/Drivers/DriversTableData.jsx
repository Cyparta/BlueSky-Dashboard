'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteDrivers, GetAllDrivers } from "@/redux/Slices/Drivers/DriverSlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";



import allIcons from "@/lib/all-icons";
import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import { downloadCSV } from "@/lib/downloads";



const DriversTableData = () => {

    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const { drivers, loading, error } = useSelector(state => state.drivers);


    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllDrivers({ search: searchValue }));
            }, 1000);
            return () => clearTimeout(timer);
        } 
    }, [searchValue]);



    // ---------------- Global Function ----------------------
    function handleDeleteDriver(driverID) {
        dispatch(DeleteDrivers(driverID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Driver  Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllDrivers({ search: searchValue }));
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
        dispatch(GetAllDrivers({
            page: pageNumber,
            search: searchValue
        }));
    }

    const data = drivers?.results?.map((driver) => {
        return {
            id: driver?.id,
            // current_car: driver?.current_car,
            is_available: driver?.is_available ? "online" : "offLine",
            first_name: driver?.first_name,
            phone: driver?.phone,
            gender: driver?.gender,
            is_verified: driver?.is_verified ? "true" : "false",
            is_active: driver?.is_active ? "true" : "false",

        }
    })

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            hidden: true,
            cell: ({ row }) => <Link href={`/drivers/updateDriver/${row.getValue("id")}?diverName=${row.getValue("first_name")}`}>{row.getValue("id")}</Link>
        },
        {
            accessorKey: "first_name",
            header: "Driver Name",
            cell: ({ row }) => <Link
                href={`/drivers/updateDriver/${row.getValue("id")}?diverName=${row.getValue("first_name")}`}>{row.getValue("first_name")}</Link>
        },
        {
            accessorKey: "phone",
            header: "Phone number",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("phone")}</div>
            ),
        },
        // {
        //     accessorKey: "rating",
        //     header: () => <div className="text-center">Rating</div>,
        //     cell: ({ row }) => {
        //         const rating = parseFloat(row.getValue("rating"))

        //         // Format the rating as a dollar rating
        //         const formatted = new Intl.NumberFormat("en-US", {
        //             style: "currency",
        //             currency: "USD",
        //         }).format(rating)

        //         return <div className="text-center font-medium">{parseFloat(row.getValue("rating")) ? formatted : "--"}</div>
        //     },
        // },
        // {
        //     accessorKey: "current_car",
        //     header: () => <div className="text-center">Current Car</div>,
        //     cell: ({ row }) => (
        //         <div className="capitalize text-center">{row.getValue("current_car")}</div>
        //     ),
        // },
        {
            accessorKey: "is_available",
            header: () => <div className="text-center">Available</div>,
            cell: ({ row }) => (
                <div className={`capitalize text-center ${row.getValue("is_available") === "online" ? "online" : "offline"}`}>{row.getValue("is_available")}</div>
            ),
        },
        {
            accessorKey: "is_verified",
            header: () => <div className="text-center">Verified</div>,
            cell: ({ row }) => (
                <div className={`capitalize text-center ${row.getValue("is_verified") === "true" ? "online" : "offline"}`}>{row.getValue("is_verified")}</div>
            ),
        },
        {
            accessorKey: "is_active",
            header: () => <div className="text-center">Active</div>,
            cell: ({ row }) => (
                <div className={`capitalize text-center ${row.getValue("is_active") === "true" ? "online" : "offline"}`}>{row.getValue("is_active")}</div>
            ),
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
                                <Link href={`/drivers/updateDriver/PROFILE${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full hover:bg-red-500 cursor-pointer hover:text-white"
                                    onClick={() => handleDeleteDriver(row.getValue("id"))}
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
                    <Image src={Pdf} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={()=>window.print()}/>
                    <Image src={Exel} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={()=> downloadCSV(data)}/>
                </div>
                <div className="flex items-center justify-center flex-col lg:flex-row py-4 gap-4">
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] flex-1 focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                </div>
            </header>

            {/* Table Data */}
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={drivers?.count} onPageChange={handlePagination} />
        </div>
    )
};

export default DriversTableData;