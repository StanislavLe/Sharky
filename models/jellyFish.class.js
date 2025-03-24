class JellyFish extends MovableObject{

    isDying = false;
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

    constructor() {
        super().loadImage(this.JELLYFISH_WALKING[0]);
        this.x = 200 + Math.random() * 1500;
        this.y = 200 + Math.random() * 20;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.JELLYFISH_WALKING);
        this.loadImages(this.JELLYFISH_DIE);
        this.animate();    
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.JELLYFISH_DIE);
                this.isDying = true;
                this.removeEnemy();
            }
            else {
                this.moveLeft(); // Optional: KI oder Richtungswechsel
                this.playAnimation(this.JELLYFISH_WALKING);
            }
        }, 150);
    }
    
    

    die() {
        this.energy = 0;
    }
    
    

    removeEnemy() {
        setTimeout(() => {
            const index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, this.JELLYFISH_DIE.length * 150); // Zeit basierend auf Frames
    }

}