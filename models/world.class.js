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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.water.img, this.water.x, this.water.y, this.water.width, this.water.height)
        this.ctx.drawImage(this.mountain1.img, this.mountain1.x, this.mountain1.y, this.mountain1.width, this.mountain1.height)
        this.ctx.drawImage(this.mountain2.img, this.mountain2.x, this.mountain2.y, this.mountain2.width, this.mountain2.height)
        this.ctx.drawImage(this.floor.img, this.floor.x, this.floor.y, this.floor.width, this.floor.height)
        this.ctx.drawImage(this.lightRight.img, this.lightRight.x, this.lightRight.y, this.lightRight.width, this.lightRight.height)
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height)
        this.enemies.forEach(PufferFish => {
            this.ctx.drawImage(PufferFish.img, PufferFish.x, PufferFish.y, PufferFish.width, PufferFish.height)
        })
 


        //draw wird immer wiedr auffgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}