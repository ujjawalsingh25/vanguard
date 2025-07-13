"use client";
import { SourceContext } from "@/app/commander/context/SourceContext";
import { Navbar } from "../_components/navbar";
import Base from "./base";
import { DestinationContext } from "@/app/commander/context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";


const BaseHomePage = () => {
    const [source, setSource] = useState<{lat: number; lng: number; name: string; label: string;}>({
        lat: 0, lng: 0, name: '', label: '',
    });
    const [navigate, setNavigate] = useState(false);
    const [destination, setDestination] = useState<{ lat: number; lng: number; name: string; label: string;}>({ 
        lat: 0, lng: 0, name: '', label: '',
    });

    return (
        <>
            <SourceContext.Provider value={{source, setSource, navigate, setNavigate}} >
                <DestinationContext value={{destination, setDestination}} >
                    {/* <LoadScript libraries={['places']} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} > */}
                    <LoadScript 
                        libraries={['places']} 
                        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''} 
                    >

                        <Navbar />
                        <div className="font-bold text-xl">
                            <Base 
                                defaultLayout={[20,32,48]}
                                defaultCollapsed={false}
                                navCollapsedSize={4}
                            />
                        </div>
                    </LoadScript>
                </DestinationContext>
            </SourceContext.Provider>
        </>
    );
};

export default BaseHomePage;