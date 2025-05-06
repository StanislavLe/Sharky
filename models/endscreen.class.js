class Endscreen {
    constructor(imageSrc) {
        this.image = new Image();
        this.image.onload = () => {
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
        const endScreenButtons = document.getElementById('endScreenButtons');
        if (restartButton && backHomeButton && endScreenButtons) {
            restartButton.style.display = 'block';
            backHomeButton.style.display = 'block';
            restartButton.style.visibility = 'visible';
            backHomeButton.style.visibility = 'visible';
                endScreenButtons.classList.remove('winButtons', 'loseButtons');
                const isWin = this.image.src.includes('trabajo');
            if (isWin) {
                endScreenButtons.classList.add('winButtons');
            } else {
                endScreenButtons.classList.add('loseButtons');
            }
            endScreenButtons.style.display = 'flex';
            endScreenButtons.style.zIndex = '1000';
            endScreenButtons.style.opacity = '1';
            }
    }
    

    hide() {
        this.visible = false;
        this.toggleButtons(false);
    }


    toggleButtons(show) {
        const restartBtn = document.getElementById('restartButton');
        const backBtn = document.getElementById('backHomeButton');
        if (restartBtn && backBtn) {
            restartBtn.style.display = show ? 'block' : 'none';
            backBtn.style.display = show ? 'block' : 'none';
            restartBtn.style.visibility = show ? 'visible' : 'hidden';
            backBtn.style.visibility = show ? 'visible' : 'hidden';
        }
    }


    draw(ctx) {
        if (!this.visible) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            let imgW = 520;
        let imgH = 100;
        if (this.image.src.includes('trabajo')) {
            imgW = 720;
            imgH = 480;
        }
        const x = (ctx.canvas.width - imgW) / 2;
        const y = (ctx.canvas.height - imgH) / 2;
        ctx.drawImage(this.image, x, y, imgW, imgH);
    }
    
}
