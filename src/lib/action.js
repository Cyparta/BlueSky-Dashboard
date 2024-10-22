import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const GetDataWithHourRevalidate = async (path) => {
    "use server";
    const token=getCookie("token",{cookies});

    const revalidate = process.env.REVALIDATE;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        cache: "no-store",
    };

    const res = await fetch(`${BASE_URL}${path}`, options);
console.log(res);
    if (res.status === 401) {
        throw new Error("Unauthorized");
    }else if(res.status !== 200 && res.status !== 401){
        throw new Error("Failed to fetch");
    }
    const data = await res.json();
    // console.log(data);
    return data;
}


export const GetSpecifDataInServer = async (path) => {
    "use server";
    const token=getCookie("token",{cookies});

    const revalidate = process.env.REVALIDATE;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        cache: "no-store",
    };

    const res = await fetch(`${BASE_URL}${path}`, options);

    if (res.status === 401) {
        throw new Error("Unauthorized");
    }else if(res.status !== 200 && res.status !== 401){
        throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return data;
}

export const GetProfileDataInServer = async (path) => {
    "use server";
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const token=getCookie("token",{cookies});


    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        cache: "no-store",
    };
    const res = await fetch(`${BASE_URL}${path}`, options);
    const data = await res.json();
    return data;
}
