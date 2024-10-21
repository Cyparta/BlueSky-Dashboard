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
        id: "first_name",
        label: "First Name",
        placeholder: "First Name",
        type: "text",
        style: "col-span-4 gap-1 ",
        disabled: false
    },
    {
        id: "phone",
        label: "Phone Number",
        placeholder: "Phone Number",
        type: "text",
        style: "col-span-4 gap-1 ",
        disabled: true
    },
    {
        id: "address",
        label: "Address",
        placeholder: "address",
        type: "text",
        style: "col-span-4 gap-1 "
    },
    {
        id: "gender",
        label: "Driver Gender",
        placeholder: "Driver Gender",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["male", "female", "other"],
    },
    {
        id: "is_verified",
        label: "Is Verified",
        placeholder: "Is Verified",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["true", "false"],
    },
    {
        id: "is_active",
        label: "Is Active",
        placeholder: "Is Active",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-2",
        selectItem: ["true", "false"],
    },
    {
        id: "is_available",
        label: "Is Available",
        placeholder: "Driver Availability",
        type: "text",
        style: " gap-1  col-span-3 lg:col-span-2",
        // selectItem: ["true", "false"],
        disabled: true
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
        id: "created_at",
        label: "Created at",
        placeholder: "Created at",
        type: "text",
        style: " gap-1 col-span-4",
        disabled: true
    },
]
