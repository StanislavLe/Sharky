class MovableObject extends DrawableObject {
    speed = 2; // Geschwindigkeit der Bewegung (wie schnell das Objekt nach links geht)
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    score = 0;
    ammo = 10;

    applyGravity() {
        setInterval(() => {
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
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
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
        //console.log("Bewegung nach rechts");
    }

    moveLeft() {
        this.x -= this.speed;
        //console.log("Bewegung nach links");
    }
}