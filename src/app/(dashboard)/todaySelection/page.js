import FiltrationCar from "@/components/pages/TodaySelection/FiltrationCar";
import TodaySelectionTable from "@/data/table-data/TodaySelection/TodaySelectionTable";

const TodaySelectionPage = () => {

    return (

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FiltrationCar />
            <main className="col-span-2 lg:col-span-3 bg-white rounded-md shadow-md flex flex-col gap-2 p-3">
                <h1 className="font-bold text-[20px] text-main-100">Your Drivers</h1>
                <p className="text-gray-500">Update your Drivers with cars.</p>
                <div className="mt-5 border rounded-md">
                    <TodaySelectionTable />
                </div>
            </main>
        </section>


    );
};

export default TodaySelectionPage;