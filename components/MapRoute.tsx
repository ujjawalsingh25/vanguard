import React from "react";
import GoogleMapReact from "google-map-react";

type Props = {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
};

type MarkerProps = {
  lat: number;
  lng: number;
  text: string;
};

const Marker = ({ text }: MarkerProps) => (
  <div
    style={{
      color: "white",
      background: "blue",
      padding: "4px 8px",
      borderRadius: "6px",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

const MapRoute: React.FC<Props> = ({ origin, destination }) => {
  const center = {
    lat: (origin.lat + destination.lat) / 2,
    lng: (origin.lng + destination.lng) / 2,
  };

  const defaultZoom = 6;

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    const polyline = new maps.Polyline({
      path: [origin, destination],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
    polyline.setMap(map);
  };

  return (
    <div className="ml-auto mr-auto w-[80%] h-[75vh]">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} 
        defaultCenter={center}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
        <Marker lat={origin.lat} lng={origin.lng} text="Origin" />
        <Marker lat={destination.lat} lng={destination.lng} text="Destination" />
      </GoogleMapReact>
    </div>
  );
};

export default MapRoute;
