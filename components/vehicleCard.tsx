'use client';

import {
  CircleGauge,
  Gauge,
  Thermometer,
  BatteryFull,
  Fuel
} from 'lucide-react';

type VehicleCardProps = {
  tyrePressure: number;
  batteryCharging: number;
  fuelLevel: number;
  brakePressure: number;
  engineTemp: number;
};

// Color logic based on value and label
const getStrokeColor = (label: string, value: number): string => {
  switch (label) {
    case 'Tyre Pressure':
      return value >= 32 && value <= 35 ? 'text-green-500' :
             value >= 30 ? 'text-yellow-400' : 'text-red-600';
    case 'Battery':
      return value >= 13.5 && value <= 14.7 ? 'text-green-500' :
             value >= 12.6 ? 'text-yellow-400' : 'text-red-600';
    case 'Fuel':
      return value > 60 ? 'text-green-500' :
             value > 30 ? 'text-yellow-400' : 'text-red-600';
    case 'Brake Pressure':
      return value > 1100 ? 'text-green-500' :
             value > 800 ? 'text-yellow-400' : 'text-red-600';
    case 'Engine Temp':
      return value <= 100 ? 'text-green-500' :
             value <= 105 ? 'text-yellow-400' : 'text-red-600';
    default:
      return 'text-gray-400';
  }
};

// Max values for each metric label
const maxValues: Record<string, number> = {
  'Tyre Pressure': 35,
  'Battery': 14.7,
  'Fuel': 100,
  'Brake Pressure': 1500,
  'Engine Temp': 105,
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
    <div className="card bg-base-100 w-5/6 ml-auto mr-auto shadow-sm bg-[#f3f3f3] p-2">
      <figure className="h-[36vh]">
        <iframe
          className="w-4/5 h-full ml-auto mr-auto"
          src="https://api.maptiler.com/maps/satellite/?key=SlwOTH7NHaoNpputFEEE#16/25.59418/85.137682"
        />
      </figure>
      <div className="card-body ml-4">
        <h2 className="card-title text-center p-4 text-3xl">
          Vehicle Number
        </h2>

        <div className="flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
          {metrics.map((metric, idx) => {
            const strokeColor = getStrokeColor(metric.label, metric.value);
            const percent = Math.min(
              (metric.value / maxValues[metric.label]) * 100,
              100
            );
            const strokeLength = (percent / 100) * 188;

            return (
              <div
                key={idx}
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
                      className={strokeColor}
                      strokeWidth="6"
                      strokeDasharray={`${strokeLength} 188`}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
