class CollectableObject extends MovableObject {

    constructor() {
        super();
        this.x = 200 + Math.random() * 1500;
        this.y = 100 + Math.random() * 300;  
    }
}