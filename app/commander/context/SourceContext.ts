import { createContext } from 'react';

export type Location = {
  lat: number;
  lng: number;
  name: string;
  label: string;
};

export type LocationContextType = {
  source: Location;
  setSource: React.Dispatch<React.SetStateAction<Location>>;
  navigate: boolean;
  setNavigate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SourceContext = createContext<LocationContextType | null>(null);
