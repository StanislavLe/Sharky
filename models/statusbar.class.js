class StatusBar extends DrawableObject {

    STATUS_BAR = [
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/0_ .png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/20__1.png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/40_ .png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/60_ .png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/80_ .png',
        'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/4. Marcadores/Purple/100_ .png',
    ];

    percentage = 100;

    /**
     * Erstellt eine neue Instanz der StatusBar und lädt die Bilder.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.STATUS_BAR);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Setzt den aktuellen Prozentwert der StatusBar und aktualisiert das Bild.
     * @param {number} percentage - Der neue Prozentwert.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.STATUS_BAR[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt den Index des Bildes basierend auf dem aktuellen Prozentwert.
     * @returns {number} Der Index des Bildes im STATUS_BAR-Array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}