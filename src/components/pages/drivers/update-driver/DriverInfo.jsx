import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Gallery from "@/components/light-gallary/lightGallery";

import allIcons from "@/lib/all-icons";



const DriverInfo = ({DriverInfo}) => {
    return (
        <section className="flex flex-col gap-5 p-8 ">
            <main className="flex flex-col lg:flex-row gap-4 items-center">
                <Avatar
                    className="w-[110px] h-[110px]"
                >
                    <AvatarImage
                        src={DriverInfo?.image}
                        alt="Driver's Image"
                        className="cursor-pointer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-6 w-full">
                    <div className="flex items-center gap-2 lg:col-span-3">
                        {/* <p className="text-xl text-gray-700 text-[30px]">{allIcons.personal_id_icon}</p> */}
                        <h2 className="text-xl">{DriverInfo?.first_name} </h2>
                    </div>
                    <div className="flex items-center gap-2 lg:col-span-3">
                        <p className="text-xl text-[35px]">{allIcons.credit_card_icon}</p>
                        <h2 className="text-xl">Joined {`${new Date(DriverInfo?.created_at).toLocaleDateString()}  -   ${new Date(DriverInfo?.created_at).toLocaleTimeString()}`} </h2>
                    </div>
                </div>
            </main>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4">
                <p>Phone Number</p>
                <span className={`col-span-2 text-main-100`}>{DriverInfo?.phone}</span>
            </div>

            <div
                className="grid grid-cols-3 gap-12 text-xl py-4 border-b">
                <p>Status</p>
                <span className="col-span-2">{DriverInfo?.is_available  ? "Online" :"Offline"}</span>
            </div>

            <div
                className="grid grid-cols-3 gap-12 text-xl pb-8 border-b">
                <p>Invited By</p>
                <span className="col-span-2">{(DriverInfo?.invited_by) || 'N/A'}</span>
            </div>

            <div
                className="grid grid-cols-3 gap-12 text-xl pb-8 border-b">
                <p>Location</p>
                <span className="col-span-2">{(DriverInfo.location) || 'N/A'}</span>
            </div>
            <div
                className="grid grid-cols-3 gap-12 text-xl pb-8 border-b">
                <p>Last shift end</p>
                <span className="col-span-2">{(DriverInfo.last_shift_end) || 'N/A'}</span>
            </div>
            <div
                className="grid grid-cols-3 gap-12 text-xl pb-8 border-b">
                <p>Last shift start</p>
                <span className="col-span-2">{(DriverInfo.last_shift_start) || 'N/A'}</span>
            </div>
            <div
                className="grid grid-cols-3 gap-12 text-xl pb-8 border-b">
                <p>Points</p>
                <span className="col-span-2">{(DriverInfo.points) || 'N/A'}</span>
            </div>
            {/* <h1 className="text-2xl text-main-100 font-bold uppercase">Attachments</h1>

            <Gallery Lic_back={DriverInfo?.id_back} Lic_front={DriverInfo?.id_front} /> */}
        </section>
    );
};

export default DriverInfo;