class Coin extends CollectableObject {
    width = 50;
    height = 50;

    WARPING_COINS = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/4.png',
    ]

    /**
     * Erstellt eine neue Instanz einer Münze, lädt die Bilder und startet die Animation.
     * @constructor
     */
    constructor() {
        super().loadImage(this.WARPING_COINS[0]); 
        this.loadImages(this.WARPING_COINS);
        this.animateCoins();
    }

    /**
     * Startet die Animation der Münze, indem die Bilder periodisch gewechselt werden.
     * @function
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.WARPING_COINS);
        }, 150); 
    }
}