import { Toaster } from "@/components/ui/sonner";


import { cairo } from "@/lib/font";

import '@/style/globals.css';


export const metadata = {
    title: {
        template : '%s | Blue_Sky Dashboard',
        default: "Blue_Sky Dashboard"
    },
    description: "Blue_Sky - Rent the perfect motorhome or campervan in America",
    // ----------- To add Meta Tags For Google Console Analytics TAG--------------------
    verification: {
        google: "ujkX9ztLUb1v4Dcym8avpcc-WUGuMZ8qmB1WgUgxUMc"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${cairo.className} bg-lightgray`}>
                {children}
                <Toaster richColors={true}/>
            </body>
        </html>
    );
}
