function toggleMusic() {  
    const musicStatus = localStorage.getItem('musicStatus');
    console.log("toggleMusic called. Current musicStatus:", musicStatus); // Debug-Ausgabe
    if (musicStatus === 'volume') {
        localStorage.setItem('musicStatus', 'mute');
        console.log("Music muted."); // Debug-Ausgabe
        soundManager.stopBackgroundMusik();
    } else {
        localStorage.setItem('musicStatus', 'volume');
        console.log("Music unmuted."); // Debug-Ausgabe
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
    console.log("startGame called."); // Debug-Ausgabe
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    let musicStatus = localStorage.getItem('musicStatus');
    console.log("Initial musicStatus:", musicStatus); // Debug-Ausgabe
    if (!musicStatus) {
        localStorage.setItem('musicStatus', 'mute'); 
        musicStatus = 'mute';
        console.log("Music status set to mute by default."); // Debug-Ausgabe
    }
    const musicButtonText = document.getElementById('musicButtonText');
    const musicButtonImg = document.getElementById('musicButtonImg');
    if (musicStatus === 'mute') {
        soundManager.stopBackgroundMusik();
        console.log("Background music stopped in startGame."); // Debug-Ausgabe
        musicButtonText.textContent = 'Music OFF';
        musicButtonImg.src = 'icon/mute.png';
    } else {
        soundManager.playBackgroundMusik();
        console.log("Background music started in startGame."); // Debug-Ausgabe
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