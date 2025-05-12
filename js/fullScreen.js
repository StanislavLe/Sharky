document.addEventListener('DOMContentLoaded', () => {
    const fullscreenElement = document.getElementById('contentContainer');
    const enterFullscreenBtn = document.getElementById('fullscreenToggleOpen');
    const exitFullscreenBtn = document.getElementById('fullscreenToggleClose');
    const canvas = document.getElementById('canvas');

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (fullscreenElement.requestFullscreen) {
                fullscreenElement.requestFullscreen();
            } else if (fullscreenElement.webkitRequestFullscreen) {
                fullscreenElement.webkitRequestFullscreen();
            } else if (fullscreenElement.msRequestFullscreen) {
                fullscreenElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    function resizeCanvasFullscreen() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    function resetCanvasSize() {
        if (canvas) {
            canvas.width = 720;
            canvas.height = 480;
        }
    }

    enterFullscreenBtn.addEventListener('click', toggleFullscreen);
    exitFullscreenBtn.addEventListener('click', toggleFullscreen);

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            enterFullscreenBtn.style.display = 'none';
            exitFullscreenBtn.style.display = 'block';
            resizeCanvasFullscreen();
        } else {
            enterFullscreenBtn.style.display = 'block';
            exitFullscreenBtn.style.display = 'none';
            resetCanvasSize();
        }
    });

    document.getElementById('fullscreenToggleClose').addEventListener('click', () => {
        console.log('Schließen-Button geklickt');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
    

});
