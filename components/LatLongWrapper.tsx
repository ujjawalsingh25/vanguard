'use client';

import { useState } from "react";
import { SourceContext } from "@/app/commander/context/SourceContext";
import { DestinationContext } from "@/app/commander/context/DestinationContext";

export default function LatLongWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [source, setSource] = useState({
    lat: 0,
    lng: 0,
    name: '',
    label: '',
  });

  const [destination, setDestination] = useState({
    lat: 0,
    lng: 0,
    name: '',
    label: '',
  });

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        {children}
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
