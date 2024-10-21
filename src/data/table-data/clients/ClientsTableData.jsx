'use client';

import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteClient, GetAllClients } from "@/redux/Slices/Client-Slice/ClientStore";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import allIcons from "@/lib/all-icons";
import { downloadCSV } from "@/lib/downloads";



const ClientsTableData = () => {

    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector(state => state.clients);

    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllClients({ search: searchValue }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);
    useEffect(()=>{
        console.log("Clients",clients);
    },[])


    // ---------------- Public Function ----------------------
    function handleDeleteClient(clientID) {
        dispatch(DeleteClient(clientID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Client Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllClients({ search: searchValue }))
            } else {
                toast.error("Error Occur When Deleting This Client", {
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
        dispatch(GetAllClients({
            page: pageNumber,
            search: searchValue
        }));
    }
    console.log(clients.results);
    const data = clients?.results?.map((client) => {
        return {
            id: client?.id,
            address: client?.address,
            gender: client?.gender,
            phone: client?.phone,
            first_name: client?.first_name,
            email: client?.email,
            balance: client?.balance,

        }
    });

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <Link href={`/clients/updateClient/${row.getValue("id")}?clientName=${row.getValue("first_name")}`}>{row.getValue("id")}</Link>
        },
        {
            accessorKey: "first_name",
            header: "client Name",
            cell: ({ row }) => <Link
                href={`/clients/updateClient/${row.getValue("id")}?clientName=${row.getValue("first_name")}`}>{row.getValue("first_name")}</Link>
        },
        {
            accessorKey: "gender",
            header: "Gender",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("gender") || 'N/A'}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Client Phone
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone") || 'N/A'}</div>,
        },
        {
            accessorKey: "address",
            header: () => <div className="">Address</div>,
            cell: ({ row }) => {
                return <div className="">{row.getValue("address") || 'N/A'}</div>
            },
        },
        {
            accessorKey: "email",
            header: () => <div className="">Email</div>,
            cell: ({ row }) => {
                return <div className="">{row.getValue("email") ||'N/A'}</div>
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
                                <Link href={`/clients/updateClient/PROFILE${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full hover:bg-red-500 cursor-pointer hover:text-white"
                                    onClick={() => handleDeleteClient(row.getValue("id"))}
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
                    <Image src={Pdf} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={() => window.print()} />
                    <Image src={Exel} alt="excel" width={30} height={30} className="cursor-pointer" onClick={() => downloadCSV(data)} />
                </div>
                <div className="flex items-center justify-center flex-col lg:flex-row py-4 gap-4">
                    <Input
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] flex-1 focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                    {/* <Link
                        href="/clients/addNewClient"
                        className="bg-main-100 text-gray-200 hover:bg-blue-900 text-[16px] px-4 py-2 rounded-md"
                    >
                        Add New Client
                    </Link> */}
                </div>
            </header>

            {/* Table Data */}
            {/* <div id="printable-content"> */}
                <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={clients?.count} onPageChange={handlePagination} />

            {/* </div> */}
        </div>
    )
};

export default ClientsTableData;