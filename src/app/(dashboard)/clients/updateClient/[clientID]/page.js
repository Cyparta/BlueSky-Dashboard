import HeaderUpdateUser from "@/components/pages/updateclients/HeaderUpdateUser";
import ClientTabs from "@/components/pages/updateclients/ClientTabs";
import UpdateClient from "@/components/pages/updateclients/UpdateClient";


const UpdateClientWithIdPage = ({params}) => {

    if (params.clientID.includes("PROFILE")) {
        return (
            <UpdateClient params={params}/>
        );
    }

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <HeaderUpdateUser clientID={params.clientID} />
            <ClientTabs params={params}/>
        </section>
    );
};

export default UpdateClientWithIdPage;