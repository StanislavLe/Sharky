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

level = level1; 


function resetGame() {
    if (world) {
        world.clearAllIntervals();
    }
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    level1 = this.level1;
    world = new World(canvas, keyboard);  
}


function restartGame() {
    if (world) {
        world.cleanup(); // beendet alle Loops, versteckt Endscreen
    }

    // Neues Level erstellen
    const newLevel = createNewLevel();

    // Canvas & Keyboard resetten
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();

    // Neue Welt mit frischem Level starten
    world = new World(canvas, keyboard, newLevel);

    // DOM-Elemente anpassen
    document.getElementById('endScreenButtons').style.display = 'none';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
}



function goHome() {
    if (world) {
        world.cleanup();
        world = null;
    }

    document.getElementById('endScreenButtons').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';

    // Musik zurücksetzen, falls nötig
    if (localStorage.getItem('musicStatus') === 'volume') {
        soundManager.playBackgroundMusik();
    }
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


function openLegalNotice() {
    const legalNotice = document.getElementById('legalNotice');
    legalNotice.style.display = 'flex';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('musicButton').style.display = 'none';
    document.getElementById('instructionButton').style.display = 'none';
    document.getElementById('impressumButton').style.display = 'none';
}


function closeLegalNotice() {
    const legalNotice = document.getElementById('legalNotice');
    legalNotice.style.display = 'none';
    document.getElementById('startButton').style.display = 'flex';
    document.getElementById('musicButton').style.display = 'flex';
    document.getElementById('instructionButton').style.display = 'flex';
    document.getElementById('impressumButton').style.display = 'flex';
}