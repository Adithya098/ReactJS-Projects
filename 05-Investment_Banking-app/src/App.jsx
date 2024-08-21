import { useState } from 'react';

import Header from "./components/Header"
import UserInputs from './components/UserInput';
import Results from './components/Results';

function App() {

  const [enteredInput, setEnteredInput] = useState({
    initialInvestment: Number(10000),
    annualInvestment: Number(1200),
    expectedReturn: Number(6),
    duration: Number(10),
    });

  function handleChange(inputIdentifier, newValue) {
      setEnteredInput(preventeredInput => {
          return {
              ...preventeredInput,
              [inputIdentifier]: Number(newValue)
          };
      });
  }
  //console.log(enteredInput);
  return (
    <div>
    <Header/>
    <UserInputs input={enteredInput} handleChange={handleChange}/>
    <Results input={enteredInput}/>
    </div>
  )
}

export default App
