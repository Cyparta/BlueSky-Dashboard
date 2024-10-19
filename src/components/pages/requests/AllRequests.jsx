'use client';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";

import { GetAllRequests } from "@/redux/Slices/requests-slice/RequestSlice";
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { Input } from "@/components/ui/input";
import RequestDetail from "./RequestDetail";
import EmptyRequest from "./EmptyRequest";
import Request from "./Request";
import SkeltonOne from "../loading/SkeltonOne";




export default function AllRequests() {
    const { createQueryString, searchParams } = UseSearchParamsHook();
    const [searchValue, setSearchValue] = useState("");

    // ------------- Redux State Management -------------
    const dispatch = useDispatch();
    const { requests, loading, error, updateLoading } = useSelector(state => state.requests);


    // --------------- Effects ---------------

    useEffect(() => {
        if (searchValue.length > 0) {
            const timer = setTimeout(() => {
                dispatch(GetAllRequests(searchValue))
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            dispatch(GetAllRequests(searchValue))
        }
    }, [searchValue]);


    // --------------- Functions ---------------
    function FindDriverId(driverID) {
        return requests?.results?.find(request => request.id === driverID);
    }

    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value);
    }


    // --------------- JSX ---------------
    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <main className='col-span-1 min-h-screen max-h-screen bg-[#EAECF0] rounded-md shadow-md p-3 flex flex-col gap-4'>
                <h1 className='text-[#6E7C87]'>Recently</h1>
                <Input
                    placeholder="Search Requests With Driver Number Or Name`s ..."
                    value={searchValue}
                    onChange={handleChangeSearch}
                    className="outline-0 w-full focus-visible:ring-0 focus-visible:ring-offset-0 border"
                />
                {
                    loading ? <SkeltonOne number={4} /> :
                        requests?.results?.length > 0 ?
                            <div className='flex-1 flex flex-col gap-5 overflow-auto'>
                                {
                                    requests?.results?.map((request, i) => {
                                        return (
                                            <Link
                                                href={createQueryString("driverID", request?.id)}
                                                key={i}>
                                                <Request data={request} />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            :
                            <EmptyRequest />
                }
            </main>
            <RequestDetail data={FindDriverId(searchParams.get("driverID"))} loading={updateLoading} />
        </section>
    )
}
