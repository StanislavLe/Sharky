class SoundManager {
    backgroundAudio;
    bossAudio;
    snoreAudio;
    isGameOver = false;
    isBossMusicPlaying = false;
    backgroundStarted = false;


    constructor() {
        this.initBackgroundMusik();
        this.initSnoreSound();
    }


    initializeMusicState() {
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute') {
            this.stopAllSounds();
        } else if (musicStatus === 'volume') {
            if (this.isBossMusicPlaying) {
                return;
            }
            this.playBackgroundMusik();
        }
    }


    startMusicWatcher(interval = 500) {
        if (this._musicWatcher) clearInterval(this._musicWatcher);
        this._musicWatcher = setInterval(() => {
            this.initializeMusicState();
        }, interval);
    }


    stopMusicWatcher() {
        if (this._musicWatcher) {
            clearInterval(this._musicWatcher);
            this._musicWatcher = null;
        }
    }


    stopAllSounds() {
        this.stopBackgroundMusik();
        this.stopBossMusik();
        this.stopSnoreSound();
        this.backgroundStarted = false;
    }


    initSnoreSound(path = '../audio/snoring.mp3') {
        this.snoreAudio = new Audio(path);
        this.snoreAudio.volume = 0.25;
        this.snoreAudio.loop = true;
    }


    snoring() {
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute') return;
        if (this.world?.endscreenManager?.isVisible()) return;
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
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute' || this.isBossMusicPlaying || this.backgroundStarted) {
            return;
        }
        if (!this.backgroundAudio) this.initBackgroundMusik();
        if (this.backgroundAudio.paused) {
            this.backgroundAudio.play().then(() => {
                this.backgroundStarted = true;
            }).catch(e => {
                console.warn('Autoplay-Problem:', e);
            });
        }
    }


    stopBackgroundMusik() {
        if (this.backgroundAudio) {
            this.backgroundAudio.pause();
            this.backgroundAudio.currentTime = 0;
        }
        this.backgroundStarted = false;
    }


    /**
     * Initialisiert die Bossmusik.
     * @param {string} [path='../audio/bossMusik.mp3'] - Pfad zur Bossmusik.
     */
    initBossMusik(path = '../audio/bossMusik.mp3') {
        this.bossAudio = new Audio(path);
        this.bossAudio.loop = true;
        this.bossAudio.volume = 0.5;
    }


    /**
     * Spielt die Bossmusik ab und stoppt die Hintergrundmusik.
     * @function
     */
    playBossMusik() {
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute') return;
        this.stopBackgroundMusik();
        if (!this.bossAudio) this.initBossMusik();
        this.isBossMusicPlaying = true;
        this.bossAudio.play().then(() => {
        }).catch((e) => {
            console.warn('Bossmusik Fehler:', e);
        });
    }


    /**
     * Stoppt die Bossmusik und startet ggf. die Hintergrundmusik neu.
     * @function
     */
    stopBossMusik() {
        if (this.bossAudio) {
            this.bossAudio.pause();
            this.bossAudio.currentTime = 0;
            this.bossAudio = null;
        }
        this.isBossMusicPlaying = false;
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'volume') {
            this.playBackgroundMusik(); // 🎵 BG neu starten
            this.startMusicWatcher();
        }
    }


    /**
     * Spielt einen beliebigen Sound ab, sofern Musik nicht stumm ist.
     * @param {string} path - Pfad zur Audiodatei.
     * @param {number} [volume=1.0] - Lautstärke.
     */
    playSound(path, volume = 1.0) {
        if (localStorage.getItem('musicStatus') === 'mute') return;
        const audio = new Audio(path);
        audio.volume = volume;
        audio.play().catch(e => console.warn("Sound konnte nicht abgespielt werden:", path, e));
    }


    /**
     * Spielt den Sound für das Einsammeln einer Blase ab.
     * @function
     */
    collectBubble() { this.playSound('../audio/collectBubble.mp3', 0.5); }

    /**
     * Spielt den Sound für das Einsammeln einer Münze ab.
     * @function
     */
    collectCoin() { this.playSound('../audio/collectCoin.mp3', 0.8); }

    /**
     * Spielt den Sound für einen Schlag ab (wenn das Spiel nicht vorbei ist).
     * @function
     */
    punch() { if (!this.isGameOver) this.playSound('../audio/punch.mp3', 0.8); }

    /**
     * Spielt den Sound für das Besiegen eines Gegners ab.
     * @function
     */
    stompEnemy() { this.playSound('../audio/stompEnemy.mp3', 1.0); }

    /**
     * Spielt den "Bruh Retry"-Sound ab.
     * @function
     */
    bruhRetry() { this.playSound('../audio/bruhRetry.mp3', 1.0); }

    /**
     * Spielt den Game-Over-Sound ab und setzt isGameOver auf true.
     * @function
     */
    gameLose() { this.isGameOver = true; this.playSound('../audio/gameLose.mp3', 1.0); }

    /**
     * Spielt den "Ouch"-Sound ab.
     * @function
     */
    ouch() { this.playSound('../audio/ouch.mp3', 1.0); }
}