'use client';

import {usePathname} from "next/navigation";
import CommandDemo from "@/components/helpers-components/Command-demo";
import BreadCrumbs from "@/components/inputs/BreadCrumbs";


const BreadCrumbsDemo = () => {
    const path_name = usePathname();

    if (path_name === "/") {
        return (
            <CommandDemo/>
        )
    } else {
        return (
            <BreadCrumbs/>
        )
    }
};

export default BreadCrumbsDemo;