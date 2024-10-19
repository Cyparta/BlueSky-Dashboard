import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet"
import allIcons from "@/lib/all-icons";
import {SwitchDemo} from "@/components/inputs/Switch";

export function DrawerSetting() {
    return (<Sheet>
        <SheetTrigger asChild>
            <div className="cursor-pointer text-[25px] text-black font-bold">{allIcons.setting_icon}</div>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="border-b py-4 uppercase font-bold tracking-widest">Language</SheetTitle>
            </SheetHeader>
            <div className="flex justify-center  mt-8 ">
                <SwitchDemo id="airplane-mode" label={["English" , "Swidesh"]} style="justify-between px-12"/>
            </div>
        </SheetContent>
    </Sheet>)
}