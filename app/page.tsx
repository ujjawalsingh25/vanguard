// import { Actions } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "./base/_components/navbar";
import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "./landingPage";
import { NavbarLanding } from "@/components/NavbarLanding";

export default async function Home() {
  const user = await currentUser();
  
  return (
    <>
      {!!user ? 
          (
            <div className="text-2xl pb-2 bg-red-500 font-bold">
              Vanguard
              {/* <Actions /> */}
            </div>
          ): (
              <>
                <NavbarLanding />
                <LandingPage />
              </>
          )
        }
    </>
  );
}
