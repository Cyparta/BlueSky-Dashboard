import allIcons from "@/lib/all-icons";


const SideNavItems = () => {
    const side_Nav_items = [
        // {
        //     title: "Overview",
        //     link: "/",
        //     icon: allIcons.four_circle,
        //     children: [],
        //     active: ""
        // },
        // {
        //     title: "Today’s selection",
        //     link: "/todaySelection?filter=all",
        //     icon: allIcons?.Calendar_icon,
        //     children: [],
        //     active: "todaySelection"
        // },
        {
            title: "Clients",
            link: "/clients",
            icon: allIcons.users,
            children: [],
            active: "clients"

        },
        // {
        //     title: "Requests",
        //     link: "/requests",
        //     icon: allIcons.request_icon,
        //     children: [],
        //     active: "requests"
        // },
        {
            title: "Drivers",
            link: "/drivers",
            icon: allIcons.user,
            children: [],
            active: "drivers"
        },
        // {
        //     title: "Track Drivers",
        //     link: "/track-drivers",
        //     icon: allIcons.spatial_tracking_icon,
        //     children: [],
        //     active: "track-drivers"
        // },
        {
            title: "Cars",
            icon: allIcons.car_icon,
            children: [
                {
                    title: "Black",
                    link: "/black",
                    active: "black",
                },
                {
                    title: "Suv",
                    link: "/suv",
                    active: "suv",
                },
                {
                    title: "Lux",
                    link: "/lux",
                    active: "lux",
                },
                {
                    title: "Sky",
                    link: "/sky",
                    active: "sky",
                }
            ],
            accordingId: "item-1",
        },
        {
            title: "Rides",
            icon: allIcons.Police_car_icon,
            children: [
                {
                    title: "Now",
                    link: "/ridesNow",
                    active: "ridesNow",
                },
                {
                    title: "Past",
                    link: "/ridesPast",
                    active: "ridesPast",
                }
            ],
            accordingId: "item-2",
        },
        {
            title: "Ads",
            link: "/ads",
            icon: allIcons.ADS_icon,
            children: [],
            active: "ads"
        },
        {
            title: "Report Cars",
            link: "/reportCars",
            icon: allIcons.report_icon,
            children: [],
            active: "reportCars"
        },
        {
            title: "Employees",
            link: "/employees",
            icon: allIcons.users,
            children: [],
            active: "employees"
        },
        // {
        //     title: "Companies",
        //     link: "/companies",
        //     icon: allIcons.Home_work_icon,
        //     children: [],
        //     active: "companies"
        // },
        // {
        //     title: "Contacts",
        //     link: "/contacts",
        //     icon: allIcons.contacts_icons,
        //     children: [],
        //     active: "contacts"
        // },
        {
            title: "Settings",
            icon: allIcons.setting_icon,
            children: [
                {
                    title: "Profile",
                    link: "/profile",
                    active: "profile",
                },
                {
                    title: "Global Variables",
                    link: "/globalVariables",
                    active: "globalVariables",
                },
                {
                    title:"Group",
                    link:"/group",
                    active: "group",
                }
            ],
            accordingId: "item-3",
        }
    ]
    return {side_Nav_items}
};

export default SideNavItems;