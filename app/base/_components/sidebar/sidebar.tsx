"use client";

import Link from "next/link";

const BaseSidebar = () => {
    const vehicleNum = "0794";

    return (
        <>
            <div className="flex flex-col gap-2 font-bold text-xl ml-2 mt-4">
                <Link href={`/base/vehicleNum-${vehicleNum}`} className="text-black hover:underline">
                    {`BRO1GL-${vehicleNum}`}
                </Link>
                <Link href={`/base/vehicleNum-${vehicleNum}`} className="text-black hover:underline">
                    {`BRO1GG-${vehicleNum}`}
                </Link>
            </div>
        </>
    );
};

export default BaseSidebar;