'use client';


import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import AllDriver from "../../../data/Svg/allDrivers.svg";
import PetsCar from "../../../data/Svg/PetsCar.svg";
import EconomyCar from "../../../data/Svg/EconomyCar.svg";
import VipCar from "../../../data/Svg/VipCar.svg";
import LargeCar from "../../../data/Svg/LargeCar.svg";


const FiltrationCar = () => {

    const path = usePathname();
    const searchParams = useSearchParams();
    const activeFilter = searchParams.get("filter");


    const Cars = [
        {
            name: "All drivers",
            Filter: "all",
            image: AllDriver
        },
        {
            name: "Pets",
            Filter: "Pet",
            image: PetsCar
        },
        {
            name: "Economy",
            Filter: "Economy",
            image: EconomyCar
        },
        {
            name: "VIP",
            Filter: "Vip",
            image: VipCar
        },
        {
            name: "Large",
            Filter: "Large",
            image: LargeCar
        }
    ]

    return (
        <main className="rounded-md shadow-md bg-white p-3 flex flex-col gap-4 ">
            <h1 className="text-main-100 font-bold text-[30px]">Filter</h1>
            <p className="text-gray-400 ">You can filtrate your search</p>
            <div className="grid grid-cols-1">
                {
                    Cars.map((car, index) => (
                        <Link href={`${path}?filter=${car.Filter}`} key={index}
                              className={`cursor-pointer hover:bg-gray-400 p-3 rounded-md ${activeFilter === car?.Filter ? "bg-gray-400" : ""}`}>
                            <Image src={car.image} alt={car.name}/>
                        </Link>
                    ))
                }
            </div>
        </main>
    );
};

export default FiltrationCar;