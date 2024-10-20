import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import allIcons from "@/lib/all-icons";

const ClientInfo = async ({ clientInfo }) => {

    return (
        <section className="flex flex-col gap-5 p-8 ">
            <main className="flex flex-col lg:flex-row gap-4 items-center">
                <Avatar
                    className="w-[110px] h-[110px]"
                >
                    <AvatarImage
                        src={clientInfo?.user_image}
                        alt="Client's Image"
                        className="cursor-pointer"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-6 w-full">
                    <div className="flex items-center gap-2 lg:col-span-3">
                        <p className="text-xl text-gray-700 text-[30px]">{allIcons.personal_id_icon}</p>
                        <h2 className="text-xl">{clientInfo?.user_name}</h2>
                    </div>
                    <div className="flex items-center gap-2 lg:col-span-3">
                        <p className="text-xl text-[35px]">{allIcons.credit_card_icon}</p>
                        <h2 className="text-xl">{`${new Date(clientInfo?.user_date_joined).toLocaleDateString()}  -   ${new Date(clientInfo?.user_date_joined).toLocaleTimeString()}`}</h2>
                    </div>
                </div>
            </main>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Phone Number</p>
                <span className={`col-span-2 text-main-100`}>{clientInfo?.user_phone}</span>
            </div>


            <h1 className="text-2xl text-main-100 font-semibold ">Account Address</h1>
            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Address</p>
                <span className="col-span-2">Rydells väg 4, 835 32 Krokom, Sweden</span>
            </div>

            <h1 className="text-2xl text-main-100 font-semibold ">Invitations number</h1>
            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Invited</p>
                <span className="col-span-2">{clientInfo?.invited_clients_count} people</span>
            </div>

            <h1 className="text-2xl text-main-100 font-semibold ">Wallet</h1>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Wallet balance</p>
                <span className="col-span-2">{clientInfo?.points} SEK</span>
            </div>

            <div
                className="grid grid-cols-3 gap-12 text-xl pt-4 pb-8 border-b">
                <p>Saved Credit</p>
                <span className="col-span-2">**** **** **** *369</span>
            </div>
        </section>
    );
};

export default ClientInfo;