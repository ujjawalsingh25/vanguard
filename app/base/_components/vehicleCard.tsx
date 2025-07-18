type VehicleCardProps = {
  vehicleNum: string,
  tyrePressure: number;
  batteryCharging: number;
  fuelLevel: number;
  brakePressure: number;
  engineTemp: number;
};

export const VehicleCard = ({vehicleNum, tyrePressure,batteryCharging, fuelLevel, brakePressure, engineTemp}: VehicleCardProps) => {
    return (
        <div className="card bg-base-100 w-1/4 shadow-sm">
            <figure>
                <iframe className="w-full" src="https://api.maptiler.com/maps/satellite/?key=SlwOTH7NHaoNpputFEEE#16/25.59418/85.137682"></iframe>
            </figure>
            <div className="card-body ml-4">
                <h2 className="card-title">
                    {vehicleNum}
                </h2>
                <div className="card-actions justify-end text-sm ml-2">
                    <div className="badge badge-outline">Tyre Pressure: {tyrePressure} psi</div>
                    <div className="badge badge-outline">Battery Charging: {batteryCharging} V</div>
                    <div className="badge badge-outline">Fuel Level: {fuelLevel} %</div>
                    <div className="badge badge-outline">Brake Pressure: {brakePressure} psi</div>
                    <div className="badge badge-outline">Engine Temp: {engineTemp} C</div>
                </div>
            </div>
        </div>
    );
};