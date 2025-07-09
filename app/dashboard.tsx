import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react'

function Dashboard() {
  return (
    <>
        <div>
            <div className="text-2xl mt-[6%] pb-2font-bold">
                <div className="flex flex-row justify-between p-10 w-3/4 mx-auto items-center">
                    <Link href="/base" className="md:w-1/6 lg:w-1/6">
                        <Card
                        className="relative group overflow-hidden rounded-lg bg-[#302f2f] hover:bg-[#363636]
                                    transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
                        >
                        <CardContent className="p-4 text-center text-white font-semibold">
                            Base
                        </CardContent>
                        </Card>
                    </Link>
                    <Link href="/commander" className="md:w-1/6 lg:w-1/6">
                        <Card
                        className="relative group overflow-hidden rounded-lg  bg-[#302f2f] hover:bg-[#363636]
                                    transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
                        >
                        <CardContent className="p-4 text-center text-white font-semibold">
                            Commander
                        </CardContent>
                        </Card>
                    </Link>
                    <Link href="/driver" className="md:w-1/6 lg:w-1/6">
                        <Card
                        className="relative group overflow-hidden rounded-lg  bg-[#302f2f] hover:bg-[#363636]   
                                    transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
                        >
                        <CardContent className="p-4 text-center text-white font-semibold">
                            Driver
                        </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard;