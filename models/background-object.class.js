class BackgroundObject extends MovableObject {
    /**
     * Erstellt ein neues Hintergrundobjekt mit Bild, Position und Größe.
     * @param {string} imagePath - Pfad zum Bild.
     * @param {number} [x=0] - X-Position.
     * @param {number} [y=0] - Y-Position.
     * @param {number} [width=720] - Breite des Objekts.
     * @param {number} [height=400] - Höhe des Objekts.
     */
    constructor(imagePath, x = 0, y = 0, width = 720, height = 400) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}