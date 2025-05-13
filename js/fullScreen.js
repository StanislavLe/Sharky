document.addEventListener('DOMContentLoaded', () => {
    const fullscreenElement = document.getElementById('contentContainer');
    const enterFullscreenBtn = document.getElementById('fullscreenToggleOpen');
    const exitFullscreenBtn = document.getElementById('fullscreenToggleClose');
    const canvas = document.getElementById('canvas');

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            fullscreenElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }

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

function refreshGameContext() {
    if (window.world) {
        world.ctx = document.getElementById('canvas').getContext('2d');
    }
}


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

    enterFullscreenBtn.addEventListener('click', toggleFullscreen);
    exitFullscreenBtn.addEventListener('click', toggleFullscreen);
});
