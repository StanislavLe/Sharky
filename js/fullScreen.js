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
     * Passt die Canvas-Größe dynamisch an das Seitenverhältnis (720x480) an.
     * Wird im Vollbildmodus auf Fenstergröße skaliert, außerhalb auf Standardgröße zurückgesetzt.
     * @function
     */
    function updateCanvasSize() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        if (document.fullscreenElement) {
            const aspectRatio = 720 / 480;
            let newWidth = window.innerWidth;
            let newHeight = window.innerHeight;
            if (newWidth / newHeight > aspectRatio) {
                newWidth = newHeight * aspectRatio;
            } else {
                newHeight = newWidth / aspectRatio;
            }
            canvas.style.width = `${newWidth}px`;
            canvas.style.height = `${newHeight}px`;
        } else {
            canvas.style.width = '720px';
            canvas.style.height = '480px';
        }
        refreshGameContext();
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