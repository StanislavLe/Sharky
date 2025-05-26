class PoisonBottle extends CollectableObject {
    width = 80;
    height = 100;

    WARPING_BOTTLE = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/2.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/3.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/4.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/5.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/6.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/7.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/8.png'
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


