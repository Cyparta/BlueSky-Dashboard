
import DriversTableData from "@/data/table-data/Drivers/DriversTableData";


const DriversPage = () => {
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-blue-800 uppercase">Drivers</h1>
            <p className="text-gray-400">This is your most recent drivers at the top</p>
            <DriversTableData />
        </section>
    );
};

export default DriversPage;