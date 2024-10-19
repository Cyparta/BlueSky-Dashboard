'use client';

import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import allIcons from "@/lib/all-icons";
import Link from "next/link";
import { deleteCookie } from "cookies-next"
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";

const ProfileCard = () => {
    const {router} = UseSearchParamsHook()

    function handleLogOut() {
        deleteCookie('token')
        router.push('/login')
    }

    return (
        <article className="py-5 px-4 flex  gap-5 flex-col">
            {/* <p className="text-gray-700 text-[18px]">profile</p>
            <div className="flex items-center w-full">
                <Link href="/profile">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt=" profile Logo " className="cursor-pointer" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex flex-col ml-4">
                    <p className="font-[600]  text-[18px] text-black">John Doe</p>
                    <p className="text-blue-100 text-[16px]">
                        Ahmed@Sky_blue.com
                    </p>
                </div>
            </div> */}

            <Button
                className="w-full bg-gray-50 border border-gray-200 text-black hover:bg-gray-300 gap-4 font-[600] text-[20px] mt-4"
                onClick={handleLogOut}
            >
                {allIcons.logout_icon}
                Log Out
            </Button>
        </article>
    );
};

export default ProfileCard;