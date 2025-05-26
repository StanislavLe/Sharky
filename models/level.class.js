class Level {
    enemies;
    backgroundObjects;
    coins;
    PoisonBottle;
    level_end_x = 2100;

    /**
     * Erstellt ein neues Level mit Gegnern, Hintergrundobjekten, Münzen und Blasen.
     * @param {Array} enemies - Array von Gegnerobjekten.
     * @param {Array} backgroundObjects - Array von Hintergrundobjekten.
     * @param {Array} coins - Array von Münzobjekten.
     * @param {Array} PoisonBottle - Array von Blasenobjekten.
     * @constructor
     */
    constructor(enemies, backgroundObjects, coins, PoisonBottle) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.PoisonBottle = PoisonBottle;
    }
}