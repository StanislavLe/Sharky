class SoundManager {
    backgroundAudio;
    bossAudio;
    snoreAudio; 
    isGameOver = false;
    isBossMusicPlaying = false; 


    constructor() {
        this.initBackgroundMusik();
        this.initSnoreSound(); 
    }

    initializeMusicState() {
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute') {
            this.stopAllSounds(); 
        }
    }

    stopAllSounds() {
        this.stopBackgroundMusik();
        this.stopBossMusik();
        this.stopSnoreSound();
    }

    initSnoreSound(path = '../audio/snoring.mp3') {
        this.snoreAudio = new Audio(path);
        this.snoreAudio.volume = 0.25;
        this.snoreAudio.loop = true; 
    }

    snoring() {
        if (!this.snoreAudio.paused) return; 
        this.snoreAudio.play().catch(e => {
            console.warn("Schnarch-Sound konnte nicht abgespielt werden:", e);
        });
    }

    stopSnoreSound() {
        if (this.snoreAudio) {
            this.snoreAudio.pause();
            this.snoreAudio.currentTime = 0; 
        }
    }

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

    isPlaying() {
        return this.backgroundAudio && !this.backgroundAudio.paused && this.backgroundAudio.currentTime > 0;
    }

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

    playSound(path, volume = 1.0) {
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute') return; 

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