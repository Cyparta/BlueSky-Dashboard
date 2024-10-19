const breadCrumbsData = [
    {
        id: 1,
        active_page: "clients",
        children: [
            {
                id: 1,
                title: "Clients",
                link: "/clients",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 2,
        active_page: "addNewClient",
        children: [
            {
                id: 1,
                title: "Clients",
                link: "/clients",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Add New Client",
                link: "/clients/addNewClient",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 3,
        active_page: "updateClient",
        children: [
            {
                id: 1,
                title: "Clients",
                link: "/clients",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Update Client",
                link: "/clients/updateClient",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 4,
        active_page: "requests",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Requests",
                link: "/requests",
                active: true,
                showRightArrow: false,
            },
        ]
    },
    {
        id: 5,
        active_page: "drivers",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Drivers",
                link: "/drivers",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 6,
        active_page: "updateDriver",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Drivers",
                link: "/drivers",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Driver Profile",
                link: "/drivers/updateDriver",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 7,
        active_page: "economy",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Cars",
                link: "/economy",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Economy Car",
                link: "/economy",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 10,
        active_page: "updateCar",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Cars",
                link: "/economy",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Update Car",
                link: "",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 8,
        active_page: "large",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Cars",
                link: "/large",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Large Car",
                link: "/large",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 9,
        active_page: "vip",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Cars",
                link: "/vip",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "VIP Car",
                link: "/vip",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 11,
        active_page: "pet",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Cars",
                link: "/pet",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Pet Car",
                link: "/pet",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 12,
        active_page: "addNewCar",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Cars",
                link: "/economy",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Add New Car",
                link: "/economy/addNewCar",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 13,
        active_page: "ridesNow",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Rides Now",
                link: "/ridesNow",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 14,
        active_page: "now",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Rides Now",
                link: "/ridesNow",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Now",
                link: "/ridesNow/now",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 15,
        active_page: "ridesPast",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Rides Past",
                link: "/ridesPast",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 16,
        active_page: "past",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Rides Past",
                link: "/ridesPast",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Past",
                link: "",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 17,
        active_page: "employees",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Employees",
                link: "/employees",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 18,
        active_page: "addNewEmployees",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Employees",
                link: "/employees",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Add New Employee",
                link: "/employees/addNewEmployees",
                active: true,
                showRightArrow: false,
            }

        ]
    },
    {
        id: 19,
        active_page: "updateEmployee",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Employees",
                link: "/employees",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Update Employee",
                link: "/employees/updateEmployee",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 20,
        active_page: "companies",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Companies",
                link: "/companies",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 21,
        active_page: "addNewCompanies",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Companies",
                link: "/companies",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Add New Company",
                link: "/companies/addNewCompanies",
                active: true,
                showRightArrow: false,
            }

        ]
    },
    {
        id: 22,
        active_page: "updateCompanies",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Companies",
                link: "/companies",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Update Company",
                link: "",
                active: true,
                showRightArrow: false,
            }

        ]
    },
    {
        id: 23,
        active_page: "profile",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Profile",
                link: "/profile",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 24,
        active_page: "globalVariables",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Global Variables",
                link: "/globalVariables",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 25,
        active_page: "todaySelection",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Today Selection",
                link: "/todaySelection",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 26,
        active_page: "verified",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Verified Page",
                link: "/verified",
                active: true,
                showRightArrow: false,
            },
        ]
    },
    {
        id: 27,
        active_page: "ads",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "ads",
                link: "/ads",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 28,
        active_page: "addnewAds",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "ads",
                link: "/ads",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Add New Ads",
                link: "/ads/addnewAds",
                active: true,
                showRightArrow: false,
            }
        ]
    },
    {
        id: 29,
        active_page: "contacts",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Contacts",
                link: "/contacts",
                active: true,
                showRightArrow: false,
            },

        ]
    }, {
        id: 30,
        active_page: "group",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Group",
                link: "/group",
                active: true,
                showRightArrow: false,
            },
        ]
    }, {
        id: 31,
        active_page: "addGroup",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Group",
                link: "/group",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Add New Group Permissions",
                link: "/group/addGroup",
                showRightArrow: false,
            }
        ]
    }, {
        id: 32,
        active_page: "updateGroup",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Group",
                link: "/group",
                active: false,
                showRightArrow: true,
            },
            {
                id: 3,
                title: "Update Group Permissions",
                link: "/group/updateGroup",
                showRightArrow: false,
            }
        ]
    },{
        id: 33,
        active_page: "track-drivers",
        children: [
            {
                id: 1,
                title: "Menu",
                link: "/",
                active: false,
                showRightArrow: true,
            },
            {
                id: 2,
                title: "Track Drivers",
                link: "/track-drivers",
                active: true,
                showRightArrow: false,
            }
        ]
    }
];

export default breadCrumbsData;