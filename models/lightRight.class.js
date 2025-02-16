class LightRight extends MovableObject {
    y = 5;
    width = 720;
    height = 300;
    speed = 2; // Geschwindigkeit der Bewegung (wie schnell das Objekt nach links geht)

    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png');
        this.x = Math.random() * 250;
        this.moveLeftOverTime(); // Starte die Bewegung nach links
    }

    moveLeftOverTime() {
        setInterval(() => {
            this.x -= this.speed; // Verringere die x-Koordinate um die Geschwindigkeit
        }, 1000 / 60); // 60 FPS, damit die Bewegung flüssig ist
    }
}
