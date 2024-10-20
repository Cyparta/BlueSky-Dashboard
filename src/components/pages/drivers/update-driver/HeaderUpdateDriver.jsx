'use client';

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { DeleteDrivers } from "@/redux/Slices/Drivers/DriverSlice";

import { AlertDialogDemo } from '@/components/helpers-components/AlertDialogDemo';
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

import allIcons from "@/lib/all-icons";


const HeaderUpdateDriver = ({ driverID}) => {
    const router = useRouter()
    const driverName = useSearchParams().get('diverName');

    // -------------- global Store --------------------------------
    const dispatch = useDispatch();
    const { loading, drivers, error } = useSelector((state) => state.drivers);

    // ---------------- Global Function ----------------------
    function handleDeleteDrivers() {
        dispatch(DeleteDrivers(driverID)).then((result) => {
             if(result?.meta?.requestStatus === "rejected"){
                    router.push('/drivers')
             }else{
                 toast.error("Error Occur When Deleting This Client" , {
                    action:{
                        label: "Hide",
                        onClick: () => toast.dismiss(),
                    }
                 })
             }
        });
    }

    return (
        <header className="flex items-center justify-between">
            <main className="flex flex-col gap-4">
                <p>Driver Profile</p>
                <h1 className="text-main-100 font-bold text-[25px]">{driverName}</h1>
            </main>
            <main className="flex items-center gap-4">

                {/*  
                            ----------- I added profile to the href path to make it work with the edit Profile in Add New Client Page --------------------
                */}

                <Link href={`/drivers/updateDriver/PROFILE${driverID}`}
                    className={`${buttonVariants({ variant: "outline" })} text-main-100  hover:bg-blue-500 hover:text-gray-200 text-[25px] px-5 `}>
                    <span className="mr-1">{allIcons.edit_icon}</span>
                    Edit</Link>
                <AlertDialogDemo
                    handleAction={handleDeleteDrivers}
                    ActionBtnName="Delete"
                    ButtonName="Delete"
                    title="Delete Driver"
                    description="Are U sure To Delete This Driver"
                    style="bg-red-600 text-white hover:bg-red-300 hover:text-black"
                    loading={loading}
                />
            </main>
        </header>
    );
};

export default HeaderUpdateDriver;