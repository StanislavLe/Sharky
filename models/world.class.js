class World {
    character = new Character();
    level = level1;
    lightRight = new LightRight();
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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundManager.playBackgroundMusik(); 
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        // Hintergrund zeichnen
        this.level.backgroundObjects.forEach(bg => {
            this.ctx.drawImage(bg.img, bg.x, bg.y, bg.width, bg.height);
        });
        // 🔥 Füge `LightRight` hinzu
        this.addToMap(this.lightRight);
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
        // Position für feste Objekte
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bossStatusBar);
        this.addToMap(this.scoreBar);
        this.addToMap(this.ammoBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.collectCoin();
            this.collectAmmo();
            this.checkBossIntro();
        }, 200);
    }

    stompEnemy(enemy) {
        if (this.character.isAboveEnemy(enemy)) {
            this.character.speedY = 25;

            if (enemy instanceof FinalBoss) {
                enemy.hit(); // 🔥 Treffer auf FinalBoss → Energie verringern + Statusbar aktualisieren
                this.soundManager.punch();

            } else {
                enemy.die(); // 💀 Andere Gegner sofort töten
                this.soundManager.stompEnemy();

            }

        } else {
            this.character.hit(); // 🔴 Sharkie wird getroffen
        }
    }


    checkThrowObject() {
        if (this.keyboard.SPACE && this.character.ammo > 0) {
            let bubble = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bubble.world = this; // ✅ Referenz zur Welt setzen
            this.throwableObjects.push(bubble);
            this.character.ammo -= 1;
            this.ammoBar.setPercentage(this.character.ammo * 10);
        }
    }




    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
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
            // Wende das visuelle Offset nur für den Charakter an
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
