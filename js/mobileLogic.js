document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnLeft').addEventListener('touchstart', () => keyboard.LEFT = true);
    document.getElementById('btnLeft').addEventListener('touchend', () => keyboard.LEFT = false);

    document.getElementById('btnRight').addEventListener('touchstart', () => keyboard.RIGHT = true);
    document.getElementById('btnRight').addEventListener('touchend', () => keyboard.RIGHT = false);

    document.getElementById('btnJump').addEventListener('touchstart', () => keyboard.UP = true);
    document.getElementById('btnJump').addEventListener('touchend', () => keyboard.UP = false);

    document.getElementById('btnAttack').addEventListener('touchstart', () => keyboard.SPACE = true);
    document.getElementById('btnAttack').addEventListener('touchend', () => keyboard.SPACE = false);

    document.getElementById('btnSlap').addEventListener('touchstart', () => keyboard.D = true);
    document.getElementById('btnSlap').addEventListener('touchend', () => keyboard.D = false);

    // TouchControls initialisieren bei Mobile
    if (isMobileDevice()) {
        document.getElementById('touchControls').style.display = 'flex';
    }
});

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function bindTouchControls() {
    const keys = [
        { id: 'btnLeft', prop: 'LEFT' },
        { id: 'btnRight', prop: 'RIGHT' },
        { id: 'btnJump', prop: 'UP' },
        { id: 'btnAttack', prop: 'SPACE' },
        { id: 'btnSlap', prop: 'D' }
    ];

    keys.forEach(key => {
        const button = document.getElementById(key.id);
        if (button) {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                keyboard[key.prop] = true;
            }, { passive: false });

            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                keyboard[key.prop] = false;
            }, { passive: false });
        } else {
            console.warn(`Touch Button with id '${key.id}' not found.`);
        }
    });
}

function onLoadHandler() {
    if (isMobileDevice()) {
        showOrientationPopup();
    } else {
        console.log('Normales Laden, Desktop oder Tablet Querformat.');
    }
}

function showOrientationPopup() {
    const popup = document.createElement('div');
    popup.id = 'orientationPopup';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.backgroundColor = 'rgba(0,0,0,0.8)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '99999';
    popup.innerHTML = `
        <div style="color: white; text-align: center; font-size: 24px; font-family: swimmingPool;">
            <p>Bitte drehe dein Handy ins Querformat,<br> um Sharky richtig spielen zu können!</p>
        </div>
    `;
    document.body.appendChild(popup);
}

function closeOrientationPopup() {
    const popup = document.getElementById('orientationPopup');
    if (popup) {
        popup.remove();
    }
}
