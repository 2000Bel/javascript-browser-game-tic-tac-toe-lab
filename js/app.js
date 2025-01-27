
//1) Define the required variables used to track the state of the game.
  
//2) Store cached element references

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
   
        const winningCombinations= [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];

/*---------------------------- Variables (state) ----------------------------*/

let  board = Array(9).fill(null);
let turn = 'X';  
let winner = null;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
    
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
});

/*-------------------------------- Functions --------------------------------*/
 
function handleClick (event) {
    const index = event.target.id;

    if (board[index] || winner) {
        return;
    }

    board[index] = turn;
    event.target.textContent = turn;

    if(checkWinner()){
        messageEl.textContent = '${turn} Wins!';
    } else if (board.every((cell) => cell)){
        tie = true;
        messageEl.textContent = 'I`ts a Tie!';
    } else {
        turn = turn === 'X'? 'O': 'X';
        messageEl.textContent = 'I`ts ${turn}`s turn';
    }
}

function checkWinner(){
    let hasWiner = false;
    winningCombinations.forEach((combination) => {
        const [a,b,c] =combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            hasWiner = true;
        }
    });
    return hasWiner;
}

function init(){
    messageEl.textContent = 'I`ts ${turn} turn';
    squareEls.forEach((square) => {
        square.textContent = '';
    });
}

init();
