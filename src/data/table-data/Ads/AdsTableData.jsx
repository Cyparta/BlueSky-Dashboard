'use client';


import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteAds, GetAllAds } from "@/redux/Slices/ads-slice/AdsSlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import Gallery from "@/components/light-gallary/lightGallery";


import allIcons from "@/lib/all-icons";



export default function AdsTableData() {

    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const { ads, loading, error } = useSelector(state => state.ads);


    // ---------------------- Public Effect ------------------
    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllAds({
                    search: searchValue,
                }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);

    // ---------------- Global Function ----------------------
    function handleDeleteAds(AdsID) {
        dispatch(DeleteAds(AdsID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Ads  Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllAds({
                    search: "",
                }))
            } else {
                toast.error("Error Occur When Deleting This Ads", {
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
        dispatch(GetAllAds({
            page: pageNumber,
            search: searchValue,
        }));
    }


    // ----------------- Table Row Data ---------------------
    const data = ads?.map((ad) => {
        return {
            id: ad?.id,
            title: ad?.title,
            image: ad?.image,
        }
    });


    // ----------------- Table Column Data ---------------------
    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <Link href={`/ads/${row.getValue("id")}`}>{row.getValue("id")}</Link>
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <Link
                href={`/ads/${row.getValue("id")}`}>{row.getValue("title")}</Link>
        },
        {
            accessorKey: "image",
            header: ({ column }) => {
                return (
                    <h2 className="text-center">ADS Image</h2>
                )
            },
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <Gallery OneImage_front={row.getValue("image")} />
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
                                <Link href={`/ads/${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full  cursor-pointer hover:text-red-500"
                                    onClick={() => handleDeleteAds(row.getValue("id"))}
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
                <div className="flex items-center justify-between flex-col lg:flex-row py-4 gap-4 w-full">
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                    <Link
                        href={`/ads/addnewAds`}
                        className="bg-blue-900 text-gray-200 hover:bg-blue-900 text-[16px] px-4 py-2 rounded-md"
                    >
                        Add New Ads
                    </Link>
                </div>
            </header>

            {/* Table Data */}
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={0} onPageChange={handlePagination} />
        </div>
    )
};
