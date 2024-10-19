import Image from "next/image";

import ActionRidesBtn from "@/components/pages/rides/ActionRidesBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import alarm from "@/data/Svg/alarm.svg";
import rideWay from "@/data/Svg/RideWay.svg";
import allIcons from "@/lib/all-icons";


export default async function RideDetail({ ridesInfo }) {

    return (
        <section className="flex flex-col ">
            <header
                className="flex items-center justify-center md:justify-between flex-col-reverse  md:flex-row gap-8 md:gap-0 rounded-t-md bg-white shadow-md p-3 ">
                <div className="flex flex-row md:flex-col justify-center items-center md:items-start gap-8 md:gap-2">
                    <p className="text-[18px] font-semibold">Ride details</p>
                    <h1 className="font-bold text-[30px] text-blue-800">#{ridesInfo?.id}</h1>
                </div>
                <ActionRidesBtn status={ridesInfo?.status} rideID={ridesInfo?.id} />
            </header>
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <main className="rounded-b-md shadow-sm bg-white flex flex-col">
                    <div className="flex items-center gap-3 bg-gray-100 p-4 ">
                        <Avatar
                            className="w-[90px] h-[90px]"
                        >
                            <AvatarImage
                                src={ridesInfo?.driver_image}
                                alt="Driver's Image"
                                className="cursor-pointer"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <p className="font-mono text-[25px]">{ridesInfo?.driver_name}</p>
                            <p className="text-gray-500 flex items-center gap-1">
                                <span className="font-bold text-yellow-600">{allIcons?.Star_icon}</span> {ridesInfo?.driver_average_rating}
                                <span className="text-[#344054] mx-4">{ridesInfo?.driver_completed_rides} rides</span>
                            </p>
                            <p className="text-gray-500">{`${ridesInfo?.driver_car_model} ${ridesInfo?.car_plate}`}</p>
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-3 gap-12 text-xl p-4 py-7 border-b">
                        <p>Company Number</p>
                        <span className="col-span-2 font-bold">{ridesInfo?.driver_company}</span>
                    </div>
                    <div
                        className="grid grid-cols-3 gap-12 text-xl p-4 py-7 border-b">
                        <p>Driver Phone Number</p>
                        <span className="col-span-2 font-bold">{ridesInfo?.driver_phone}</span>
                    </div>

                </main>
                <main className="rounded-b-md shadow-sm bg-white flex flex-col ">
                    <div className="flex items-center gap-3 bg-gray-100 p-4 py-5 ">
                        <Avatar
                            className="w-[90px] h-[90px]"
                        >
                            <AvatarImage
                                src={ridesInfo?.client_image}
                                alt="Client's Image"
                                className="cursor-pointer"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <p className="font-mono text-[25px]"> {ridesInfo?.client_name} </p>
                            <p className="text-gray-500 flex items-center gap-1">
                                <span className="font-bold text-yellow-600">{allIcons?.Star_icon}</span> {ridesInfo?.client_rate}
                            </p>
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-3 gap-12 text-xl p-4 py-7 border-b">
                        <p>Created At</p>
                        <span className="col-span-2 font-bold"> {`${new Date(ridesInfo?.client_date_joined).toLocaleDateString()}  ${new Date(ridesInfo?.client_date_joined).toLocaleTimeString()}`} </span>
                    </div>
                    <div
                        className="grid grid-cols-3 gap-12 text-xl p-4 py-7 ">
                        <p>Client Phone Number</p>
                        <span className="col-span-2 font-bold"> {ridesInfo?.client_phone} </span>
                    </div>
                </main>
            </article>
            <main className="my-8 flex  flex-col  gap-5 rounded-md bg-white shadow-sm p-3">
                <p className="text-xl font-mono">Type & Payment</p>
                <div className="flex md:flex-row flex-col md:justify-between justify-center items-center gap-8">
                    <p className="text-[18px] font-semibold">{!ridesInfo?.is_schedule ? "Normal ride" : ride?.one_way ? "Scheduled (One way)" : "Scheduled (Return)"}</p>
                    <h1 className="text-[18px]">
                        {ridesInfo?.payment_type === "card" ? "Credit card" : "Cash"}
                        <span className="text-green-600 font-bold  mx-5"> {ridesInfo?.estimated_price} SEK</span>
                    </h1>
                </div>
            </main>
            <main className="mb-8 flex flex-col  gap-5 rounded-md bg-white shadow-sm p-3">
                <p className="text-xl font-mono">Ride description</p>
                <div
                    className="flex md:flex-row flex-col md:justify-between justify-center items-center gap-8 border-b pb-8">
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="text-[18px] text-gray-500">Pick-up</p>
                            <h1 className="text-[18px] font-bold"> {ridesInfo?.from_location_name} </h1>
                        </div>
                        <div>
                            <p className="text-[18px] text-gray-500">Destination</p>
                            <h1 className="text-[18px] font-bold"> {ridesInfo?.to_location_name} </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div
                            className="w-[87px] py-4 rounded-md border bg-gray-50 flex flex-col justify-center items-center">
                            <Image src={alarm} alt="alarm Icon" width={30} height={30} className="cursor-pointer" />
                            <p className="text-[18px] font-bold"> {Math.ceil(ridesInfo?.estimated_time) + " Min "} </p>
                        </div>
                        <div
                            className="w-[87px] py-4 rounded-md border bg-gray-50 flex flex-col justify-center items-center">
                            <Image src={rideWay} alt="alarm Icon" width={30} height={30} className="cursor-pointer" />
                            <p className="text-[18px] font-bold">{ridesInfo?.estimated_distance}Km</p>
                        </div>
                    </div>
                </div>
                <div
                    className="grid grid-cols-3 gap-12 text-xl ">
                    <p>{`${new Date(ridesInfo?.finished_at).toLocaleDateString()} - ${new Date(ridesInfo?.finished_at).toLocaleTimeString()}`}</p>
                    <span className="col-span-2">Ride ended</span>
                </div>
                <div
                    className="grid grid-cols-3 gap-12 text-xl ">
                    <p>{`${new Date(ridesInfo?.when_start).toLocaleDateString()} - ${new Date(ridesInfo?.when_start).toLocaleTimeString()}`}</p>
                    <span className="col-span-2">Ride started</span>
                </div>
                <div
                    className="grid grid-cols-3 gap-12 text-xl ">
                    <p>{`${new Date(ridesInfo?.created_at).toLocaleDateString()} - ${new Date(ridesInfo?.created_at).toLocaleTimeString()}`}</p>
                    <span className="col-span-2">Waiting for the Passenger </span>
                </div>
                <div
                    className="grid grid-cols-3 gap-12 text-xl ">
                    <p>{ridesInfo?.pickup_date ? `${new Date(ridesInfo?.pickup_date).toLocaleDateString()} - ${new Date(ridesInfo?.pickup_date).toLocaleTimeString()}` : "--"}</p>
                    <span className="col-span-2">Arrived to the pick-up location</span>
                </div>
            </main>
        </section>
    );
};

