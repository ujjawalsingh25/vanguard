// "use client";

// import Link from "next/link";
// import healthData from "@/store/healthData";

// const BaseSidebar = () => {
//     return (
//         <div className="h-screen overflow-y-auto px-2 pt-4 font-bold text-xl">
//             <div className="flex flex-col gap-2">
//                 {healthData.map((item, index) => (
//                     <Link
//                         key={item.id || index}
//                         href={`/base/vehicleNum-${item.vehicleNum.replace("🡅", "")}`}
//                         className="text-black hover:underline"
//                     >
//                         {item.vehicleNum}
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BaseSidebar;


"use client";

import Link from "next/link";
import healthData from "@/store/healthData";

const BaseSidebar = () => {
    return (
        <div className="h-screen overflow-y-auto px-2 pt-4 font-bold text-xl">
            <div className="flex flex-col gap-2">
                {healthData.map((item, index) => {
                    const cleanVehicleNum = item.vehicleNum.replace("🡅", "");
                    const queryString = new URLSearchParams({
                        vehicleNum: cleanVehicleNum,
                        tyrePressure: String(item.tyrePressure),
                        batteryCharging: String(item.batteryCharging),
                        fuelLevel: String(item.fuelLevel),
                        brakePressure: String(item.brakePressure),
                        engineTemp: String(item.engineTemp),
                    }).toString();

                    return (
                        <Link
                            key={item.id || index}
                            href={`/base/vehicle?${queryString}`}
                            className="text-black hover:underline"
                        >
                            {item.vehicleNum}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BaseSidebar;
