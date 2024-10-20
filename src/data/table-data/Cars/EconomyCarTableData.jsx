'use client';


import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetAllCars, DeleteCar } from "@/redux/Slices/Cars-slice/CarSlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import allIcons from "@/lib/all-icons";





const EconomyCarTableData = ({ href }) => {

    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const { cars, loading, error } = useSelector(state => state.cars);

    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllCars({
                    search: searchValue,
                    filter: href,
                }));
            }, 1000);
            return () => clearTimeout(timer);
        } 
    }, [searchValue]);

    // ---------------- Global Function ----------------------
    function handleDeleteCar(CarID) {
        dispatch(DeleteCar(CarID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Car  Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllCars({
                    search: "",
                    filter: href
                }))
            } else {
                toast.error("Error Occur When Deleting This Car", {
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
        dispatch(GetAllCars({
            page: pageNumber,
            search: searchValue,
            filter: href
        }));
    }



    const data = cars?.results?.map((car) => {
        return {
            id: car?.id,
            model: car?.car_model,
            type: car?.car_type,
            color: car?.car_color,
            carPlate: car?.car_number,
            isAvailable: car?.is_available,
            image: car?.car_image,
        }
    });

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <Link href={`/${href.toLowerCase()}/updateCar/${row.getValue("id")}?CarPlate=${row.getValue("carPlate")}`}>{row.getValue("id")}</Link>
        },
        {
            accessorKey: "carPlate",
            header: "Car Plate",
            cell: ({ row }) => <Link
                href={`/${href.toLowerCase()}/updateCar/${row.getValue("id")}?CarPlate=${row.getValue("carPlate")}`}>{row.getValue("carPlate")}</Link>
        },
        {
            accessorKey: "model",
            header: "Car Model",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("model")}</div>
            ),
        },
        {
            accessorKey: "type",
            header: "Car Type",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("type")}</div>
            ),
        },
        {
            accessorKey: "color",
            header: "Car Color",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("color")}</div>
            ),
        },
        {
            accessorKey: "isAvailable",
            header: "Car Is Available",
            cell: ({ row }) => (
                <div className={`capitalize text-center ${row.getValue("isAvailable") ? "completed" : "canceled"}`}>{row.getValue("isAvailable") ? "Available" : "Not Available"}</div>
            ),
        },
        {
            accessorKey: "image",
            header: ({ column }) => {
                return (
                    <h2 className="text-center">Car Image</h2>
                )
            },
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <Avatar>
                        <AvatarImage src={row.getValue("image")} alt="Car Image" />
                        <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                </div>
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
                                <Link href={`/${href.toLowerCase()}/updateCar/PROFILE${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full  cursor-pointer hover:text-red-500"
                                    onClick={() => handleDeleteCar(row.getValue("id"))}
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
                <div className="flex items-center justify-end flex-col lg:flex-row py-4 gap-4 w-full">
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                    {/* <Link
                        href={`/${href.toLowerCase()}/addNewCar`}
                        className="bg-blue-900 text-gray-200 hover:bg-blue-900 text-[16px] px-4 py-2 rounded-md"
                    >
                        Add New Car
                    </Link> */}
                </div>
            </header>

            {/* Table Data */}
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={cars?.count} onPageChange={handlePagination} />        </div>
    )
};

export default EconomyCarTableData;