document.addEventListener('DOMContentLoaded', () => {
    const fullscreenElement = document.getElementById('contentContainer');
    const enterFullscreenBtn = document.getElementById('fullscreenToggleOpen');
    const exitFullscreenBtn = document.getElementById('fullscreenToggleClose');
    const canvas = document.getElementById('canvas');

    /**
     * Schaltet zwischen Vollbild- und Fenstermodus um.
     * Wird über das Fullscreen API gesteuert.
     * @function
     */
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            fullscreenElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }

    /**
     * Aktualisiert die Canvas-Größe abhängig vom Vollbildmodus und Bildschirmgröße.
     * Passt bei aktiviertem Vollbildmodus das Seitenverhältnis (720x480) an.
     * @function
     */
    function updateCanvasSize() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;

        if (document.fullscreenElement) {
            applyFullscreenCanvasSize(canvas);
        } else {
            applyDefaultCanvasSize(canvas);
        }

        refreshGameContext();
    }

    /**
     * Setzt die Canvas-Größe auf ein dynamisch berechnetes Seitenverhältnis (720x480),
     * basierend auf der aktuellen Fenstergröße.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, das skaliert werden soll.
     * @function
     */
    function applyFullscreenCanvasSize(canvas) {
        const aspectRatio = 720 / 480;
        const { width, height } = calculateAspectFit(window.innerWidth, window.innerHeight, aspectRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }

    /**
     * Setzt die Canvas-Größe auf die Standardwerte 720x480 (Pixel).
     * Wird verwendet, wenn kein Vollbildmodus aktiv ist.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, das zurückgesetzt werden soll.
     * @function
     */
    function applyDefaultCanvasSize(canvas) {
        canvas.style.width = '720px';
        canvas.style.height = '480px';
    }

    /**
     * Berechnet eine neue Breite und Höhe, um ein Seitenverhältnis korrekt innerhalb
     * eines gegebenen Rechtecks (z.B. Fenstergröße) zu erhalten.
     * @param {number} maxWidth - Maximale verfügbare Breite.
     * @param {number} maxHeight - Maximale verfügbare Höhe.
     * @param {number} aspectRatio - Zielseitenverhältnis (z. B. 720/480).
     * @returns {{width: number, height: number}} - Angepasstes Breiten-Höhen-Verhältnis.
     * @function
     */
    function calculateAspectFit(maxWidth, maxHeight, aspectRatio) {
        let width = maxWidth;
        let height = maxHeight;

        if (width / height > aspectRatio) {
            width = height * aspectRatio;
        } else {
            height = width / aspectRatio;
        }

        return { width, height };
    }


    /**
     * Aktualisiert den Canvas-Kontext im globalen world-Objekt.
     * @function
     */
    function refreshGameContext() {
        if (window.world) {
            world.ctx = document.getElementById('canvas').getContext('2d');
        }
    }

    /**
     * Event-Listener für Änderungen des Vollbildmodus.
     * Passt die Anzeige der Buttons und die Canvas-Größe an.
     */
    document.addEventListener('fullscreenchange', () => {
        updateCanvasSize();
        if (document.fullscreenElement) {
            enterFullscreenBtn.style.display = 'none';
            exitFullscreenBtn.style.display = 'block';
        } else {
            enterFullscreenBtn.style.display = 'block';
            exitFullscreenBtn.style.display = 'none';
        }
    });

    /**
     * Event-Listener für den Klick auf den "Vollbild öffnen"-Button.
     */
    enterFullscreenBtn.addEventListener('click', toggleFullscreen);

    /**
     * Event-Listener für den Klick auf den "Vollbild schließen"-Button.
     */
    exitFullscreenBtn.addEventListener('click', toggleFullscreen);
});