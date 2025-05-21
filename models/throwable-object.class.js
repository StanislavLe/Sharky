class ThrowableObject extends MovableObject {

    /**
     * Erstellt ein neues Wurfobjekt (z.B. Blase) und startet den Wurf.
     * @param {number} x - Start-X-Position.
     * @param {number} y - Start-Y-Position.
     * @constructor
     */
    constructor(x,y) {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    /**
     * Startet die Wurfbewegung und prüft auf Kollision mit Gegnern.
     * @function
     */
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
                    this.removeFromWorld(); 
                    break;
                }
            }
        }, 25);
    }

    /**
     * Entfernt das Wurfobjekt aus der Welt und stoppt die Bewegung.
     * @function
     */
    removeFromWorld() {
        clearInterval(this.moveInterval);
        const index = this.world?.throwableObjects.indexOf(this);
        if (index !== -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }
}