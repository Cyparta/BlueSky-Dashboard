import Image from "next/image";
import {Accordion} from "@/components/ui/accordion";
import NavLink from "@/components/header/NavLink";
import SideNavItems from "@/data/Side-nav-items";
import ProfileCard from "@/components/header/ProfileCard";


const SideNav = () => {
    const {side_Nav_items} = SideNavItems();
    return (
        <nav className="sticky top-0 left-0 h-screen bg-gray-50 w-full max-w-full  shadow-sm flex flex-col ">
            {/*Logo*/}
            <main className="flex items-center justify-center p-2  border border-t-0">
                <Image
                    src={"/logo.png"}
                    alt="Logo Photo"
                    width={200}
                    height={23}
                    priority={true}
                />
            </main>
            {/*Nav*/}
            <main className="h-[calc(100%-120px)] overflow-auto px-[24px] py-[12px] border-b">
                <p className=" text-gray-700 my-6 font-[600]">Menu</p>
                <Accordion type="single" collapsible>
                    {
                        side_Nav_items.map((item, index) => (
                            <NavLink key={index} data={item}/>
                        ))
                    }
                </Accordion>
            </main>
            {/*Card Profile*/}
            <main>
                <ProfileCard/>
            </main>
        </nav>
    );
};

export default SideNav;