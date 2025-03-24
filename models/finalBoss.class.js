class FinalBoss extends MovableObject {
    width = 500;
    height = 500;
    x = 200;
    y = 10;
    isIntroPlayed = false;
    introFrame = 0;

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
        this.loadImages(this.BOSS_DEAD);
        this.x = 1900;
    }

    startIntro() {
        if (this.isIntroPlayed) return;
        this.isIntroPlayed = true;
        this.currentImage = 0; 
        this.introInterval = setInterval(() => {
            this.playAnimation(this.BOSS_INTRO);
                if (this.currentImage >= this.BOSS_INTRO.length) {
                clearInterval(this.introInterval);
                this.animate(); // 🔁 danach normale Animation starten
            }
        }, 50); 
    }
    
    animate() {
        this.walkingInterval = setInterval(() => {
            this.playAnimation(this.BOSS_WALKING);
        }, 1000 / 20);
    }

    die() {
        this.isDying = true;
        // Hier kannst du später Boss-Death-Animation einfügen
    }
}