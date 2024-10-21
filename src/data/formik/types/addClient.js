export const addClientInputs = [
    {
        id: "first_name",
        label: "First Name",
        placeholder: "First Name",
        type: "text",
        style: "col-span-3 gap-1"
    },
    {
        id: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        style: "col-span-3 gap-1 "
    },
    {
        id: "phone",
        label: "Phone Number",
        placeholder: "Phone Number",
        type: "number",
        style: "col-span-3 gap-1 "
    },
    {
        id: "password",
        label: "Password",
        placeholder: "Password",
        type: "password",
        style: " gap-1  col-span-3 lg:col-span-3",

    },
    {
        id: "gender",
        label: "Client Gender",
        placeholder: " Selected gender",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-3",
        selectItem: ["Male", "Female", "Other"],
    },
]

export const updateClientInputs = [
    {
        id: "id",
        label: "Client Id",
        placeholder: "Client Id",
        type: "text",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "phone",
        label: "Phone Number",
        placeholder: "Phone Number",
        type: "text",
        style: "col-span-3 gap-1 ",
        disabled: true
    },
    {
        id: "first_name",
        label: "Client Name",
        placeholder: "Client Name",
        type: "text",
        style: "col-span-3 gap-1 "
    },
    {
        id: "gender",
        label: "Client Gender",
        placeholder: " Selected gender",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-3",
        selectItem: ["Male", "Female", "Other"],
    },
    {
        id: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        style: " gap-1  col-span-3 lg:col-span-3",
        disabled: false
    },
    {
        id: "address",
        label: "Address",
        placeholder: "Address",
        type: "text",
        style: " gap-1  col-span-3 lg:col-span-3",
        disabled: false
    },
    {
        id: "is_verified",
        label: "Is verified",
        placeholder: "Selected ",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-3",
        selectItem: ["true", "false"],
    },
]
