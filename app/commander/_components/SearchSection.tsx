import React, { useContext, useEffect } from 'react'
import InputItem from './InputItem';
import { SourceContext } from '../context/SourceContext';
import { DestinationContext } from '../context/DestinationContext';

function SearchSection() {
  const { source, setSource } = useContext(SourceContext)!;
  const { destination, setDestination } = useContext(DestinationContext)!;

  useEffect(() => {
    if(source) console.log(source);
  }, [source, destination])

  return (
    <div>
        <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
            <p className='text-[20px] font-bold'>Set Route</p>
              <InputItem locationType='source' />
              <InputItem locationType='destination' />
              {/* <button type="submit" 
                className="outline-none rounded-sm bg-[#2f72ed] text-white font-bold shadow-lg w-full px-4 py-2 
                transition-all duration-100 hover:bg-[#1d5cd0] hover:shadow-xl 
                rounded-tl-[2rem] rounded-bl-xl rounded-tr-xl rounded-br-[2rem] "
              >
                Add 
            </button> */}
            </div>
    </div>
  )
}

export default SearchSection;