import { useRef, useState,useEffect,useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js'


function App() {
  const [modalisopen,setModalIsOpen]= useState(false);
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces,setAvailablePlaces] = useState([]);

  
  // UseEffect should be used directly in the app/root component  and not within any other function
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Current position called!');
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
   
      setAvailablePlaces(sortedPlaces);
    });
  },[]);

  useEffect(() => {
    const storedPlaces = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    setPickedPlaces(storedPlaces);
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      const updatedPlaces = [place, ...prevPickedPlaces];
    
      // Store the entire places array
      localStorage.setItem('selectedPlaces', JSON.stringify(updatedPlaces));
      //const placeIds = updatedPlaces.map(p => p.id);
      //localStorage.setItem('selectedPlaces', JSON.stringify(placeIds));
// localStorage now contains '["p13","p14"]'

      return updatedPlaces;
    });
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => {
      const updatedPlaces1 = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current
      );
      
      // Update the local storage with the new list of places
      localStorage.setItem('selectedPlaces', JSON.stringify(updatedPlaces1));
      const placeIds = updatedPlaces1.map(p => p.id);
      //localStorage.setItem('selectedPlaces', JSON.stringify(placeIds));
      return updatedPlaces1;
    });
  
    setModalIsOpen(false);
  },[]);

  return (
    <>
      <Modal open={modalisopen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={'Searching da bodysoda..'}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}
export default App;
