'use client';
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Pdf from "@/data/Svg/Pdf.svg";
import Exel from "@/data/Svg/Exel.svg";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteGroup, GetAllGroups } from '@/redux/Slices/group-slice/groupSlice';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import AllIcons from '@/lib/all-icons';
import { toast } from 'sonner';
import { downloadCSV } from '@/lib/downloads';

const GroupTableData = () => {
    const [groupSearch, setGroupSearch] = useState("");
    const dispatch = useDispatch();
    const { Groups, loading, error } = useSelector(state => state.group);


    const handleChangeSearch = (e) => {
        setGroupSearch(e.target.value);
    }
    useEffect(() => {
        if (groupSearch.length > 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllGroups(groupSearch));
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            dispatch(GetAllGroups(groupSearch));
        }
    }, [groupSearch])

    const handlePagination = (pageNumber) => {
        // dispatch(GetAllGroups({
        //     page: pageNumber,
        //     search: groupSearch
        // }));
    }
    function handleDeleteGroup(GroupID) {
        dispatch(DeleteGroup(GroupID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                toast.success("Group  Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
                dispatch(GetAllGroups(groupSearch));
            } else {
                toast.error("Error Occur When Deleting This Group", {
                    action: {
                        label: "Hide",
                        onClick: () => toast.dismiss(),
                    }
                })
            }
        });
    }
    console.log(Groups.results)
    const data=Groups?.results?.map((group)=>{
        return{
            id:group.id,
            name:group.name,
            permissions:group.permissions.length
        }
    })

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div >{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            header: "Group name",
            cell: ({ row }) => <div >{row.getValue("name")}</div>,
        },
        {
            accessorKey: "permissions",
            header: () => <div className="text-center">Permissions</div>,
            cell: ({ row }) => <div className="flex items-center justify-center w-full">
                <p className="font-bold  rounded-full border w-[50px] h-[50px] flex items-center justify-center" >+ {row.getValue("permissions").length}</p>
            </div>
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
                                <p className="h-4 text-[20px] font-bold max-w-fit ">{AllIcons.horizental_dots_icon}</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                <Link href={`/group/updateGroup/${row.getValue("id")}`} className="w-full">Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                <p
                                    className="text-red-800 p-1 rounded-md w-full hover:bg-red-500 cursor-pointer hover:text-white"
                                    onClick={() => handleDeleteGroup(row.getValue("id"))}
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
            <header className="flex items-center justify-between w-full flex-col lg:flex-row">
                <div className="flex items-center gap-4">
                    <Image src={Pdf} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={()=> window.print()}/>
                    <Image src={Exel} alt="pdf" width={30} height={30} className="cursor-pointer" onClick={()=> downloadCSV(data)}/>
                </div>
                <div className="flex items-center justify-center flex-col lg:flex-row py-4 gap-4">
                    <Input
                        placeholder="Search"
                        value={groupSearch}
                        onChange={handleChangeSearch}
                        className="outline-0 w-[300px] md:w-[400px] flex-1 focus-visible:ring-1 focus-visible:ring-offset-0 border"
                    />
                    <Link
                        href="/group/addGroup"
                        className="bg-blue-900 text-gray-200 hover:bg-blue-900 text-[16px] px-4 py-2 rounded-md"
                    >
                        Add New Group
                    </Link>
                </div>
            </header>

            <DataTableDemo data={Groups?.results} columns={columns} loading={loading} itemsNumber={Groups?.count} onPageChange={handlePagination} />

        </div>
    )
}
export default GroupTableData;