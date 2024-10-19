import Gallery from "@/components/light-gallary/lightGallery";

const CarInfo = ({ data }) => {
    return (<section className="flex flex-col gap-5 p-8 ">
        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car ID</p>
            <span className="col-span-2">{data?.id}</span>
        </div>

        <div
            className="grid grid-cols-3 gap-12 text-xl pb-8 border-b">
            <p>Company Number</p>
            <span className="col-span-2">{data?.company}</span>
        </div>

        <h1 className="text-2xl text-blue-800 font-semibold uppercase ">Car Information</h1>
        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car Plate</p>
            <span className="col-span-2"> {data?.car_number} </span>
        </div>
        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car Type</p>
            <span className="col-span-2"> {data?.car_type} </span>
        </div>
        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car Model</p>
            <span className="col-span-2"> {data?.car_model} </span>
        </div>
        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car Color</p>
            <span className="col-span-2"> {data?.car_color} </span>
        </div>
        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car Active</p>
            <span className={`col-span-2 ${data?.is_active ? "completed" : "canceled"} max-w-fit text-center px-5 text-[16px] `}> {data?.is_active ? "Active" : "Not Active"} </span>
        </div>

        <div
            className="grid grid-cols-3 gap-12 text-xl pt-4">
            <p>Car Available</p>
            <span className={`col-span-2 ${data?.is_available ? "completed" : "canceled"} max-w-fit text-center px-5 text-[16px]`}> {data?.is_available ? "Available" : "Not Available"} </span>
        </div>

        <Gallery OneImage_Name="Click To Show Car Image" OneImage_front={data?.car_image} />
    </section>);
};

export default CarInfo;