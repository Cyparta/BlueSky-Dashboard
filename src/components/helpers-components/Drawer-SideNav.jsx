import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import allIcons from "@/lib/all-icons";
import SideNav from "@/components/header/SideNav";

export function DrawerSideNav() {
    return (<Sheet>
        <SheetTrigger asChild>
            <div className="cursor-pointer text-[25px] text-blue-900">{allIcons.menu_icon}</div>
        </SheetTrigger>
        <SheetContent className="overflow-visible bg-gray-50">
            <SideNav/>
        </SheetContent>
    </Sheet>)
}