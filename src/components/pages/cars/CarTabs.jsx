import { GetSpecifDataInServer } from "@/lib/action";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import CarInfo from "@/components/pages/cars/CarInfo";
import CarHistoryTableData from "@/data/table-data/Cars/CarHistoryTableData";


export async function CarTabs({carID}) {
    // -------------------- Fetching Client Information in Server --------------------
    const carInfo = await GetSpecifDataInServer(`/dashboard/car/${carID}/`);

    return (
        <Tabs defaultValue="carInfo" className="w-full mt-5">
            <TabsList
                className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger
                    value="carInfo"
                >
                    Car Info
                </TabsTrigger>
                <TabsTrigger
                    value="history"
                >
                    History
                </TabsTrigger>
            </TabsList>
            <TabsContent value="carInfo"
                className="max-h-screen overflow-auto">
                <CarInfo data={carInfo} />
            </TabsContent>
            <TabsContent value="history">
                <CarHistoryTableData CarId={carInfo?.car_number} />
            </TabsContent>
        </Tabs>
    )
}