class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new FinalBoss(),
    ];
    lightRight = new LightRight();
    floor = new Floor();
    mountain1 = new Mountain1();
    mountain2 = new Mountain2();
    water = new Water();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.ctx.drawImage(this.water.img, this.water.x, this.water.y, this.water.width, this.water.height);
        this.ctx.drawImage(this.mountain1.img, this.mountain1.x, this.mountain1.y, this.mountain1.width, this.mountain1.height);
        this.ctx.drawImage(this.mountain2.img, this.mountain2.x, this.mountain2.y, this.mountain2.width, this.mountain2.height);
        this.ctx.drawImage(this.floor.img, this.floor.x, this.floor.y, this.floor.width, this.floor.height);
        this.ctx.drawImage(this.lightRight.img, this.lightRight.x, this.lightRight.y, this.lightRight.width, this.lightRight.height);
        this.addToMap(this.character); 
        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });
        this.ctx.translate(-this.camera_x, 0);

        //draw wird immer wiedr auffgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        this.ctx.save();  // Speichert aktuellen Zustand des Canvas
    
        if (mo.otherDirection) {
            this.ctx.translate(mo.x + mo.width, mo.y); // Verschiebt das Zeichen-Referenzsystem nach rechts
            this.ctx.scale(-1, 1); // Spiegelt horizontal
            this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height); 
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    
        this.ctx.restore();  // Setzt den Canvas-Zustand zurück
    }
    

    setWorld() {
        this.character.world = this;
    }
}