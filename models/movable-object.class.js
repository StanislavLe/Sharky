class MovableObject extends DrawableObject {
    speed = 2; 
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    score = 0;
    ammo = 100;
    hasPlayedDeathSound = false;
    hasPlayedDeathAnimation = false;
    isAscending = false;


    applyGravity() {
        setInterval(() => {
            if (this.isAscending) return; 
    
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isAboveEnemy(enemy) {
        return this.y + this.height < enemy.y + enemy.height && this.speedY < 0;
    }

                                  
    playAnimation(images) {
        //Walk animation 
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    increaseAmmo() {
        this.ammo += 1;
    }

    increaseScore() {
        this.score += 1;
    }

    isColliding(mo) {
        if (this.isAscending || this.isDead()) return false; // Keine Kollision, wenn der Endboss aufsteigt oder tot ist
        if (mo instanceof FinalBoss && !mo.isCollidable()) return false; // 🔥 No collision if boss is not collidable
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x &&
               this.y < mo.y + mo.height;
    }

    hit(damage = 5) {
        this.energy -= damage;
        this.world.soundManager.punch();
        if (this.energy < 0) this.energy = 0;
        this.lastHit = new Date().getTime();
        if (this instanceof Character) {
            this.updateStatusBar(this.world?.statusBar);
        }
        if (this instanceof FinalBoss) {
            this.updateStatusBar(this.world?.bossStatusBar);
        }
    }

    

    isDead() {
        return this.energy == 0;
    }

    
    die() {
        this.energy = 0;
    }
    

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    jump() {
        this.speedY = 30;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


    startAscend() {
        this.isAscending = true; // Flag setzen, um Kollisionen zu deaktivieren
        this.ascendInterval = setInterval(() => {
            this.y -= 1;
            if (this.y + this.height < 0) {
                clearInterval(this.ascendInterval);
            }
        }, 30);
    }
}