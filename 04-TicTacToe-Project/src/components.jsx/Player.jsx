import { useState } from "react";

export default function Player({InitialName,symbol,isActive}){

    const [isEditing, setIsEditing] = useState(false);

    const[playerName,setPlayerName] = useState(InitialName);

    //const [buttonName, setButtonName] = useState('Edit');
    
    function handleEdit(){
        setIsEditing(isEditing => !isEditing);
        // setIsEditing ( isEditing ? false : true );
    }

    const handleNameChange = (event) => {
        console.log(event);
        setPlayerName(event.target.value);
      };
      
    let edittablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        edittablePlayerName = <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
      />
    }
    return(
        <li className={isActive? 'active':undefined}>
            <span className="player">
            {edittablePlayerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button> 
        </li>
    );
}