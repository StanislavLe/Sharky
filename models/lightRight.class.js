class LightRight extends MovableObject {
    y = 15;
    width = 720;
    height = 300;

    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Legacy/Layers/1. Light/1.png');
        console.log("LightRight geladen:", this.img);
        this.x = Math.random() * 250;
        this.moveLeftOverTime(); // Starte die Bewegung nach links
    }
    

 moveLeftOverTime() {
    setInterval(() => {
        this.x -= 1;  // Langsame Bewegung nach links
    }, 1000 / 60);
}


    

}


