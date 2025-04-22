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
        const buttons = document.getElementById('endScreenButtons');
        if (buttons) {
            buttons.style.display = 'flex';
        }
    }

    hide() {
        this.visible = false;
        const buttons = document.getElementById('endScreenButtons');
        if (buttons) {
            buttons.style.display = 'none';
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
