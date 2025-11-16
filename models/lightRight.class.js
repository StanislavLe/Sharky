class LightRight extends MovableObject {
    y = 15;
    width = 720;
    height = 300;
    x = 0;

    /**
     * Erstellt eine neue Instanz des LightRight-Objekts und startet die Bewegung.
     * @constructor
     */
    constructor() {
        super().loadImage('img/worldBuilding/layers/light/1.png');
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