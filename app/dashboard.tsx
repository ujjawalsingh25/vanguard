"use client";

import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  ShieldIcon,
  CarIcon,
  MapIcon,
  SettingsIcon,
  Users,
  ShieldCheck,
  Truck,
  TowerControl,
  TowerControlIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden mt-[6%]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#121212] text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          <div className="text-3xl font-extrabold tracking-wide mb-10 text-center md:text-left">
            Vanguard
          </div>
          <nav className="space-y-6">
            <SidebarLink href="/" icon={<HomeIcon className="w-5 h-5" />} text="Home" />
            <SidebarLink href="/commander" icon={<MapIcon className="w-5 h-5" />} text="Routes" />
            <SidebarLink href="/base" icon={<TowerControl className="w-5 h-5" />} text="Base" />
            <SidebarLink href="/commander" icon={<ShieldIcon className="w-5 h-5" />} text="Commander" />
            <SidebarLink href="/driver" icon={<CarIcon className="w-5 h-5" />} text="Driver" />
            <SidebarLink href="/" icon={<SettingsIcon className="w-5 h-5" />} text="Settings" />
          </nav>
        </div>
        <p className="text-xs text-gray-500 text-center md:text-left">&copy; Vanguard</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-[#1f1f1f] to-[#2e2e2e] py-12 px-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-4xl font-bold mb-12 text-center">
            Mission Access Panel
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            <DashboardCard
              href="/base"
              title="Base"
              description="Monitor all convoy activity & coordinate units"
              icon={<TowerControlIcon className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition" />}
            />
            <DashboardCard
              href="/commander"
              title="Commander"
              description="Set mission routes and oversee vehicle health"
              icon={<ShieldCheck className="h-10 w-10 text-yellow-400 group-hover:text-yellow-300 transition" />}
            />
            <DashboardCard
              href="/driver"
              title="Driver"
              description="Follow assigned routes & receive real-time alerts"
              icon={<Truck className="h-10 w-10 text-green-400 group-hover:text-green-300 transition" />}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Sidebar Link component
function SidebarLink({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}

// Dashboard Card component
function DashboardCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card className="group bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:scale-[1.03] transition-all duration-300 rounded-2xl shadow-xl cursor-pointer">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">{icon}</div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
