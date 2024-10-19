import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NotifcationTabsDemo({ pageName}) {
    return (
        <Tabs defaultValue={pageName === "update_client" ? "PersonalInfo" : "support"} className="w-full mt-5">
            <TabsList
                className="grid w-full">
                <TabsTrigger
                    value="support">support</TabsTrigger>
                <TabsTrigger
                    value="drivers">Drivers
                </TabsTrigger>
                <TabsTrigger
                    value="clients">Clients
                </TabsTrigger>
            </TabsList>
            <TabsContent value="support"
                className="max-h-screen overflow-auto">
                {
                    Array.from({ length: 20 }).map((_, index) => {
                        return (
                            <div
                                className="flex items-center w-full py-3 px-2 rounded-bl border-b hover:bg-gray-200 cursor-pointer"
                                key={index}>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt=" profile Logo "
                                        className="cursor-pointer" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col ml-4">
                                    <p className="font-[600]  text-[18px] text-black line-clamp-1">John Doe</p>
                                    <p className="text-blue-100 text-[16px] line-clamp-1">
                                        30 mins ago
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </TabsContent>
            <TabsContent value="drivers">
                {
                    Array.from({ length: 9 }).map((_, index) => {
                        return (<div
                            className="flex items-center w-full py-3 px-2 rounded-bl border-b hover:bg-gray-200 cursor-pointer"
                            key={index}>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt=" profile Logo "
                                    className="cursor-pointer" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col ml-4">
                                <p className="font-[600]  text-[18px] text-black line-clamp-1">John Doe</p>
                                <p className="text-blue-100 text-[16px] line-clamp-1">
                                    30 mins ago
                                </p>
                            </div>
                        </div>)
                    })
                }
            </TabsContent>
            <TabsContent value="clients">
                {
                    Array.from({ length: 5 }).map((_, index) => {
                        return (<div
                            className="flex items-center w-full py-3 px-2 rounded-bl border-b hover:bg-gray-200 cursor-pointer"
                            key={index}>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt=" profile Logo "
                                    className="cursor-pointer" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col ml-4">
                                <p className="font-[600]  text-[18px] text-black line-clamp-1">John Doe</p>
                                <p className="text-blue-100 text-[16px] line-clamp-1">
                                    30 mins ago
                                </p>
                            </div>
                        </div>)
                    })
                }
            </TabsContent>
        </Tabs>
    )
}