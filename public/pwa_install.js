// PWA Install Prompt Handler for TBBT Idle Gang
(function() {
    'use strict';

    var deferredPrompt = null;
    var DISMISS_KEY = 'pwa_install_dismissed_at';
    var DISMISS_DAYS = 7;

    // Listen for the browser's install prompt
    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;
        // Schedule showing the banner after 30 seconds of gameplay
        setTimeout(function() {
            maybeShowBanner();
        }, 30000);
    });

    // Check if dismissed recently
    function wasDismissedRecently() {
        var dismissed = localStorage.getItem(DISMISS_KEY);
        if (!dismissed) return false;
        var dismissedAt = parseInt(dismissed, 10);
        var daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        return daysSince < DISMISS_DAYS;
    }

    // Record dismissal
    function recordDismissal() {
        localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }

    // Remove the banner
    function removeBanner() {
        var banner = document.getElementById('pwa-install-banner');
        if (banner) {
            banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(-100%)';
            setTimeout(function() {
                if (banner.parentNode) banner.parentNode.removeChild(banner);
            }, 350);
        }
    }

    // Maybe show the install banner
    function maybeShowBanner() {
        if (!deferredPrompt) return;
        if (wasDismissedRecently()) return;
        // Don't show if already installed (standalone mode)
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return;
        if (window.navigator.standalone === true) return;

        // Create the banner
        var banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        banner.style.cssText = [
            'position: fixed',
            'top: 30px',
            'left: 0',
            'right: 0',
            'z-index: 55',
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'gap: 10px',
            'padding: 8px 14px',
            'background: linear-gradient(90deg, #2a1a0e, #4a2e18, #2a1a0e)',
            'border-bottom: 2px solid rgba(180, 130, 60, 0.5)',
            'box-shadow: 0 2px 12px rgba(0, 0, 0, 0.6)',
            'font-family: inherit',
            'animation: pwa-banner-slide-in 0.4s ease-out'
        ].join('; ') + ';';

        // Message
        var msg = document.createElement('span');
        msg.textContent = 'Install TBBT Idle for the best experience';
        msg.style.cssText = 'color: #d4a94a; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;';

        // Install button
        var installBtn = document.createElement('button');
        installBtn.textContent = 'Install';
        installBtn.style.cssText = [
            'background: linear-gradient(135deg, #b48c3c, #d4a94a)',
            'color: #1a100a',
            'border: 1px solid #d4a94a',
            'border-radius: 6px',
            'padding: 4px 14px',
            'font-size: 10px',
            'font-weight: 800',
            'text-transform: uppercase',
            'letter-spacing: 0.5px',
            'cursor: pointer',
            'transition: all 0.15s ease',
            'box-shadow: 0 0 8px rgba(180, 130, 60, 0.3)'
        ].join('; ') + ';';
        installBtn.onmouseover = function() { installBtn.style.filter = 'brightness(1.2)'; };
        installBtn.onmouseout = function() { installBtn.style.filter = 'brightness(1)'; };
        installBtn.onclick = function() {
            showInstallPrompt();
        };

        // Dismiss button
        var dismissBtn = document.createElement('button');
        dismissBtn.textContent = '\u2715';
        dismissBtn.style.cssText = [
            'background: none',
            'border: none',
            'color: rgba(255, 255, 255, 0.4)',
            'font-size: 14px',
            'cursor: pointer',
            'padding: 2px 6px',
            'line-height: 1',
            'transition: color 0.15s'
        ].join('; ') + ';';
        dismissBtn.onmouseover = function() { dismissBtn.style.color = 'rgba(255,255,255,0.9)'; };
        dismissBtn.onmouseout = function() { dismissBtn.style.color = 'rgba(255,255,255,0.4)'; };
        dismissBtn.onclick = function() {
            recordDismissal();
            removeBanner();
        };

        banner.appendChild(msg);
        banner.appendChild(installBtn);
        banner.appendChild(dismissBtn);

        // Inject slide-in animation
        if (!document.getElementById('pwa-banner-style')) {
            var style = document.createElement('style');
            style.id = 'pwa-banner-style';
            style.textContent = '@keyframes pwa-banner-slide-in { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }';
            document.head.appendChild(style);
        }

        document.body.appendChild(banner);
    }

    // Global install prompt function
    function showInstallPrompt() {
        if (!deferredPrompt) {
            console.log('[PWA] No install prompt available');
            return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                console.log('[PWA] User accepted install');
            } else {
                console.log('[PWA] User dismissed install');
                recordDismissal();
            }
            deferredPrompt = null;
            removeBanner();
        });
    }

    // Export globally
    window.showInstallPrompt = showInstallPrompt;

    // If app is already installed, log it
    window.addEventListener('appinstalled', function() {
        console.log('[PWA] App installed successfully');
        deferredPrompt = null;
        removeBanner();
    });
})();
