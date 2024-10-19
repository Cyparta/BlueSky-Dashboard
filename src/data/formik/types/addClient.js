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
        id: "user_phone",
        label: "Phone Number",
        placeholder: "Phone Number",
        type: "text",
        style: "col-span-3 gap-1 ",
        disabled: true
    },
    {
        id: "user_name",
        label: "Client Name",
        placeholder: "Client Name",
        type: "text",
        style: "col-span-3 gap-1 "
    },
    {
        id: "user_gender",
        label: "Client Gender",
        placeholder: " Selected gender",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-3",
        selectItem: ["Male", "Female", "Other"],
    },
    {
        id: "user_date_joined",
        label: "Created at",
        placeholder: "Created at",
        type: "text",
        style: " gap-1  col-span-3 lg:col-span-3",
        disabled: true
    },
]
