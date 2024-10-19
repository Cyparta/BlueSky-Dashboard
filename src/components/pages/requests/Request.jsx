import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Request({ data }) {
    return (
        <article
            className="rounded-md shadow-md bg-white p-3 flex flex-col gap-3 mr-3 cursor-pointer" >
            <nav className="flex items-center justify-between">
                <p
                    className={`${data?.user_gender === "Male" ? "male" : "Female"} p-1 rounded-md`}>
                    {data?.user_gender === "Male" ? "male" : "Female"}
                </p>
                <p className="text-gray-400">2:00 PM</p>
            </nav>
            <p className="line-clamp-1">Company Number: {data?.company}</p>
            <p>Phone number: {data?.user_phone}</p>
            <footer className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={data?.user_image} alt="Driver That What To Request"
                            className="cursor-pointer" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="">{data?.user_name}</h1>
                </div>

                <p className="text-gray-400">3 March 2024</p>
            </footer>
        </article>
    )
}
