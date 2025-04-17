class Endscreen {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc; 
        this.visible = false;
    }

    show() {
        this.visible = true;
        document.getElementById('endScreenButtons').style.display = 'flex';
    }

    hide() {
        this.visible = false; 
        document.getElementById('endScreenButtons').style.display = 'none';
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
