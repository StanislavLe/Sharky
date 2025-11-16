class PufferFish extends MovableObject {
    isDying = false;
    PUFFERFISH_WALKING = [
        'img/worldBuilding/pufferFish/swim/1.swim1.png',
        'img/worldBuilding/pufferFish/swim/1.swim2.png',
        'img/worldBuilding/pufferFish/swim/1.swim3.png',
        'img/worldBuilding/pufferFish/swim/1.swim4.png',
        'img/worldBuilding/pufferFish/swim/1.swim5.png'
    ];

    PUFFERFISH_DIE = [
        'img/worldBuilding/pufferFish/die/2.2.png',
        'img/worldBuilding/pufferFish/die/2.3.png',
        'img/worldBuilding/pufferFish/die/2.png',
    ];
    
    /**
     * Erstellt eine neue Instanz eines Kugelfisches, lädt die Bilder und startet die Animation.
     * @constructor
     */
    constructor() {
        super().loadImage(this.PUFFERFISH_WALKING[0]);
        this.x = 800 + Math.random() * 1500;
        this.speed = 5.5 + Math.random() * 1.25;
        this.loadImages(this.PUFFERFISH_WALKING);
        this.loadImages(this.PUFFERFISH_DIE);
        this.animate();
    }

    /**
     * Startet die Bewegungs- und Animationsintervalle für den Kugelfisch.
     * @function
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.PUFFERFISH_DIE);
                this.isDying = true;
                this.removeEnemy();
            }
            else {
                this.moveLeft();
                this.playAnimation(this.PUFFERFISH_WALKING);
            }
        }, 150);
    }
    
    /**
     * Entfernt den Kugelfisch nach dem Abspielen der Sterbeanimation aus dem Level.
     * @function
     */
    removeEnemy() {
        setTimeout(() => {
            const index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, this.PUFFERFISH_DIE.length * 150);
    }
}