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
    
            for (let i = 0; i < this.world.level.enemies.length; i++) {
                const enemy = this.world.level.enemies[i];
    
                if (!enemy.isDying && this.isColliding(enemy)) {
                    if (enemy instanceof FinalBoss) {
                        enemy.hit();
                        this.world.soundManager.stompEnemy();
                    } else {
                        enemy.die();
                        this.world.soundManager.stompEnemy();
                    }
    
                    this.removeFromWorld(); // 💥 Bubble zerstört
                    break; // 🛑 Nur ein Gegner wird getroffen
                }
            }
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
    
