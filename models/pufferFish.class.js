class PufferFish extends MovableObject {
    isDying = false;
    PUFFERFISH_WALKING = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    PUFFERFISH_DIE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
    ];
    

    constructor() {
        super().loadImage(this.PUFFERFISH_WALKING[0]);
        this.x = 800 + Math.random() * 1500;
        this.speed = 5.5 + Math.random() * 1.25;
        this.loadImages(this.PUFFERFISH_WALKING);
        this.loadImages(this.PUFFERFISH_DIE);
        this.animate();
    }


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
    

    removeEnemy() {
        setTimeout(() => {
            const index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, this.PUFFERFISH_DIE.length * 150);
    }
}