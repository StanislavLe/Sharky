class EndscreenManager {
    constructor() {
        this.winScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loseScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png');
        this.activeScreen = null;
        this.opacity = 0; // Initial opacity for fade-in
    }

    showWin() {
        this.hideActiveScreen();
        this.activeScreen = this.winScreen;
        this.startFadeIn();
    }

    showLose() {
        this.hideActiveScreen();
        this.activeScreen = this.loseScreen;
        this.startFadeIn();
    }

    startFadeIn() {
        this.opacity = 0; // Reset opacity
        this.activeScreen.show();
        const fadeInterval = setInterval(() => {
            if (this.opacity < 1) {
                this.opacity += 0.02; // Gradually increase opacity
            } else {
                clearInterval(fadeInterval); // Stop fading once fully visible
            }
        }, 50);
    }

    hideActiveScreen() {
        if (this.activeScreen) {
            this.activeScreen.hide();
        }
    }

    draw(ctx) {
        if (this.activeScreen) {
            ctx.save();
            ctx.globalAlpha = this.opacity; // Apply fade-in effect
            this.activeScreen.draw(ctx);
            ctx.restore();
        }
    }

    isVisible() {
        return this.activeScreen !== null && this.activeScreen.visible;
    }
}
