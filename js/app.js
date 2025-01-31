
//1) Define the required variables used to track the state of the game.
  
//2) Store cached element references

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/

        const winningCombos= [
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
let board = ["", "", "", "", "", "", "", "", ""];
let turn = 'X';  
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
    
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const  resertBtnel = document.getElementById ('reset');
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
});
resertBtnel.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
function handleClick (event) {
    const index = event.target.id;

    if (board[index] || winner) {
        return;
    }
//function updateMessage(){
    board[index] = turn;
    event.target.textContent = turn;

    if(checkWinner()){
        messageEl.textContent = `${turn} Wins`;
    } else if (!winner && board.every (cell => cell !=="")){
        tie = true;
        messageEl.textContent = `It's a Tie!`;
    } else {
        turn = turn === 'X'? 'O': 'X';
        messageEl.textContent = `It's ${turn} 's turn`;
    }
}

 function updateBoard(){
       board.forEach((value, index) =>{
           squareEls[index].textContent = value;
       })
    }

    function render(){
        updateBoard();
    }

function checkWinner(){
    let hasWinner = false;
    winningCombos.forEach((combination) => {
        const [a,b,c] =combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            hasWinner = true;
        }
    });
    return hasWinner;
}

function init(){
    messageEl.textContent = `It's ${turn} turn`;
    squareEls.forEach((square) => {
        square.textContent = '';
    });
}

init();



