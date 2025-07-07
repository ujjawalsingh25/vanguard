import Link from "next/link";
import { LogoLanding } from "./LogoLanding";
import { Button } from "./ui/button";


export const NavbarLanding = () => {
    return (
        <>
            <nav className="fixed top-0 w-full h-[12%] z-[60] bg-[#e0e0e0] 
            px-2 py-2 lg:px-4 flex items-center shadow-sm" > 
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-row items-center">
                        <LogoLanding />
                        <h1 className="text-2xl font-semibold text-black">Vanguard V2V</h1>
                    </div>
                    <Link href="/sign-in">
                        <Button className="text-xl p-6 rounded-2xl">Login</Button>
                    </Link>
                </div>
            </nav>
        </>
    );
};