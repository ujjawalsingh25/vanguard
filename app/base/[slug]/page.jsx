'use client';

import { useParams } from 'next/navigation';

const VehicleDetailsPage = () => {
    const { slug } = useParams();
    const vehicleNum = slug?.split('vehicleNum-')[1];

    return (
        <div className='h-full'>
            <h1>Vehicle Details</h1>
            <p>Vehicle Number: BR01GL-{vehicleNum}</p>
        </div>
    );
};

export default VehicleDetailsPage;
