import Link from "next/link";
import { LogOut } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const ToggleSignin = () => {

    return (
        <div className="flex items-center justify-end gap-x-4">
            <Button
                size="lg"
                variant="ghost"
                className="px-6 py-3 text-white hover:text-primary z-20 bg-[#3d3d3d]"
                asChild
            >
                <Link href="/" className="flex items-center">
                    <LogOut className="h-16 w-16 mr-2"/>
                    Exit
                </Link>
            </Button>
            <div className="scale-110">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};