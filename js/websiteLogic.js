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
        world = null;
    }

    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    level = createNewLevel();
    world = new World(canvas, keyboard, level);

    const restartButton = document.getElementById('restartButton');
    const backHomeButton = document.getElementById('backHomeButton');
    const endScreenButtons = document.getElementById('endScreenButtons');

    // Buttons vollständig zurücksetzen
    if (restartButton && backHomeButton && endScreenButtons) {
        restartButton.style.display = 'none';
        backHomeButton.style.display = 'none';
        restartButton.style.visibility = 'hidden';
        backHomeButton.style.visibility = 'hidden';

        endScreenButtons.style.display = 'none';
        endScreenButtons.style.opacity = '0'; // Sicherstellen, dass die Buttons unsichtbar sind
    }

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
}



function goHome() {
    
    if (world) {
        world.clearAllIntervals();
        world = null;
    }
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('backHomeButton').style.display = 'none';
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

function fullScreenActive(canvas) {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen(); // Safari
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen(); // IE
    }
    console.log('[Fullscreen] 🔛 Aktiviert');
}

function fullScreenInactive() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Safari
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE
    }
    console.log('[Fullscreen] 🔚 Deaktiviert');
}

function setupFullScreenToggle() {
    const toggleBtn = document.getElementById('fullscreenToggle');
    const canvas = document.querySelector('canvas');

    if (!toggleBtn || !canvas) {
        console.warn('[Fullscreen] ❌ canvas oder Icon fehlt');
        return;
    }

    toggleBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            fullScreenActive(canvas);
        } else {
            fullScreenInactive();
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setupFullScreenToggle();
});
