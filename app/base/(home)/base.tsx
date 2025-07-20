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
import healthData from '@/store/healthData';
import { Button } from '@/components/ui/button';

type Props = {
    defaultLayout: number[] | undefined
    navCollapsedSize: number
    defaultCollapsed: boolean
}

const ITEMS_PER_PAGE = 6;

const Base = ({ defaultLayout = [20,32,48], navCollapsedSize, defaultCollapsed }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(healthData.length / ITEMS_PER_PAGE);

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = healthData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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
                        'flex h-[52px] items-center text-center ml-2.5 text-2xl justify-between', 
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
                <Tabs defaultValue="health" className="w-full">
                        <div className={cn(
                        'flex ml-auto mr-auto h-[52px] items-center text-centertext-2xl justify-between', 
                        isCollapsed ? 'h-[52px]' : 'px-2'
                    )}>  
                        All Vehicles Data
                    </div>
                    <Separator />
                    <TabsContent value="health">
                        <div className="flex flex-wrap p-8 justify-between align-middle gap-6">
                            {currentItems.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                vehicleNum={vehicle.vehicleNum}
                                tyrePressure={vehicle.tyrePressure}
                                batteryCharging={vehicle.batteryCharging}
                                fuelLevel={vehicle.fuelLevel}
                                brakePressure={vehicle.brakePressure}
                                engineTemp={vehicle.engineTemp}
                            />
                            ))}
                        </div>

                        {/* Pagination Controls using shadcn/ui Button */}
                        <div className="flex justify-center mt-6 gap-4">
                            <Button
                                variant="secondary"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>

                            <div className="px-4 py-2 text-sm text-muted-foreground flex items-center">
                                Page {currentPage} of {totalPages}
                            </div>

                            <Button
                                variant="secondary"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                        {/* End Pagination Controls */}
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