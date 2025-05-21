class World {
    character = new Character();
    level = level1; 
    lightRight = new LightRight();
    lightLeft = new LightLeft();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bossStatusBar = new BossStatusBar();
    scoreBar = new ScoreBar();
    ammoBar = new AmmoBar();
    throwableObjects = [];
    CollectableObject = new CollectableObject();
    soundManager = window.soundManager; 
    endscreen = new Endscreen(); 
    endscreenManager = new EndscreenManager(); 
    fadeOpacity = 1; 
    victoryProcessed = false;


    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level; 
        this.endscreen = new Endscreen(); 
        this.endscreenManager = new EndscreenManager(); 
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }


    /**
     * Zeichnet alle Objekte auf das Canvas und behandelt die Kameraposition.
     * @function
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.endscreenManager.isVisible()) {
            this.ctx.save();
            this.ctx.translate(this.camera_x, 0);
            this.level.backgroundObjects.forEach(bg => {
                this.ctx.drawImage(bg.img, bg.x, bg.y, bg.width, bg.height);
            });
            this.addToMap(this.lightRight);
            this.addToMap(this.lightLeft);
            this.level.coins.forEach(coin => {
                this.addToMap(coin);
            });
            this.level.bubbles.forEach(bubble => {
                this.addToMap(bubble);
            });
            this.throwableObjects.forEach(bg => {
                this.ctx.drawImage(bg.img, bg.x, bg.y, bg.width, bg.height);
            });
            this.addToMap(this.character);
            this.level.enemies.forEach(enemy => {
                this.addToMap(enemy);
            });
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            const boss = this.level.enemies.find(e => e instanceof FinalBoss);
            if (boss && boss.isActive) { 
                this.addToMap(this.bossStatusBar);
            }
            this.addToMap(this.scoreBar);
            this.addToMap(this.ammoBar);
            this.ctx.translate(this.camera_x, 0);
            this.ctx.translate(-this.camera_x, 0);
            this.ctx.restore();
        }
        this.endscreenManager.draw(this.ctx);
        requestAnimationFrame(() => this.draw());
    }


    /**
     * Startet die Hauptspiel-Logikschleife (z.B. Kollisionsprüfung, Sieg/Niederlage).
     * @function
     */
    run() {
        setInterval(() => {
            if (!this.endscreenManager.isVisible()) { 
                this.checkCollisions();
                this.checkThrowObject();
                this.collectCoin();
                this.collectAmmo();
                this.checkBossIntro();
                this.checkGameOver();   
                this.checkVictory();    
            }
        }, 200);
    }

     
    /**
     * Prüft, ob der Spieler gewonnen hat und zeigt ggf. den Endscreen.
     * @function
     */
    checkVictory() {
        const boss = this.level.enemies.find(e => e instanceof FinalBoss);
        if (boss && boss.isDead() && !this.endscreenManager.isVisible() && !this.victoryProcessed) {
            this.victoryProcessed = true; 
            this.endscreenManager.showWin();
            this.freezeGame();
        }
    }


    /**
     * Prüft, ob das Spiel verloren wurde und zeigt ggf. den Endscreen.
     * @function
     */
    checkGameOver() {
        if (
            this.character.isDead() &&
            !this.endscreenManager.isVisible() &&
            !this.endscreenManager.isPending
        ) {
            this.soundManager.gameLose(); 
            this.endscreenManager.showLose(); 
            this.freezeGame();
        }
    }
    

    /**
     * Friert das Spiel ein (z.B. nach Sieg oder Niederlage).
     * @function
     */
    freezeGame() {
        this.character.speed = 0;
        this.character.isPunching = false;
        this.keyboard.RIGHT = false;
        this.keyboard.LEFT = false;
        this.keyboard.UP = false;
        this.keyboard.SPACE = false;
        this.keyboard.D = false; 
    }


    /**
     * Behandelt das Besiegen eines Gegners durch Draufspringen.
     * @param {MovableObject} enemy - Das gegnerische Objekt.
     */
    stompEnemy(enemy) {
        if (this.character.isAboveEnemy(enemy)) {
            if (!(enemy instanceof FinalBoss)) {
                this.character.speedY = 25; 
                enemy.die(); 
                this.soundManager.stompEnemy();
            } else {
                this.character.hit(); 
                this.soundManager.punch();
            }
        } else {
            this.character.hit();
        }
    }


    /**
     * Prüft, ob ein Wurfobjekt erzeugt werden soll.
     * @function
     */
    checkThrowObject() {
        if (this.keyboard.SPACE && this.character.ammo > 0) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bubble.world = this;
            this.throwableObjects.push(bubble);
            this.character.ammo -= 1;
            this.ammoBar.setPercentage(this.character.ammo * 10);
            this.character.idleTimer = 0;
            this.character.hasSnored = false;
            this.soundManager.stopSnoreSound(); 
        }
    }


    /**
     * Prüft Kollisionen zwischen Charakter und Gegnern.
     * @function
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                this.stompEnemy(enemy, index);
            }
        });
    }


    /**
     * Prüft, ob der Boss-Intro gestartet werden soll.
     * @function
     */
    checkBossIntro() {
        if (this.character.x > 1530) {
            const boss = this.level.enemies.find(e => e instanceof FinalBoss);
            if (boss && !boss.isIntroPlayed) { 
                
                boss.startIntro();
            }
        }
    }


    /**
     * Prüft und behandelt das Einsammeln von Münzen.
     * @function
     */
    collectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.increaseScore();
                this.level.coins.splice(index, 1);
                this.soundManager.collectCoin();
                this.scoreBar.setPercentage(this.character.score * 10);
            }
        });
    }


    /**
     * Prüft und behandelt das Einsammeln von Munition (Bubbles).
     * @function
     */
    collectAmmo() {
        this.level.bubbles.forEach((bubble, index) => {
            if (this.character.isColliding(bubble)) {
                this.character.increaseAmmo();
                this.level.bubbles.splice(index, 1);
                this.soundManager.collectBubble();
                this.ammoBar.setPercentage(this.character.ammo * 10);
            }
        });
    }


    /**
     * Fügt ein Objekt zur Zeichenfläche hinzu (inkl. Spiegelung).
     * @param {DrawableObject} mo - Das darzustellende Objekt.
     */
    addToMap(mo) {
        this.ctx.save();
        if (mo === this.character && mo.visualOffsetX) {
            this.ctx.translate(mo.visualOffsetX, 0);
        }
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImage(mo);
        } else {
            mo.draw(this.ctx);
        }
        this.ctx.restore();
    }


    /**
     * Spiegelt ein Bild horizontal auf dem Canvas.
     * @param {DrawableObject} mo - Das darzustellende Objekt.
     */
    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }


    /**
     * Setzt die Referenz auf die Welt für Charakter und Gegner.
     * @function
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }


    /**
     * Stoppt alle laufenden Intervalle und Animationen im Spiel.
     * @function
     */
    clearAllIntervals() {
        if (this.logicInterval) clearInterval(this.logicInterval);
        if (this.drawLoopFrameId) cancelAnimationFrame(this.drawLoopFrameId);
    
        if (this.character?.moveInterval) clearInterval(this.character.moveInterval);
        if (this.character?.animationInterval) clearInterval(this.character.animationInterval);
        if (this.character?.gravityInterval) clearInterval(this.character.gravityInterval);
    
        const boss = this.level.enemies.find(e => e instanceof FinalBoss);
        if (boss) {
            if (boss.bossAnimateInterval) clearInterval(boss.bossAnimateInterval);
            if (boss.introInterval) clearInterval(boss.introInterval);
            if (boss.bossAttackTimeout) clearTimeout(boss.bossAttackTimeout);
            if (boss.bossMoveInterval) clearInterval(boss.bossMoveInterval);
        }
    }
    

    /**
     * Bereinigt die Welt und setzt alle Referenzen zurück.
     * @function
     */
    cleanup() {
    this.clearAllIntervals();
    this.character = null;
    this.level = null;
    this.keyboard = null;
    const buttons = document.getElementById('endScreenButtons');
    if (buttons) {
        buttons.style.display = 'none';
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
}