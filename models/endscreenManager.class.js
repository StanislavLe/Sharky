class EndscreenManager {
    constructor() {
        this.winScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loseScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png');
        this.activeScreen = null;
        this._timeout = null;
        this.isPending = false;
    }

    showWin() {
        console.log('[EndscreenManager] WIN detected ✅');
        this._cancelPending(); // Abbrechen, falls loseTimeout noch aktiv
        this.hideActiveScreen();
    
        this._pendingTimeout = setTimeout(() => {
            this.activeScreen = this.winScreen;
            this.activeScreen.show();
            console.log('[EndscreenManager] WIN-Screen shown');
        }, 2000); // Optional Delay
    }
    

    showLose() {
        if (this.isPending) return;
        this._cancelPending();
        this.isPending = true;
        console.log('[EndscreenManager] ⏳ Waiting to show LOSE screen...');
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
            console.log('[EndscreenManager] 🔄 Pending screen timeout cancelled.');
        }
    }

    hideActiveScreen() {
        console.log('[EndscreenManager] Hiding active screen...');
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
