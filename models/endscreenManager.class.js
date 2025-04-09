class EndscreenManager {
    constructor() {
        this.winScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loseScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png');
        this.activeScreen = null;
    }

    showWin() {
        this.hideActiveScreen();
        setTimeout(() => {
            this.activeScreen = this.winScreen;
            this.activeScreen.show();
        }, 4000);
    }

    showLose() {
        this.hideActiveScreen();
        setTimeout(() => {
            this.activeScreen = this.loseScreen;
            this.activeScreen.show();
        }, 4000); 
    }

    hideActiveScreen() {
        if (this.activeScreen) {
            this.activeScreen.hide();
        }
    }

    draw(ctx) {
        if (this.activeScreen) {
            this.activeScreen.draw(ctx);
        }
    }

    isVisible() {
        return this.activeScreen !== null && this.activeScreen.visible;
    }
}
