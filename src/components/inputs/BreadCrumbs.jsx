'use client';

import allIcons from "@/lib/all-icons";
import Link from "next/link";
import UseFilterBreadCrumbs from "@/hooks/UseFilterBreadCrumbs";


const BreadCrumbs = () => {
    const {ActiveBreadcrumb} = UseFilterBreadCrumbs();

    return (
        <nav aria-label="Breadcrumb" className="hidden md:block">
            <ol className="flex items-center gap-1 text-sm text-gray-600">
                <li>
                    <Link href="/" className="block transition hover:text-gray-700 text-[18px]">
                        {allIcons.home_icon}
                    </Link>
                </li>

                <li className="rtl:rotate-180">
                    {allIcons.right_arrow}
                </li>
                {
                    ActiveBreadcrumb?.children?.map((item) => (
                        <div className="flex items-center gap-2" key={item.id}>
                            <li>
                                <Link href={item.link}
                                      className={`block transition hover:text-gray-700 ${item.active ? "pointer-events-none text-gray-400" : "text-black"} text-[18px]`}> {item.title} </Link>
                            </li>
                            {
                                item.showRightArrow && (
                                    <li className="rtl:rotate-180">
                                        {allIcons.right_arrow}
                                    </li>
                                )
                            }
                        </div>
                    ))

                }
            </ol>
        </nav>
    );
};

export default BreadCrumbs;