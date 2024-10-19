
'use client';

import InputDemo from "@/components/inputs/Input-demo";
import { Button } from "@/components/ui/button";
import { TextareaDemo } from "@/components/inputs/TextPlaceHolderDemo";
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";

export default function ContactDetailPage({ params: { contactId } }) {
    const { searchParams } = UseSearchParamsHook()

    let userEmail = searchParams.get('email')
    let userMessage = searchParams.get('content')
    let createdAt = searchParams.get('create_at')
    let phone = searchParams.get('phone')

    return (
        <form className="flex flex-col gap-5">
            <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="rounded-md bg-white py-4 px-8 flex items-center   gap-8 shadow-md ">
                    <div className="flex flex-col w-full justify-around h-full">
                        <InputDemo placeHolder="User Name" id="EmailAddress" label="contact ID"
                            style="" disabled={true} value={contactId} />
                        <InputDemo placeHolder="User Email" id="companyName" label="User Email"
                            style="" disabled={true} value={userEmail} />
                        <InputDemo placeHolder="Phone" id="phone" label="phone"
                            style="" disabled={true} value={phone} />
                        <InputDemo placeHolder="Created At" id="createdAt" label="Created At"
                            style="" disabled={true} value={createdAt} />
                    </div>
                </div>
                <div className="rounded-md bg-white p-4 flex flex-col gap-5 shadow-md ">
                    <TextareaDemo
                        placeHolder="Enter your message here."
                        id="message"
                        label="Message Details"
                        textAreaStyle="resize-none h-[150px] overflow-y-auto"
                        disabled={true}
                        value={userMessage}
                    />
                </div>
            </main>
            <main className="rounded-md bg-white py-4 px-8 flex flex-col gap-2 shadow-md">
                <TextareaDemo
                    placeHolder="Enter your message here."
                    id="message"
                    label="Message Details"
                    textAreaStyle="resize-none h-[300px]"
                />
            </main>

            <div className="w-full flex items-center justify-end gap-7 my-5 " variant="outline">
                <Button
                    type="submit"
                    className="bg-blue-700"
                // disabled={pending}
                >
                    {/* {pending ? "Loading..." : "Send Message"} */}
                    Send Message
                </Button>
            </div>
        </form>
    )
}
