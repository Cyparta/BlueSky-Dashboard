import Image from "next/image";
import operatingSystem from "@/data/os";

const OperatingSystem = ({os}) => {

   const {ALLOperatingSystemDevice} = operatingSystem(os);

    return (
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3">
            {ALLOperatingSystemDevice.map((item, index) => (<div key={index} className="p-2 text-center mx-auto">
                <div className="flex justify-center text-center my-2">
                    <Image src={item.img} width={40} height={40} alt="os image"/>
                </div>
                <div>
                    <p className="[color:#0070f3] text-xs">{item.categpry}</p>
                    <span className="text-2xl">{item.type}</span>
                </div>
                <div className="flex align-middle items-center gap-2 font-bold [color:#7B878C] w-100 my-2">
                    <div className=" ">{item.percent}</div>
                    <div className="w-1 h-1 bg-gray-500 rounded-lg"></div>
                    <div className="  ">{item.totalUser} Users</div>
                </div>
            </div>))}
        </div>
    );
}

export default OperatingSystem;