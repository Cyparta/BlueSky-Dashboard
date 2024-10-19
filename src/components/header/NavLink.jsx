"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";


export default function NavLink({data}) {
    const pathname = usePathname();


    function FilterBath() {
        return pathname.split("/")[1];
    }

    function isActive(active) {
        if (active === FilterBath()) {
            return true;
        }
        return false;
    }


    if (data.children.length > 0) {
        return (
            <AccordionItem value={data.accordingId} className="border-0 px-3 py-0">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                        <p className="text-[20px]">{data.icon}</p>
                        <h1 className={`font-[600] text-[18px]`}>
                            {data.title}
                        </h1>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <ul>
                        {
                            data.children.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className={`${isActive(item.active) ? "active-nav-link bg-gray-100" : "text-[#121212]"} p-3 ml-6 hover:bg-gray-100 Transition rounded-md flex items-center gap-2`}>
                                    <p className={`font-[600] text-[18px] `}>
                                        {item.title}
                                    </p>
                                </Link>
                            ))
                        }
                    </ul>
                </AccordionContent>
            </AccordionItem>
        )
    } else {
        return (

            <Link
                href={data.link}
                className={`${isActive(data.active) ? "active-nav-link bg-gray-100" : "text-[#121212]"} p-3 hover:bg-gray-100 Transition rounded-md flex items-center gap-2`}>
                <p className="text-[20px]">{data.icon}</p>
                <p className={`font-[600] text-[18px] `}>
                    {data.title}
                </p>
            </Link>
        );
    }
}
