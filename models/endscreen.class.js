class Endscreen {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.onload = () => {
            console.log(`[Endscreen] ✅ Image loaded: ${this.image.src}`);
        };
        this.image.onerror = () => {
            console.warn(`[Endscreen] ⚠️ Failed to load: ${imageSrc}. Fallback used.`);
            this.image.src = 'img/defaultEndscreen.png';
        };
    
        this.image.src = imageSrc || 'img/defaultEndscreen.png';
        this.visible = false;
    }
    

    getImagePath(type) {
        const images = {
            win: 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Try again/Mesa de trabajo 1.png',
            lose: 'img/Alternative_Grafiken-Sharkie/Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png'
        };
        return images[type] || images.lose;
    }

    show() {
        this.visible = true;
        const restartButton = document.getElementById('restartButton');
        const backHomeButton = document.getElementById('backHomeButton');
    
        if (restartButton && backHomeButton) {
            restartButton.style.display = 'block';
            backHomeButton.style.display = 'block';
            console.log('[Endscreen] Buttons sichtbar gemacht');
        }
    }
    

    hide() {
        this.visible = false;
        this.toggleButtons(false);
        console.log('[Endscreen] Screen hidden.');
    }

    toggleButtons(show) {
        const restartBtn = document.getElementById('restartButton');
        const backBtn = document.getElementById('backHomeButton');
        if (restartBtn && backBtn) {
            restartBtn.style.display = show ? 'block' : 'none';
            backBtn.style.display = show ? 'block' : 'none';
        }
    }

    draw(ctx) {
        if (!this.visible) return;

        // Draw semi-transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw endscreen image centered
        const imgW = 520;
        const imgH = 100;
        const x = (ctx.canvas.width - imgW) / 2;
        const y = (ctx.canvas.height - imgH) / 2;

        ctx.drawImage(this.image, x, y, imgW, imgH);
    }
}
