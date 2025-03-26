class SoundManager {
    backgroundAudio;

    constructor() {
        this.initBackgroundMusik();
    }

    initBackgroundMusik(path = '../audio/backgroundMusik.mp3') {
        this.backgroundAudio = new Audio(path);
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = 0.5;
    }

    playBackgroundMusik() {
        this.backgroundAudio.play().catch(e => {
            console.warn("Autoplay blockiert – User muss zuerst interagieren", e);
        });
    }

    stopBackgroundMusik() {
        this.backgroundAudio.pause();
        this.backgroundAudio.currentTime = 0;
    }

    toggleBackgroundMusik() {
        if (this.backgroundAudio.paused) {
            this.backgroundAudio.play();
        } else {
            this.backgroundAudio.pause();
        }
    }

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
        this.playSound('../audio/punch.mp3', 0.8);
    }

    stompEnemy() {
        this.playSound('../audio/stompEnemy.mp3', 1.0);
    }
}
