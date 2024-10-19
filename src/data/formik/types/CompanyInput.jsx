export const addCompanyInputs = [
    {
        id: "first_name",
        label: "Company Name",
        placeholder: "Company Name",
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
        id: "address",
        label: "Company Address",
        placeholder: "Company Address",
        type: "text",
        style: " gap-1  col-span-3 lg:col-span-3",
    },
    {
        id: "national_id_number",
        label: "National ID Number",
        placeholder: "National ID Number",
        type: "number",
        style: " gap-1  col-span-3 lg:col-span-3",
    },
    {
        id: "vat_registration_number",
        label: "Vat Registration Number",
        placeholder: "Vat Registration Number",
        type: "number",
        style: " gap-1  col-span-3 lg:col-span-3",
    },
    {
        id: "company_logo",
        label: "Company Logo",
        placeholder: "Company Logo",
        type: "file",
        style: " gap-1  col-span-3 lg:col-span-3",
    },
]



export const updateCompanyInputs = [
    {
        id: "id",
        label: "Company Id",
        placeholder: "Company Id",
        type: "text",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "first_name",
        label: "Company Name",
        placeholder: "Company Name",
        type: "text",
        style: "col-span-3 gap-1"
    },
    {
        id: "address",
        label: "Company Address",
        placeholder: "Company Address",
        type: "text",
        style: "col-span-3 gap-1"
    },
    {
        id: "company_active",
        label: "Company Active",
        placeholder: "Company Active",
        type: "selected",
        style: "col-span-3 gap-1",
        selectItem: ["true", "false"],
    },
    {
        id:"national_id_number",
        label:"National ID Number",
        placeholder:"National ID Number",
        type:"number",
        style:"col-span-3 gap-1"
    },
    {
        id:"vat_registration_number",
        label:"Vat Registration Number",
        placeholder:"Vat Registration Number",
        type:"number",
        style:"col-span-3 gap-1"
    },
    {
        id: "cars_count",
        label: "Cars Count",
        placeholder: "Cars Count",
        type: "number",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "drivers_count",
        label: "Drivers Count",
        placeholder: "Drivers Count",
        type: "number",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "user",
        label: "Company Wallet",
        placeholder: "Company Wallet",
        type: "text",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "created_at",
        label: "Created At",
        placeholder: "Created At",
        type: "text",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "company_logo",
        label: "Company Logo",
        placeholder: "company Logo",
        type: "picker",
        style: "col-span-3 gap-1  cursor-pointer",
    }
];