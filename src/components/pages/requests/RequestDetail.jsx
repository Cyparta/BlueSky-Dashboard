'use client';

import { useState } from "react";
import { useDispatch } from "react-redux";

import { ApprovedRequest, DeclineRequest, GetAllRequests } from "@/redux/Slices/requests-slice/RequestSlice";
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

import AllIcons from "@/lib/all-icons";

import Gallery from "@/components/light-gallary/lightGallery";




export default function RequestDetail({ data, loading }) {
    const [status, setStatus] = useState("");
    const { router } = UseSearchParamsHook();


    const dispatch = useDispatch();

    // ---------------------- Approve Request ----------------------
    function handleApproveRequest() {
        dispatch(ApprovedRequest({
            id: data?.id,
            body: {
                "is_verified": true
            }
        })).then((result) => {
            if (result?.payload?.id) {
                router.push("/requests")
                toast.success("Request Approved", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
            }
            dispatch(GetAllRequests())
        })
    }

    // ---------------------- Decline Request ----------------------
    function handleDeclineRequest() {
        dispatch(DeclineRequest(data?.id)).then((result) => {
            if (result) {
                router.push("/requests")
                toast.success("Request Declined successfully", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
            }
            dispatch(GetAllRequests())
        })
    }
    return (
        data?.id ?
            <main className='col-span-1 lg:col-span-2 min-h-screen bg-[#EAECF0] rounded-md shadow-md p-3 flex flex-col gap-4'>
                <h1 className='text-[#6E7C87]'>{data?.user_name}’s request</h1>
                <div className='flex-1 bg-white rounded-md p-3 px-5 max-h-screen overflow-auto shadow-md flex flex-col gap-4'>
                    <header className="flex items-center w-full py-3 px-2 rounded-bl border-b  cursor-pointer">
                        <Avatar>
                            <AvatarImage src={data?.user_image} alt=" profile Logo "
                                className="cursor-pointer" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col ml-4">
                            <p className="font-[600]  text-[18px] text-black line-clamp-1">{data?.user_name}</p>
                            <p className="text-blue-100 text-[16px] line-clamp-1">
                                {data?.user_phone}
                            </p>
                        </div>
                    </header>
                    <nav className="flex items-center justify-between">
                        <p
                            className={`${data?.user_gender === "Male" ? "male" : "Female"} p-1 rounded-md`}>
                            {data?.user_gender === "Male" ? "male" : "Female"}
                        </p>
                        <p className="text-gray-400">2:00 PM</p>
                    </nav>
                    <h1 className="flex items-center gap-6 text-[20px] font-bold">{AllIcons.Company_icon} Company Number</h1>
                    <h1 className="flex items-center gap-6 text-[20px]">{data?.company}</h1>
                    <h1 className="flex items-center gap-6 text-[20px] font-bold my-5">{AllIcons.Attachment_icon} Attachments </h1>
                    <Gallery Lic_front={data?.id_front} Lic_back={data?.id_back} />
                    <footer className="h-full flex items-end justify-end gap-7" >
                        <Button
                            disabled={(loading && status === "Decline")}
                            onClick={() => {
                                handleDeclineRequest()
                                setStatus("Decline")
                            }}
                            className={`${buttonVariants({ variant: "outline" })} text-red-500  hover:bg-red-300`}>
                            {(loading && status === "Decline") ? 'Declining...' : 'Decline'}
                        </Button>
                        <Button
                            disabled={(loading && status === "Approved")}
                            onClick={() => {
                                handleApproveRequest()
                                setStatus("Approved")
                            }}
                            className="bg-blue-700">
                            {(loading && status === "Approved") ? "Approving..." : "Approve"}
                        </Button>
                    </footer>
                </div>
            </main>
            :
            <main className='col-span-2 min-h-screen bg-[#EAECF0] rounded-md shadow-md p-3 flex flex-col gap-4'>
                <h1 className='text-[#6E7C87]'>request Details</h1>
                <div className='flex-1 bg-white rounded-md p-3 max-h-screen overflow-auto shadow-md'>
                </div>
            </main>
    )
}
