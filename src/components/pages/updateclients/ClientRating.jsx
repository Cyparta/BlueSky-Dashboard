"use client";
import AllIcons from '@/lib/all-icons';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetClientRatings, GetDriverRatings } from '@/redux/Slices/Client-Slice/ClientStore';

import SkeltonOne from '../loading/SkeltonOne';



const ClientRating = ({ UserId, type }) => {
    const dispatch = useDispatch();
    const { loading, clients, error } = useSelector(state => state.clients);

    useEffect(() => {
        if (type === 'client') {
            dispatch(GetClientRatings(UserId));
        } else if (type === 'driver') {
            dispatch(GetDriverRatings(UserId));
        }
    }, [])

    // --------------- return Loading If Data Not Fetched In Client Side  --------------------
    if (loading) {
        return <SkeltonOne />
    }


    // ---------------- return Empty If No Data Found ----------------
    if (clients?.results?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">No Rating Found</h1>
            </div>
        )
    }

    // --------------- return Jsx --------------------
    return (
        <section className='flex flex-col gap-2'>
            <main className='grid grid-cols-4  gap-6 p-4 py-8 items-center '>
                <div className='col-span-4 md:col-span-2 lg:col-span-1 flex flex-col border-0 md:border-r '>
                    <p className="flex items-center  font-bold text-blue-800">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}
                                className={`text-[30px] ${clients?.results?.at(0)?.average_rate >= i + 1 ? "text-orange-800" : "text-yellow-200"}`}
                            >{AllIcons?.Star_icon}
                            </span>
                        ))}
                    </p>
                    <p className="text-[30px] text-blue-900 font-bold my-0 py-0">{clients?.results?.at(0)?.average_rate}/5</p>
                    <p className="text-gray-500 my-0 py-0">avg rating</p>
                </div>
                <div className='col-span-4 md:col-span-2 lg:col-span-3  '>
                    <p className="text-[35px] text-blue-900 font-bold my-0 py-0">{clients?.count}</p>
                    <p className="text-gray-500 my-0 py-0">Total reviews</p>
                </div>
            </main>
            {
                clients?.results?.map((rate, indx) => {
                    return (
                        <article key={indx} className='border-t grid grid-cols-3 items-center py-8 px-4 gap-6'>
                            <main className="col-span-3 md:col-span-2  flex flex-row gap-4 items-center border-r-0 md:border-r">
                                <Avatar
                                    className="w-[82px] h-[82px]"
                                >
                                    <AvatarImage
                                        src={rate?.reviewer?.image}
                                        alt="Client's Image"
                                        className=" -pointer"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 ">
                                    <h2 className="text-xl font-bold">{rate?.reviewer?.name}</h2>
                                    <p className="flex items-center  font-bold text-blue-800 my-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i}
                                                className={`text-[20px] ${rate?.rate >= i + 1 ? "text-orange-800" : "text-yellow-200"}`}
                                            >{AllIcons?.Star_icon}
                                            </span>
                                        ))}
                                    </p>
                                    <h1 className="text-xl text-gray-500">Paid:
                                        <span className="text-blue-900 font-bold">
                                            {rate?.service_price} SEK
                                        </span>
                                    </h1>
                                </div>
                            </main>
                            <main className="col-span-3 md:col-span-1 flex flex-col items-start md:items-end">
                                <h2 className="text-xl text-blue-800">Ride #{rate?.service}</h2>
                                <h2 className="text-xl text-gray-500">{`${new Date(rate?.created_at).toLocaleDateString()}  -   ${new Date(rate?.created_at).toLocaleTimeString()}`}</h2>
                            </main>
                            {
                                rate?.comment && <p className='col-span-3 md:col-span-2 '>{rate?.comment}</p>
                            }
                        </article>
                    )
                })
            }
        </section>
    )
};

export default ClientRating;