let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character)
}


function toggleMusic() {  
    const musicButtonText = document.getElementById('musicButtonText');
    const musicButtonImg = document.getElementById('musicButtonImg');
    if (soundManager.isPlaying()) {
        soundManager.pauseBackgroundMusik();
        musicButtonText.textContent = 'Music OFF';
        musicButtonImg.src = 'icon/mute.png';
    } else {
        soundManager.initBackgroundMusik();
        soundManager.playBackgroundMusik();
        musicButtonText.textContent = 'Music ON';
        musicButtonImg.src = 'icon/play.png';
    }
}


function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    init();
}

addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

    console.log(event);
});

addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }

    console.log(event);
});