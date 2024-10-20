import ClientsTableData from "@/data/table-data/clients/ClientsTableData";


const ClientsPage = () => {
    

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-4">
            <h1 className="text-[18px] font-bold text-main-100">Clients</h1>
            <p className="text-gray-400">This is your most recent earnings for today&apos;s date.</p>
            <ClientsTableData/>
        </section>
    );
};

export default ClientsPage;