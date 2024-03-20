import { useState } from "react";
export default function Header({onStartGame}){
    const [clicked,setClick]=useState(false);
    const [player,setplayer]=useState();
    function handleClick(player){
        onStartGame(player);
        setplayer(player);
        setClick(true);
    }
    return (
        <>
            <div className="top">
                <h1>TIC TAC TOE</h1>
            </div>
            <div className="gameInfo">
                {clicked && <h1>{player} as a First Player</h1>}
                {!clicked && <><h1>Whom do wanna start with:</h1>
                <button onClick={()=>handleClick('Human')} >You</button>
                <button onClick={()=>handleClick('Computer')} >Computer</button></>}
                
            </div>
        </>
    );
}