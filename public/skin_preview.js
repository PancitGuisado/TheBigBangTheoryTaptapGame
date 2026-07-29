// ============================================================
// SKIN PREVIEW — Animated preview in character modal
// Shows idle, attack, and injured animations with toggle
// ============================================================
(function() {
    'use strict';

    var _previewState = 'idle';
    var _previewInterval = null;
    var _previewCharKey = null;

    // Get SVG for a character in a specific state
    function getCharSVG(charKey, state) {
        // Check ysCharVectorsA / ysCharVectorsB
        if (typeof ysCharVectorsA !== 'undefined' && ysCharVectorsA[charKey] && ysCharVectorsA[charKey][state]) {
            return ysCharVectorsA[charKey][state];
        }
        if (typeof ysCharVectorsB !== 'undefined' && ysCharVectorsB[charKey] && ysCharVectorsB[charKey][state]) {
            return ysCharVectorsB[charKey][state];
        }
        // Check main vectors
        if (typeof vectors !== 'undefined' && vectors[charKey + '_' + state]) {
            return vectors[charKey + '_' + state];
        }
        if (typeof vectors !== 'undefined' && vectors[charKey]) {
            if (typeof vectors[charKey] === 'object' && vectors[charKey][state]) {
                return vectors[charKey][state];
            }
            if (state === 'idle') return vectors[charKey];
        }
        return null;
    }

    // Create preview controls HTML
    function createPreviewControls() {
        return `
            <div id="skin-preview-controls" class="flex justify-center gap-1 mt-2">
                <button onclick="window.setSkinPreviewState('idle')" id="preview-btn-idle"
                    class="px-3 py-1 rounded text-[9px] font-bold cursor-pointer border transition-all bg-emerald-900/60 text-emerald-400 border-emerald-700">
                    🧍 IDLE
                </button>
                <button onclick="window.setSkinPreviewState('attack')" id="preview-btn-attack"
                    class="px-3 py-1 rounded text-[9px] font-bold cursor-pointer border transition-all bg-slate-900/60 text-slate-400 border-slate-700 hover:bg-slate-800">
                    ⚔️ ATTACK
                </button>
                <button onclick="window.setSkinPreviewState('injured')" id="preview-btn-injured"
                    class="px-3 py-1 rounded text-[9px] font-bold cursor-pointer border transition-all bg-slate-900/60 text-slate-400 border-slate-700 hover:bg-slate-800">
                    💥 INJURED
                </button>
                <button onclick="window.setSkinPreviewState('auto')" id="preview-btn-auto"
                    class="px-3 py-1 rounded text-[9px] font-bold cursor-pointer border transition-all bg-slate-900/60 text-slate-400 border-slate-700 hover:bg-slate-800">
                    🔄 AUTO
                </button>
            </div>
        `;
    }

    // Set preview state
    window.setSkinPreviewState = function(newState) {
        _previewState = newState;

        // Clear auto-cycle
        if (_previewInterval) { clearInterval(_previewInterval); _previewInterval = null; }

        if (newState === 'auto') {
            var states = ['idle', 'attack', 'injured'];
            var idx = 0;
            _previewInterval = setInterval(function() {
                idx = (idx + 1) % states.length;
                updatePreviewDisplay(states[idx]);
                highlightPreviewBtn(states[idx]);
            }, 1200);
            highlightPreviewBtn('auto');
        } else {
            updatePreviewDisplay(newState);
            highlightPreviewBtn(newState);
        }
    };

    function highlightPreviewBtn(activeState) {
        var btns = ['idle', 'attack', 'injured', 'auto'];
        var activeClass = 'px-3 py-1 rounded text-[9px] font-bold cursor-pointer border transition-all bg-emerald-900/60 text-emerald-400 border-emerald-700';
        var inactiveClass = 'px-3 py-1 rounded text-[9px] font-bold cursor-pointer border transition-all bg-slate-900/60 text-slate-400 border-slate-700 hover:bg-slate-800';

        btns.forEach(function(btnState) {
            var btn = document.getElementById('preview-btn-' + btnState);
            if (btn) btn.className = (btnState === activeState) ? activeClass : inactiveClass;
        });
    }

    function updatePreviewDisplay(displayState) {
        var container = document.getElementById('skin-preview-display');
        if (!container || !_previewCharKey) return;

        var svg = getCharSVG(_previewCharKey, displayState);
        if (!svg) svg = getCharSVG(_previewCharKey, 'idle');
        if (!svg) return;

        // Smooth transition
        container.style.opacity = '0';
        container.style.transform = 'scale(0.9)';
        setTimeout(function() {
            container.innerHTML = svg;
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 150);
    }

    // Inject preview into the character modal
    window.injectSkinPreview = function(charKey) {
        _previewCharKey = charKey;
        _previewState = 'idle';
        if (_previewInterval) { clearInterval(_previewInterval); _previewInterval = null; }

        // Find the modal character display area
        var modalSvg = document.getElementById('modal-char-svg');
        if (!modalSvg) return;

        // Check if preview controls already exist
        var existing = document.getElementById('skin-preview-controls');
        if (existing) existing.remove();

        // Wrap the SVG in a preview container if not already
        if (!document.getElementById('skin-preview-display')) {
            modalSvg.id = 'skin-preview-display';
            modalSvg.style.transition = 'opacity 0.15s, transform 0.15s';
        }

        // Insert controls after the SVG
        var controlsDiv = document.createElement('div');
        controlsDiv.innerHTML = createPreviewControls();
        var previewDisplay = document.getElementById('skin-preview-display');
        if (previewDisplay && previewDisplay.parentNode) {
            previewDisplay.parentNode.insertBefore(controlsDiv.firstElementChild, previewDisplay.nextSibling);
        }
    };

    // Clean up on modal close
    window.cleanupSkinPreview = function() {
        if (_previewInterval) { clearInterval(_previewInterval); _previewInterval = null; }
        _previewCharKey = null;
        _previewState = 'idle';
    };

    console.log('[SkinPreview] Animated skin preview system loaded');
})();
