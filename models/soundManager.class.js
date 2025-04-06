class SoundManager {
    backgroundAudio;
    bossAudio;
    snoreAudio; // Schnarch-Sound als Eigenschaft definieren
    isGameOver = false;

    constructor() {
        this.initBackgroundMusik();
        this.initSnoreSound(); // Schnarch-Sound initialisieren
    }

    // === Schnarch-Sound ===
    initSnoreSound(path = '../audio/snoring.mp3') {
        this.snoreAudio = new Audio(path);
        this.snoreAudio.volume = 0.25;
        this.snoreAudio.loop = true; // Schnarch-Sound in einer Schleife abspielen
    }

    snoring() {
        if (!this.snoreAudio.paused) return; // Verhindere mehrfaches Starten
        this.snoreAudio.play().catch(e => {
            console.warn("Schnarch-Sound konnte nicht abgespielt werden:", e);
        });
    }

    stopSnoreSound() {
        console.log('stopSnoreSound aufgerufen'); // Debugging
        if (this.snoreAudio) {
            this.snoreAudio.pause();
            this.snoreAudio.currentTime = 0; // Zurücksetzen auf den Anfang
        }
    }

    // === Hintergrund-Musik ===
    initBackgroundMusik(path = '../audio/backgroundMusik.mp3') {
        this.backgroundAudio = new Audio(path);
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = 0.5;
    }

    playBackgroundMusik() {
        if (!this.backgroundAudio) this.initBackgroundMusik();
        this.backgroundAudio.play().catch(e => {
            console.warn("Autoplay blockiert – User muss zuerst interagieren", e);
        });
    }

    stopBackgroundMusik() {
        if (this.backgroundAudio) {
            this.backgroundAudio.pause();
            this.backgroundAudio.currentTime = 0;
        }
    }

    toggleBackgroundMusik() {
        if (this.backgroundAudio?.paused) {
            this.backgroundAudio.play();
        } else {
            this.backgroundAudio.pause();
        }
    }

    // === Boss-Musik ===
    initBossMusik(path = '../audio/bossMusik.mp3') {
        this.bossAudio = new Audio(path);
        this.bossAudio.loop = true;
        this.bossAudio.volume = 0.5;
    }

    playBossMusik() {
        if (this.backgroundAudio) this.stopBackgroundMusik();
        if (!this.bossAudio) this.initBossMusik();

        this.bossAudio.play().catch(e => {
            console.warn("Bossmusik konnte nicht abgespielt werden:", e);
        });
    }

    stopBossMusik() {
        if (this.bossAudio) {
            this.bossAudio.pause();
            this.bossAudio.currentTime = 0;
        }
    }

    // === Soundeffekte ===
    playSound(path, volume = 1.0) {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.play().catch(e => {
            console.warn("Sound konnte nicht abgespielt werden:", path, e);
        });
    }

    collectBubble() {
        this.playSound('../audio/collectBubble.mp3', 0.5);
    }

    collectCoin() {
        this.playSound('../audio/collectCoin.mp3', 0.8);
    }

    punch() {
        if (this.isGameOver) return; 
        this.playSound('../audio/punch.mp3', 0.8);
    }

    stompEnemy() {
        this.playSound('../audio/stompEnemy.mp3', 1.0);
    }

    bruhRetry() {
        this.playSound('../audio/bruhRetry.mp3', 1.0);
    }

    gameLose() {
        this.isGameOver = true;
        this.playSound('../audio/gameLose.mp3', 1.0);
    }

    ouch() {
        this.playSound('../audio/ouch.mp3', 1.0);
    }
}