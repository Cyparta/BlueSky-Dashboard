import { hasCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import SideNav from "@/components/header/SideNav";
import Header from "@/components/header/Header";
import Providers from "@/redux/Slices/Providers";

export default function MainLayout({ children }) {

    if (!hasCookie('token', { cookies })) {
        redirect('/login')
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            <main className="2xl:col-span-1 hidden md:block relative w-full">
                <SideNav />
            </main>
            <main className="2xl:col-span-5 xl:col-span-4 lg:col-span-3 col-span-2">
                <Header />
                <div className="px-1 md:px-6 my-6">
                    <Providers>
                        {children}
                    </Providers>
                </div>
            </main>
        </section>
    )
}