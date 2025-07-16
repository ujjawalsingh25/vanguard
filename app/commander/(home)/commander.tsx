"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import MapRoute from '../../../components/MapRoute';
import { VehicleCard } from '@/components/vehicleCard';
import SearchSection from '../_components/SearchSection';
import GoogleMapSection from '../_components/GoogleMapSection';

type Props = {
    defaultLayout: number[] | undefined
    navCollapsedSize: number
    defaultCollapsed: boolean
}

const getRandomInRange = (min: number, max: number) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(1));

const Commander = ({ defaultLayout = [20,32,48], navCollapsedSize, defaultCollapsed }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const [vehicleData, setVehicleData] = useState({
        tyrePressure: 32,
        batteryCharging: 13.5,
        fuelLevel: 75,
        brakePressure: 1000,
        engineTemp: 95,
    });

    // Update values every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setVehicleData({
                tyrePressure: getRandomInRange(20, 35),
                batteryCharging: getRandomInRange(8, 14.7),
                fuelLevel: getRandomInRange(10, 90),
                brakePressure: getRandomInRange(600, 1200),
                engineTemp: getRandomInRange(60, 105),
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
                    <SearchSection />
                    <div className='flex-1'></div>
                    {/* AI */}
                    Ask AI
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue='health'>
                    <div className='flex items-center px-4 py-2'>
                        <h1 className='text-xl font-bold'>All Data</h1>
                        <TabsList className='ml-auto'>
                            <TabsTrigger value='health' className='text-zinc-600 dark:text-zinc-200'>
                                Health
                            </TabsTrigger>
                            <TabsTrigger value='route' className='text-zinc-600 dark:text-zinc-200'>
                                Route
                            </TabsTrigger>
                            <TabsTrigger value='terrain-mapping' className='text-zinc-600 dark:text-zinc-200'>
                                Terrain Mapping
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <Separator />
                    
                    <TabsContent value='health' className='ml-auto w-full mr-auto'>
                        <VehicleCard 
                            // tyrePressure={32} 
                            // batteryCharging={14.7} 
                            // fuelLevel={100} 
                            // brakePressure={1500} 
                            // engineTemp={105} 
                            tyrePressure={vehicleData.tyrePressure}
                            batteryCharging={vehicleData.batteryCharging}
                            fuelLevel={vehicleData.fuelLevel}
                            brakePressure={vehicleData.brakePressure}
                            engineTemp={vehicleData.engineTemp}
                        />
                    </TabsContent>
                    <TabsContent value='route'>
                        <GoogleMapSection />
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle />
        </ResizablePanelGroup>
    </TooltipProvider> 
  )
}

export default Commander;