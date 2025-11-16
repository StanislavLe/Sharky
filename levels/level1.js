/**
 * Erstellt das Level 1 mit Gegnern, Hintergrundobjekten, Münzen und Blasen.
 * @type {Level}
 */
var level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new PufferFish(),
        new JellyFish(),
        new PufferFish(),
        new JellyFish(),
        new PufferFish(),
        new JellyFish(),
        new PufferFish(),
        new FinalBoss(),
    ],

    [
        new BackgroundObject('img/worldBuilding/layers/water/D.png', -720, 0),
        new BackgroundObject('img/worldBuilding/layers/fondo2/D.png', -720, 80),
        new BackgroundObject('img/worldBuilding/layers/fondo1/D.png', -720, 0),
        new BackgroundObject('img/worldBuilding/layers/floor/D.png', -720, 80),

        new BackgroundObject('img/worldBuilding/layers/water/D.png', 0, 0),
        new BackgroundObject('img/worldBuilding/layers/fondo2/D.png', 0, 80),
        new BackgroundObject('img/worldBuilding/layers/fondo1/D.png', 0, 0),
        new BackgroundObject('img/worldBuilding/layers/floor/D.png', 0, 80),

        new BackgroundObject('img/worldBuilding/layers/water/D.png', 720, 0),
        new BackgroundObject('img/worldBuilding/layers/fondo2/D.png', 720, 80),
        new BackgroundObject('img/worldBuilding/layers/fondo1/D.png', 720, 0),
        new BackgroundObject('img/worldBuilding/layers/floor/D.png', 720, 80),

        new BackgroundObject('img/worldBuilding/layers/water/D.png', 720 * 2, 0),
        new BackgroundObject('img/worldBuilding/layers/fondo2/D.png', 720 * 2, 80),
        new BackgroundObject('img/worldBuilding/layers/fondo1/D.png', 720 * 2, 0),
        new BackgroundObject('img/worldBuilding/layers/floor/D.png', 720 * 2, 80),

        new BackgroundObject('img/worldBuilding/layers/water/D.png', 720 * 3, 0),
        new BackgroundObject('img/worldBuilding/layers/fondo2/D.png', 720 * 3, 80),
        new BackgroundObject('img/worldBuilding/layers/fondo1/D.png', 720 * 3, 0),
        new BackgroundObject('img/worldBuilding/layers/floor/D.png', 720 * 3, 80)
    ],

    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],

    [
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
        new PoisonBottle(),
    ]
);