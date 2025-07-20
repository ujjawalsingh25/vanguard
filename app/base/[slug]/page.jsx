'use client';

import { useSearchParams } from 'next/navigation';
import IndivisualVehicleTOBase from './indivisual';

const VehicleDetailsPage = () => {
    const params = useSearchParams();

    const vehicleNum = params.get('vehicleNum');
    const tyrePressure = parseFloat(params.get('tyrePressure') || '0');
    const batteryCharging = parseFloat(params.get('batteryCharging') || '0');
    const fuelLevel = parseFloat(params.get('fuelLevel') || '0');
    const brakePressure = parseFloat(params.get('brakePressure') || '0');
    const engineTemp = parseFloat(params.get('engineTemp') || '0');

    return (
        <div className="font-bold text-xl">
            <IndivisualVehicleTOBase 
                vehicleNum={vehicleNum || 'Unknown'}
                tyrePressure={tyrePressure}
                batteryCharging={batteryCharging}
                fuelLevel={fuelLevel}
                brakePressure={brakePressure}
                engineTemp={engineTemp}
                defaultLayout={[20, 32, 48]}
                defaultCollapsed={false}
                navCollapsedSize={4}
            />
        </div>
    );
};

export default VehicleDetailsPage;
