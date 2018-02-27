var powerSwitch = document.querySelector('.controls__power-switch');
var start = document.querySelector('.controls__start');
var strict = document.querySelector('.controls__strict');
var strictLight = document.querySelector('.controls__strict--light');

var power = false;

function powerToggle() {
    powerSwitch.classList.toggle('active');
    if (!power) {
        power = true;
    } else {
        power = false;
    }
}

function startGame() {
    
}

function stricMode() {
    strictLight.classList.toggle('active');
}

powerSwitch.addEventListener('click', powerToggle);
start.addEventListener('click', startGame);
strict.addEventListener('click', stricMode);