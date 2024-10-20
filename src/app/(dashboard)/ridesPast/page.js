import RidesTableData from "@/data/table-data/rides/RidesTableData";

const RidesPastPage = () => {
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-main-100">Now Rides</h1>
            <p className="text-gray-400">This is your most recent rides at the top.</p>
            <RidesTableData filter="history" href="ridesPast/past"/>
        </section>
    );
};

export default RidesPastPage;