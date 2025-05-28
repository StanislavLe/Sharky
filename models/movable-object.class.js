class MovableObject extends DrawableObject {
    speed = 2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    score = 0;
    ammo = 0;
    hasPlayedDeathSound = false;
    hasPlayedDeathAnimation = false;
    isAscending = false;

    /**
     * Wendet die Schwerkraft auf das Objekt an.
     * @function
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAscending) return;

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Prüft, ob sich das Objekt über dem Boden befindet.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Prüft, ob sich das Objekt über einem Gegner befindet.
     * @param {MovableObject} enemy - Das gegnerische Objekt.
     * @returns {boolean}
     */
    isAboveEnemy(enemy) {
        return this.y + this.height < enemy.y + enemy.height && this.speedY < 0;
    }

    /**
     * Spielt eine Animation aus einem Array von Bildern ab.
     * @param {string[]} images - Array mit Bildpfaden.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Erhöht die Munition um 1.
     * @function
     */
    increaseAmmo() {
        this.ammo += 1;
    }

    /**
     * Erhöht den Punktestand um 1.
     * @function
     */
    increaseScore() {
        this.score += 1;
    }

    /**
     * Prüft, ob das Objekt mit einem anderen Objekt kollidiert.
     * @param {MovableObject} mo - Das andere Objekt.
     * @returns {boolean}
     */
    isColliding(mo) {
        if (this.isAscending || this.isDead()) return false;
        if (mo instanceof FinalBoss && !mo.isCollidable()) return false;

        const a = this.getHitbox();
        const b = mo.getHitbox();

        return (
            a.x + a.width > b.x &&
            a.y + a.height > b.y &&
            a.x < b.x + b.width &&
            a.y < b.y + b.height
        );
    }

    /**
     * Gibt die Hitbox des Objekts zurück.
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getHitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    /**
     * Aktualisiert die Statusleiste des Objekts.
     * @param {StatusBar} statusBar - Die Statusleiste, die aktualisiert werden soll.
     */
    updateStatusBar(statusBar) {
        if (statusBar) {
            statusBar.setPercentage(this.energy);
        }
    }

    /**
     * Verursacht Schaden am Objekt und aktualisiert ggf. die Statusleiste.
     * @param {number} [damage=5] - Schadenshöhe.
     */
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

    /**
     * Prüft, ob das Objekt tot ist.
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Lässt das Objekt sterben, indem die Energie auf 0 gesetzt wird.
     */
    die() {
        this.energy = 0;
    }

    /**
     * Prüft, ob das Objekt kürzlich getroffen wurde.
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Lässt das Objekt springen.
     * @function
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Bewegt das Objekt nach rechts.
     * @function
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Bewegt das Objekt nach links.
     * @function
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Startet das Aufsteigen des Objekts (z.B. nach dem Tod).
     * Das Objekt bewegt sich nach oben, bis es den sichtbaren Bereich verlässt.
     */
    startAscend() {
        this.isAscending = true;
        this.ascendInterval = setInterval(() => {
            this.y -= 1;
            if (this.y + this.height < 0) {
                clearInterval(this.ascendInterval);
            }
        }, 30);
    }
}