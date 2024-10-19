'use client';

import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { DeleteContact, GetAllContacts } from "@/redux/Slices/contact-slice/ContactSlice";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import allIcons from "@/lib/all-icons";
import { downloadCSV } from "@/lib/downloads";



const ContactsTableData = () => {
    const [searchValue, setSearchValue] = useState("");

    const dispatch = useDispatch()
    const { contacts, loading, error } = useSelector(state => state.contacts);


    useEffect(() => {
        if (searchValue.length >= 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllContacts({ search: searchValue }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchValue]);


    // ---------------- Public Function ----------------------
    function handleDeleteContact(clientID) {
        dispatch(DeleteContact(clientID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Client Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllContacts({ search: searchValue }))
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
        dispatch(GetAllContacts({
            page: pageNumber,
            search: searchValue
        }));
    }

    const data = contacts?.results?.map((contact) => {
        return {
            id: contact?.id,
            content: contact?.content,
            email: contact?.email,
            phone: contact?.phone,
            subject: contact?.subject,
            created_at: `${new Date(contact?.created_at).toLocaleDateString()} -  ${new Date(contact?.created_at).toLocaleTimeString()}`,
        }
    });

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <Link href={`/contacts/${row.getValue("id")}/?subject=${row.getValue("subject")}&&phone=${row.getValue('phone')}&&email=${row.getValue('email')}&&content=${row.getValue('content')}&&create_at=${row.getValue('created_at')}`}>{row.getValue("id")}</Link>
        },
        {
            accessorKey: "content",
            header: "Message Content",
            cell: ({ row }) => (
                <Link
                    className="max-w-[300px] line-clamp-1"
                    href={`/contacts/${row.getValue("id")}/?subject=${row.getValue("subject")}&&phone=${row.getValue('phone')}&&email=${row.getValue('email')}&&content=${row.getValue('content')}&&create_at=${row.getValue('created_at')}`}>
                    {row.getValue("content")}
                </Link>
            )
        },
        {
            accessorKey: "email",
            header: "email",
            cell: ({ row }) => (
                <div>{row.getValue("email")}</div>
            )
        },
        {
            accessorKey: "phone",
            header: "phone",
            cell: ({ row }) => (
                <div>{row.getValue("phone")}</div>
            )
        },

        {
            accessorKey: "subject",
            header: "subject",
            cell: ({ row }) => (
                <div>{row.getValue("subject")}</div>
            )
        },
        {
            accessorKey: "created_at",
            header: "created at",
            cell: ({ row }) => (
                <div>{row.getValue("created_at")}</div>
            )
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
                                <p
                                    className="text-red-800 p-1 rounded-md w-full hover:bg-red-500 cursor-pointer hover:text-white"
                                    onClick={() => handleDeleteContact(row.getValue("id"))}
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
                </div>
            </header>
            {/* Table Data */}
            <DataTableDemo
                data={data}
                columns={columns}
                loading={loading}
                onPageChange={handlePagination}
                itemsNumber={contacts?.count}
            />
        </div>
    )
};

export default ContactsTableData;