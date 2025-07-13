'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayViewF
} from '@react-google-maps/api';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

function GoogleMapSection() {
  const { source, setSource, navigate } = useContext(SourceContext)!;
  const { destination } = useContext(DestinationContext)!;

  const [directionRoutePoints, setDirectionRoutePoints] =
    useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({
    lat: 25.5584,
    lng: 85.1874
  });

  const [containerStyle, setContainerStyle] = useState({
    width: '95%',
    height: '400px'
  });

  // Dynamically resize container for responsiveness
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContainerStyle({
        width: '95%',
        height: `${window.innerWidth * 0.5}px`
      });
    }
  }, []);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const directionRoute = (origin: { lat: number; lng: number }) => {
    if (!destination?.lat) return;

    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin,
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING
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

  // Live Navigation: Update source and directions as we move
  useEffect(() => {
    let watchId: number;

    if (navigate && destination?.lat) {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const liveLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              name: 'Live',
              label: 'You'
            };

            setSource(liveLocation);
            directionRoute(liveLocation); // real-time routing
            setCenter({ lat: liveLocation.lat, lng: liveLocation.lng });

            if (map) {
              map.panTo({ lat: liveLocation.lat, lng: liveLocation.lng });
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
          }
        );
      }
    }

    return () => {
      if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [navigate, destination?.lat, map]);

  // 📍 Normal route (non-live): when source and destination selected
  useEffect(() => {
    if (source?.lat && destination?.lat && map && !navigate) {
      setCenter({ lat: source.lat, lng: source.lng });
      directionRoute({ lat: source.lat, lng: source.lng });
    }
  }, [source, destination, map, navigate]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '44db031e552db06424a4948d' }}
    >
      {/* Source Marker */}
      {source?.lat && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/RedDot.svg/2048px-RedDot.svg.png',
            scaledSize: new google.maps.Size(30, 30)
          }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <div className="p-1 bg-black text-white font-semibold text-xs rounded">
              You
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Destination Marker */}
      {destination?.lat && (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Route line */}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#007bff',
              strokeWeight: 5
            },
            suppressMarkers: true
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
