class LightLeft extends MovableObject {
    y = 15;
    width = 720;
    height = 300;
    x = 750;

    constructor() {
        super().loadImage('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/3. Background/Layers/1. Light/2.png');
        this.moveLeftOverTime(); 
    }
    

 moveLeftOverTime() {
    setInterval(() => {
        this.x -= 1;  
        if (this.x + this.width < 0) {
            this.x = 2300; 
        }
    }, 1000 / 60);
}

}