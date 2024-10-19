'use client';

import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteRides, GetAllRides } from "@/redux/Slices/rides-slice/RideSlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import allIcons from "@/lib/all-icons";
import { downloadCSV } from "@/lib/downloads";



export default function RidesTableData({filter , href}) {

    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const { rides, loading, error } = useSelector(state => state.rides);

    // --------------------- Public Effect --------------------
    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllRides({
                    search: searchValue,
                    filter: filter
                }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);



    // ---------------- Global Function ----------------------
    function handleDeleteRides(rideID) {
        dispatch(DeleteRides(rideID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Ride Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllRides({
                    search: searchValue,
                    filter: filter
                }))
            } else {
                toast.error("Error Occur When Deleting This Ride", {
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
        dispatch(GetAllRides({
            page: pageNumber,
            search: searchValue,
            filter: filter
        }));
    }


    // ------------- Table Rows -------------
    const data = rides?.results?.map((ride) => {
        return {
            id: ride?.id,
            type: !ride?.is_schedule ? "Normal ride" : ride?.one_way ? "Scheduled (One way)" : "Scheduled (Return)",
            carPlate: ride?.car_plate,
            From: ride?.from_location_name,
            To: ride?.to_location_name,
            estimatedPrice: ride?.estimated_price + " SEK",
            carType: ride?.ride_type
        }
    })

    // ------------- Table Columns -------------
    const columns = [
        {
            accessorKey: "id",
            header: "Trip ID",
            cell: ({ row }) => <Link href={`/${href}/${row.getValue("id")}`} className="text-lg">{row.getValue("id")}</Link>
        },
        {
            accessorKey: "carPlate",
            header: "Car Plate",
            cell: ({ row }) =>
            (
                <Link
                    href={`/${href}/${row.getValue("id")}`}
                    className="capitalize text-lg"
                >
                    {row.getValue("carPlate")}
                </Link>
            ),
        },
        {
            accessorKey: "estimatedPrice",
            header: "Estimated Price",
            cell: ({ row }) => <p className="text-lg text-blue-900 font-bold">{row.getValue("estimatedPrice")}</p>
        }, {
            accessorKey: "From",
            header: "From",
            cell: ({ row }) => <div className="uppercase  text-lg">{row.getValue("From")}</div>,
        }, {
            accessorKey: "To",
            header: "To",
            cell: ({ row }) => (<div className="capitalize text-lg">{row.getValue("To")}</div>),
        }, {
            accessorKey: "type",
            header: () => <div className="text-center">Type</div>,
            cell: ({ row }) => (
                <div
                    className="capitalize text-center text-lg">
                    {row.getValue("type")}
                </div>
            ),
        }, {
            accessorKey: "carType",
            header: "car Type",
            cell: ({ row }) => <div className="capitalize font-bold text-lg">{row.getValue("carType")}</div>,
        },
        // {
        //     accessorKey: "action",
        //     header: () => <div className="text-center">Action</div>,
        //     cell: ({ row }) => (
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //                 <Button variant="ghost" className="h-8 w-full px-4 flex justify-end ">
        //                     <span className="sr-only">Open menu</span>
        //                     <p className="h-4 text-[20px] font-bold max-w-fit ">{allIcons.horizental_dots_icon}</p>
        //                 </Button>
        //             </DropdownMenuTrigger>
        //             <DropdownMenuContent align="end">
        //                 <DropdownMenuItem >
        //                     <Link href={`/${href}/${row.getValue("id")}`} className="w-full">Edit</Link>
        //                 </DropdownMenuItem>
        //                 <DropdownMenuItem >
        //                     <p
        //                         className="text-red-800 p-1 rounded-md w-full  cursor-pointer"
        //                         onClick={() => handleDeleteRides(row.getValue("id"))}
        //                     >
        //                         Delete
        //                     </p>

        //                 </DropdownMenuItem>
        //             </DropdownMenuContent>
        //         </DropdownMenu>
        //     ),
        // }
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
                </div>
            </header>

            {/* Table Data */}
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={rides?.count} onPageChange={handlePagination} />
        </div>
    )
};
