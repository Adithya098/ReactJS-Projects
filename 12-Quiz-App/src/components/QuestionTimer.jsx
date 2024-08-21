import { useState,useEffect } from "react";

export default function QuestionTimer({timeout,onTimeout}){
    
    const [timeremaining, setTimeremaining] = useState(timeout);

    useEffect(()=>{
        //console.log('Setting Timeout');
        const timeoutt=setTimeout(onTimeout,timeout);
        return ()=>{clearTimeout(timeoutt)}
    },[timeout,onTimeout])
    
    
    useEffect(()=>{
        //console.log('Setting Interval');
        const interval=setInterval(() => {
            setTimeremaining(prevRemainingTime => prevRemainingTime-100);
            },100);

            return ()=>{clearInterval(interval)};
    },[]);
    
    return(
        <progress id='question-time' max={timeout} value={timeremaining}/>
    )
}

/*
Explanation:

Side Effects Management:
useEffect is designed to handle side effects in React components. 
A side effect is anything that affects something outside the scope of the function, such as setting up a timer, 
making an HTTP request, or manipulating the DOM directly.
Setting up a timeout is a side effect because it involves scheduling a function to run after a specified delay, 
which is external to the component’s rendering logic.

Dependencies Array:
The dependencies array [timeout, onTimeout] ensures that the effect only runs when these dependencies change.
This means that every time the timeout or onTimeout values change, the previous timeout is cleared, and a new one is set up.
This prevents multiple timeouts from running simultaneously and ensures that the correct timeout is always in place.

Cleanup Function:
Returning a function from useEffect allows us to clean up any side effects when the component unmounts or before the effect runs again.
In this case, clearTimeout(timeoutt) clears the previously set timeout to prevent memory leaks and ensure that only the most recent 
timeout is active.
*/