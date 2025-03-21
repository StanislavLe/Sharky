class CollectableObject extends MovableObject {
    
    constructor() {
        super();
        this.x = 200 + Math.random() * 900;
        this.y = 80  + Math.random() * 350;
    }

}