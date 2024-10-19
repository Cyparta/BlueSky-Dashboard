export const updateDriverInputs = [
    {
        id: "id",
        label: "Driver Id",
        placeholder: "Driver Id",
        type: "text",
        style: "col-span-4 gap-1",
        disabled: true
    },
    {
        id: "company",
        label: "Company Number",
        placeholder: "Company Number",
        type: "text",
        style: "col-span-4 gap-1 ",
        disabled: true
    },
    {
        id: "user_phone",
        label: "Phone Number",
        placeholder: "Phone Number",
        type: "text",
        style: "col-span-4 gap-1 ",
        disabled: true
    },
    {
        id: "user_name",
        label: "Driver Name",
        placeholder: "Driver Name",
        type: "text",
        style: "col-span-4 gap-1 "
    },
    {
        id: "user_gender",
        label: "Driver Gender",
        placeholder: " Selected gender",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["Male", "Female", "Other"],
    },
    {
        id: "driver_type",
        label: "Driver Type",
        placeholder: "Driver Type",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["Economy", "Large", "Vip", "Pet"],
    },
    {
        id: "is_active",
        label: "Account Status",
        placeholder: "Account Status",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["true", "false"],
    },
    {
        id: "is_avliable",
        label: "Driver Status",
        placeholder: "Driver Status",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["true", "false"],
    },
    {
        id: "balance",
        label: "Wallet Balance",
        placeholder: "Wallet Balance",
        type: "text",
        style: " gap-1  col-span-4",
        disabled: true
    },
    {
        id: "date_joined",
        label: "Created at",
        placeholder: "Created at",
        type: "text",
        style: " gap-1 col-span-4",
        disabled: true
    },
]
