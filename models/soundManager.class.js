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
        console.log('[MusicState] Status:', musicStatus, '| Boss aktiv:', this.isBossMusicPlaying);
        console.log('[Watcher Debug] BossAudio läuft:', this.bossAudio && !this.bossAudio.paused);
    
        if (musicStatus === 'mute') {
            this.stopAllSounds();
            console.log('[MusicState] Musikstatus = mute → Sounds gestoppt');
        } else if (musicStatus === 'volume') {
            if (this.isBossMusicPlaying) {
                console.log('[MusicState] Bossmusik aktiv → BG-Musik bleibt gestoppt');
                return;
            }
            this.playBackgroundMusik();
        }
    }
    

    startMusicWatcher(interval = 500) {
        if (this._musicWatcher) clearInterval(this._musicWatcher);
    
        this._musicWatcher = setInterval(() => {
            console.log("[Watcher] Musikstatus wird überwacht...");
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
        console.log('[SoundManager] Alle Sounds wurden gestoppt');
    }

    initSnoreSound(path = '../audio/snoring.mp3') {
        this.snoreAudio = new Audio(path);
        this.snoreAudio.volume = 0.25;
        this.snoreAudio.loop = true; 
    }

    snoring() {
        const musicStatus = localStorage.getItem('musicStatus');
        console.log('[Snoring] Trigger Check:', {
            isMuted: musicStatus === 'mute',
            isEndscreenVisible: this.world?.endscreenManager?.isVisible(),
            isSnoreRunning: this.snoreAudio && !this.snoreAudio.paused,
        });
    
        if (musicStatus === 'mute') return; 
        if (this.world?.endscreenManager?.isVisible()) return; 
        if (!this.snoreAudio.paused) return; 
    
        console.log('[Snoring] ▶️ Schnarchsound startet...');
        this.snoreAudio.play().catch(e => {
            console.warn("Schnarch-Sound konnte nicht abgespielt werden:", e);
        });
    }
    

    stopSnoreSound() {
        if (this.snoreAudio) {
            console.log('[Snoring] ⏹️ Schnarchsound STOPP');
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
        console.log('[BG-Music] Status:', musicStatus);
        console.log('[BG-Music] isBossMusicPlaying:', this.isBossMusicPlaying);
        console.log('[BG-Music] backgroundStarted:', this.backgroundStarted);
        console.log('[BG-Music] Läuft schon:', this.backgroundAudio && !this.backgroundAudio.paused);
    
        // Sicherheitsprüfung
        if (musicStatus === 'mute' || this.isBossMusicPlaying || this.backgroundStarted) {
            console.log('[BG-Music] ❌ Kein Start (mute oder läuft)');
            return;
        }
    
        if (!this.backgroundAudio) this.initBackgroundMusik();
    
        if (this.backgroundAudio.paused) {
            console.log('[BG-Music] ▶️ Starte Hintergrundmusik...');
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
            console.log('[BG-Music] ⏹️ Stop');
        }
        this.backgroundStarted = false;
    }

    initBossMusik(path = '../audio/bossMusik.mp3') {
        this.bossAudio = new Audio(path);
        this.bossAudio.loop = true;
        this.bossAudio.volume = 0.5;
    }

    playBossMusik() {
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'mute') return;

        console.log('[Boss] ⛔ BG-Musik gestoppt');
        this.stopBackgroundMusik();
        if (!this.bossAudio) this.initBossMusik();

        this.isBossMusicPlaying = true;

        this.bossAudio.play().then(() => {
            console.log('[Boss] ✅ Bossmusik gestartet');
        }).catch((e) => {
            console.warn('Bossmusik Fehler:', e);
        });
    }

    stopBossMusik() {
        if (this.bossAudio) {
            console.log('[Boss] ⏹️ Bossmusik gestoppt (stopBossMusik aufgerufen)');
            this.bossAudio.pause();
            this.bossAudio.currentTime = 0;
    
            // 🛠️ Explizit entfernen, um .paused = undefined zu erzeugen
            this.bossAudio = null;
        }
    
        this.isBossMusicPlaying = false;
        console.log('[Boss] Status-Reset: isBossMusicPlaying =', this.isBossMusicPlaying);
    
        const musicStatus = localStorage.getItem('musicStatus');
        if (musicStatus === 'volume') {
            this.playBackgroundMusik(); // 🎵 BG neu starten
            this.startMusicWatcher();
            console.log('[Boss] 🎵 BG-Musik neu gestartet (nach Boss)');
        }
    }
    
    
    
    
    
    
    

    playSound(path, volume = 1.0) {
        if (localStorage.getItem('musicStatus') === 'mute') return;
        const audio = new Audio(path);
        audio.volume = volume;
        audio.play().catch(e => console.warn("Sound konnte nicht abgespielt werden:", path, e));
    }

    collectBubble() { this.playSound('../audio/collectBubble.mp3', 0.5); }
    collectCoin() { this.playSound('../audio/collectCoin.mp3', 0.8); }
    punch() { if (!this.isGameOver) this.playSound('../audio/punch.mp3', 0.8); }
    stompEnemy() { this.playSound('../audio/stompEnemy.mp3', 1.0); }
    bruhRetry() { this.playSound('../audio/bruhRetry.mp3', 1.0); }
    gameLose() { this.isGameOver = true; this.playSound('../audio/gameLose.mp3', 1.0); }
    ouch() { this.playSound('../audio/ouch.mp3', 1.0); }
}
