'use strict';
let turn = true; // Starts at true since true represents O and O plays first.
let rows = []
for (let i = 0; i < 3; i++) {
        rows[i] = [null, null, null];
}

 // Array that stores the buttons clicked and the player who clicked them, with true representing O and false representing X.
let player = () => turn ? 'O' : 'X'

function buttonClick(position) { 
    let truePlayer = turn;
    let id = (x) => { return (x[0] * 3) + (x[1] + 1) };
    let relativeButton = document.getElementById(id(position));
    if (!relativeButton.innerHTML) {
        relativeButton.innerHTML = player()
        rows[position[0]][position[1]] = truePlayer;
        checkGameStatus(turn)
        document.getElementById('turn-display').innerHTML = player()
    }
} // Function that determines if the box hasn't been clicked on yet, and if so, set value of array that will be used further on with calculating if game has been decided. Changes all the visual aspects of the game as well.

function checkGameStatus() {
    for (let i = 0; i < 3; i++) {
        let column = [rows[0][i], rows[1][i], rows[2][i]];
        let diagonalOne = [rows[0][0], rows[1][1], rows[2][2]];
        let diagonalTwo = [rows[2][0], rows[1][1], rows[0][2]];
        let checkIfTrue = (x) => x.every((y) => y === turn);
        if (checkIfTrue(rows[i]) || checkIfTrue(column) || checkIfTrue(diagonalOne) || checkIfTrue(diagonalTwo)) {
            gameWon();
            break;
        } else if (rows.forEach(element => element.includes(null))) {
            staleMate();
            break;
        } else {
            turn = !turn;
        }
    }
} // Function that executes each time a button is clicked to either continue the game or end the game resulting in a victory for either X or O, relative to the turn that the function is executed at. Changes all the 

function gameWon() {
    console.log(player() + ' has won!');
    reset()
} // Function that is executed if someone successfully wins the game.

function staleMate() {
    console.log('Nobody has won!')
    reset()
} // Function that is executed if there is no clear winner.

function reset() {
    let buttons = document.getElementsByClassName('button')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = ''
    }
    for (let i = 0; i < 3; i++) {
        rows[i] = [null, null, null];
    }
    turn = true;
}