"use client";

import Link from "next/link";

const BaseSidebar = () => {
    const vehicleNum1 = "08B101161W";
    const vehicleNum2= "18A071829P";
    const vehicleNum3 = "03D153874W";
    const vehicleNum4 = "02B084821H";
    const vehicleNum5 = "64B087985E";

    return (
        <>
            <div className="flex flex-col gap-2 font-bold text-xl ml-2 mt-4">
                <Link href={`/base/vehicleNum-${vehicleNum1}`} className="text-black hover:underline">
                    {`🡅${vehicleNum1}`}
                </Link>
                <Link href={`/base/vehicleNum-${vehicleNum2}`} className="text-black hover:underline">
                    {`🡅${vehicleNum2}`}
                </Link>
                <Link href={`/base/vehicleNum-${vehicleNum3}`} className="text-black hover:underline">
                    {`🡅${vehicleNum3}`}
                </Link>
                <Link href={`/base/vehicleNum-${vehicleNum4}`} className="text-black hover:underline">
                    {`🡅${vehicleNum4}`}
                </Link>
                <Link href={`/base/vehicleNum-${vehicleNum5}`} className="text-black hover:underline">
                    {`🡅${vehicleNum5}`}
                </Link>
            </div>
        </>
    );
};

export default BaseSidebar;