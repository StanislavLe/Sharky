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

function toggleMusic() {  
    const musicStatus = localStorage.getItem('musicStatus');
    if (musicStatus === 'volume') {
        localStorage.setItem('musicStatus', 'mute');
        soundManager.stopBackgroundMusik();
    } else {
        localStorage.setItem('musicStatus', 'volume');
        soundManager.playBackgroundMusik();
    }
    updateMusicButton(); 
}

function updateMusicButton() {
    const musicStatus = localStorage.getItem('musicStatus');
    const musicButtonText = document.getElementById('musicButtonText');
    const musicButtonImg = document.getElementById('musicButtonImg');

    if (musicStatus === 'mute') {
        musicButtonText.textContent = 'Music OFF';
        musicButtonImg.src = 'icon/mute.png';
    } else if (musicStatus === 'volume') {
        musicButtonText.textContent = 'Music ON';
        musicButtonImg.src = 'icon/volume.png';
    } 
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    let musicStatus = localStorage.getItem('musicStatus');
    if (!musicStatus) {
        localStorage.setItem('musicStatus', 'mute'); 
        musicStatus = 'mute';
    }
    const musicButtonText = document.getElementById('musicButtonText');
    const musicButtonImg = document.getElementById('musicButtonImg');
    if (musicStatus === 'mute') {
        soundManager.stopBackgroundMusik();
        musicButtonText.textContent = 'Music OFF';
        musicButtonImg.src = 'icon/mute.png';
    } else {
        soundManager.playBackgroundMusik();
        musicButtonText.textContent = 'Music ON';
        musicButtonImg.src = 'icon/volume.png';
    }
    init();
}

function openInstruction() {
    const instruction = document.getElementById('howToPlay');
    instruction.style.display = 'flex';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('musicButton').style.display = 'none';
    document.getElementById('instructionButton').style.display = 'none';
    document.getElementById('impressumButton').style.display = 'none';
}

function closeInstruction() {
    const instruction = document.getElementById('howToPlay');
    instruction.style.display = 'none';
    document.getElementById('startButton').style.display = 'flex';
    document.getElementById('musicButton').style.display = 'flex';
    document.getElementById('instructionButton').style.display = 'flex';
    document.getElementById('impressumButton').style.display = 'flex';
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