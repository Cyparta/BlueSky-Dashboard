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
            rating: driver?.average_rating,
            status: driver?.is_avliable ? "online" : "offLine",
            phoneNumber: driver?.user_phone,
            driverName: driver?.user_name,
            phoneNumber: driver?.user_phone,
            rating: driver?.average_rating,
            carType: driver?.driver_type,
            status: driver?.is_active ? "online" : "offLine",
        }
    })

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            hidden: true,
            cell: ({ row }) => <Link href={`/drivers/updateDriver/${row.getValue("id")}?diverName=${row.getValue("driverName")}`}>{row.getValue("id")}</Link>
        },
        {
            accessorKey: "driverName",
            header: "Driver Name",
            cell: ({ row }) => <Link
                href={`/drivers/updateDriver/${row.getValue("id")}?diverName=${row.getValue("driverName")}`}>{row.getValue("driverName")}</Link>
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone number",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("phoneNumber")}</div>
            ),
        },
        {
            accessorKey: "rating",
            header: () => <div className="text-center">Rating</div>,
            cell: ({ row }) => {
                const rating = parseFloat(row.getValue("rating"))

                // Format the rating as a dollar rating
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(rating)

                return <div className="text-center font-medium">{parseFloat(row.getValue("rating")) ? formatted : "--"}</div>
            },
        },
        {
            accessorKey: "carType",
            header: () => <div className="text-center">Car type</div>,
            cell: ({ row }) => (
                <div className="capitalize text-center">{row.getValue("carType")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => (
                <div className={`capitalize text-center ${row.getValue("status") === "online" ? "online" : "offline"}`}>{row.getValue("status")}</div>
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