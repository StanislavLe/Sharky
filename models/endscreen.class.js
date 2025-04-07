class Endscreen {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc; // Dynamically set the image source
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false; // Add a method to hide the endscreen
    }

    draw(ctx) {
        if (this.visible) {
            if (this.image.src.includes('Recurso')) { // lose screen
                // Adjust proportions for the lose screen
                ctx.drawImage(this.image, 100, 50, 520, 100); // Custom dimensions for lose screen
            } else {
                ctx.drawImage(this.image, 0, 0, 720, 480); // Default dimensions
            }
        }
    }
}
