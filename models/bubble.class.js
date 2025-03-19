class Bubble extends MovableObject {
    width = 50;
    height = 50;

    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png'); // Starte mit erstem Bild
        this.x = 200 + Math.random() * 500;
        this.y = 80  + Math.random() * 350;
    }
}