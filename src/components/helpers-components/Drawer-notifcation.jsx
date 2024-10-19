import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import allIcons from "@/lib/all-icons";
import {NotifcationTabsDemo} from "@/components/helpers-components/Notifcation-tabs";

export function DrawerNotifcation() {
    return (<Sheet>
            <SheetTrigger asChild>
                <div className="cursor-pointer text-[25px] text-blue-900">{allIcons.notification_icon}</div>
            </SheetTrigger>
            <SheetContent className="overflow-visible">
                <SheetHeader>
                    <SheetTitle className="border-b py-4">Notifications</SheetTitle>
                </SheetHeader>
                <NotifcationTabsDemo/>
            </SheetContent>
        </Sheet>)
}