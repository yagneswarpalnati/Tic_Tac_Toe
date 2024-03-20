import React, { useEffect, useState } from 'react';
import { checkWin, minimax } from './gameLogic';
import '../App.css';
import aiImg from '../Assests/ai_pic.jpg';
import aiVsHum from '../Assests/ai_vs_human.jpg';
const Board = ({startPlayer}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [gameResult, setGameResult] = useState(null);
  const [isStart,setStarted]=useState(true);
  const [idx,setIndex]=useState(null);
  
  if(startPlayer==='Computer' && isStart){
    let newBoard=[...board];
    let bestScore=-Infinity;
    let bestMove;
    for(let i=0;i<9;i++){
      if(!newBoard[i]){
        newBoard[i]='X';
        let score=minimax(newBoard,0,false);

        newBoard[i]=null;
        if(score>bestScore){
          bestScore=score;
          bestMove=i;
        }
      }
    }
    
    const newBoard2 = [...newBoard];
    newBoard2[bestMove] = 'X';
    setIndex(bestMove);
    setBoard(newBoard2);
    setStarted(false);
  }


  const handleClick = (index) => {
    if (!board[index] && !gameResult) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const winner = checkWin(newBoard);
      if (winner && winner==='O') {
        setGameResult(`Computer Won the game, Better luck next time`);
      } else if (winner==='tie') {
        setGameResult('It\'s a tie !!!, Great Efforts buddy');
      }else{
        setCurrentPlayer('X');

        setTimeout(() => {
          let bestScore=-Infinity;
          let bestMove;
          for(let i=0;i<9;i++){
            if(!newBoard[i]){
              newBoard[i]='X';
              let score=minimax(newBoard,0,false);
  
              newBoard[i]=null;
              if(score>bestScore){
                bestScore=score;
                bestMove=i;
              }
            }
          }
          
          const newBoard2 = [...newBoard];
          newBoard2[bestMove] = 'X';
          setIndex(bestMove);
          setBoard(newBoard2);



          const winner2 = checkWin(newBoard2);
          if (winner2 && winner2==='X') {
            setGameResult(`Computer Won the game, Better luck next time`);
          } else if (winner2==='tie') {
            setGameResult('It\'s a tie !!!, Great Efforts buddy');
          }else{
            setCurrentPlayer('O');
          }
        }, 200);
      }
    }
  };

  
  const Button = ({index}) => {
    return (
      <button 
        key={index}
        className="button"
        onClick={()=>handleClick(index)} 
        disabled={gameResult || board[index] || startPlayer===null} 
      >
        {board[index]}
      </button>
    );
  };
  
  

  return (
    <>
      <div className="gameContainer">
        <div className='container'>
          <Button index={0}/>
          <Button index={1}/>
          <Button index={2}/>
          <Button index={3}/>
          <Button index={4}/>
          <Button index={5}/>
          <Button index={6}/>
          <Button index={7}/>
          <Button index={8}/>
        </div>
        
      </div>
      <>
        {startPlayer===null && <h1 className='game-result'>Please Select  a Player First to start the game</h1>}
        {!gameResult && idx===null && startPlayer!==null&& <h1 className='game-result'>Please make your move</h1>}
        {!gameResult && idx!==null && startPlayer!==null &&<h1 className='game-result'>Computer placed at {idx}</h1>}
        {gameResult && <h1 className="game-result">{gameResult}</h1>}
      </>
      {(gameResult ||startPlayer===null )&&
        <div className='image-container'>
          <img src={aiVsHum} alt="Artificial Intelligence vs Human" />
        </div>
      }
      {
        (!gameResult && startPlayer!==null) &&
        <div className='image-container'>
          <img src={aiImg} alt="Artificial Intelligence" />
        </div>
      }
      

    </>
  );
};

export default Board;