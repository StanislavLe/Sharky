class Coin extends MovableObject {
    width = 50;
    height = 50;

    WARPING_COINS = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/4.png',
    ]


    constructor() {
        super().loadImage(this.WARPING_COINS[0]); // Starte mit erstem Bild
        this.x = 200 + Math.random() * 900;
        this.y = 80  + Math.random() * 350;
        this.loadImages(this.WARPING_COINS);
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.WARPING_COINS);
        }, 150);  // 🔥 Animation mit 150ms pro Frame
    }
 
}