'use strict'

const gameButtons = document.querySelectorAll('.game__buttons');
const back = document.querySelectorAll('.back');
const endgame = document.querySelector('.game__complete');
const timespentBlock = document.getElementById('timeSpent');
const motivation = document.getElementById('motivation');

let count = 0;
let clickCounter = 0;
let prev = null;
let prevCopy = null;
let counterEnd = 0;
let timeSpent = 0;
let interval = null;

//code for the game
gameButtons.forEach(() => {
    count++;
});

let array = randomNumber();
back.forEach(element => {
    element.classList.add(`img${chooseValue(array)}`);
});

function repeatTwice(arr) {
    return arr.reduce((acc, curr) => {
        acc.push(curr, curr);
        return acc;
    }, []);
}

function randomNumber(){
    const arr = [];
    for (let i = 0; i < count / 2; i++) {
        arr.push(i + 1);
    }
    const newArr = repeatTwice(arr);
    return newArr;
}

function chooseValue(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomValue = arr[randomIndex];
    arr.splice(randomIndex, 1);
    return randomValue;
}

function start(e){
    e.classList.toggle('flipped');
    setTimeout(() => {
        e.classList.toggle('flipped');
    }, 3000)
}

function checkAndFlipBack(e){
    if (e.classList.contains('flipped')) e.classList.remove('flipped');
}

function findImgNumber(e){
    return e.lastChild.className.slice(8, 9);
}


window.onload = function() {
  // Start the timer when the page is loaded
    interval = setInterval(function() {
        timeSpent += 1;
    }, 1000); // update timeSpent every second
};
window.onbeforeunload = function() {
  // Stop the timer and send the data when the user leaves the page
    clearInterval(interval);
    sendData(timeSpent);
};
function sendData(timeSpent) {
    // Send the timeSpent data to the server using an Ajax request or other method
    console.log(`The user spent ${timeSpent} seconds on this page.`);
}



//clicking on cards code
gameButtons.forEach(element => {
    start(element);
    element.addEventListener('click', (e) => {
        element.classList.add('flipped');
        clickCounter++;
        prevCopy = prev;
        if (clickCounter === 2){
            if(findImgNumber(element) === findImgNumber(prev)){
                clickCounter = 0;
                element.classList.add('no-interaction');
                prev.classList.add('no-interaction');
            } else setTimeout(() => {
                clickCounter = 0;
                prevCopy.classList.remove('flipped');
                element.classList.remove('flipped');
            }, 1000)
        }
        if(element.classList.contains('no-interaction')) counterEnd++;
        prev = element;
        if(counterEnd === 8){
            let opacity = 0;
            const intervalID = setInterval(() => {
                endgame.classList.remove('hidden');
                opacity += 0.1;
                endgame.style.opacity = opacity;
                if (opacity >= 1) {
                clearInterval(intervalID);
            }
            }, 100);

            timespentBlock.textContent += ` ${timeSpent} секунд`;

            switch (true){
                case (timeSpent < 10):
                    motivation.textContent = 'А ты точно не читёр?';
                    break;
                case (timeSpent >= 10 && timeSpent < 20):
                    motivation.textContent = 'А ты хорош';
                    break;
                case (timeSpent >= 20 && timeSpent < 30):
                    motivation.textContent = 'Неплохо. Память у тебя зашибись';
                    break;
                case (timeSpent > 30 && timeSpent < 60):
                    motivation.textContent = 'Можно лучше';
                    break;
                case (timeSpent > 60):
                    motivation.textContent = 'Чета ты дед, тренируй память)';
                    break;
            }
        }
    })
});





