import HeaderUpdateDriver from "@/components/pages/drivers/update-driver/HeaderUpdateDriver";
import UpdateDriver from "@/components/pages/drivers/update-driver/UpdateDriver";
import DriverTabs from "@/components/pages/drivers/update-driver/DriverTabs";
import SendMessageDriver from "@/components/forms/SendMessageDriver";


const UpdateDriverPage = ({params}) => {
    
    if (params.driverID.includes("PROFILE")) {
        return (
            <UpdateDriver params={params}/>
        );
    }

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <HeaderUpdateDriver driverID={params.driverID} />
            <DriverTabs params={params}/>
            {/* <SendMessageDriver driverID={params.driverID}/> */}
        </section>
    );
};

export default UpdateDriverPage;