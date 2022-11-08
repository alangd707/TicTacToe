'use strict';
let turn = true;
let xWins = 0;
let oWins = 0;
let rows = [ 
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let buttons = document.getElementsByClassName('button');
let findButtonPosition = (position) => buttons[(position[0] * 3) + position[1]];
let player = (x) => {
    if (x === true) {
        return 'O';
    } else if (x === false) {
        return 'X';
    } else {
        return null;
    }
}
function reset() {
    for (let i = 0; i < 3; i++) {
        rows[i] = [null, null, null];
    }
    updateInterface()
    turn = true;
}
function checkGameState() {
    for (let i = 0; i < 3; i++) {
        let column = [rows[0][i], rows[1][i], rows[2][i]];
        let diagonalOne = [rows[0][0], rows[1][1], rows[2][2]];
        let diagonalTwo = [rows[2][0], rows[1][1], rows[0][2]];
        let checkIfTrue = (x) => x.every((y) => y === turn);
        if (checkIfTrue(rows[i])) {
            changeColor('row', i)
        } else if (checkIfTrue(column)) {
            changeColor('column', i)
        } else if (checkIfTrue(diagonalOne)) {
            changeColor('diagonalOne', i)
        } else if (checkIfTrue(diagonalTwo)) {
            changeColor('diagonalTwo', i)
        } else if (rows.forEach(element => element.includes(null))) {
            reset();
            alert('Nobody has won!')
        }
        function changeColor(form, i) {
            for (let a = 0; a < 3; a++) {
                if (form === 'row') {
                    findButtonPosition([i, a]).style.backgroundColor = 'green'
                } else if (form === 'column') {
                    findButtonPosition([a, i]).style.backgroundColor = 'green'
                } else if (form === 'diagonalOne') {
                    findButtonPosition([0,0]).style.backgroundColor = 'green'
                    findButtonPosition([1,1]).style.backgroundColor = 'green'
                    findButtonPosition([2,2]).style.backgroundColor = 'green'
                } else if (form === 'diagonalTwo') {
                    findButtonPosition([2,0]).style.backgroundColor = 'green'
                    findButtonPosition([1,1]).style.backgroundColor = 'green'
                    findButtonPosition([0,2]).style.backgroundColor = 'green'
                }
            }
            reset();
            alert(player(turn) + ' has won!')
        }
        function stalemate() {}
    }
}
function updateInterface() {
    for (let i = 0; i < 3; i++) {
        for (let a = 0; a < 3; a++) {
            findButtonPosition([i, a]).innerHTML = player(rows[i][a]);
        }
    }
}
function buttonClick(position) {
    if (!findButtonPosition(position).innerHTML) {
        rows[position[0]][position[1]] = turn;
        checkGameState();
        updateInterface();
        turn = !turn;
    }
}