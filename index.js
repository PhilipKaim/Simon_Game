// at any time that you add a color and it does not match rerun and buzz

var powerSwitch = document.querySelector('.controls__power-switch');
var start = document.querySelector('.controls__start');
var strict = document.querySelector('.controls__strict');
var strictLight = document.querySelector('.controls__strict--light');
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

var playing = false;

var colorOrderArray = [];

var playerColorArray = [];

var count = 0;


// playes the current color pattern
function runLoop() {

    let i = 0;

    function currentLoop () {     
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
        }, 1000);
     }
    
    if (count === 32) {
        setTimeout(function (){
            winner();
        }, 300);
    } else {
        currentLoop();
    }
    
    
}

function playersColor() {
    if (this === red && power === true) {
        playerColorArray.push(1);
        red.classList.add('active');
        audio1.load();
        audio1.play();
    }
    else if (this === yellow && power === true) {
        playerColorArray.push(2);
        yellow.classList.add('active');
        audio2.load();
        audio2.play();
    }
    else if (this === blue && power === true) {
        playerColorArray.push(3);
        blue.classList.add('active');
        audio3.load();
        audio3.play();
    }
    else if (this === green && power === true) {
        playerColorArray.push(4);
        green.classList.add('active');
        audio4.load();
        audio4.play();
    }

    // sees if the players color choices are the same as the computers color choices
    if (colorOrderArray.every((el, i) => {
        return colorOrderArray[i] === playerColorArray[i];
    })) {
        // adds score to game
        if (count < 9) {
            count++;
            let scoreString = `0${count}`;
            score.innerHTML = scoreString;
            console.log(count);
        } else {
            count++;
            let scoreString = count.toString();
            score.innerHTML = scoreString;
            console.log(count);
        }
        runLoop();
        playerColorArray.length = 0;
        colorOrderArray.push(randomColor());
        console.log('Match!');
        
    }
    else if (colorOrderArray.every((el, i) => {
        return colorOrderArray[i] === playerColorArray[i];
    }) === false && colorOrderArray.length === playerColorArray.length) {        
        playerColorArray.length = 0;
        console.log('not match');
        red.classList.add('active');
        yellow.classList.add('active');
        blue.classList.add('active');
        green.classList.add('active');

        setTimeout(function (){
            runLoop();
            red.classList.remove('active');
            yellow.classList.remove('active');
            blue.classList.remove('active');
            green.classList.remove('active');
        }, 1000);
    }

    console.log(playerColorArray);
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
        colorOrderArray.length = 0;
        playerColorArray.length = 0;
    } else {
        power = false;
        strictMode();
    }
}

function startGame() {

    if (power === true) {
        colorOrderArray.push(randomColor());
        runLoop();
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

function winner() {
    red.classList.add('active');
    yellow.classList.add('active');
    blue.classList.add('active');
    green.classList.add('active');

    setTimeout(() => {
        red.classList.remove('active');
        yellow.classList.remove('active');
        blue.classList.remove('active');
        green.classList.remove('active');
    }, 500);

    setTimeout(() => {
        red.classList.add('active');
        yellow.classList.add('active');
        blue.classList.add('active');
        green.classList.add('active');
    }, 1000);

    setTimeout(() => {
        red.classList.remove('active');
        yellow.classList.remove('active');
        blue.classList.remove('active');
        green.classList.remove('active');
    }, 1500);

    setTimeout(() => {
        red.classList.add('active');
        yellow.classList.add('active');
        blue.classList.add('active');
        green.classList.add('active');
    }, 2000);

    setTimeout(() => {
        red.classList.remove('active');
        yellow.classList.remove('active');
        blue.classList.remove('active');
        green.classList.remove('active');
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