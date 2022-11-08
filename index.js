'use strict';
let turn = true;
let buttons = document.getElementsByClassName('button');
let xWins = 0;
let oWins = 0;
let rows = [ 
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let findButtonPosition = (position) => buttons[(position[0] * 3) + position[1]]; // Function that converts the array data into the corresponding button to display game to user.
let player = (x) => {
    if (x === true) {
        return 'O';
    } else if (x === false) {
        return 'X';
    } else {
        return null;
    }
} // Variables set at start of game alongside some variable functions to help shorten code further on.
function tempReset(hard) {
    turn = true;
    rows = [ 
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = 'rgb(240,240,240)';
    }
    updateInterface();
    if (hard) {xWins = 0; oWins = 0;}
} //Function that resets the state of the game, paramater hard determines if reset will be hard reset.
function checkGameState() {
    for (let i = 0; i < 3; i++) {
        let column = [rows[0][i], rows[1][i], rows[2][i]];
        let diagonalOne = [rows[0][0], rows[1][1], rows[2][2]];
        let diagonalTwo = [rows[2][0], rows[1][1], rows[0][2]];
        let checkIfTrue = (x) => x.every((y) => y === turn);
        if (checkIfTrue(rows[i])) {
            changeColor('row', i);
        } else if (checkIfTrue(column)) {
            changeColor('column', i);
            break;
        } else if (checkIfTrue(diagonalOne)) {
            changeColor('diagonalOne', i);
            break;
        } else if (checkIfTrue(diagonalTwo)) {
            changeColor('diagonalTwo', i);
            break;
        } else if (rows.every(element => !element.includes(null))){
            staleMate();
            break;
        }
    } // For loop for 3 times, i means the row/column it checks. Passes i down to checkIfTrue() if game has been won.
    turn = !turn;
} // Checks if a game has reached a point where someone has one or game is unwinnable.
function changeColor(form, i) {
    for (let a = 0; a < 3; a++) {
        if (form === 'row') {
            findButtonPosition([i, a]).style.backgroundColor = 'green';
        } else if (form === 'column') {
            findButtonPosition([a, i]).style.backgroundColor = 'green';
        } else if (form === 'diagonalOne') {
            findButtonPosition([0,0]).style.backgroundColor = 'green';
            findButtonPosition([1,1]).style.backgroundColor = 'green';
            findButtonPosition([2,2]).style.backgroundColor = 'green';
        } else if (form === 'diagonalTwo') {
            findButtonPosition([2,0]).style.backgroundColor = 'green';
            findButtonPosition([1,1]).style.backgroundColor = 'green';
            findButtonPosition([0,2]).style.backgroundColor = 'green';
        }
    } // For loop to 
    gameWon();
} // Changes the color of the winning blocks to the respective row/column.  
function gameWon() {
    alert(player(turn) + ' has won!');
    if (turn) {oWins++} else {xWins++};
    updateInterface();
} // Function that is called if game is won
function staleMate() {
    alert('Nobody has won!');
} // Function that is called if stalemate is reached.
function updateInterface() {
    for (let i = 0; i < 3; i++) {
        for (let a = 0; a < 3; a++) {
            findButtonPosition([i, a]).innerHTML = player(rows[i][a]);
        }
    }
    document.getElementById('turn-display').innerHTML = player(turn);
    document.getElementById('o-wins').innerHTML = oWins;
    document.getElementById('x-wins').innerHTML = xWins;
} // Updates the text to display the game's 
function buttonClick(position) {
    if (!findButtonPosition(position).innerHTML) {
        rows[position[0]][position[1]] = turn;
        checkGameState();
        updateInterface();
    }
} // Updates the multi dimensional array from moves taken to be further used to decide game status. Each time button is clicked, game state is checked.