// Since root file named with '_'underscoreStarting so inside files are taken as Routes even named page.tsx
// ____________________________________________________________________________________________________________

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const Logo = () => {
    return(
        <div className="flex flex-col items-center">
            <div>
                <Image 
                    src= "/RealStreamLogo.svg"
                    alt= "RealStream"
                    height= "180"
                    width= "180"
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className,
            )}>
                <div>
                    <p className="text-xl text-black font-semibold mb-4">
                        Safeguarding Every Move, Mapping Every Mile
                    </p>
                </div>
            </div>
        </div>
    );
};