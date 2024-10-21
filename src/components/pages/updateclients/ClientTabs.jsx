import { GetSpecifDataInServer } from "@/lib/action";

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"

import ClientInfo from "@/components/pages/updateclients/ClientInfo";
import ClientRating from "@/components/pages/updateclients/ClientRating";
import ClientHistoryTableData from "@/data/table-data/clients/ClientHistoryTableData";

const ClientTabs = async ({ params: { clientID } ,client}) => {
    // -------------------- Fetching Client Information in Server --------------------
    const clientInfo = await GetSpecifDataInServer(`/dashboard/clients/${clientID}/`);

    return (
        <Tabs defaultValue="PersonalInfo" className="w-full mt-5">
            <TabsList
                className={`grid w-full   ${client?'grid-cols-1 md:w-[100px]':'grid-cols-3 md:w-[300px]'}`}>
                
                {client ?<>
                    <TabsTrigger value="PersonalInfo">PersonalInfo</TabsTrigger>
                </> :<>
                <TabsTrigger value="PersonalInfo">PersonalInfo</TabsTrigger>
                <TabsTrigger
                    value="rating">Rating
                </TabsTrigger>
                <TabsTrigger
                    value={"history"}>history
                </TabsTrigger>
                </>
                }
                
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