
import AdsTableData from "@/data/table-data/Ads/AdsTableData";

const AdsPage = () => {
    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-blue-800 uppercase">Ads</h1>
            <p className="text-gray-400">This is your most recent Ads at the top</p>
            <AdsTableData />
        </section>
    );
};

export default AdsPage;