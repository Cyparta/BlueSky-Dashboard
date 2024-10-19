import { GetSpecifDataInServer } from "@/lib/action";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"

import ClientInfo from "@/components/pages/updateclients/ClientInfo";
import ClientRating from "@/components/pages/updateclients/ClientRating";
import ClientHistoryTableData from "@/data/table-data/clients/ClientHistoryTableData";

const ClientTabs = async ({ params: { clientID } }) => {
    // -------------------- Fetching Client Information in Server --------------------
    const clientInfo = await GetSpecifDataInServer(`/dashboard/client/${clientID}/`);

    return (
        <Tabs defaultValue="PersonalInfo" className="w-full mt-5">
            <TabsList
                className={`grid w-full grid-cols-3 md:w-[400px]`}>
                <TabsTrigger value="PersonalInfo">PersonalInfo</TabsTrigger>
                <TabsTrigger
                    value="rating">Rating
                </TabsTrigger>
                <TabsTrigger
                    value={"history"}>history
                </TabsTrigger>
            </TabsList>
            <TabsContent value="PersonalInfo"
                className="max-h-screen overflow-auto">
                <ClientInfo clientInfo={clientInfo} />
            </TabsContent>
            <TabsContent value="rating">
                 <ClientRating UserId={clientInfo?.user} type="client"  />
            </TabsContent>
            <TabsContent value="history">
                <ClientHistoryTableData ClientId={clientInfo?.id}/>
            </TabsContent>
        </Tabs>
    );
};

export default ClientTabs;