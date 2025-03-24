class ThrowableObject extends MovableObject {


    constructor(x,y) {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            this.x += 10;
    
            this.world.level.enemies.forEach(enemy => {
                if (!enemy.isDying && this.isColliding(enemy) && this.isAboveEnemy(enemy)) {
                    enemy.die();
                    this.removeFromWorld();
                }
            });
        }, 25);
    }
    

    removeFromWorld() {
        clearInterval(this.moveInterval);
        const index = this.world?.throwableObjects.indexOf(this);
        if (index !== -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}
    
