"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import { VehicleCard } from '../_components/vehicleCard';

import BaseSidebar from '../_components/sidebar/sidebar';
import MapRoute from '@/components/MapRoute';
import GoogleMapSection from '@/app/commander/_components/GoogleMapSection';

type Props = {
    defaultLayout: number[] | undefined
    navCollapsedSize: number
    defaultCollapsed: boolean
}

const Base = ({ defaultLayout = [20,32,48], navCollapsedSize, defaultCollapsed }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup 
            direction='horizontal'
            onLayout={(sizes: number[]) => {
                console.log(sizes);
            }}
            className='items-stretch h-full min-h-screen'
        >
            <ResizablePanel 
                defaultSize={defaultLayout[0]} 
                collapsedSize={navCollapsedSize} 
                collapsible={true}
                minSize={15}
                maxSize={20}
                onCollapse={() => {
                    setIsCollapsed(true)
                }}
                onResize={() => {
                    setIsCollapsed(false)
                }}
                className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
            >
                <div className='flex flex-col h-full flex-1'>
                    <div className={cn(
                        'flex h-[52px] items-center justify-between', 
                        isCollapsed ? 'h-[52px]' : 'px-2'
                    )}>  {/* Account Switcher */}
                        Vehicles
                    </div>
                    <Separator />
                    

                    <BaseSidebar />


                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue='health'>
                    <div className='flex items-center px-4 py-2'>
                        <h1 className='text-xl font-bold'>All Data</h1>
                        {/* <form className='flex flex-row  p-6 justify-center'>
                            <input 
                                className='bg-white font-bold text-gray-700 px-8 rounded-2xl 
                                rounded-tl-4xl rounded-bl-2xl rounded-tr-2xl rounded-br-4xl' 
                                placeholder='Search Vehicle'
                            /> 
                            <button type='submit' 
                                className='outline-none rounded-sm bg-[#2f72ed] text-white font-bold shadow-lg px-2 py-2 
                                transition-all duration-100 hover:bg-[#1d5cd0] hover:shadow-xl rounded-tl-4xl rounded-bl-2xl 
                                rounded-tr-2xl rounded-br-4xl'
                            >
                                Search
                            </button>
                        </form> */}
                        <TabsList className='ml-auto'>
                            <TabsTrigger value='health' className='text-zinc-600 dark:text-zinc-200'>
                                Health
                            </TabsTrigger>
                            <TabsTrigger value='route' className='text-zinc-600 dark:text-zinc-200'>
                                Route
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <Separator />
                    
                    <TabsContent value='health'>
                        <div className='flex flex-wrap p-8 justify-between align-middle gap-6'>
                            <VehicleCard vehicleNum="🡅08B101161W" tyrePressure={23.44} batteryCharging={8.54} fuelLevel={38.27} brakePressure={737.88} engineTemp={103.77} />
                            <VehicleCard vehicleNum="🡅18A071829P" tyrePressure={32.64} batteryCharging={11.39} fuelLevel={52.01} brakePressure={741.0} engineTemp={73.15} />
                            <VehicleCard vehicleNum="🡅03D153874W" tyrePressure={23.24} batteryCharging={11.14} fuelLevel={56.58} brakePressure={904.98} engineTemp={73.54} />
                            <VehicleCard vehicleNum="🡅02B084821H" tyrePressure={28.44} batteryCharging={9.67} fuelLevel={39.39} brakePressure={955.04} engineTemp={85.05} />
                            <VehicleCard vehicleNum="🡅64B087985E" tyrePressure={30.15} batteryCharging={14.37} fuelLevel={41.89} brakePressure={1116.48} engineTemp={82.07} />
                        </div>
                    </TabsContent>
                    <TabsContent value='route'>
                        {/* <MapRoute
                            origin={{ lat: 28.6139, lng: 77.2090 }} 
                            destination={{ lat: 19.0760, lng: 72.8777 }}
                        /> */}

                        <GoogleMapSection />


                    </TabsContent>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />

            {/* <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                Details
            </ResizablePanel> */}
        </ResizablePanelGroup>
    </TooltipProvider> 
  )
}

export default Base;