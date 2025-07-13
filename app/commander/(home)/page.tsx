'use client';

import { useState } from "react";
import { Navbar } from "../_components/navbar";
import Commander from "./commander";
import MapRoute from "../../../components/MapRoute";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";

const CommanderHomePage = () => {
    const [hideLongLat, setHideLongLat] = useState(false);
    const [vehicleDetail, setVehicleDetail] = useState(true);
    const [source, setSource] = useState<{lat: number; lng: number; name: string; label: string;}>({
        lat: 0, lng: 0, name: '', label: '',
    });
    const [navigate, setNavigate] = useState(false);
    const [destination, setDestination] = useState<{ lat: number; lng: number; name: string; label: string;}>({ 
        lat: 0, lng: 0, name: '', label: '',
    });


    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        setHideLongLat(!hideLongLat);
        setVehicleDetail(!vehicleDetail);
    };

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
                        <div className="font-bold text-xl mt-[12%] sm:mt-[10%] md:mt-[6%] lg:mt-[0%]">
                            {vehicleDetail && (
                                <form 
                                    onSubmit={handleOnSubmit} 
                                    className="flex flex-row p-6 justify-center"
                                >
                                    <div className="flex flex-col">
                                        <input 
                                            className="w-full bg-white border-gray-600 border-2 font-bold text-gray-700 px-8 rounded-2xl 
                                                rounded-tl-[2rem] rounded-bl-xl rounded-tr-xl rounded-br-[2rem] mb-2" 
                                            placeholder="Enter Convey Number"
                                        /> 
                                        <input 
                                            className="w-full bg-white border-gray-600 border-2 font-bold text-gray-700 px-8 rounded-2xl 
                                                rounded-tl-[2rem] rounded-bl-xl rounded-tr-xl rounded-br-[2rem]" 
                                            placeholder="Enter Commander Id"
                                        /> 
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="outline-none rounded-sm bg-[#2f72ed] text-white font-bold shadow-lg px-4 py-2 
                                            transition-all duration-100 hover:bg-[#1d5cd0] hover:shadow-xl 
                                            rounded-tl-[2rem] rounded-bl-xl rounded-tr-xl rounded-br-[2rem] ml-4"
                                    >
                                        Add 
                                    </button>
                                </form>
                            )}

                            {hideLongLat && (
                                <div className="font-bold text-xl">
                                    <Commander 
                                        defaultLayout={[20, 32, 48]}
                                        defaultCollapsed={false}
                                        navCollapsedSize={4}
                                    />
                                </div>
                            )}
                        </div>
                    </LoadScript>
                </DestinationContext>
            </SourceContext.Provider>
        </>
    );
};

export default CommanderHomePage;
