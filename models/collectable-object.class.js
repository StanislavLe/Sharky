class CollectableObject extends MovableObject {

    /**
     * Erstellt ein neues sammelbares Objekt mit zufälliger Position.
     * @constructor
     */
    constructor() {
        super();
        this.x = 200 + Math.random() * 1500;
        this.y = 100 + Math.random() * 300;  
    }
}