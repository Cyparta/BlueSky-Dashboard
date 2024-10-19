import {DrawerNotifcation} from "@/components/helpers-components/Drawer-notifcation";
import {DrawerSetting} from "@/components/helpers-components/Drawer-Setting";
import {DrawerSideNav} from "@/components/helpers-components/Drawer-SideNav";

import BreadCrumbsDemo from "@/components/helpers-components/BreadCrumbs-demo";


const Header = () => {
    return (<header className="bg-white h-[77px] flex justify-between items-center px-5 pr-8">
        <div className="block md:hidden">
            <DrawerSideNav/>
        </div>
        <BreadCrumbsDemo/>
        <div className="flex items-center gap-5 ">
            {/* <DrawerNotifcation/>
            <DrawerSetting/> */}
        </div>
    </header>);
};

export default Header;