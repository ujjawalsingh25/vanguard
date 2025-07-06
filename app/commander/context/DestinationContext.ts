import { createContext } from 'react';

export type Location = {
  lat: number;
  lng: number;
  name: string;
  label: string;
};

export type DestinationContextType = {
  destination: Location;
  setDestination: React.Dispatch<React.SetStateAction<Location>>;
};

export const DestinationContext = createContext<DestinationContextType | null>(null);
