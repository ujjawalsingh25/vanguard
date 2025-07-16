'use client';

import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayViewF,
} from '@react-google-maps/api';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

function GoogleMapSection() {
  const { source, setSource, navigate } = useContext(SourceContext)!;
  const { destination } = useContext(DestinationContext)!;

  const [directionRoutePoints, setDirectionRoutePoints] = useState<google.maps.DirectionsResult | null>(null);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const [containerStyle, setContainerStyle] = useState<{ width: string; height: string }>({
    width: '95%',
    height: '400px',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [center, setCenter] = useState({
    lat: 25.5584,
    lng: 85.1874,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContainerStyle({
        width: '95%',
        height: `${window.innerWidth * 0.5}px`,
      });
    }
  }, []);

  useEffect(() => {
    if (source?.lat && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
    }

    if (source?.lat && destination?.lat) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.lat && map) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }

    if (source?.lat && destination?.lat) {
      directionRoute();
    }
  }, [destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error('Directions error:', status);
        }
      }
    );
  };

  const onLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  };

  const onUnmount = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    setMap(null);
  };

  // 🔴 Enable live navigation
  useEffect(() => {
    if (navigate && source?.lat && destination?.lat && 'geolocation' in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(currentLocation);
          if (map) {
            map.panTo(currentLocation);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    } else {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [navigate, source, destination, map]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '44db031e552db06424a4948d' }}
    >
      {/* Source Marker */}
      {source?.lat && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: 'https://banner2.cleanpng.com/20190827/but/transparent-circle-icon-map-icon-marker-icon-5d69a270ae9d95.0023302115672039527152.jpg',
            scaledSize: new google.maps.Size(50, 50),
          }}
        >
          <OverlayViewF position={source} mapPaneName="overlayMouseTarget">
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[16px]'>{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Destination Marker */}
      {destination?.lat && (
        <MarkerF position={destination}>
          <OverlayViewF position={destination} mapPaneName="overlayMouseTarget">
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[16px]'>{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Live user marker */}
      {navigate && userPosition && (
        <MarkerF
          position={userPosition}
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      )}

      {/* Route Renderer */}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#D22B2B',
              strokeWeight: 5,
            },
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
