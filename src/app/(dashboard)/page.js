import TableDemo from "@/components/helpers-components/TableDemo";
import ColumnChart from "@/components/charts/ColumnChart";
import OverViewTableData from "@/data/table-data/OverViewTableData";
import OperatingSystem from "@/components/os/OperatingSystem";
import {GetDataWithHourRevalidate} from "@/lib/action";
import allIcons from "@/lib/all-icons";


export default async function Home() {
    // ----------- Get Data In server Side ---------------
    const Over_View_data = await GetDataWithHourRevalidate("/dashboard/overview/");

    // ----------- Row And Header For Top Drivers and most recent earnings Tables ---------------
    const {Rows, headers, RecentEarningsRows} = OverViewTableData(Over_View_data);

    // ----------- Cards Information Data  ---------------
    const All_average_Earnings =[
        {
            "id": 1,
            "title": "TOTAL EARNINGS",
            "value": Over_View_data?.totals?.total_earnings + " SEK",
            "diffValue": Over_View_data?.totals?.total_earnings_diff,
            "color": "bg-gradient-to-b from-green-400 to-teal-600"
        },
        {
            "id": 2,
            "title": "Total Rides",
            "value": Over_View_data?.totals?.total_rides + " Rides",
            "diffValue": Over_View_data?.totals?.total_rides_diff,
            "color": "bg-gradient-to-b from-blue-400 to-blue-600"
        },
        {
            "id": 3,
            "title": "Total Drivers",
            "value": Over_View_data?.totals?.total_drivers + " Drivers",
            "diffValue": Over_View_data?.totals?.total_drivers_diff,
            "color": "bg-gradient-to-b from-orange-400 to-red-600"
        },
        {
            "id": 4,
            "title": "Total Passengers",
            "value": Over_View_data?.totals?.total_passengers + " Passengers",
            "diffValue": Over_View_data?.totals?.total_passengers_diff,
            "color": "bg-gradient-to-r from-pink-600 to-red-400"
        }
    ]

    return (
        <section className="flex gap-8 flex-col">
            {/* ------------  Welcome Header ------------------- */}
            <main className="flex flex-col gap-8">
                <div className="flex flex-col lg:flex-row items-center justify-between  gap-5">
                    <div className="flex flex-col">
                        <h1 className="font-mono text-[25px] text-blue-800 ">Hi, welcome back!</h1>
                        <p className="text-gray-500">Your monitoring dashboard .</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-3 items-center">
                            <p className="text-gray-500 text-center">Customer Ratings</p>
                            <p className="flex items-center  font-bold text-blue-800">
                                {Array.from({length: 5}).map((_, i) => (
                                    <span key={i}
                                          className={`text-[20px] ${Over_View_data?.bar_info?.average_rating > (i + 1) ? "text-yellow-600" : "text-gray-400"}`}>{allIcons?.Star_icon}</span>
                                ))}
                                ({Over_View_data?.bar_info?.reviewed_drivers_count})
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <p className="text-gray-500 text-center">Online Drivers</p>
                            <p className=" font-bold text-[20px]">{Over_View_data?.bar_info?.online_drivers}</p>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <p className="text-gray-500 text-center">Offline Drivers</p>
                            <p className=" font-bold text-[20px]">{Over_View_data?.bar_info?.offline_drivers}</p>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {
                        All_average_Earnings?.map((item => {
                            return (
                                <div
                                    key={item.id}
                                    className={`rounded-md shadow-xl flex flex-col gap-2 p-4 ${item?.color}`}>
                                    <h1 className="font-mono text-[20px] text-white">{item?.title}</h1>
                                    <div className="flex items-center justify-between my-2">
                                        <div className="flex-1">
                                            <p className="font-bold text-white text-[20px]">{item?.value}</p>
                                            <p className="text-[18px] text-gray-100">Compared to last week</p>
                                        </div>
                                        <div className="text-white font-semibold flex items-center gap-2">
                                            {item?.diffValue}
                                            <span
                                                className="w-[20px] h-[20px] bg-white flex items-center justify-center rounded-full text-[15px] text-black">
                                    {item?.diffValue < 0 ? allIcons?.Arrow_down_icon : allIcons?.Arrow_up_icon}
                                </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                    }
                </div>
            </main>

            {/* ------------  Tables  ------------------- */}
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-md shadow-md flex flex-col gap-2 p-3 ">
                    <h1 className="font-bold text-[20px] text-blue-800">Your Top Drivers</h1>
                    <p className="text-gray-500">Revenue based by drivers</p>
                    <div className="mt-5 border rounded-md">
                        <TableDemo Rows={Rows}/>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md flex flex-col gap-2 p-3 col-span-1 md:col-span-2">
                    <h1 className="font-bold text-[20px] text-blue-800">Your Most Recent Earnings</h1>
                    <p className="text-gray-500">This is your most recent earnings for today&apos;s date.</p>
                    <div className="mt-5 border rounded-md">
                        <TableDemo Rows={RecentEarningsRows} headers={headers}/>
                    </div>
                </div>
            </main>

            {/* ------------  Operating Systems and Analyst design  ------------------- */}
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-md shadow-md flex flex-col gap-2 p-3 col-span-1 md:col-span-2">
                    <h1 className="font-bold text-[20px] text-blue-800">Ride status</h1>
                    <p className="text-gray-500">Ride Status track your company rides status from this chart.</p>
                    <div className="flex items-center gap-5 flex-col md:flex-row my-4">
                        <div className="flex flex-col justify-center text-center">
                            <p className="font-bold text-[25px] text-blue-800">{Over_View_data?.stats_totals?.success}</p>
                            <div className="flex items-center justify-center gap-1">
                                <p className="w-2 h-2 rounded-full bg-blue-900 mt-1"></p>
                                <p className="text-blue-800 text-[18px]">success</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-center">
                            <p className="font-bold text-[25px] text-blue-800">{Over_View_data?.stats_totals?.failed}</p>
                            <div className="flex items-center justify-center gap-1">
                                <p className="w-2 h-2 rounded-full bg-red-500 mt-1"></p>
                                <p className="text-blue-800 text-[18px]">Failed</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-center">
                            <p className="font-bold text-[25px] text-blue-800">{Over_View_data?.stats_totals?.schedule}</p>
                            <div className="flex items-center justify-center gap-1">
                                <p className="w-2 h-2 rounded-full bg-orange-300 mt-1"></p>
                                <p className="text-blue-800 text-[18px]">Scheduled</p>
                            </div>
                        </div>

                    </div>
                    <div className="mt-5 border rounded-md">
                        <ColumnChart data={Over_View_data?.rides_stats}/>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md flex flex-col gap-2 p-3 ">
                    <h1 className="font-bold text-[20px] text-blue-800">Operating system</h1>
                    <p className="text-gray-500">statistics for the operating systems</p>
                    <div className="my-5">
                        <OperatingSystem os={Over_View_data?.devices}/>
                    </div>
                </div>
            </main>
        </section>
    );
}
