document.addEventListener('DOMContentLoaded', () => {
    bindTouchControls();
});

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
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
    window.addEventListener('resize', () => setTimeout(handleOrientationChange, 100));
    window.addEventListener('orientationchange', () => setTimeout(handleOrientationChange, 100));
    handleOrientationChange(); // Direkt prüfen
    startOrientationMonitor(); // NEU: Rotation regelmäßig prüfen
}


function showOrientationPopup() {
    let popup = document.getElementById('orientationPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'orientationPopup';
        popup.innerHTML = `
            <div class="popup-content">
                <p>Bitte drehe dein Handy ins Querformat,<br> um Sharky richtig spielen zu können!</p>
            </div>
        `;
        document.body.appendChild(popup);
    }
    popup.classList.remove('hidden');
    popup.classList.add('visible');
}

function hideOrientationPopup() {
    const popup = document.getElementById('orientationPopup');
    if (popup) {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }
}

function handleOrientationChange() {
    const isLandscape = screen.orientation
        ? screen.orientation.type.startsWith('landscape')
        : window.innerWidth > window.innerHeight;

    const isMobile = isMobileDevice();
    const touchControls = document.getElementById('touchControls');

    if (isMobile) {
        if (isLandscape) {
            hideOrientationPopup();
            if (touchControls) touchControls.style.display = 'flex';
        } else {
            showOrientationPopup();
            if (touchControls) touchControls.style.display = 'none';
        }
    } else {
        // Desktop: Immer Popup und TouchControls verstecken
        hideOrientationPopup();
        if (touchControls) touchControls.style.display = 'none';
    }
}


let lastOrientation = null;

function startOrientationMonitor() {
    setInterval(() => {
        const isLandscapeNow = window.innerWidth > window.innerHeight;
        if (lastOrientation !== isLandscapeNow) {
            lastOrientation = isLandscapeNow;
            handleOrientationChange();
        }
    }, 500); // alle 500ms prüfen
}

