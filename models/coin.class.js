class Coin extends CollectableObject {
    width = 50;
    height = 50;

    WARPING_COINS = [
        'img/worldBuilding/coins/1.png',
        'img/worldBuilding/coins/2.png',
        'img/worldBuilding/coins/3.png',
        'img/worldBuilding/coins/4.png',
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