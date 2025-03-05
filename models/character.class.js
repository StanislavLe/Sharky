class Character extends MovableObject {
    height = 300;
    width = 300;
    y = 0;
    x = 0;
    speed = 10;
    IMAGES_WALKING = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_JUMPING = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_DEAD = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png'
    ];

    IMAGES_HURT = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/01.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/02.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];

    world;



    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }



    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }
            //console.log(`this.speedY`, this.speedY)
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60)
        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }


}