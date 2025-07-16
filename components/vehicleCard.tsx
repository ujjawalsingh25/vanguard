'use client';

import {
  CircleGauge,
  Gauge,
  Thermometer,
  BatteryFull,
  Fuel
} from 'lucide-react';
import { useEffect, useState } from 'react';

type VehicleCardProps = {
  tyrePressure: number;
  batteryCharging: number;
  fuelLevel: number;
  brakePressure: number;
  engineTemp: number;
  onContactBase?: (issues: string[]) => void;
};

const thresholds: Record<string, { min: number; max?: number }> = {
  'Tyre Pressure': { min: 32 },
  'Battery': { min: 12.6 },
  'Fuel': { min: 15 },
  'Brake Pressure': { min: 800 },
  'Engine Temp': { min: 40, max: 105 },
};

const maxValues: Record<string, number> = {
  'Tyre Pressure': 35,
  'Battery': 14.7,
  'Fuel': 100,
  'Brake Pressure': 1500,
  'Engine Temp': 105,
};

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

export const VehicleCard = ({
  tyrePressure,
  batteryCharging,
  fuelLevel,
  brakePressure,
  engineTemp,
}: VehicleCardProps) => {
  const [acknowledgedWarnings, setAcknowledgedWarnings] = useState<string[]>([]);

  const metrics = [
    { label: 'Tyre Pressure', value: tyrePressure, unit: 'psi', icon: <CircleGauge /> },
    { label: 'Battery', value: batteryCharging, unit: 'V', icon: <BatteryFull /> },
    { label: 'Fuel', value: fuelLevel, unit: '%', icon: <Fuel /> },
    { label: 'Brake Pressure', value: brakePressure, unit: 'psi', icon: <Gauge /> },
    { label: 'Engine Temp', value: engineTemp, unit: '°C', icon: <Thermometer /> },
  ];

  const currentIssues = metrics.filter((metric) => {
    const t = thresholds[metric.label];
    return (t.min && metric.value < t.min) || (t.max && metric.value > t.max);
  });

  // Only show issues that are not acknowledged
  const issuesToDisplay = currentIssues.filter(
    (i) => !acknowledgedWarnings.includes(i.label)
  );

  // Reset acknowledgment if issue reoccurs
  useEffect(() => {
    const currentLabels = currentIssues.map(i => i.label);
    const newWarnings = acknowledgedWarnings.filter(label => !currentLabels.includes(label));
    if (newWarnings.length !== acknowledgedWarnings.length) {
      setAcknowledgedWarnings(newWarnings);
    }
  }, [tyrePressure, batteryCharging, fuelLevel, brakePressure, engineTemp]);

  return (
    <div className="card bg-base-100 w-5/6 ml-auto mr-auto shadow-sm bg-[#f3f3f3] p-2">
      <figure className="h-[36vh]">
        <iframe
          className="w-4/5 h-full ml-auto mr-auto"
          src="https://api.maptiler.com/maps/satellite/?key=SlwOTH7NHaoNpputFEEE#16/25.59418/85.137682"
        />
      </figure>

      <div className="card-body ml-4">
        <h2 className="card-title text-center p-4 text-3xl">Vehicle Number</h2>

        {issuesToDisplay.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-md mb-6 shadow-md">
            <div className="font-semibold mb-2">⚠️ Warning: Health issues detected:</div>
            <ul className="list-disc ml-6 mb-3 text-sm">
              {issuesToDisplay.map((metric, idx) => {
                const t = thresholds[metric.label];
                if (t.min && metric.value < t.min)
                  return <li key={idx}>{metric.label} too low ({metric.value}{metric.unit}, expected ≥ {t.min}{metric.unit})</li>;
                if (t.max && metric.value > t.max)
                  return <li key={idx}>{metric.label} too high ({metric.value}{metric.unit}, expected ≤ {t.max}{metric.unit})</li>;
              })}
            </ul>
            <div className="flex gap-4">
              <button
                onClick={() => alert('Contacting base...')}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Contact Base
              </button>
              <button
                onClick={() =>
                  setAcknowledgedWarnings((prev) => [
                    ...prev,
                    ...issuesToDisplay.map((m) => m.label),
                  ])
                }
                className="border border-gray-500 px-4 py-1 rounded hover:bg-gray-100"
              >
                Ignore
              </button>
            </div>
          </div>
        )}

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
