class FinalBoss extends MovableObject {
    width = 500;
    height = 500;
    x = 200;
    y = 10;
    isIntroPlayed = false;
    isActive = false;
    introFrame = 0;
    behaviorActive = false;
    isDying = false;
    isAttacking = false;


    BOSS_INTRO = [
        'img/worldBuilding/finalEnemy/Introduce/1.png',
        'img/worldBuilding/finalEnemy/Introduce/2.png',
        'img/worldBuilding/finalEnemy/Introduce/3.png',
        'img/worldBuilding/finalEnemy/Introduce/4.png',
        'img/worldBuilding/finalEnemy/Introduce/5.png',
        'img/worldBuilding/finalEnemy/Introduce/6.png',
        'img/worldBuilding/finalEnemy/Introduce/7.png',
        'img/worldBuilding/finalEnemy/Introduce/8.png',
        'img/worldBuilding/finalEnemy/Introduce/9.png',
        'img/worldBuilding/finalEnemy/Introduce/10.png'
    ]

    BOSS_WALKING = [
        'img/worldBuilding/finalEnemy/floating/1.png',
        'img/worldBuilding/finalEnemy/floating/2.png',
        'img/worldBuilding/finalEnemy/floating/3.png',
        'img/worldBuilding/finalEnemy/floating/4.png',
        'img/worldBuilding/finalEnemy/floating/5.png',
        'img/worldBuilding/finalEnemy/floating/6.png',
        'img/worldBuilding/finalEnemy/floating/7.png',
        'img/worldBuilding/finalEnemy/floating/8.png',
        'img/worldBuilding/finalEnemy/floating/9.png',
        'img/worldBuilding/finalEnemy/floating/10.png',
        'img/worldBuilding/finalEnemy/floating/11.png',
        'img/worldBuilding/finalEnemy/floating/12.png',
        'img/worldBuilding/finalEnemy/floating/13.png',
    ]

    BOSS_HURT = [
        'img/worldBuilding/finalEnemy/hurt/1.png',
        'img/worldBuilding/finalEnemy/hurt/2.png',
        'img/worldBuilding/finalEnemy/hurt/3.png',
        'img/worldBuilding/finalEnemy/hurt/4.png',
    ]

    BOSS_ATTACK = [
        'img/worldBuilding/finalEnemy/attack/1.png',
        'img/worldBuilding/finalEnemy/attack/2.png',
        'img/worldBuilding/finalEnemy/attack/3.png',
        'img/worldBuilding/finalEnemy/attack/4.png',
        'img/worldBuilding/finalEnemy/attack/5.png',
        'img/worldBuilding/finalEnemy/attack/6.png',
    ]

    BOSS_DEAD = [
        'img/worldBuilding/finalEnemy/dead/dead6.png',
        'img/worldBuilding/finalEnemy/dead/dead7.png',
        'img/worldBuilding/finalEnemy/dead/dead8.png',
        'img/worldBuilding/finalEnemy/dead/dead9.png',
        'img/worldBuilding/finalEnemy/dead/dead10.png'
    ]

    /**
     * Erstellt eine neue Instanz des FinalBoss, lädt alle Bilder und setzt die Startposition.
     * @constructor
     */
    constructor() {
        super().loadImage(this.BOSS_INTRO[0]);
        this.loadImages(this.BOSS_INTRO);
        this.loadImages(this.BOSS_WALKING);
        this.loadImages(this.BOSS_HURT);
        this.loadImages(this.BOSS_ATTACK);
        this.loadImages(this.BOSS_DEAD);
        this.x = 1900;

    }

    /**
     * Startet die Intro-Animation des Bosses und aktiviert ihn danach.
     * @function
     */
    startIntro() {
        if (this.isIntroPlayed) return;
        this.isIntroPlayed = true;
        this.currentImage = 0;
        this.prepareIntroAudio();
        this.playBossIntroAnimation();
    }

    /**
     * Beendet die Hintergrundmusik und startet die Bossmusik, falls nicht stumm.
     * @function
     */
    prepareIntroAudio() {
        const isMuted = localStorage.getItem('musicStatus') === 'mute';
        if (!isMuted) {
            window.soundManager.stopBackgroundMusik();
            window.soundManager.isBossMusicPlaying = true;
            window.soundManager.playBossMusik();
        }
    }

    /**
     * Spielt die Intro-Animation des Bosses ab und aktiviert danach Verhalten und Animation.
     * @function
     */
    playBossIntroAnimation() {
        this.introInterval = setInterval(() => {
            this.playAnimation(this.BOSS_INTRO);
            if (this.currentImage >= this.BOSS_INTRO.length) {
                clearInterval(this.introInterval);
                this.isActive = true;
                this.startBossBehavior();
                this.animate();
            }
        }, 150);
    }


    /**
     * Gibt zurück, ob der Boss aktuell kollidierbar ist.
     * @returns {boolean}
     */
    isCollidable() {
        return this.isActive && !this.isDying && !this.isDead();
    }

    /**
     * Startet die Animationsintervalle für den Boss (Bewegung, Tod, etc.).
     * @function
     */
    animate() {
        this.bossAnimateInterval = setInterval(() => {
            if (this.isDead()) {
                this.handleBossDeath();
            } else if (this.isHurt()) {
                this.playAnimation(this.BOSS_HURT);
            } else if (!this.isDying && !this.isAttacking) {
                this.playAnimation(this.BOSS_WALKING);
            }
        }, 150);
    }

    /**
     * Startet den Todesprozess des Bosses, falls nicht bereits geschehen.
     * Initialisiert die Animationsframes und startet das Todes-Interval.
     * @function
     */
    handleBossDeath() {
        if (this.isDying) return;
        this.isDying = true;
        this.currentImage = 0;
        this.deathFrame = 0;
        this.world.soundManager.ouch();
        this.playBossDeathAnimation();
    }

    /**
     * Spielt die Todesanimation des Bosses Bild für Bild ab.
     * Beendet die Animation und startet das "Ascend" nach Abschluss.
     * @function
     */
    playBossDeathAnimation() {
        this.bossDeathInterval = setInterval(() => {
            if (this.deathFrame < this.BOSS_DEAD.length) {
                const path = this.BOSS_DEAD[this.deathFrame];
                this.img = this.imageCache[path];
                this.deathFrame++;
            } else {
                clearInterval(this.bossDeathInterval);
                this.img = this.imageCache[this.BOSS_DEAD[this.BOSS_DEAD.length - 1]];
                this.dieBoss();
                this.startAscend();
            }
        }, 150);
    }


    /**
     * Beendet das Bossverhalten und stoppt die Bossmusik.
     * @function
     */
    dieBoss() {
        this.behaviorActive = false;
        this.world.soundManager.stopBossMusik();
    }

    /**
     * Startet das Verhalten des Bosses: Bewegung, Angriff und Zustandsschleife.
     * @function
     */
    startBossBehavior() {
        this.behaviorActive = true;
        this.bossBehaviorLoop();
    }

    /**
     * Führt die Hauptlogikschleife des Bosses aus.
     * Prüft Tod/Zustand, startet Bewegung und plant Angriff.
     * @function
     */
    bossBehaviorLoop() {
        if (!this.canPerformBehavior()) return;
        this.state = 'idle';

        this.bossMoveInterval = setTimeout(() => {
            if (!this.canPerformBehavior()) return;
            this.state = 'moveLeft';
            this.startBossMovement();
        }, 500);
    }

    /**
     * Startet die Bewegungsphase des Bosses und plant Angriff nach Ablauf.
     * @function
     */
    startBossMovement() {
        const moveInterval = setInterval(() => {
            if (!this.canPerformBehavior()) {
                clearInterval(moveInterval);
                return;
            }
            this.moveLeft();
        }, 60);

        this.bossAttackTimeout = setTimeout(() => {
            clearInterval(moveInterval);
            if (!this.canPerformBehavior()) return;
            this.state = 'attack';
            this.isAttacking = true;
            this.playAnimationOnce(this.BOSS_ATTACK, 100, () => {
                this.isAttacking = false;
                this.checkAttackHit();
                this.bossBehaviorLoop();
            });
        }, 2000);
    }

    /**
     * Prüft, ob der Boss aktiv ist und agieren darf.
     * @returns {boolean} true wenn alle Bedingungen erfüllt sind.
     */
    canPerformBehavior() {
        return this.behaviorActive && !this.isDead() && !this.isDying && !this.world.character.isDead();
    }


    /**
     * Prüft, ob der Angriff des Bosses den Charakter trifft.
     * @function
     */
    checkAttackHit() {
        if (this.isDying || this.isDead()) return;
        const character = this.world.character;
        const withinXRange = character.x + character.width > this.x - this.width * 0.15 &&
            character.x < this.x;
        const sameHeight = character.y < this.y + this.height &&
            character.y + character.height > this.y;
        if (withinXRange && sameHeight && !character.isDead()) {
            character.hit();
        }
    }

    /**
     * Spielt eine Animation einmalig ab und ruft danach eine Callback-Funktion auf.
     * @param {string[]} images - Array mit Bildpfaden der Animation.
     * @param {number} [frameDuration=100] - Dauer pro Frame in Millisekunden.
     * @param {Function} [callback=() => {}] - Callback-Funktion nach Ende der Animation.
     * @function
     */
    playAnimationOnce(images, frameDuration = 100, callback = () => { }) {
        this.currentImage = 0;
        this.runOneTimeAnimation(images, frameDuration, callback);
    }

    /**
     * Führt den Animationsablauf framebasiert aus.
     * @param {string[]} images - Array mit Bildpfaden.
     * @param {number} frameDuration - Dauer pro Frame in Millisekunden.
     * @param {Function} callback - Funktion, die nach der Animation aufgerufen wird.
     * @function
     */
    runOneTimeAnimation(images, frameDuration, callback) {
        let frame = 0;
        const interval = setInterval(() => {
            if (this.shouldCancelAnimation()) {
                clearInterval(interval);
                callback();
                return;
            }

            if (frame >= images.length) {
                clearInterval(interval);
                callback();
            } else {
                this.updateAnimationFrame(images, frame);
                frame++;
            }
        }, frameDuration);
    }

    /**
     * Prüft, ob die Animation abgebrochen werden sollte (z.B. weil Objekt tot ist).
     * @returns {boolean} true wenn Animation nicht fortgesetzt werden soll.
     */
    shouldCancelAnimation() {
        return this.isDead?.();
    }

    /**
     * Aktualisiert das aktuelle Bild der Animation.
     * @param {string[]} images - Array mit Bildpfaden.
     * @param {number} frame - Der aktuelle Frame-Index.
     */
    updateAnimationFrame(images, frame) {
        const path = images[frame];
        this.img = this.imageCache[path];
    }


    // Hitbox-Padding für Boss
    hitboxPadding = {
        top: 200,
        bottom: 30,
        left: 80,
        right: 80
    };

    /**
     * Zeichnet den Debug-Rahmen für den FinalBoss.
     * @param {CanvasRenderingContext2D} ctx
     */
    drawFrameBoss(ctx) {
        const p = this.hitboxPadding;
        const x = this.x + p.left;
        const y = this.y + p.top;
        const width = this.width - (p.left + p.right);
        const height = this.height - (p.top + p.bottom);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0)'; // komplett transparent
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    /**
     * Gibt die Hitbox des FinalBoss zurück, angepasst mit Padding.
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getHitbox() {
        const p = this.hitboxPadding;
        return {
            x: this.x + p.left,
            y: this.y + p.top,
            width: this.width - (p.left + p.right),
            height: this.height - (p.top + p.bottom)
        };
    }

}