'use strict';

var gSize = 4;
var gNextNumber = 1;
var gInterval = null;
var gTimePassedInSeconds = 0;
function initGame() {
    renderBoard(gSize);
}

function renderBoard(size) {
    gSize = size;
    var nums = numsArray(size);
    var strHTML = '';
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {
            var currNum = nums.pop()
            strHTML += `<td
                data-i="${i}" data-j="${j}"
                onclick="cellClicked(this, ${currNum})">${currNum}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, num) {
    var elNextNum = document.querySelector('.next');
    if (num === 1) timer();
    if (num === (gSize ** 2) && gNextNumber === (num)) {
        var restart = confirm('Victory!');
        clearInterval(gInterval);
        if (restart) resetGame();
    }
    if (num === gNextNumber) {
        elCell.classList.add('clicked');
        gNextNumber++;
        elNextNum.innerHTML = `Next number :${(gNextNumber)}`
    }
    console.log('gNextNumber', gNextNumber);
}

function timer() {
    gInterval = setInterval(countTime, 1000);

}

function countTime() {
    var display = ' '
    gTimePassedInSeconds++
    if (gTimePassedInSeconds > 60) {
        const seconds = ((gTimePassedInSeconds % 60) < 10) ? '0' + gTimePassedInSeconds % 60 : gTimePassedInSeconds % 60
        display = parseInt(gTimePassedInSeconds / 60) + ' : ' + seconds
    } else display = gTimePassedInSeconds
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = `Game time : ${display}`
}

function resetGame() {
    gSize = 4;
    gNextNumber = 1;
    gInterval = null;
    gTimePassedInSeconds = 0;
    renderBoard(4);
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = `Game time :`
    var elNextNum = document.querySelector('.next');
    elNextNum.innerHTML = `Next number :`
}

function numsArray(count) {
    var arraySize = count ** 2;
    var array = [];
    for (var i = 1; i <= arraySize; i++) {
        array.push(i);
    }
    return shuffle(array);
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}