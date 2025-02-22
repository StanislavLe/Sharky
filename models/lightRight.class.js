class LightRight extends MovableObject {
    y = 5;
    width = 720;
    height = 300;

    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png');
        this.x = Math.random() * 250;
        this.moveLeftOverTime(); // Starte die Bewegung nach links
    }

    moveLeftOverTime() {
        this.moveLeft();
    }

    

}


