var powerSwitch = document.querySelector('.controls__power-switch');
var start = document.querySelector('.controls__start');
var strict = document.querySelector('.controls__strict');
var strictLight = document.querySelector('.controls__strict--light');
var scoreTextChange = document.querySelector('.controls__count');
var score = document.querySelector('.controls__count--value');
var green = document.querySelector('.green');
var red = document.querySelector('.red');
var yellow = document.querySelector('.yellow');
var blue = document.querySelector('.blue');
var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


var power = false;

// will prevent multiple games from starting at once if equal to true
var playing = false;

var colorOrderArray = [];

var playerColorArray = [];

var count = 0;

var computer = false;


// playes the current color pattern
function runLoop() {
    let i = 0;

    function currentLoop () {
        // prevents player from placer activation when computer pattern is in progress
        computer = true;

        setTimeout(function () {
            if (colorOrderArray[i] === 1) {
                red.classList.add('active');
                audio1.load();
                audio1.play();
                setTimeout(function (){
                    red.classList.remove('active');
                }, 600);
            }
            else if (colorOrderArray[i] === 2) {
                yellow.classList.add('active');
                audio2.load();
                audio2.play();
                setTimeout(function (){
                    yellow.classList.remove('active');
                }, 600);
            }
            else if (colorOrderArray[i] === 3) {
                blue.classList.add('active');
                audio3.load();
                audio3.play();
                setTimeout(function (){
                    blue.classList.remove('active');
                }, 600);
            }
            else if (colorOrderArray[i] === 4) {
                green.classList.add('active');
                audio4.load();
                audio4.play();
                setTimeout(function (){
                    green.classList.remove('active');
                }, 600);
            }
            
           i++;             
           if (i < colorOrderArray.length) {            
              currentLoop();
           }
           // Allows for color placer activation when computers pattern is over
           else if (i === colorOrderArray.length) {
               setTimeout(() => {
                computer = false;
               }, 800);
           }                  
        }, 1000);
     }
    
    if (count === 32) {
        setTimeout(function (){
            winner();
            reset();
            alert('You Win!!!');
        }, 300);
    } else {
        currentLoop();
    }

    // prevents color activation before computers first pattern
    if (playerColorArray.length === 0) {
        computer = true;
    }
}

function reset() {
    colorOrderArray.length = 0;
    playerColorArray.length = 0;
    count = 0;
    score.innerHTML = '- -';
}

function wrongBuzz() {
    audio1.load();
    audio1.play();
    audio2.load();
    audio2.play();
    audio3.load();
    audio3.play();
    audio4.load();
    audio4.play();
}

// if player makes a wrong move at any point, game will rerun or reset
function sliced() {
    let sliced = colorOrderArray.slice(0, playerColorArray.length);

    if (sliced.every((el, i) => {
        return sliced[i] === playerColorArray[i];
    }) === false) {
        
        if (strictLight.classList.contains('active')) {
            reset();
            addColors();
            wrongBuzz();
    
            setTimeout(function (){
                colorOrderArray.push(randomColor());
                runLoop();
                removeColors();
            }, 1000);

        } else {
            
            playerColorArray.length = 0;
            addColors();
            wrongBuzz();
    
            setTimeout(function (){
                runLoop();
                removeColors();
            }, 1000);
        }
    }
}

function playersColor() {
    if (this === red && power === true && computer === false) {
        playerColorArray.push(1);
        sliced();
        red.classList.add('active');
        audio1.load();
        audio1.play();
    }
    else if (this === yellow && power === true && computer === false) {
        playerColorArray.push(2);
        sliced();
        yellow.classList.add('active');
        audio2.load();
        audio2.play();
    }
    else if (this === blue && power === true && computer === false) {
        playerColorArray.push(3);
        sliced();
        blue.classList.add('active');
        audio3.load();
        audio3.play();
    }
    else if (this === green && power === true && computer === false) {
        playerColorArray.push(4);
        sliced();
        green.classList.add('active');
        audio4.load();
        audio4.play();
    }

    // sees if the players color choices are the same as the computers color choices
    if (colorOrderArray.every((el, i) => {
        return colorOrderArray[i] === playerColorArray[i];
    }) && power === true) {
        // adds score to game
        if (count < 9) {
            count++;
            let scoreString = `0${count}`;
            score.innerHTML = scoreString;
        } else if (count > 9) {
            count++;
            let scoreString = count.toString();
            score.innerHTML = scoreString;
        }
        runLoop();
        playerColorArray.length = 0;
        colorOrderArray.push(randomColor());
    }
}

function playersColorRemove() {
    if (this === red) {
        red.classList.remove('active');
    }
    else if (this === yellow) {
        yellow.classList.remove('active');
    }
    else if (this === blue) {
        blue.classList.remove('active');
    }
    else if (this === green) {
        green.classList.remove('active');
    }
}

function powerToggle() {
    powerSwitch.classList.toggle('active');
    if (power === false) {
        power = true;
        scoreTextChange.classList.add('on');
    } else {
        power = false;
        strictMode();
        reset();
        playing = false;
        scoreTextChange.classList.remove('on');
    }
}

function startGame() {
    
    if (power === true && playing === false) {
        colorOrderArray.push(randomColor());
        runLoop();
        playing = true;
    }

}

function strictMode() {
    if (power === true) {
        strictLight.classList.toggle('active');
    } else {
        strictLight.classList.remove('active');
    }
}

function randomColor() {
    var randomColor = Math.floor(Math.random() * 4) + 1;
    return randomColor;
}

function addColors() {
    red.classList.add('active');
    yellow.classList.add('active');
    blue.classList.add('active');
    green.classList.add('active');
}

function removeColors() {
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
}

function winner() {
    playing = false;
    addColors();

    setTimeout(() => {
        removeColors();
    }, 500);

    setTimeout(() => {
        addColors();
    }, 1000);

    setTimeout(() => {
        removeColors();
    }, 1500);

    setTimeout(() => {
        addColors();
    }, 2000);

    setTimeout(() => {
        removeColors();
    }, 2500);
}

powerSwitch.addEventListener('click', powerToggle);
start.addEventListener('click', startGame);
strict.addEventListener('click', strictMode);
green.addEventListener('mousedown', playersColor);
green.addEventListener('mouseup', playersColorRemove);
red.addEventListener('mousedown', playersColor);
red.addEventListener('mouseup', playersColorRemove);
yellow.addEventListener('mousedown', playersColor);
yellow.addEventListener('mouseup', playersColorRemove);
blue.addEventListener('mousedown', playersColor);
blue.addEventListener('mouseup', playersColorRemove);