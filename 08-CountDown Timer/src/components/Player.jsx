import { useRef, useState } from 'react';


export default function Player() {
  
  const [enteredplayername, setenteredplayername] = useState('');
  
  const nameInputRef = useRef();


  function handleSubmit(e){
    setenteredplayername(nameInputRef.current.value);
    nameInputRef.current.value='';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredplayername ?? 'unknown'}</h2>
      <p>
        <input type="text" ref={nameInputRef}/>
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}


/*

import {useState} from 'react';

export default function Player() {
  
  const [enteredplayername, setenteredplayername] = useState('');
  const [submitted, setsubmitted] = useState(false);

  function handleChange(e){
    setenteredplayername(e.target.value);
  }

  function handleSubmit(e){
    setsubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted === true ? enteredplayername : 'unknown'}</h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredplayername}/>
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}

*/