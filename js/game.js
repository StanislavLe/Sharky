let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

function init() {
    canvas = document.getElementById('canvas');
    soundManager.initializeMusicState(); 
    updateMusicButton(); 
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
}

function resetWorld() {
    world = null; // Entferne die aktuelle Welt
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren
    level1 = createNewLevel(); // Level zurücksetzen
    world = new World(canvas, keyboard); // Neue Welt erstellen
    console.log('Welt wurde zurückgesetzt.');
}

function createNewLevel() {
    // Hier wird das Level neu erstellt, um Coins, Gegner und andere Objekte zurückzusetzen
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