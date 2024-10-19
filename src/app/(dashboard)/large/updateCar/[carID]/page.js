import UpdateCar from "@/components/pages/cars/UpdateCar";
import HeaderUpdateCar from "@/components/pages/cars/HeaderUpdateCar";
import {CarTabs} from "@/components/pages/cars/CarTabs";


const UpdateEconomyCarPage = ({params}) => {


    if (params.carID.includes("PROFILE")) {
        return (
            <UpdateCar href="/large" params={params}/>
        );
    }

    return (
        <section className="flex gap-2 flex-col bg-white rounded-md shadow-md my-4 p-3  md:p-8">
            <HeaderUpdateCar type="/large" carID={params.carID} />
            <CarTabs carID={params.carID}/>
        </section>
    );
};

export default UpdateEconomyCarPage;