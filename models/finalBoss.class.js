class FinalBoss extends MovableObject {
    width = 500;
    height = 500;
    x = 200;
    y = 10;
    isIntroPlayed = false;
    isActive = false; // 💡 wird true, wenn Intro durch ist
    introFrame = 0;
    behaviorActive = false;



    BOSS_INTRO = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ]

    BOSS_WALKING = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/13.png',
    ]

    BOSS_HURT = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/4.png',
    ]

    BOSS_ATTACK = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/6.png',
    ]

    BOSS_DEAD = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ]

    constructor() {
        super().loadImage(this.BOSS_INTRO[0]);
        this.loadImages(this.BOSS_INTRO);
        this.loadImages(this.BOSS_WALKING);
        this.loadImages(this.BOSS_HURT);
        this.loadImages(this.BOSS_ATTACK);
        this.loadImages(this.BOSS_DEAD);
        this.x = 1900;

    }

    startIntro() {
        if (this.isIntroPlayed) return;
        this.isIntroPlayed = true;
        this.currentImage = 0;

        this.world.soundManager.stopBackgroundMusik();  // ✅ zentrales Objekt
        this.world.soundManager.playBossMusik();        // ✅ Bossmusik starten

        this.introInterval = setInterval(() => {
            this.playAnimation(this.BOSS_INTRO);

            if (this.currentImage >= this.BOSS_INTRO.length) {
                clearInterval(this.introInterval);
                this.isActive = true;
                this.startBossBehavior();
                this.animate();
            }
        }, 150);
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                if (!this.isDying) {
                    this.isDying = true;
                    this.playAnimation(this.BOSS_DEAD);
                    this.dieBoss();
                    this.startAscend();
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.BOSS_HURT);
            } else {
                this.playAnimation(this.BOSS_WALKING);
            }
        }, 150);
    }



    dieBoss() {
        this.behaviorActive = false;  
        this.world.soundManager.ouch();
        this.world.soundManager.stopBossMusik();
        setTimeout(() => {
            this.world.soundManager.playBackgroundMusik();
        }, 1000);
    }
    


    startBossBehavior() {
        this.behaviorActive = true;
    
        const loop = () => {
            if (!this.behaviorActive || this.isDead() || this.world.character.isDead()) return;
    
            this.state = 'idle';
    
            setTimeout(() => {
                if (!this.behaviorActive || this.isDead() || this.world.character.isDead()) return;
    
                this.state = 'moveLeft';
    
                const moveInterval = setInterval(() => {
                    if (!this.behaviorActive || this.isDead() || this.world.character.isDead()) {
                        clearInterval(moveInterval);
                        return;
                    }
                    this.moveLeft();
                }, 60);
    
                setTimeout(() => {
                    clearInterval(moveInterval);
                    if (!this.behaviorActive || this.isDead() || this.world.character.isDead()) return;
    
                    this.state = 'attack';
    
                    this.playAnimationOnce(this.BOSS_ATTACK, 200, () => {
                        this.checkAttackHit(); // 💥 Sharkie treffen, falls in Range
                        loop(); // ⏭️ Weiter im Verhalten
                    });
                    
    
                }, 2000);
    
            }, 500);
        };
    
        loop();
    }
    

    checkAttackHit() {
        const character = this.world.character;
    
        const withinXRange = character.x + character.width > this.x - this.width * 0.15 && 
                             character.x < this.x;
                             
        const sameHeight = character.y < this.y + this.height &&
                           character.y + character.height > this.y;
    
        if (withinXRange && sameHeight && !character.isDead()) {
            character.hit();
        }
    }
    
    
    

    playAnimationOnce(images, frameDuration = 100, callback = () => {}) {
        this.currentImage = 0;
        let frame = 0;
    
        const interval = setInterval(() => {
            if (frame >= images.length) {
                clearInterval(interval);
                callback();
            } else {
                const path = images[frame];
                this.img = this.imageCache[path];
                frame++;
            }
        }, frameDuration);
    }
    

}