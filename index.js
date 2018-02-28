var powerSwitch = document.querySelector('.controls__power-switch');
var start = document.querySelector('.controls__start');
var strict = document.querySelector('.controls__strict');
var strictLight = document.querySelector('.controls__strict--light');
var green = document.querySelector('.green');
var red = document.querySelector('.red');
var yellow = document.querySelector('.yellow');
var blue = document.querySelector('.blue');

var power = false;

var playing = false;

var colorOrderArray = [];





function powerToggle() {
    powerSwitch.classList.toggle('active');
    if (!power) {
        power = true;
    } else {
        power = false;
    }
}





function startGame() {

    // if power is not on then start button will be disabled
    if (power === false) {
        return;
    }

    // if already playing then start button will be disabled
    if (playing === false) {
        playing = true;
    } 
    else if (playing === true) {
        return;
    }

    console.log(playing);

    colorOrderArray.push(randomColor());
}






function stricMode() {
    strictLight.classList.toggle('active');
    colorOrderArray.push(randomColor());
    console.log(colorOrderArray);

    // if 
    if (colorOrderArray.length === 2) {
        winner();
        colorOrderArray.length = 0;
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
strict.addEventListener('click', stricMode);