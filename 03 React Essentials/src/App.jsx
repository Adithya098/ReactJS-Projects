import React, { useState, Fragment } from 'react';
import reactImg1 from './assets/react-core-concepts.png'
import { CORE_CONCEPTS, EXAMPLES } from './data.js'
import Examples from './Examples.jsx';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header1(){
  let text1 = reactDescriptions[genRandomInt(2)];
  return (
    <header>
      <img src={reactImg1} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {text1} React concepts you will need for almost any app you are
        going to build.
      </p>
    </header>
  );
}

function CoreConcept(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}


function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
    <Fragment>
      <Header1 />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((concept) => (
              <CoreConcept key = {concept.title} {...concept} />
            ))}
          </ul>
        </section>
        <Examples/>
      </main>
    </Fragment>
  );
}

export default App;


/*

let tabContent = (
  <p>Please select a topic.</p>
);

if (selectedTopic) {
  tabContent = (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
      </pre>
    </div>
  );
}

*/

