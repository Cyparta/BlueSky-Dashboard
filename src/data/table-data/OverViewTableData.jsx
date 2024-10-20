const OverViewTableData = (data) => {
    // ----------- Table Most Recent Earnings Header ------------
    const headers = [{
        label: "Date", className: " border-r-2 border-gray-200 font-bold text-[18px] text-main-100"

    }, {
        label: "Driver name", className: " border-r-2 border-gray-200 font-bold text-[18px] text-main-100"

    }, {
        label: "Tatal fare", className: " border-r-2 border-gray-200 font-bold text-[18px] text-main-100"
    }, {
        label: "His Money", className: "font-bold text-[18px] text-main-100"
    },];

    // ----------- Table Top Drivers Rows ------------
    const Rows = data?.top_drivers?.map((item) => {
        return {
            items: [{
                label: item?.name, className: "text-[18px] font-[600]"
            }, {
                label: item?.value + " SEK", className: "text-[16px] font-bold text-main-100"
            },], tableBodyClassName: "flex justify-between w-full"
        }
    })

    // ----------- Table Most Recent Earnings Rows ------------
    const RecentEarningsRows = data?.today_drivers_earnings?.map((item, index) => {
        return {
            items: [{
                label: item?.date, className: "text-[16px] border-r-2 border-gray-200"
            }, {
                label: item?.name, className: "text-[16px]  border-r-2 border-[#EAE8F1]"
            }, {
                label: item?.total_earnings_today + " SEK", className: "border-r-2 border-gray-200"

            }, {
                label: "-45.10 SEK",

            }], tableBodyClassName: index % 2 === 0 ? "bg-blue-50" : ""
        }
    })


    return {headers, Rows, RecentEarningsRows};
};

export default OverViewTableData;