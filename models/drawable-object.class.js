class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 60;
    y = 350;
    height = 100;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

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

    updateStatusBar(statusBar) {
        if (statusBar && typeof statusBar.setPercentage === 'function') {
            statusBar.setPercentage(this.energy);
        }
    }
    
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}