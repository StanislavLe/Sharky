class World {
    character = new Character();
    level = level1;
    lightRight = new LightRight();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
    
        // Position für feste Objekte
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
    
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
    
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
        }, 200);
    }


    checkThrowObject() {
            if (this.keyboard.SPACE) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
            }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                //console.log('collision with Character', enemy, this.character.energy);
                this.statusBar.setPercentage(this.character.energy)
            }
        })
    }

    addToMap(mo) {
        mo.drawFrame(this.ctx);
        this.ctx.save();
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
    }
}
