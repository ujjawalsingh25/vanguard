'use client';

import React, { useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

const containerStyle = {
  width: '95%',
  height: window.innerWidth*0.5,
};



function GoogleMapSection() {  
  const { source, setSource } = useContext(SourceContext)!;
  const { destination, setDestination } = useContext(DestinationContext)!;
  // const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [directionRoutePoints, setDirectionRoutePoints] = useState<google.maps.DirectionsResult | null>(null);

  const [center, setCenter] = useState({
    lat: 25.5584,
    lng: 85.1874,
  });

  useEffect(() => {
    if(source?.lat&&map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng
      }),
      setCenter({
        lat: source.lat,
        lng: source.lng
      })
    }
    if(source?.lat && destination?.lat) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if(destination?.lat&&map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      })
    }
    if(source?.lat && destination?.lat) {
      directionRoute();
    }
  }, [destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: {lat: source.lat, lng: source.lng},
      destination: {lat: destination.lat, lng: destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      // if(status === google.maps.DirectionsService.OK) {
      if(status === google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(result)
      } else {
        console.error('Error: ');
      }
    })
  }
    
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '', 
  // });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  
  // return isLoaded ? (
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId: '44db031e552db06424a4948d'}}
    >
     {source?.lat 
      ? <MarkerF
          position={{lat: source.lat, lng: source.lng}}
          icon={{
            url: 'https://banner2.cleanpng.com/20190827/but/transparent-circle-icon-map-icon-marker-icon-5d69a270ae9d95.0023302115672039527152.jpg',
            scaledSize: {width: 50, height: 50},
            // scaledSize: new google.maps.Size(20, 20),
          }}
        >
          <OverlayViewF 
            position={{lat: source.lat, lng: source.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[16px]'>{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF> 
      : null
     }
     {destination?.lat 
      ? <MarkerF  
          position={{lat: destination.lat, lng: destination.lng}}
          icon={{
            // url: 'https://c8.alamy.com/comp/R1RXJT/flag-point-vector-icon-isolated-on-transparent-background-flag-point-transparency-logo-concept-R1RXJT.jpg',
            scaledSize: {width: 50, height: 50},
          }}
        >
          <OverlayViewF 
            position={{lat: destination.lat, lng: destination.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[16px]'>{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF> 
      : null}

      {/* <DirectionsRenderer 
        directions={directionRoutePoints}
        options={{
        }}
      /> */}
      {directionRoutePoints && (
        <DirectionsRenderer 
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#D22B2B',
              strokeWeight: 3,
            },
            suppressMarkers: true
          }}
        />
       )}

    </GoogleMap>
  );
  // ) : (
  //   <div>Loading Map...</div>
  // );
}

export default GoogleMapSection;
