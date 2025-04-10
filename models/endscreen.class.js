class Endscreen {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc; 
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false; 
    }

    draw(ctx) {
        if (this.visible) {
            if (this.image.src.includes('Recurso')) {
                ctx.drawImage(this.image, 100, 50, 520, 100); 
            } else {
                ctx.drawImage(this.image, 0, 0, 720, 480); 
            }
        }
    }
}
