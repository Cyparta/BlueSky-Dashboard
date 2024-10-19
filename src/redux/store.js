import { configureStore } from "@reduxjs/toolkit";
import TodaySelectionSlice from "./Slices/Todayes-selection/TodaySelectionSlice";
import ClientStore from "./Slices/Client-Slice/ClientStore";
import RequestSlice  from "./Slices/requests-slice/RequestSlice";
import DriverSlice from "./Slices/Drivers/DriverSlice";
import CarSlice from "./Slices/Cars-slice/CarSlice";
import AuthSlice from "./Slices/auth-slice/AuthSlice";
import AdsSlice from "./Slices/ads-slice/AdsSlice";
import RideSlice from "./Slices/rides-slice/RideSlice";
import CompanySlice from "./Slices/company-slice/CompanySlice";
import VariableSlice from "./Slices/variable-slice/VariableSlice";
import EmploySlice from "./Slices/employe-slice/EmploySlice";
import ContactSlice from "./Slices/contact-slice/ContactSlice";
import  GroupSlice  from "./Slices/group-slice/groupSlice";
import profileSlice from "./Slices/profile-slice/profileSlice";



let store = configureStore({
        reducer: {
            todaySelection: TodaySelectionSlice,
            clients: ClientStore,
            requests : RequestSlice,
            drivers:  DriverSlice,
            cars : CarSlice,
            auth : AuthSlice,
            ads: AdsSlice,
            rides : RideSlice,
            companies : CompanySlice,
            variables: VariableSlice,
            employees: EmploySlice,
            contacts: ContactSlice,
            group: GroupSlice,
            profile:profileSlice,
        }
    }

)



export default store