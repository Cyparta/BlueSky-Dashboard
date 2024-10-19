import Image from 'next/image'
import { hasCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Providers from '@/redux/Slices/Providers'

export default function AuthLayout({ children }) {

    if (hasCookie('token', { cookies })) {
        redirect('/')
    }

    return (
        <main className="flex items-center justify-center text-gray-400 flex-col h-screen w-full gap-8">
            <Image
                src={"/logo.jpeg"}
                alt="Logo Photo"
                width={400}
                height={64}
                priority={true}
            />
            <Providers>
                {children}
            </Providers>
        </main>
    )
}