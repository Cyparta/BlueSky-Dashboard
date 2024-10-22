export  const addCarInput = [
    // {
    //     id: "company",
    //     label: "Company ID",
    //     placeholder: "Company ID",
    //     type: "text",
    //     style: "col-span-3 gap-1 "
    // },
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
    
    // {
    //     id: "is_active",
    //     label: "Car Active",
    //     placeholder: "Select Car Activity",
    //     type: "selected",
    //     style: " gap-1  col-span-3 lg:col-span-1",
    //     selectItem: [ "true","false"],
    // },
    {
        id: "car_type",
        label: "Car Type",
        placeholder: "Select Car Type",
        type: "selected",
        style: "gap-1  col-span-3 ",
        selectItem: ["BLACK", "SUV", "LUX", "SKY"],
    },
    {
        id: "car_image",
        label: "Car Image",
        placeholder: "Car Image",
        type: "file",
        style: "col-span-3 gap-1  cursor-pointer",

    },
    {
        id: "car_license",
        label: "Car License",
        placeholder: " Car License",
        type: "file",
        style: "col-span-3 gap-1  cursor-pointer",
    },
]


export const updateCarInputs = [
    {
        id: "id",
        label: "Car Id",
        placeholder: "Car Id",
        type: "text",
        style: "col-span-3 gap-1",
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
        selectItem: ["BLACK", "LUX", "SKY", "SUV"],
    },
    
    {
        id: "is_active",
        label: "Car Status",
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
