class JellyFish extends MovableObject{

    direction = -1; 
    currentDirectionTime = 0;
    
    JELLYFISH_WALKING = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    JELLYFISH_DIE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    /**
     * Erstellt eine neue Instanz einer Qualle, lädt die Bilder und startet die Animation.
     * @constructor
     */
    constructor() {
        super().loadImage(this.JELLYFISH_WALKING[0]);
        this.x = 500 + Math.random() * 1500;
        this.y = 100 + Math.random() * 300;    
        this.speed = 5 + Math.random() * 0.25;
        this.loadImages(this.JELLYFISH_WALKING);
        this.loadImages(this.JELLYFISH_DIE);
        this.animate();    
    }

    /**
     * Startet die Bewegungs- und Animationsintervalle für die Qualle.
     * @function
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.JELLYFISH_DIE);
                this.removeEnemy();
            } else {
                if (this.direction === -1) {
                    this.moveLeft();
                } else {
                    this.moveRight();
                }
                this.playAnimation(this.JELLYFISH_WALKING);
                this.currentDirectionTime += 150;
                if (this.currentDirectionTime >= 6000) { 
                    this.direction *= -1; 
                    this.otherDirection = this.direction === 1; 
                    this.currentDirectionTime = 0;
                }
            }
        }, 150);
    }

    /**
     * Entfernt die Qualle nach dem Abspielen der Sterbeanimation aus dem Level.
     * @function
     */
    removeEnemy() {
        setTimeout(() => {
            const index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, this.JELLYFISH_DIE.length * 150);
    }
}