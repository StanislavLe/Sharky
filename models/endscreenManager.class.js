class EndscreenManager {
    constructor() {
        this.winScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loseScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png');
        this.activeScreen = null;
        this._timeout = null;
        this.isPending = false;
    }


    showWin() {
        if (this.isPending) return; 
        this._cancelPending(); 
        this.hideActiveScreen();
        this.isPending = true; 
        this._pendingTimeout = setTimeout(() => {
            this.activeScreen = this.winScreen;
            this.activeScreen.show();
            this.isPending = false; 
        }, 2000); 
    }
    

    showLose() {
        if (this.isPending) return;
        this._cancelPending();
        this.isPending = true;
        this._timeout = setTimeout(() => {
            this.activeScreen = this.loseScreen;
            this.activeScreen.show();
            this.isPending = false;
        }, 4000);
    }


    _cancelPending() {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }


    hideActiveScreen() {
        if (this.activeScreen) {
            this.activeScreen.hide();
            this.activeScreen = null;
        }
        this._cancelPending();
        this.isPending = false;
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