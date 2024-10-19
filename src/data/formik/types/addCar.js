export  const addCarInput = [
    {
        id: "company",
        label: "Company ID",
        placeholder: "Company ID",
        type: "text",
        style: "col-span-3 gap-1 "
    },
    {
        id: "car_model",
        label: "Car Model",
        placeholder: "Car Model",
        type: "text",
        style: "col-span-3 gap-1 "
    },
    {
        id: "car_color",
        label: "Car Color",
        placeholder: "Car Color",
        type: "text",
        style: "col-span-3 gap-1 "
    },
    {
        id: "car_number",
        label: "Car Number",
        placeholder: "Car Number",
        type: "text",
        style: "col-span-3 gap-1 "
    },
    {
        id: "car_image",
        label: "Car Image",
        placeholder: "Car Image",
        type: "file",
        style: "col-span-3 gap-1  cursor-pointer",

    },
    {
        id: "is_active",
        label: "Car Active",
        placeholder: "Select Car Activity",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-1",
        selectItem: [ "true","false"],
    },
    {
        id: "car_type",
        label: "Car Type",
        placeholder: "Select Car Type",
        type: "selected",
        style: "gap-1  col-span-3 lg:col-span-1",
        selectItem: ["Economy", "Large", "Vip", "Pet"],
    },
    {
        id: "is_available",
        label: "Car Available",
        placeholder: "Select Car Availability",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-1",
        selectItem: ["true", "false"],
    },
]


export const updateCarInputs = [
    {
        id: "id",
        label: "Driver Id",
        placeholder: "Driver Id",
        type: "text",
        style: "col-span-3 gap-1",
        disabled: true
    },
    {
        id: "company",
        label: "Company Number",
        placeholder: "Company Number",
        type: "text",
        style: "col-span-3 gap-1 ",
        disabled: true
    },
    {
        id: "car_model",
        label: "Car Model",
        placeholder: "Car Model",
        type: "text",
        style: " gap-1  col-span-3",
    },
    {
        id: "car_color",
        label: "Car Color",
        placeholder: "Car Color",
        type: "text",
        style: " gap-1  col-span-3",
    },
    {
        id: "car_number",
        label: "Car Number",
        placeholder: "Car Number",
        type: "text",
        style: " gap-1  col-span-3",
    },
    {
        id: "car_type",
        label: "Driver Type",
        placeholder: "Driver Type",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-1",
        selectItem: ["Economy", "Large", "Vip", "Pet"],
    },
    
    {
        id: "is_active",
        label: "Account Status",
        placeholder: "Account Status",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-1",
        selectItem: ["true", "false"],
    },
    {
        id: "is_available",
        label: "Driver Status",
        placeholder: "Driver Status",
        type: "selected",
        style: " gap-1  col-span-3 lg:col-span-1",
        selectItem: ["true", "false"],
    },
    {
        id: "created_at",
        label: "Created at",
        placeholder: "Created at",
        type: "text",
        style: " gap-1 col-span-3",
        disabled: true
    },
]
