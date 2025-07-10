'use client';

import { CircleGauge, Gauge, Thermometer, BatteryFull, Fuel, Circle } from 'lucide-react';

type VehicleCardProps = {
  tyrePressure: number;
  batteryCharging: number;
  fuelLevel: number;
  brakePressure: number;
  engineTemp: number;
};

export const VehicleCard = ({
  tyrePressure,
  batteryCharging,
  fuelLevel,
  brakePressure,
  engineTemp,
}: VehicleCardProps) => {
  const metrics = [
    { label: 'Tyre Pressure', value: tyrePressure, unit: 'psi', icon: <CircleGauge /> },
    { label: 'Battery', value: batteryCharging, unit: 'V', icon: <BatteryFull /> },
    { label: 'Fuel', value: fuelLevel, unit: '%', icon: <Fuel /> },
    { label: 'Brake Pressure', value: brakePressure, unit: 'psi', icon: <Gauge /> },
    { label: 'Engine Temp', value: engineTemp, unit: '°C', icon: <Thermometer /> },
  ];

    return (
        <>
            <div className="card bg-base-100 w-5/6 ml-auto mr-auto shadow-sm bg-[#f3f3f3] p-2">
                <figure className='h-[36vh]'>
                    <iframe className="w-4/5 h-full ml-auto mr-auto" src="https://api.maptiler.com/maps/satellite/?key=SlwOTH7NHaoNpputFEEE#16/25.59418/85.137682"></iframe>
                </figure>
                <div className="card-body ml-4">
                    <h2 className="card-title text-center p-4 text-3xl">
                        Vehicle Number
                    </h2>

                    <div className="flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
                        {metrics.map((metric, idx) => (
                            <div key={idx}
                                className="bg-zinc-600 p-4 rounded-lg flex flex-col items-center justify-center shadow-md"
                            >
                                <div className="text-white mb-2">{metric.icon}</div>
                                <div className="relative w-20 h-20 flex items-center justify-center">
                                    <svg className="absolute w-full h-full">
                                        <circle
                                            className="text-gray-400"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="30"
                                            cx="40"
                                            cy="40"
                                        />
                                        <circle
                                            className={`${
                                                metric.value > 75
                                                ? 'text-green-500'
                                                : metric.value > 40
                                                ? 'text-yellow-400'
                                                : 'text-red-600'
                                            }`}
                                            strokeWidth="6"
                                            strokeDasharray={`${(metric.value / 100) * 188} 188`}
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="30"
                                            cx="40"
                                            cy="40"
                                            transform="rotate(-90 40 40)"
                                        />
                                    </svg>
                                    <span className="text-xl font-bold">{metric.value}</span>
                                </div>
                                <p className="mt-2 text-sm text-center text-zinc-300">
                                    {metric.label} ({metric.unit})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};