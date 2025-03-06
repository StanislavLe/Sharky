class World {
    character = new Character();
    level = level1;
    lightRight = new LightRight();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        // Hintergrund zeichnen
        this.level.backgroundObjects.forEach(bg => {
            this.ctx.drawImage(bg.img, bg.x, bg.y, bg.width, bg.height);
        });
        // position for fixed objects
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.level.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
        this.ctx.translate(-this.camera_x, 0);
        //draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    //console.log('collision with Character', enemy, this.character.energy);
                    this.statusBar.setPercentage(this.character.energy)
                }
            })
        }, 200);
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
