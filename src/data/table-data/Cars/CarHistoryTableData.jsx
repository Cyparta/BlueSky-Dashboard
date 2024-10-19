'use client';


import { useDispatch, useSelector } from "react-redux";

import { GetCarHistory } from "@/redux/Slices/Cars-slice/CarSlice";

import { DataTableDemo } from "@/components/helpers-components/DataTabel";


const CarHistoryTableData = ({ CarId }) => {

    const dispatch = useDispatch();
    const { cars, loading, error } = useSelector((state) => state.cars);


    // ---------------- Public Function ----------------------
    const handlePagination = (pageNumber) => {
        dispatch(GetCarHistory({
            page: pageNumber,
            id: CarId,
        }));
    }


    const data = cars?.results?.map((item) => {
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


    return (<>
        <DataTableDemo data={data} columns={columns} loading={loading} itemsNumber={cars?.count} onPageChange={handlePagination} />
    </>)
};

export default CarHistoryTableData;