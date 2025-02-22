class MovableObject {
    x = 60;
    y = 350;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 2; // Geschwindigkeit der Bewegung (wie schnell das Objekt nach links geht)
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        console.log('Moving Right')
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // Verringere die x-Koordinate um die Geschwindigkeit
        }, 1000 / 60); // 60 FPS, damit die Bewegung flüssig ist
    }
}