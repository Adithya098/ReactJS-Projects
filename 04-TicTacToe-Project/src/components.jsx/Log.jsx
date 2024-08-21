export default function Log ({turns}) {

    return (
        <ol id='log'>
            {turns.map((turn,index) => 
            <li key={index}>
            Player {turn.player} moved at ({turn.square.row},{turn.square.column})
            </li>
        )}
        </ol>
    )
    
}