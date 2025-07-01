import Link from "next/link";
import { LogOut } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const ToggleSignin = () => {

    return (
        <div className="flex items-center justify-end gap-x-2">
            <Button
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href="/">
                    <LogOut className="h-5 w-5 mr-2"/>
                    Exit
                </Link>
            </Button>
            <UserButton 
                afterSignOutUrl="/"
            />
        </div>
    );
};