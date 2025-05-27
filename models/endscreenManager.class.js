class EndscreenManager {
    /**
     * Erstellt einen neuen EndscreenManager mit Gewinn- und Verlustbildschirm.
     * @constructor
     */
    constructor() {
        this.winScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Try again/Mesa de trabajo 1.png');
        this.loseScreen = new Endscreen('img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png');
        this.activeScreen = null;
        this._timeout = null;
        this.isPending = false;
    }

    /**
     * Zeigt den Gewinn-Endscreen nach einer kurzen Verzögerung an.
     * @function
     */
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

    /**
     * Zeigt den Verlust-Endscreen nach einer Verzögerung an.
     * @function
     */
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

    /**
     * Bricht einen eventuell laufenden Timeout für Pending-Endscreens ab.
     * @function
     * @private
     */
    _cancelPending() {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }

    /**
     * Versteckt den aktuell sichtbaren Endscreen und setzt den Status zurück.
     * @function
     */
    hideActiveScreen() {
        if (this.activeScreen) {
            this.activeScreen.hide();
            this.activeScreen = null;
        }
        this._cancelPending();
        this.isPending = false;
    }

    /**
     * Zeichnet den aktiven Endscreen auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext.
     */
    draw(ctx) {
        if (this.activeScreen) {
            this.activeScreen.draw(ctx);
        }
    }

    /**
     * Prüft, ob aktuell ein Endscreen sichtbar ist.
     * @returns {boolean} true, wenn ein Endscreen angezeigt wird.
     */
    isVisible() {
        return this.activeScreen !== null && this.activeScreen.visible;
    }
}