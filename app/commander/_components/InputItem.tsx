'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

type InputItemProps = {
  locationType: string;
};

function InputItem({ locationType }: InputItemProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const { source, setSource } = useContext(SourceContext)!;
  const { destination, setDestination } = useContext(DestinationContext)!;


  useEffect(() => {
    const loadScript = (url: string) => {
      const existingScript = document.querySelector(`script[src="${url}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = initAutocomplete;
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (window.google && inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          getLatAndLong(place, locationType);
          setValue(place.formatted_address || '');
        });
      }
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`
    );
  }, [locationType]);

  const getLatAndLong = (place: google.maps.places.PlaceResult, locationType: string) => {
    console.log(place, locationType);
    // const placeId= place.value.place_id;
    // const service= new google.maps.places.PlacesService(document.createElement('div'));
    // service.getDetails({placeId}, (place, status) => {
    //   if(status === 'OK' && place?.geometry && place.geometry.location) {
    //     console.log(place.geometry.location.lng());
    //   }
    // })
    const placeId = place.place_id; // ✅ FIXED: use place.place_id directly

    if (!placeId) {
      console.warn('No place_id found');
      return;
    }

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (details, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && details?.geometry?.location) {
        if(locationType == 'source') {
          setSource({
            lat: details.geometry.location.lat(),
            lng: details.geometry.location.lng(),
            name: details.formatted_address ?? '',
            label: details.name ?? '',
          });
        } else {
          setDestination({
            lat: details.geometry.location.lat(),
            lng: details.geometry.location.lng(),
            name: details.formatted_address ?? '',
            label: details.name ?? '',
          })
        }
      } else {
        console.error('Place details lookup failed:', status);
      }
    });
  };

  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <div className='flex flex-row p-6 justify-center w-full'>
        <div className='flex flex-col w-full'>
          <label htmlFor='locationTextField' className='mb-2 font-semibold'>
            Location
          </label>
          <input
            ref={inputRef}
            id='locationTextField'
            type='text'
            placeholder={locationType === 'destination' ? 'Enter Destination...' : 'Enter Source'}
            className='w-full bg-white border-gray-600 border-2 text-gray-700 px-4 py-2 rounded-xl'
          />
        </div>
      </div>
    </div>
  );
}

export default InputItem;
