'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '95%',
  height: window.innerWidth*0.5,
};

const center = {
  lat: 25.5584,
  lng: 85.1874,
};

function GoogleMapSection() {
    
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '', 
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId: '44db031e552db06424a4948d'}}
    >
      {/* Child components like markers go here */}
      <></>
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
}

export default GoogleMapSection;
