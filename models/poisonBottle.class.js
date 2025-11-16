class PoisonBottle extends CollectableObject {
    width = 80;
    height = 100;

    WARPING_BOTTLE = [
        'img/worldBuilding/poison/animada/1.png',
        'img/worldBuilding/poison/animada/2.png',
        'img/worldBuilding/poison/animada/3.png',
        'img/worldBuilding/poison/animada/4.png',
        'img/worldBuilding/poison/animada/5.png',
        'img/worldBuilding/poison/animada/6.png',
        'img/worldBuilding/poison/animada/7.png',
        'img/worldBuilding/poison/animada/8.png'
    ]

    /**
     * Erstellt eine neue Instanz einer Münze, lädt die Bilder und startet die Animation.
     * @constructor
     */
    constructor() {
        super().loadImage(this.WARPING_BOTTLE[0]);
        this.loadImages(this.WARPING_BOTTLE);
        this.animateBottles();
    }

    /**
     * Startet die Animation der Münze, indem die Bilder periodisch gewechselt werden.
     * @function
     */
    animateBottles() {
        setInterval(() => {
            this.playAnimation(this.WARPING_BOTTLE);
        }, 150);
    }
}


