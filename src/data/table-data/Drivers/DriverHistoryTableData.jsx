'use client';


import { useDispatch, useSelector } from "react-redux";

import { DataTableDemo } from "@/components/helpers-components/DataTabel";
import { GetDriverHistory } from "@/redux/Slices/Drivers/DriverSlice";

const DriverHistoryTableData = ({ driverID }) => {
    const dispatch = useDispatch();
    const { drivers, loading, error } = useSelector((state) => state.drivers);

    // ---------------- Global Function ----------------------
    const handlePagination = (pageNumber) => {
        dispatch(GetDriverHistory({
            page: pageNumber,
            id: driverID
        }));
    }


    // ------------- Table Rows -------------
    const data = drivers?.results?.map((item) => {
        return {
            id: item?.id,
            from: item?.from_location_name,
            to: item?.to_location_name,
            type: !item?.is_schedule ? "Normal ride" : item?.one_way ? "Scheduled (One way)" : "Scheduled (Return)",
            paid: `${item?.price} SEK`,
            date: `${new Date(item?.created_at).toLocaleDateString()}  -   ${new Date(item?.created_at).toLocaleTimeString()}`,
            status: item?.status,
            driverName: item?.driver_name,
        };
    });


    // ------------- Table Columns -------------
    const columns = [{
        accessorKey: "id", header: "Trip ID", cell: ({ row }) => <p>{row.getValue("id")}</p>
    }, {
        accessorKey: "driverName", header: "Driver Name", cell: ({ row }) => <p>{row.getValue("driverName")}</p>
    }, {
        accessorKey: "from",
        header: "From",
        cell: ({ row }) => (<div className="capitalize ">{row.getValue("from")}</div>),
    }, {
        accessorKey: "to",
        header: "To",
        cell: ({ row }) => <div className="capitalize">{row.getValue("to")}</div>,
    }, {
        accessorKey: "type",
        header: () => <div className="text-center">Type</div>,
        cell: ({ row }) => (<div className="capitalize text-center">{row.getValue("type")}</div>),
    }, {
        accessorKey: "paid",
        header: "Paid",
        cell: ({ row }) => <div className="capitalize font-bold ">{row.getValue("paid")}</div>,
    }, {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <div className="capitalize font-bold ">{row.getValue("date")}</div>,
    }, {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (<div
            className={`capitalize text-center ${row.getValue("status") === "completed" ? "completed" : "canceled"}`}>{row.getValue("status")}</div>),
    },]


    return (
        <>
            <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={drivers?.count} onPageChange={handlePagination} />
        </>
    )
};

export default DriverHistoryTableData;