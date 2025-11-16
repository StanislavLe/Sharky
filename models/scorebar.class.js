class ScoreBar extends DrawableObject {

    IMAGES = [
        'img/worldBuilding/green/Coin/0.png',
        'img/worldBuilding/green/Coin/20.png',
        'img/worldBuilding/green/Coin/40.png',
        'img/worldBuilding/green/Coin/60.png',
        'img/worldBuilding/green/Coin/80.png',
        'img/worldBuilding/green/Coin/100.png',
    ];

    percentage = 0;

    /**
     * Erstellt eine neue Instanz der ScoreBar und lädt die Bilder.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Setzt den aktuellen Prozentwert der ScoreBar und aktualisiert das Bild.
     * @param {number} percentage - Der neue Prozentwert (maximal 100).
     */
    setPercentage(percentage) {
        this.percentage = Math.min(100, percentage);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt den Index des Bildes basierend auf dem aktuellen Prozentwert.
     * @returns {number} Der Index des Bildes im IMAGES-Array.
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