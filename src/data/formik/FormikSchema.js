import { User } from "lucide-react";
import * as yup from "yup";


// the below code fragment can be found in:
export const CarSchema = yup.object().shape({
    company: yup.string().required("Company ID is required"),
    car_model: yup.string().required("Car Model is required"),
    car_color: yup.string().required("Car Color is required"),
    car_number: yup.string().required("Car Number is required"),
    car_image: yup.mixed().required("Car Image is required"),
});



export const AddClientSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.number().required("Phone Number is required"),
    gender: yup.string().required("Gender is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),

});


export const UpdateClientSchema = yup.object().shape({
    first_name: yup.string().required("Client Name is required"),
    phone: yup.number().required("Phone Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    balance: yup.number().required("Balance is required"),
    is_verified: yup.boolean().required("Client Status is required"),
    is_active: yup.boolean().required("Client Activation is required"),
    gender: yup.string().required("gender is required"),
    address: yup.string().required("Address is required"),
});


export const UpdateDriverSchema = yup.object().shape({
    first_name: yup.string().required("Driver Name is required"),
    is_active: yup.boolean().required("Driver Status is required"),
    is_verified: yup.boolean().required("Driver Availability is required"),
    gender: yup.string().required("gender is required"),
    balance: yup.number().required("Balance is required"),

});

export const UpdateCarSchema = yup.object().shape({
    car_model: yup.string().required("Car Model is required"),
    car_color: yup.string().required("Car Color is required"),
    car_number: yup.string().required("Car Number is required"),
});


export const VerifyClientSchema = yup.object().shape({
    phone: yup.number().required("Phone Number is required"),
    otp: yup.string()
        .required("OTP is required")
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits"),
});


export const AddADsSchema = yup.object().shape({
    title: yup.string().required("Ad Title is required").min(3, "Title must be at least 3 characters"),
    image: yup.mixed().required("Ad Image is required"),
});


export const AddCompanySchema = yup.object().shape({
    first_name: yup.string().required("Company Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.number().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    company_logo: yup.mixed().required("Company Logo is required"),
    national_id_number: yup.string().required("National ID Number is required").min(10, "National ID Number must be at least 10 characters").max(12, "National ID Number must be at most 12 characters"),
    vat_registration_number: yup.string().required("Vat Registration Number is required"),
});


export const UpdateCompanySchema = yup.object().shape({
    first_name: yup.string().required("Company Name is required"),
    company_active: yup.boolean().required("Company Active is required"),
    address: yup.string().required("Address is required"),
    company_logo: yup.mixed().required("Company Logo is required"),
    national_id_number: yup.string().required("National ID Number is required").min(10, "National ID Number must be at least 10 characters").max(12, "National ID Number must be at most 12 characters"),
    vat_registration_number: yup.string().required("Vat Registration Number is required"),
});


export const UpdateVariablesSchema = yup.object().shape({
    price_per_min: yup.number().required("Price Per Minute Required"),
    price_per_km: yup.number().required("Price Per KM Required"),
    fixed_cost: yup.number().required("Fixed Cost Required"),
    percentage: yup.number().required("Company percentage for the completed services Required"),
    cancel: yup.number().required("Company cost in cancelling services Required"),
    notification_distance: yup.number().required("Notification sending area Per kilometer Required"),
    time_appearing: yup.number().required("Seconds for appearing the rides"),
    ads: yup.boolean().required("ADS Is Required"),
});


export const UpdatePasswordSchema = yup.object().shape({
    old_password: yup
        .string()
        .required("Password is required"),
    new_password: yup
        .string()
        .required("New Password is required")
        .min(8, "New Password must be at least 8 characters"),
    confirm_new_password: yup
        .string()
        .required("Confirm Password is required")
        .min(8, "Confirm Password must be at least 8 characters")
        .oneOf([yup.ref("new_password"), null], "Passwords do not match"),
});

export const AddNewEmployeeSchema = yup.object().shape({
    full_name: yup.string().required("First Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.number().required("Phone Number is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    user_permissions: yup.array()
});

export const LoginSchema = yup.object().shape({
    phone: yup.string().required("Phone Number is required"),
    password: yup.string().required("Password is required"),
})

export const UpdatedEmployeeSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    phone: yup.string().required("Phone Number is required"),
    user_permissions: yup.array(),
});

export const AddMessageSchema = yup.object().shape({
    message: yup.string().required("Message is required"),
});