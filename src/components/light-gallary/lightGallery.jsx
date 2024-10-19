'use client';


import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Image from 'next/image';



import idFront from "/public/IdFront.png";
import idBack from "/public/IdBack.png";


export default function Gallery({ Lic_front, Lic_back, OneImage_front, OneImage_Name }) {


    if (OneImage_Name) {
        return (
            <div className="flex items-center gap-12 flex-col lg:flex-row ">
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    <a href={OneImage_front}>
                        <div className="rounded-md border shadow-md flex items-center gap-8 p-4  cursor-pointer mb-5">
                            <Image src={OneImage_front} alt="Car Image" width={60} height={30} className='object-cover' />
                            <p className="font-bold"> {OneImage_Name} </p>
                        </div>
                    </a>
                </LightGallery >
            </div>
        )
    }

    else if (OneImage_front) {
        return (
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                <a href={OneImage_front}>
                    <div className="rounded-md border shadow-md cursor-pointer">
                        <Image src={OneImage_front} alt="ADS Image" width={200} height={50}  className="rounded-md w-[150px] h-[50px]"/>
                    </div>
                </a>
            </LightGallery >
        )
    }

    return (

        <div className="flex items-center gap-12 flex-col lg:flex-row ">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                <a href={Lic_front || "https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png"}>
                    <div className="rounded-md border shadow-md flex items-center gap-8 p-4  cursor-pointer mb-5">
                        <Image src={idFront.src} alt="pdf" width={50} height={50} className='w-[60px] h-[50px]' />
                        <p className="font-bold">license_Front</p>
                    </div>
                </a>
                <a href={Lic_back || "https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png"}>
                    <div className="rounded-md border shadow-md flex items-center gap-8 p-4  cursor-pointer">
                        <Image src={idBack.src} alt="pdf" width={30} height={30} className='w-[50px] h-[30px]' />
                        <p className="font-bold">license_Back</p>
                    </div>
                </a>
            </LightGallery >
        </div>

    )
}
