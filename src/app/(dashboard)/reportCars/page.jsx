
import CarTableData from "@/data/table-data/Cars/EconomyCarTableData";

const LargeCarPage = () => {
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-main-100 uppercase">Report Cars</h1>
            <p className="text-gray-400">This is your most recent report cars at the top</p>
            <CarTableData href="Large" />
        </section>
    );
};

export default LargeCarPage;