'use strict';
let button = (x) => { return document.getElementById(x)}
let turn = true;
let gameStatus = {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null]
}

function changeValue(x, y) {
    if (!button(x).innerHTML) {
        if (turn) {
            button(x).innerHTML = 'O';
            turn = false;
        } else {
            button(x).innerHTML = 'X';
            turn = true;
        }
    }
}