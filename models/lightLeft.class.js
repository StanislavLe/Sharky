class LightLeft extends MovableObject {
    y = 15;
    width = 720;
    height = 300;
    x = 750;

    /**
     * Erstellt eine neue Instanz des LightLeft-Objekts und startet die Bewegung.
     * @constructor
     */
    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/1. Light/2.png');
        this.moveLeftOverTime();
    }

    /**
     * Bewegt das Lichtobjekt kontinuierlich nach links und setzt es zurück, wenn es aus dem Bild ist.
     * @function
     */
    moveLeftOverTime() {
        setInterval(() => {
            this.x -= 1;
            if (this.x + this.width < 0) {
                this.x = 2300;
            }
        }, 1000 / 60);
    }
}