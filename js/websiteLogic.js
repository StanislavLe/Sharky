level = level1;

/**
 * Schaltet den Musikstatus zwischen "volume" und "mute" um und aktualisiert den Button.
 * @function
 */
function toggleMusic() {
    const musicStatus = localStorage.getItem('musicStatus');
    if (musicStatus === 'volume') {
        localStorage.setItem('musicStatus', 'mute');
    } else {
        localStorage.setItem('musicStatus', 'volume');
    }
    updateMusicButton();
}

/**
 * Aktualisiert den Musik-Button je nach aktuellem Musikstatus.
 * @function
 */
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

/**
 * Setzt den Musikstatus in localStorage auf "mute", falls noch nicht vorhanden.
 * @function
 */
function setMusicStatus() {
    if (!localStorage.getItem('musicStatus')) {
        localStorage.setItem('musicStatus', 'mute');
    }
}

/**
 * Startet das Spiel, blendet den Startbildschirm aus und initialisiert die Welt.
 * @function
 */
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    canvas = document.getElementById('canvas'); // canvas erst JETZT holen
    canvas.style.display = 'block';
    init();
    if (isMobileDevice()) {
        bindTouchControls();
    }
}

/**
 * Setzt das Spiel zurück und initialisiert die Welt neu.
 * @function
 */
function resetGame() {
    if (world) {
        world.clearAllIntervals();
        world = null;
    }
    window.soundManager.stopBossMusik();
    window.soundManager.stopBackgroundMusik();
    window.soundManager.stopMusicWatcher();
    window.soundManager.isGameOver = false;
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    level = createNewLevel();
    world = new World(canvas, keyboard, level);
    const restartButton = document.getElementById('restartButton');
    const backHomeButton = document.getElementById('backHomeButton');
    const endScreenButtons = document.getElementById('endScreenButtons');
    if (restartButton && backHomeButton && endScreenButtons) {
        restartButton.style.display = 'none';
        backHomeButton.style.display = 'none';
        restartButton.style.visibility = 'hidden';
        backHomeButton.style.visibility = 'hidden';
        endScreenButtons.style.display = 'none';
        endScreenButtons.style.opacity = '0';
    }
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    window.soundManager.initializeMusicState();
    window.soundManager.startMusicWatcher();
}

/**
 * Kehrt zum Startbildschirm zurück und setzt die Anzeige zurück.
 * @function
 */
function goHome() {
    if (world) {
        world.clearAllIntervals();
        world = null;
    }
    window.soundManager.stopBossMusik();
    window.soundManager.isGameOver = false;
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('backHomeButton').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'none';
    updateMusicButton();
    if (localStorage.getItem('musicStatus') === 'volume') {
        window.soundManager.initializeMusicState();
        window.soundManager.startMusicWatcher();
    }
}

/**
 * Öffnet die Spielanleitung und blendet andere Buttons aus.
 * @function
 */
function openInstruction() {
    const instruction = document.getElementById('howToPlay');
    instruction.style.display = 'flex';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('musicButton').style.display = 'none';
    document.getElementById('instructionButton').style.display = 'none';
    document.getElementById('impressumButton').style.display = 'none';
}

/**
 * Schließt die Spielanleitung und zeigt die Buttons wieder an.
 * @function
 */
function closeInstruction() {
    const instruction = document.getElementById('howToPlay');
    instruction.style.display = 'none';
    document.getElementById('startButton').style.display = 'flex';
    document.getElementById('musicButton').style.display = 'flex';
    document.getElementById('instructionButton').style.display = 'flex';
    document.getElementById('impressumButton').style.display = 'flex';
}

/**
 * Öffnet das Impressum und blendet andere Buttons aus.
 * @function
 */
function openLegalNotice() {
    const legalNotice = document.getElementById('legalNotice');
    legalNotice.style.display = 'flex';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('musicButton').style.display = 'none';
    document.getElementById('instructionButton').style.display = 'none';
    document.getElementById('impressumButton').style.display = 'none';
}

/**
 * Schließt das Impressum und zeigt die Buttons wieder an.
 * @function
 */
function closeLegalNotice() {
    const legalNotice = document.getElementById('legalNotice');
    legalNotice.style.display = 'none';
    document.getElementById('startButton').style.display = 'flex';
    document.getElementById('musicButton').style.display = 'flex';
    document.getElementById('instructionButton').style.display = 'flex';
    document.getElementById('impressumButton').style.display = 'flex';
}

