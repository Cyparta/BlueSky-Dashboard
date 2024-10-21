import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import allIcons from "@/lib/all-icons";

const ClientInfo = async ({ clientInfo }) => {
    console.log(clientInfo);
    return (
        <section className="flex flex-col gap-5 p-8 ">
            <main className="flex flex-col lg:flex-row gap-4 items-center">
                <Avatar
                    className="w-[110px] h-[110px]"
                >
                    <AvatarImage
                        src={clientInfo?.image}
                        alt="Client's Image"
                        className="cursor-pointer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-6 w-full">
                    <div className="flex items-center gap-2 lg:col-span-3">
                        <p className="text-xl text-gray-700 text-[30px]">{allIcons.personal_id_icon}</p>
                        <h2 className="text-xl">{clientInfo?.first_name}</h2>
                    </div>
                    {/* <div className="flex items-center gap-2 lg:col-span-3">
                        <p className="text-xl text-[35px]">{allIcons.credit_card_icon}</p>
                        <h2 className="text-xl">{`${new Date(clientInfo?.user_date_joined).toLocaleDateString()}  -   ${new Date(clientInfo?.user_date_joined).toLocaleTimeString()}`}</h2>
                    </div> */}
                </div>
            </main>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Phone Number</p>
                <span className={`col-span-2 text-main-100`}>{clientInfo?.phone}</span>
            </div>


            <h1 className="text-2xl text-main-100 font-semibold ">Account Address</h1>
            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Address</p>
                <span className="col-span-2">{clientInfo?.address}</span>
            </div>

            <h1 className="text-2xl text-main-100 font-semibold ">Invitations number</h1>
            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Invited By</p>
                <span className="col-span-2">{(clientInfo?.invited_by)||'N/A'}</span>
            </div>

            <h1 className="text-2xl text-main-100 font-semibold ">Wallet</h1>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Wallet balance</p>
                <span className="col-span-2">{clientInfo?.balance} </span>
            </div>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Points</p>
                <span className="col-span-2">{clientInfo?.points}</span>
            </div>
        </section>
    );
};

export default ClientInfo;