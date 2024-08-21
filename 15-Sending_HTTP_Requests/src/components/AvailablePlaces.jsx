import Places from './Places.jsx';
import {useState,useEffect} from "react";
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    
    async function fetchPlaces() {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }
        const resData = await response.json();
        setAvailablePlaces(resData.places);

        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces=sortPlacesByDistance(resData.places,position.coords.latitude,position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setLoading(false);
        });
        

      } catch (error) {
        setError(error);
        setLoading(false);
      } 
        
    }
    
    fetchPlaces();

  }, []); // Empty dependency array means this effect runs once when the component mounts.
  
  

/*

 async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json(); // Waits for the response to be parsed as JSON
    console.log(data); // Proceeds after the data has been fetched and parsed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

*/

  if (error){
    return <Error title="Error da dei" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data ... "
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
