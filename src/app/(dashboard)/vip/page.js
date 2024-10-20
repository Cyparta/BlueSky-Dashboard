
import EconomyCarTableData from "@/data/table-data/Cars/EconomyCarTableData";

const VipPage = () => {
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-main-100 uppercase">Cars</h1>
            <p className="text-gray-400">This is your most recent cars at the top</p>
            <EconomyCarTableData href="Vip"/>
        </section>
    );
};

export default VipPage;