class Endscreen {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.onerror = () => {
            this.image.src = 'img/defaultEndscreen.png'; 
        };
        if (imageSrc) {
            this.image.src = imageSrc;
        } else {
            this.image.src = 'img/defaultEndscreen.png';
        }
        this.visible = false;
    }

    show() {
        this.visible = true;
        const restartButton = document.getElementById('restartButton');
        const backHomeButton = document.getElementById('backHomeButton');

        if (restartButton && backHomeButton) {
            restartButton.style.display = 'flex';
            backHomeButton.style.display = 'flex';
            console.log('Buttons sichtbar gemacht'); // Debug-Ausgabe
        } else {
            console.error('Buttons nicht gefunden'); // Debug-Ausgabe
        }
    }

    hide() {
        this.visible = false;
        const restartButton = document.getElementById('restartButton');
        const backHomeButton = document.getElementById('backHomeButton');

        if (restartButton) {
            restartButton.style.display = 'none';
            backHomeButton.style.display = 'none';
        }
        // Sicherstellen, dass keine Rendering-Logik die Buttons erneut sichtbar macht
        const canvas = document.getElementById('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas-Inhalt löschen
        }
    }

    draw(ctx) {
        if (this.visible) {
            if (this.image.src.includes('Recurso')) {
                ctx.drawImage(this.image, 100, 50, 520, 100); 
            } else {
                ctx.drawImage(this.image, 0, 0, 720, 480); 
            }
        }
    }
}
