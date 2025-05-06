class Character extends MovableObject {
    height = 300;
    width = 300;
    y = 0;
    x = 0;
    speed = 10;
    idleTimer = 0;
    hasSnored = false;

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

    IMAGES_IDLE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/12.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/13.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/14.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/15.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/16.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/17.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png',
    ]

    IMAGES_LONG_IDLE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I12.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I13.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I14.png',
    ]

    IMAGES_PUNCH = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/8.png',
    ]

    world;

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_PUNCH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    resetIdleState() {
        this.idleTimer = 0;
        this.hasSnored = false;
        this.world.soundManager.stopSnoreSound(); 
    }

    animate() {
        this.moveInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
                this.resetIdleState();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
                this.resetIdleState();
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.resetIdleState();
            }
            if (this.world.keyboard.D && !this.isPunching) {
                this.punch();
                this.resetIdleState();
            }
    
            this.world.camera_x = -this.x;
        }, 1000 / 60);
    
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.resetIdleState(); // 🛑 Sofort Schnarchen beenden
                if (!this.deathStarted) {
                    this.deathStarted = true;
                    this.currentImage = 0;
                    if (!this.hasStartedAscend) {
                        this.hasStartedAscend = true;
                        this.isAscending = true;
                        this.startAscend();
                    }
                }
    
                if (this.currentImage < this.IMAGES_DEAD.length) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else {
                    let lastFrame = this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1];
                    this.img = this.imageCache[lastFrame];
                    if (!this.hasPlayedDeathSound) {
                        this.hasPlayedDeathSound = true;
                        this.character_dead_sound.play();
                    }
                }
    
                this.idleTimer = 0;
                return;
            }
    
            if (this.isAscending) return;
            if (this.isPunching) return;
    
            if (this.isHurt()) {
                this.resetIdleState(); // ✅ Schnarchen abbrechen bei Schaden
                this.playAnimation(this.IMAGES_HURT);
                this.idleTimer = 0;
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.idleTimer = 0;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTimer = 0;
            } else {
                this.idleTimer += 1;
                this.checkIdleTimer();
            }
        }, 150);
    }
    
    

    checkIdleTimer() {
        if (this.world.endscreenManager?.isVisible() || this.isDead() || this.isHurt()) {
            this.resetIdleState(); // 🧹 Sofort alles stoppen
            return;
        }
    
        if (this.idleTimer > 100) {
            this.playAnimation(this.IMAGES_LONG_IDLE, 350);
            if (!this.hasSnored) {
                this.world.soundManager.snoring();
                this.hasSnored = true;
            }
        } else if (this.idleTimer > 0) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idleTimer++;
            this.hasSnored = false;
        }
    }
    

    punch() {
        if (this.isPunching || this.isDead()) return;
        this.isPunching = true;
        this.currentImage = 0;
        this.world.soundManager.punch?.();
        const punchOffset = 15; 
        const punchEndTime = 100 * this.IMAGES_PUNCH.length;
        this.resetIdleState();
        this.visualOffsetX = punchOffset;
        const punchInterval = setInterval(() => {
            if (this.currentImage < this.IMAGES_PUNCH.length) {
                this.playAnimation(this.IMAGES_PUNCH);
            } else {
                clearInterval(punchInterval);
                this.isPunching = false;
                this.currentImage = 0;
                this.visualOffsetX = 0;
            }
        }, 100);
        this.world.level.enemies.forEach((enemy) => {
            const withinXRange = enemy.x > this.x + punchOffset && enemy.x < this.x + punchOffset + this.width * 1.10;
            const sameHeight = enemy.y < this.y + this.height && enemy.y + enemy.height > this.y;
            if (withinXRange && sameHeight && !enemy.isDead?.()) {
                if (enemy instanceof FinalBoss) {
                    enemy.hit();
                } else {
                    enemy.die();
                }
            }
        });
        setTimeout(() => {
            this.isPunching = false;
        }, punchEndTime);
    }
}

