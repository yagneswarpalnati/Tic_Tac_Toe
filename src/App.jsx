import { useState } from 'react';
import Header from './Components/Header.jsx';
import Board from './Components/Board.jsx';
import  './App.css';

function App(){
  const [startPlayer,setStartPlayer]=useState(null);
  function onStartGame(player){
      setStartPlayer(player);
      console.log(player)
  }
  return (
    <>
      <Header onStartGame={onStartGame}/>
      <Board startPlayer={startPlayer}/>
      
    </>
  );
}

export default App;