class Level {
    enemies;
    backgroundObjects;
    coins;
    bubbles;
    level_end_x = 2100;

    constructor(enemies, backgroundObjects, coins, bubbles) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bubbles = bubbles;
    }
}