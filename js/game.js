let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

function init() {
    canvas = document.getElementById('canvas');
    soundManager.initializeMusicState(); 
    updateMusicButton(); 
    world = new World(canvas, keyboard);
}

function createNewLevel() {
    return new Level(
        [
            new BackgroundObject('img/background1.png', 0, 0),
            new BackgroundObject('img/background2.png', 720, 0),
            // ...weitere Hintergrundobjekte...
        ],
        [
            new Coin(200, 300),
            new Coin(400, 500),
            // ...weitere Coins...
        ],
        [
            new PufferFish(600, 350),
            new JellyFish(800, 400),
            // ...weitere Gegner...
        ]
    );
}

function goHome() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('endScreenButtons').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    world = null;
    keyboard = new Keyboard();
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
});