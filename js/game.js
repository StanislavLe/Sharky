let canvas;
let world;
let keyboard = new Keyboard();
window.soundManager = new SoundManager(); 


function init() {
    canvas = document.getElementById('canvas');
    updateMusicButton();
    world = new World(canvas, keyboard, createNewLevel());
    window.soundManager.initializeMusicState();
    window.soundManager.startMusicWatcher();
}


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

document.addEventListener('DOMContentLoaded', () => {

document.getElementById('btnLeft').addEventListener('touchstart', () => keyboard.LEFT = true);
document.getElementById('btnLeft').addEventListener('touchend', () => keyboard.LEFT = false);

document.getElementById('btnRight').addEventListener('touchstart', () => keyboard.RIGHT = true);
document.getElementById('btnRight').addEventListener('touchend', () => keyboard.RIGHT = false);

document.getElementById('btnJump').addEventListener('touchstart', () => keyboard.UP = true);
document.getElementById('btnJump').addEventListener('touchend', () => keyboard.UP = false);

document.getElementById('btnAttack').addEventListener('touchstart', () => keyboard.SPACE = true);
document.getElementById('btnAttack').addEventListener('touchend', () => keyboard.SPACE = false);

document.getElementById('btnSlap').addEventListener('touchstart', () => keyboard.D = true);
document.getElementById('btnSlap').addEventListener('touchend', () => keyboard.D = false);
});


function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

document.addEventListener('DOMContentLoaded', () => {
    if (isMobileDevice()) {
        document.getElementById('touchControls').style.display = 'flex';
    }
});


function bindTouchControls() {
    const keys = [
        { id: 'btnLeft', prop: 'LEFT' },
        { id: 'btnRight', prop: 'RIGHT' },
        { id: 'btnJump', prop: 'UP' },
        { id: 'btnAttack', prop: 'SPACE' },
        { id: 'btnSlap', prop: 'D' }
    ];

    keys.forEach(key => {
        const button = document.getElementById(key.id);
        if (button) {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard[key.prop] = true;
            }, { passive: false });

            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard[key.prop] = false;
            }, { passive: false });
        } else {
            console.warn(`Touch Button with id '${key.id}' not found.`);
        }
    });
}

