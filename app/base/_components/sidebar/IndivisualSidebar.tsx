"use client";
import React from 'react';

type IndivisualSidebarProps = {
    vehicleNum: string
}

function IndivisualSidebar({vehicleNum }: IndivisualSidebarProps) {

    return (
        <div className="flex flex-col p-4 space-y-4 bg-white h-full text-gray-800">
            {/* Vehicle Info */}
            <div className="space-y-1">
                <p className="text-sm text-gray-500">Vehicle ID</p>
                <h2 className="text-lg font-bold">🡅{vehicleNum}</h2>
                <p className="text-sm text-gray-500">Convoy: Alpha Unit</p>
            </div>

            {/* Status Indicator */}
            <div className="mt-2">
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center space-x-2 mt-1">
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700">Active</span>
                </div>
            </div>

            {/* Mission Phase */}
            <div className="mt-4">
                <p className="text-sm text-gray-500">Mission Phase</p>
                <div className="text-sm font-medium text-blue-600 bg-blue-100 rounded px-2 py-1 mt-1 w-fit">
                En Route
                </div>
            </div>

            {/* Divider */}
            <div className="border-t pt-4" />

            {/* Links */}
            <div className="space-y-2">
                <button className="text-sm text-left px-2 py-1 rounded hover:bg-gray-100 transition">
                📞 Contact Commander
                </button>
                <button className="text-sm text-left px-2 py-1 rounded hover:bg-gray-100 transition">
                ⚠️ Report Vehicle Issue
                </button>
                <button className="text-sm text-left px-2 py-1 rounded hover:bg-gray-100 transition">
                📘 View SOP
                </button>
            </div>
        </div>
    )
}

export default IndivisualSidebar;
