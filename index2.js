'use strict';
let turn = true;
let rows = [ 
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let buttons = document.getElementsByClassName('button');
let findButtonPosition = (position) => buttons[(position[0] * 3) + position[1]];
let player = (x) => {
    if (x===true) {
        return 'O'
    } else if (x===false) {
        return 'X'
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

function updateInterface() {
    console.table(rows)
    for (let i = 0; i < 3; i++) {
        for (let a = 0; a < 3; a++) {
            findButtonPosition([i, a]).innerHTML = player(rows[i][a]);
        }
    }
}

function buttonClick(position) {
    if (!findButtonPosition(position).innerHTML) {
        rows[position[0]][position[1]] = turn;
        updateInterface()
        turn = !turn;
    }
}