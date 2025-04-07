class LightRight extends MovableObject {
    y = 15;
    width = 720;
    height = 300;
    x = 0;

    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png');
        console.log("LightRight geladen:", this.img);
        this.moveLeftOverTime(); // Starte die Bewegung nach links
    }
    

    moveLeftOverTime() {
        setInterval(() => {
            this.x -= 1;  // Langsame Bewegung nach links
            if (this.x + this.width < 0) {
                this.x = 2300; // Reset position to the starting point
            }
        }, 1000 / 60);
    }
}