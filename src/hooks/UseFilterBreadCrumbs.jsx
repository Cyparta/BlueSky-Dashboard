'use client';

import { usePathname } from "next/navigation";
import breadCrumbsData from "@/data/BreadCrumbsData";

const UseFilterBreadCrumbs = () => {
    const path_name = usePathname();





    const Last_URL = path_name
        .split("/")
        .filter((path) => {
            return path !== "" && !isFinite(path) && !path.includes("PROFILE");
        })
        .at(-1);

    function GetPageBreadcrumb() {
        const ActiveBreadcrumb = breadCrumbsData.filter((item) => {
            return item.active_page === Last_URL;
        });

        return ActiveBreadcrumb[0];
    }


    const ActiveBreadcrumb = GetPageBreadcrumb();

    return { ActiveBreadcrumb }
};

export default UseFilterBreadCrumbs;