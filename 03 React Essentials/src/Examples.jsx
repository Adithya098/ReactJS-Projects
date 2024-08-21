import TabButton from './TabButton.jsx';
import React, { useState } from 'react';
import {  EXAMPLES } from './data.js';


function TabContent(props) {
    if(props.description==undefined)
      return (<div>
        <p>Please select a topic</p>
      </div>
      );
    else{
    return (
      <div id="tab-content">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <pre>
        <code>{props.code}</code>
        </pre>
      </div>
    );
  }
  }

export default function Examples(){
    const [selectedTopic, setSelectedTopic] = useState();

    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
    }

    return (<section id='examples'>
        <h2>Examples</h2>
        <menu>
          <TabButton isSelected={selectedTopic==='components'} onSelect={() => handleSelect('components')}>Components</TabButton>
          <TabButton isSelected={selectedTopic==='jsx'} onSelect={() => handleSelect('jsx')}>JSX</TabButton>
          <TabButton isSelected={selectedTopic==='props'} onSelect={() => handleSelect('props')}>Props</TabButton>
          <TabButton isSelected={selectedTopic==='state'} onSelect={() => handleSelect('state')}>State</TabButton>
        </menu>
        <TabContent {...EXAMPLES[selectedTopic]} />
      </section>);

}
