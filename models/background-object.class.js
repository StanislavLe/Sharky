class BackgroundObject extends MovableObject {
    constructor(imagePath, x = 0, y = 0, width = 720, height = 400) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
