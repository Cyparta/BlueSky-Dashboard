
import InputDemo from "@/components/inputs/Input-demo";
import UpdatePassword from "@/components/pages/Profile/UpdatePassword";
import { cookies } from 'next/headers'
import { GetProfileDataInServer } from "@/lib/action";
import { getCookie } from "cookies-next";



const ProfilePAge = async() => {
    
    const token=getCookie("token",{cookies});
    const data=await GetProfileDataInServer('/dashboard/profile/',token);
    console.log(data);
    return (
        <form className="flex flex-col gap-5">
            <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
                <div className="rounded-md bg-white p-4 flex flex-col gap-5 shadow-md justify-center">
                    <InputDemo placeHolder="Email address" id="EmailAddress" label="Email address"
                        style="md:gap-8 gap-1 my-6" />
                    <UpdatePassword />
                </div>

            </main>
            <main className="rounded-md bg-white py-4 px-8 flex flex-col gap-2 shadow-md">
                <InputDemo placeHolder="First name" id="first_name" label="First name" style="md:gap-8 gap-1 my-6" defaultValue={data.first_name} disabled/>
                <InputDemo placeHolder="Phone" id="phone" label="Phone" style="md:gap-8 gap-1 my-6" 
                 defaultValue={data.phone} disabled/>

                <InputDemo placeHolder="ID" id="id" label="ID" style="md:gap-8 gap-1 my-6" disabled defaultValue={data.id}
                   />
                
            </main>

        </form>
    );
};

export default ProfilePAge;