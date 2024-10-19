'use client';

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { DeleteRides, UpdateRides } from "@/redux/Slices/rides-slice/RideSlice";

import { AlertDialogDemo } from "@/components/helpers-components/AlertDialogDemo";
import { buttonVariants } from "@/components/ui/button";




export default function ActionRidesBtn({ status, rideID }) {
    const { router } = UseSearchParamsHook();

    // -------------- global Store --------------------------------
    const dispatch = useDispatch();
    const { loading, rides, error } = useSelector((state) => state.rides);

    // ---------------- Global Function ----------------------
    function handleDeleteRides() {
        dispatch(DeleteRides(rideID)).then((result) => {
            if (result?.meta?.requestStatus === "rejected") {
                router.push('/ridesPast')
                toast.success("Ride Deleted", {
                    action: {
                        label: "Close",
                        onClick: () => toast.dismiss(),
                    }
                })
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

    function handleEndRides() {
        dispatch(UpdateRides({
            id: rideID,
            body: {
                status: "completed"
            }
        })).then((result) => {
            if (result?.payload?.detail) {
                toast.error("Error Occur When Ending This Ride", {
                    action: {
                        label: "Hide",
                        onClick: () => toast.dismiss(),
                    }
                })
            } else {
                router.push('/ridesNow')
                toast.success("Rides Ended Successfully", {
                    action: {
                        label: "Hide",
                        onClick: () => toast.dismiss(),
                    }
                })
            }
        })
    }

    if (status === "completed") {
        return (
            <div className="flex gap-2">
                <p className="completed px-8 capitalize">{status}</p>
                <AlertDialogDemo
                    handleAction={handleDeleteRides}
                    ActionBtnName="Delete"
                    ButtonName="Delete"
                    title="Delete Ride"
                    description="Are U sure To Delete This Ride"
                    style="text-white border-red-500 bg-red-700  hover:bg-red-300 hover:text-red-900 text-[18px] px-5"
                    loading={loading}
                />
            </div>
        )
    }
    return (
        <div className="flex gap-2">
            <p className="on_the_Ride px-8 ">On the ride</p>
            <AlertDialogDemo
                handleAction={handleEndRides}
                ActionBtnName="End ride"
                ButtonName="End ride"
                title="End Ride"
                description="Are U sure To End This Ride"
                style={`${buttonVariants({ variant: "outline" })} text-red-500 border-red-500  hover:bg-red-300 hover:text-red-900 text-[18px] px-5 `}
                loading={loading}
            />
        </div>
    )
}
