import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { Logo } from './base/_components/navbar/logo';
import Link from 'next/link';

function LandingPage() {
  return (
    <>
        <section className="w-full min-h-screen flex flex-col bg-[#ecebeb]">
            <nav className="flex items-center justify-between p-4 w-full">
            <div className="flex items-center space-x-2">
                {/* <Logo /> */}
                <h1 className="text-xl font-semibold">Vanguard</h1>
            </div>
            </nav>
            <div className="container md:flex justify-center items-center px-4 md:px-6 flex-1">
                <div className="flex flex-col items-center space-y-4 text-center p-4 md:w-1/2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                    A{' '}
                    <span className="font-extrabold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 
                    text-transparent bg-clip-text bg-300% animate-gradient">
                    Real-Time 
                    </span>{' '}
                    Navigation System for Defense Convoy Operations
                </h1>

                <p className="text-muted-foreground mt-2 text-lg">
                    <span className="text-blue-700 font-bold mt-2"> Safeguarding</span>{' '}
                    Every Move,{' '}
                    <span className="text-green-700 font-bold mt-2">Mapping</span>{' '}Every Mile
                </p>

                <div className='flex flex-row justify-between space-x-[15%]'>
                    <Link href="/sign-in">
                        <Button>Login</Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button>New User? SignUp</Button>
                    </Link>
                </div>
                </div>
                <Card className="relative group overflow-hidden rounded-lg md:w-1/2">
                    <CardContent className="p-1">
                        <video className="h-full w-full rounded-lg" autoPlay loop muted>
                            <source src="/landingvideo.mp4" type="video/mp4"></source>
                        </video>
                    </CardContent>
                </Card>
            </div>
        </section>
    </>
  )
}

export default LandingPage;