"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';

type Props = {
    defaultLayout: number[] | undefined
    navCollapsedSize: number
    defaultCollapsed: boolean
}

const IndivisualVehicle = ({ defaultLayout = [20,32,48], navCollapsedSize, defaultCollapsed }: Props) => {
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
                    {/* Sidebar */}
                    Sidebar
                    <div className='flex-1'></div>
                    {/* AI */}
                    Ask AI
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue='inbox'>
                    <div className='flex items-center px-4 py-2'>
                        <h1 className='text-xl font-bold'>All Data</h1>
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
                    <div>Search Bar</div>
                    
                    <TabsContent value='health'>
                        Health
                    </TabsContent>
                    <TabsContent value='route'>
                        Route
                    </TabsContent>
                    <div className='flex flex-col p-4 space-y-2'>
                        <div>Vehicle 1</div>
                        <div>Vehicle 2</div>
                        <div>Vehicle 3</div>
                    </div>
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

export default IndivisualVehicle;