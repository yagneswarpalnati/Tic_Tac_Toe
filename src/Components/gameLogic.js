// gameLogic.js

export const checkWin = (board) => {
    let winner=null;
    let openSpots=0
    for(let i=0;i<9;i++){
      if(board[i]==null){
        openSpots+=1
      }
    }
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner=board[a];
        break;
      }
    }

    if(winner===null && openSpots===0){
      return 'tie';
    }else{
      return winner;
    }
  };
  
  const scores={
    X:100,
    O:-100,
    tie:0
  }
  
  export const minimax = (board, depth, isMaximizingPlayer) => {
    const winner = checkWin(board);

    if (winner!=null) {
      return scores[winner];
    }
  
    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
  
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = 'X';
          let score = minimax(board, depth + 1, false);
          board[i] = null;
  
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
  
      return bestScore;
    } else {
      let bestScore = Infinity;
  
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = 'O';
          let score = minimax(board, depth + 1, true);
          board[i] = null;
  
          if (score < bestScore) {
            bestScore = score;
          }
        }
      }
  
      return bestScore;
    }
  };