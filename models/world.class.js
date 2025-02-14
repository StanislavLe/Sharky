class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new FinalBoss(),
    ];
    lights = [
        new LightRight()
    ];
    floor = new Floor();
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.floor.img, this.floor.x, this.floor.y, this.floor.width, this.floor.height)
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height)
        this.enemies.forEach(PufferFish => {
            this.ctx.drawImage(PufferFish.img, PufferFish.x, PufferFish.y, PufferFish.width, PufferFish.height)
        })

        this.lights.forEach(LightRight => {
            this.ctx.drawImage(LightRight.img, LightRight.x, LightRight.y, LightRight.width, LightRight.height)

        })

        //draw wird immer wiedr auffgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}