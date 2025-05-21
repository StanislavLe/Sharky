class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 60;
    y = 350;
    height = 100;
    width = 100;

    /**
     * Lädt ein einzelnes Bild und setzt es als aktuelles Bild.
     * @param {string} path - Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Zeichnet das aktuelle Bild auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet einen blauen Rahmen um das Objekt, wenn es eine bestimmte Klasse ist.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof PufferFish || this instanceof Coin || this instanceof Bubble || this instanceof JellyFish) {
            // Blue rectangle
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Aktualisiert die Statusbar mit dem aktuellen Energie-Wert.
     * @param {Object} statusBar - Das Statusbar-Objekt.
     */
    updateStatusBar(statusBar) {
        if (statusBar && typeof statusBar.setPercentage === 'function') {
            statusBar.setPercentage(this.energy);
        }
    }
    
    /**
     * Lädt mehrere Bilder und speichert sie im Cache.
     * @param {string[]} arr - Array mit Bildpfaden.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}