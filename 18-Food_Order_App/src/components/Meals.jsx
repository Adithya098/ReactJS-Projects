import { useState, useEffect } from "react";
import Mealitems from "./Mealitem";
import useHttp from "../hooks/UseHTTP";

const requestConfig={}

export default function Meals(){
    
  /*
    const [mealsmenu, setMealsmenu] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMeals() {
        try {
          const response = await fetch('http://localhost:3000/meals');
          if (!response.ok) {
            throw new Error('Failed to fetch places');
          }
          const resData = await response.json();
          setMealsmenu(resData);
        } 
        catch (error) {
            setError(error);
          } 
        }
        fetchMeals();
    },[]);
    */

    const {data:mealsmenu,isLoading,error}=useHttp('http://localhost:3000/meals',requestConfig,[]);

    // Handle loading state
if (isLoading) {
  return <p className="center">Fetching Meals...</p>;
}

// Handle error state
if (error) {
  return (
    <div className="error">
      <h2>Failed to Fetch Meals</h2>
      <p>Error fetching meals: {error.message}</p>
    </div>
  );
}

// Ensure mealsmenu is defined and is an array before mapping
if (!mealsmenu || !Array.isArray(mealsmenu)) {
  return <p className="center">No meals available.</p>;
}

return (
  <ul id='meals'>
      {mealsmenu.map(meal => (
          <Mealitems key={meal.id} meal={meal} />
      ))}
  </ul>
);
}
