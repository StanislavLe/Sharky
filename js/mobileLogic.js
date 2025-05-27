let lastOrientation = null;

document.addEventListener('DOMContentLoaded', () => {
    bindTouchControls();
});

/**
 * Prüft, ob das aktuelle Gerät ein mobiles Gerät ist.
 * @returns {boolean} true, wenn es sich um ein mobiles Gerät handelt.
 */
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Bindet die Touch-Steuerung an die entsprechenden Buttons.
 * @function
 */
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

/**
 * Initialisiert die Überwachung der Bildschirmorientierung und setzt Event-Listener.
 * @function
 */
function onLoadHandler() {
    window.addEventListener('resize', () => setTimeout(handleOrientationChange, 100));
    window.addEventListener('orientationchange', () => setTimeout(handleOrientationChange, 100));
    handleOrientationChange(); 
    startOrientationMonitor();
}

/**
 * Zeigt das Popup an, das den Nutzer auffordert, das Gerät ins Querformat zu drehen.
 * @function
 */
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

/**
 * Versteckt das Orientierungs-Popup.
 * @function
 */
function hideOrientationPopup() {
    const popup = document.getElementById('orientationPopup');
    if (popup) {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }
}

/**
 * Behandelt Änderungen der Bildschirmorientierung und zeigt/versteckt die Touch-Steuerung und das Popup.
 * @function
 */
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
        hideOrientationPopup();
        if (touchControls) touchControls.style.display = 'none';
    }
    
}

/**
 * Startet einen Intervall, der die Bildschirmorientierung überwacht und bei Änderung handleOrientationChange aufruft.
 * @function
 */
function startOrientationMonitor() {
    setInterval(() => {
        const isLandscapeNow = window.innerWidth > window.innerHeight;
        if (lastOrientation !== isLandscapeNow) {
            lastOrientation = isLandscapeNow;
            handleOrientationChange();
        }
    }, 500);
}