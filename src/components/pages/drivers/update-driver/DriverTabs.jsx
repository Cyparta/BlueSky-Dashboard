import { GetSpecifDataInServer } from "@/lib/action";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"


import ClientRating from "@/components/pages/updateclients/ClientRating";
import DriverInfo from "./DriverInfo";
import DriverHistoryTableData from "@/data/table-data/Drivers/DriverHistoryTableData";
import Maps from "@/components/Maps/Map";

const DriverTabs = async ({ params: { driverID } }) => {
    // -------------------- Fetching Client Information in Server --------------------
    const driverInfo = await GetSpecifDataInServer(`/dashboard/info/${driverID}/`);


    const drivers = [
        {
            long: 31.123,
            lat: 30.208853,
            image: 'https://as2.ftcdn.net/v2/jpg/02/79/99/21/1000_F_279992144_3GWh4mLIPBacjzlYNc6kZbz2F3KpKOeE.jpg',
        },
    ]

    return (
        <Tabs defaultValue="PersonalInfo" className="w-full mt-5">
            <TabsList
                className={`grid w-full grid-cols-4 md:w-[500px]`}>
                <TabsTrigger value="PersonalInfo">PersonalInfo</TabsTrigger>
                <TabsTrigger
                    value="rating">Rating
                </TabsTrigger>
                <TabsTrigger
                    value={"history"}>history
                </TabsTrigger>
                <TabsTrigger
                    value={"Last_Location"}>Last Location
                </TabsTrigger>
            </TabsList>
            <TabsContent value="PersonalInfo"
                className="max-h-screen overflow-auto">
                <DriverInfo DriverInfo={driverInfo} />
            </TabsContent>
            <TabsContent value="rating">
                <ClientRating UserId={driverInfo?.user} type="driver" />
            </TabsContent>
            <TabsContent value="history">
                <DriverHistoryTableData driverID={driverInfo?.id} />
            </TabsContent>
            <TabsContent value="Last_Location">
                <Maps drivers={drivers} />
            </TabsContent>
        </Tabs>
    );
};

export default DriverTabs;