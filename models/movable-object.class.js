class MovableObject {
    x = 60;
    y = 350;
    img;
    height = 100;
    width = 100;
    imageCache = {};


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

    }


}