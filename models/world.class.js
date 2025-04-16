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
    soundManager = new SoundManager();
    endscreen = new Endscreen(); 
    endscreenManager = new EndscreenManager(); 
    fadeOpacity = 1; 


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endscreen = new Endscreen(); 
        this.endscreenManager = new EndscreenManager(); 
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

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

     
    checkVictory() {
        const boss = this.level.enemies.find(e => e instanceof FinalBoss);
        if (boss && boss.isDead() && !this.endscreenManager.isVisible()) {
            this.endscreenManager.showWin();
            this.freezeGame();
        }
    }

    checkGameOver() {
        if (this.character.isDead() && !this.endscreenManager.isVisible()) {
            this.endscreenManager.showLose(); 
            this.freezeGame();
        }
    }
    
    freezeGame() {
        this.character.speed = 0;
        this.character.isPunching = false;
        this.keyboard.RIGHT = false;
        this.keyboard.LEFT = false;
        this.keyboard.UP = false;
        this.keyboard.SPACE = false;
    }

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


    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                this.stompEnemy(enemy, index);
            }
        });
    }

    checkBossIntro() {
        if (this.character.x > 1530) {
            const boss = this.level.enemies.find(e => e instanceof FinalBoss);
            if (boss) {
                boss.startIntro(); // 🔥 Intro starten (einmalig)
            }
        }
    }

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

    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }


    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });

    }


}
