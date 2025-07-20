"use client";

import React, { useEffect, useState } from "react";

type VehicleHealth = {
  tyrePressure: number;
  batteryCharging: number;
  fuelLevel: number;
  brakePressure: number;
  engineTemp: number;
};

type CommanderInstruction = {
  message: string;
  timestamp: string;
};

type IndivisualSidebarProps = {
  vehicleNum: string;
  tyrePressure: number;
  batteryCharging: number;
  fuelLevel: number;
  brakePressure: number;
  engineTemp: number;
}

const IndivisualVehicleDashboard = ({vehicleNum, tyrePressure, batteryCharging, fuelLevel,brakePressure, engineTemp }: IndivisualSidebarProps) => {
  const [vehicleHealth, setVehicleHealth] = useState<VehicleHealth | null>(null);
  const [instruction, setInstruction] = useState<CommanderInstruction | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      const data: VehicleHealth = {
        tyrePressure,
        batteryCharging,
        fuelLevel,
        brakePressure,
        engineTemp,
      };
      setVehicleHealth(data);
    };

    const fetchInstruction = async () => {
      const command: CommanderInstruction = {
        message: "Maintain 200m distance from lead vehicle. Avoid northern route due to risk zone.",
        timestamp: new Date().toLocaleString(),
      };
      setInstruction(command);
    };

    fetchHealth();
    fetchInstruction();
  }, [tyrePressure, batteryCharging, fuelLevel, brakePressure, engineTemp]);


  const handleAcknowledge = () => {
    setAcknowledged(true);
  };

  const getStatusColor = (label: string, value: number) => {
    const thresholds = {
      tyrePressure: 30,
      batteryCharging: 12.6,
      fuelLevel: 15,
      brakePressure: 800,
      engineTemp: 105,
    };

    if (label === "engineTemp") return value > thresholds.engineTemp ? "text-red-600" : "text-green-600";
    return value < thresholds[label as keyof typeof thresholds] ? "text-red-600" : "text-green-600";
  };

  const thresholds = {
    tyrePressure: 35,
    batteryCharging: 14.7,
    fuelLevel: 100,
    brakePressure: 1200,
    engineTemp: 105,
  };

  return (
    <div className="bg-white text-gray-800 p-4 rounded-xl w-full space-y-4">
      {/* Compact horizontal layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vehicle Health */}
        <div className="col-span-2 bg-gray-50 p-4 rounded-xl border shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Vehicle Status</h2>
            <h2 className="text-lg font-semibold">🡅{vehicleNum}</h2>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Live</span>
          </div>
          {vehicleHealth ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {Object.entries(vehicleHealth).map(([key, value]) => (
                <div key={key} className="flex flex-col bg-white border rounded-md p-3 shadow-sm">
                  <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className={`font-bold text-lg ${getStatusColor(key, value)}`}>{value}</span>
                  <div className="mt-1 h-1 w-full bg-gray-200 rounded">
                    <div
                      className="h-1 rounded transition-all duration-300"
                      style={{
                        width: `${Math.min((value / thresholds[key as keyof typeof thresholds]) * 100, 100)}%`,
                        backgroundColor:
                          getStatusColor(key, value).includes("red") ? "#DC2626" : "#16A34A",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading vehicle health...</p>
          )}
        </div>

        {/* Route Overview */}
        <div className="bg-gray-50 p-4 rounded-xl border shadow-sm space-y-2">
          <h2 className="text-lg font-semibold mb-1">Route Overview</h2>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between"><span>Route:</span> <span className="font-medium">Alpha-Bravo</span></li>
            <li className="flex justify-between"><span>Next Checkpoint:</span> <span className="font-medium">CP-09 (17:35)</span></li>
            <li className="flex justify-between"><span>Speed:</span> <span className="font-medium">40 km/h</span></li>
            <li className="flex justify-between"><span>Distance Left:</span> <span className="font-medium">14.2 km</span></li>
          </ul>
        </div>
      </div>

      {/* Commander Instruction */}
      <div className="bg-gray-50 p-4 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Commander Brief</h2>
          <span className="text-xs text-gray-500">{instruction?.timestamp}</span>
        </div>
        <p className="text-sm mb-3">{instruction?.message}</p>
        {!acknowledged ? (
          <button
            onClick={handleAcknowledge}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Acknowledge
          </button>
        ) : (
          <p className="text-sm text-green-600 font-medium">Acknowledged</p>
        )}
      </div>
    </div>
  );
};

export default IndivisualVehicleDashboard;
