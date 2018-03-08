var powerSwitch = document.querySelector('.controls__power-switch');
var start = document.querySelector('.controls__start');
var strict = document.querySelector('.controls__strict');
var strictLight = document.querySelector('.controls__strict--light');
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

// get audio to play more than once

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

    currentLoop();
    colorOrderArray.push(randomColor());
}



function powerToggle() {
    powerSwitch.classList.toggle('active');
    if (power === false) {
        power = true;
    } else {
        power = false;
        strictMode();
    }
}





function startGame() {

    // colorOrderArray.push(randomColor());

    if (colorOrderArray.length < 32 && power === true) {
        runLoop();
    }
    else if (colorOrderArray.length === 32 && power === true) {
        winner();
        colorOrderArray.length = 0;
    }

    console.log(colorOrderArray);
    
    
}






function strictMode() {
    if (power === true) {
        strictLight.classList.toggle('active');
        colorOrderArray.push(randomColor());
        console.log(colorOrderArray);
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