'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { filterTodaysSelection, updateTodaysSelection } from "@/redux/Slices/Todayes-selection/TodaySelectionSlice";


import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TableDemo from "@/components/helpers-components/TableDemo";
import InputDemo from "@/components/inputs/Input-demo";


import allIcons from "@/lib/all-icons";
import PaginatedItems from "@/components/helpers-components/Pagination";



const TodaySelectionTable = () => {
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const [pageCount, setPageCount] = useState(1)


    // ---------------- Global Store  -------------------
    const dispatch = useDispatch();
    const { todaysSelection, loading, error } = useSelector((state) => state.todaySelection);

    // ----------- Global Effect ---------------
    useEffect(() => {
        if (searchValue.length > 0) {
            const timeOut = setTimeout(() => {
                dispatch(filterTodaysSelection({
                    filter: searchParams.get("filter") === "all" ? "" : searchParams.get("filter"),
                    search: searchValue
                }));
            }, 500);
            return () => clearTimeout(timeOut);
        } else {
            dispatch(filterTodaysSelection({
                filter: searchParams.get("filter") === "all" ? "" : searchParams.get("filter"),
                search: searchValue,
                page: pageCount
            }));
        }
    }, [searchParams?.get("filter"), searchValue, pageCount]);



    // ------------------  Global Function -------------------
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleUpdate = (Company_id, Car_id) => {
        dispatch(updateTodaysSelection({
            driverID: Company_id,
            body: { car: Car_id }
        })).then((result) => {
            result?.meta?.requestStatus === "fulfilled" ?
                dispatch(filterTodaysSelection({
                    filter: searchParams.get("filter") === "all" ? "" : searchParams.get("filter"),
                    search: searchValue
                }))
                : null;
        });
    }

    const handlePageChange = (e) => {
        setPageCount(e.selected + 1)
    }

    // ----------- Table Filter Drivers Rows ------------
    const Rows = todaysSelection?.results?.map((item) => {
        return {
            items: [{
                label: item?.user_name, className: "text-[18px] w-[300px]  font-[600]"
            }, {
                label: item?.user_phone + " SEK",
                className: "text-[16px]  w-[200px] font-bold text-main-100 line-clamp-1"
            }, {
                label:
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost"
                                className="h-8 w-full px-4 flex justify-end border focus-visible:ring-0 focus-visible:ring-opacity-0 focus-visible:ring-white ">
                                <span className="sr-only">Open menu</span>
                                <p className="h-4 text-[15px] font-bold max-w-fit flex items-center gap-2   ">
                                    Select car
                                    <span>{allIcons.Arrow_down_icon}</span>
                                </p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {
                                item?.company_cars?.length > 0 ?
                                    item?.company_cars?.map((car) => {
                                        return <DropdownMenuItem
                                            key={car?.id}
                                            onClick={() => handleUpdate(item?.id, car?.id)}
                                            className="cursor-pointer"
                                        >
                                            {car?.car_model}
                                        </DropdownMenuItem>

                                    }) :
                                    <DropdownMenuItem>No Cars</DropdownMenuItem>
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
            }],
            tableBodyClassName: "flex justify-between w-full"
        }
    });

    // ----------- Return Jsx -------------------
    return (
        <main className="flex items-center  flex-col gap-4 ">
            <InputDemo style="px-10 pt-3 place-content-center  lg:grid-cols-12" placeHolder="Search In Drivers"
                value={searchValue}
                onChange={handleChange} />
            <TableDemo Rows={Rows} Loading={loading} />
            <PaginatedItems itemNumber={todaysSelection?.count} onPageChange={handlePageChange} />
        </main>
    );
}

export default TodaySelectionTable;

