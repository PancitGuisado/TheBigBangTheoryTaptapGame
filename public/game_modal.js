// ============================================================
// GAME MODAL SYSTEM - Replaces native alert() and confirm()
// Matches the pixel-art retro sci-fi aesthetic of the game
// using exactly the same Tailwind CSS classes as the rest of the UI
// ============================================================

(function() {
    // Create the overlay container
    var overlay = document.createElement('div');
    overlay.id = 'game-modal-overlay';
    // Use the exact classes used by #lineup-editor-modal
    overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100000] hidden p-2';
    
    // Close on background click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeGameModal();
    });

    // Append to body
    document.body.appendChild(overlay);

    // Icon map
    var iconMap = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️',
        'confirm': '❓',
        'coming soon': '🚀',
        'action blocked': '🚫',
        'leave guild': '🚪',
        'join guild': '⚔️',
        'pvp': '🏆'
    };

    function getIcon(title) {
        var lower = (title || '').toLowerCase();
        for (var key in iconMap) {
            if (lower.indexOf(key) !== -1) return iconMap[key];
        }
        return '📢';
    }

    function openGameModal(title, message, buttons) {
        overlay.innerHTML = ''; // Clear previous

        // Main box
        var box = document.createElement('div');
        box.className = 'bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/50 rounded-xl w-full max-w-sm overflow-hidden flex flex-col shadow-[0_0_60px_rgba(245,158,11,0.2)] transform transition-all scale-95 opacity-0';
        box.style.transitionDuration = '150ms';
        
        // Header
        var header = document.createElement('div');
        header.className = 'bg-gradient-to-r from-amber-950 to-slate-900 border-b-2 border-amber-800 p-3 flex justify-between items-center shrink-0';
        
        var headerLeft = document.createElement('div');
        headerLeft.className = 'flex items-center gap-2';
        
        var titleEl = document.createElement('h2');
        titleEl.className = 'text-amber-400 font-black text-sm tracking-widest uppercase';
        titleEl.style.textShadow = '0 0 10px rgba(245,158,11,0.5)';
        titleEl.innerHTML = getIcon(title) + ' ' + title;
        
        headerLeft.appendChild(titleEl);
        
        var closeBtn = document.createElement('button');
        closeBtn.className = 'text-gray-400 hover:text-white text-xl p-1 leading-none font-sans';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeGameModal;
        
        header.appendChild(headerLeft);
        header.appendChild(closeBtn);
        
        // Body
        var body = document.createElement('div');
        body.className = 'p-5 text-[11px] text-gray-300 text-center leading-relaxed font-bold tracking-wide';
        body.innerHTML = message;
        
        // Footer (Actions)
        var footer = document.createElement('div');
        footer.className = 'p-3 bg-black/60 border-t border-slate-800 flex justify-center gap-3 shrink-0 flex-wrap';
        
        buttons.forEach(function(btn) {
            var b = document.createElement('button');
            
            // Apply exact Tailwind classes based on button type
            if (btn.type === 'primary') {
                b.className = 'flex-1 bg-gradient-to-b from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-black py-2.5 px-3 rounded border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-[10px] tracking-wider transition-all uppercase';
            } else if (btn.type === 'danger') {
                b.className = 'flex-1 bg-gradient-to-b from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-black py-2.5 px-3 rounded border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-[10px] tracking-wider transition-all uppercase';
            } else {
                // Cancel / Secondary
                b.className = 'flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-3 rounded border border-slate-500 text-[10px] tracking-wider transition-all uppercase';
            }
            
            b.textContent = btn.label;
            b.onclick = function() {
                closeGameModal();
                if (btn.cb) setTimeout(btn.cb, 50);
            };
            footer.appendChild(b);
        });
        
        // Assemble
        box.appendChild(header);
        box.appendChild(body);
        box.appendChild(footer);
        overlay.appendChild(box);
        
        // Show
        overlay.classList.remove('hidden');
        
        // Animate in
        requestAnimationFrame(function() {
            box.classList.remove('scale-95', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
        });

        // Play sound if available
        if (typeof SoundManager !== 'undefined' && SoundManager.play) {
            SoundManager.play('click');
        }
    }

    function closeGameModal() {
        var box = overlay.querySelector('div');
        if (box) {
            box.classList.remove('scale-100', 'opacity-100');
            box.classList.add('scale-95', 'opacity-0');
            setTimeout(function() {
                overlay.classList.add('hidden');
            }, 150);
        } else {
            overlay.classList.add('hidden');
        }
    }

    // ---- PUBLIC API ----

    window.showGameAlert = function(title, message, onOk) {
        openGameModal(title, message, [
            { label: 'OK', type: 'primary', cb: onOk || null }
        ]);
    };

    window.showGameConfirm = function(title, message, onConfirm, onCancel) {
        var confirmType = 'primary';
        var t = (title || '').toLowerCase();
        if (t.indexOf('leave') !== -1 || t.indexOf('delete') !== -1) {
            confirmType = 'danger';
        }

        openGameModal(title, message, [
            { label: 'Confirm', type: confirmType, cb: onConfirm || null },
            { label: 'Cancel', type: 'cancel', cb: onCancel || null }
        ]);
    };

})();
