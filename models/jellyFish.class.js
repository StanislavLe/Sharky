class JellyFish extends MovableObject {

    direction = -1;
    currentDirectionTime = 0;

    JELLYFISH_WALKING = [
        'img/worldBuilding/jellyFish/regularDamage/Lila1.png',
        'img/worldBuilding/jellyFish/regularDamage/Lila2.png',
        'img/worldBuilding/jellyFish/regularDamage/Lila3.png',
        'img/worldBuilding/jellyFish/regularDamage/Lila4.png'
    ];

    JELLYFISH_DIE = [
        'img/worldBuilding/jellyFish/dead/Lila/L1.png',
        'img/worldBuilding/jellyFish/dead/Lila/L2.png',
        'img/worldBuilding/jellyFish/dead/Lila/L3.png',
        'img/worldBuilding/jellyFish/dead/Lila/L4.png',
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
     * Führt Bewegungslogik, Richtungswechsel und Tod-Handling durch.
     * @function
     */
    animate() {
        setInterval(() => this.updateJellyfishState(), 150);
    }

    /**
     * Aktualisiert Zustand der Qualle pro Frame.
     * Entscheidet ob sie stirbt oder sich bewegt.
     * @function
     */
    updateJellyfishState() {
        if (this.isDead()) {
            this.playAnimation(this.JELLYFISH_DIE);
            this.removeEnemy();
        } else {
            this.handleJellyfishMovement();
            this.updateDirectionLogic();
        }
    }

    /**
     * Führt die Bewegung und Abspielung der Lauf-Animation durch.
     * @function
     */
    handleJellyfishMovement() {
        this.direction === -1 ? this.moveLeft() : this.moveRight();
        this.playAnimation(this.JELLYFISH_WALKING);
    }

    /**
     * Verwalte Richtungswechsel nach Zeitintervall.
     * @function
     */
    updateDirectionLogic() {
        this.currentDirectionTime += 150;
        if (this.currentDirectionTime >= 6000) {
            this.direction *= -1;
            this.otherDirection = this.direction === 1;
            this.currentDirectionTime = 0;
        }
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