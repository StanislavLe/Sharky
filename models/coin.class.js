class Coin extends CollectableObject {
    width = 50;
    height = 50;

    WARPING_COINS = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/4.png',
    ]


    constructor() {
        super().loadImage(this.WARPING_COINS[0]); 
        this.loadImages(this.WARPING_COINS);
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.WARPING_COINS);
        }, 150); 
    }
 
}