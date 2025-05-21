let canvas;
let world;
let keyboard = new Keyboard();
window.soundManager = new SoundManager(); 

/**
 * Initialisiert das Spiel, setzt das Canvas, die Welt und die Musiksteuerung.
 * @function
 */
function init() {
    canvas = document.getElementById('canvas');
    updateMusicButton();
    world = new World(canvas, keyboard, createNewLevel());
    window.soundManager.initializeMusicState();
    window.soundManager.startMusicWatcher();
}

/**
 * Erstellt ein neues Level mit Gegnern, Hintergrund, Münzen und Blasen.
 * @returns {Level} Das neu erstellte Level-Objekt.
 * @function
 */
function createNewLevel() {
    return new Level(
        [
            new PufferFish(),
            new PufferFish(),
            new JellyFish(),
            new PufferFish(),
            new JellyFish(),
            new PufferFish(),
            new JellyFish(),
            new PufferFish(),
            new JellyFish(),
            new PufferFish(),
            new FinalBoss(),
        ],

        [
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D.png', -720, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D.png', -720, 80),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D.png', -720, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D.png', -720, 80),

            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D.png', 0, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D.png', 0, 80),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D.png', 0, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D.png', 0, 80),

            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D.png', 720, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D.png', 720, 80),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D.png', 720, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D.png', 720, 80),

            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D.png', 720 * 2, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D.png', 720 * 2, 80),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D.png', 720 * 2, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D.png', 720 * 2, 80),

            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/5. Water/D.png', 720 * 3, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/4.Fondo 2/D.png', 720 * 3, 80),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/3.Fondo 1/D.png', 720 * 3, 0),
            new BackgroundObject('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/2. Floor/D.png', 720 * 3, 80)
        ],

        [
            new Coin(), new Coin(), new Coin(), new Coin(),
            new Coin(), new Coin(), new Coin(), new Coin(),
            new Coin(), new Coin(), new Coin(), new Coin(),
            new Coin(), new Coin(),
        ],

        [
            new Bubble(), new Bubble(), new Bubble(), new Bubble(),
            new Bubble(), new Bubble(), new Bubble(), new Bubble(),
            new Bubble(), new Bubble(), new Bubble(), new Bubble(),
        ]
    );
}

/**
 * Event-Listener für Tastendruck.
 * Setzt die entsprechenden Eigenschaften im Keyboard-Objekt auf true.
 * @param {KeyboardEvent} event - Das Tastaturereignis.
 */
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

/**
 * Event-Listener für das Loslassen einer Taste.
 * Setzt die entsprechenden Eigenschaften im Keyboard-Objekt auf false.
 * @param {KeyboardEvent} event - Das Tastaturereignis.
 */
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
