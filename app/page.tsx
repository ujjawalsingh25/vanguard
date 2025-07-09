// import { Actions } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "./landingPage";
import Dashboard from "./dashboard";
import { NavbarLanding } from "@/components/NavbarLanding";

export default async function Home() {
  const user = await currentUser();
  
  return (
    <>
      {!!user ? 
          (
            <>
              <Navbar />
              <Dashboard />
            </>
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
