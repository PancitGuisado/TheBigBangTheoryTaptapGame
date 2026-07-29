// ============================================================
// FORMATION PRESETS — Save/Load up to 3 formation layouts
// Relies on global: state, saveProgress(), showGameAlert(),
//   syncFormationToEquipped(), SoundManager
// ============================================================

(function() {

    // ----- STATE INIT -----
    function initFormationPresets() {
        if (!state.formationPresets) {
            state.formationPresets = [
                { name: 'Preset 1', formation: null },
                { name: 'Preset 2', formation: null },
                { name: 'Preset 3', formation: null }
            ];
        }
        // Ensure 3 slots always exist
        while (state.formationPresets.length < 3) {
            state.formationPresets.push({ name: 'Preset ' + (state.formationPresets.length + 1), formation: null });
        }
    }

    // ----- DEEP COPY helper -----
    function _deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    // ----- SAVE -----
    function saveFormationPreset(slotIndex) {
        initFormationPresets();
        if (slotIndex < 0 || slotIndex >= 3) return;
        if (!state.formation) {
            if (typeof showGameAlert === 'function') showGameAlert('No Formation', 'Set up a formation first before saving.');
            return;
        }
        state.formationPresets[slotIndex].formation = _deepCopy(state.formation);
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') {
            showGameAlert('Preset Saved! 💾', 'Formation saved to "' + state.formationPresets[slotIndex].name + '".');
        }
        saveProgress();
        _refreshPresetUI();
    }

    // ----- LOAD -----
    function loadFormationPreset(slotIndex) {
        initFormationPresets();
        if (slotIndex < 0 || slotIndex >= 3) return;
        var preset = state.formationPresets[slotIndex];
        if (!preset.formation) {
            if (typeof showGameAlert === 'function') showGameAlert('Empty Preset', 'This preset slot is empty. Save a formation first.');
            return;
        }
        state.formation = _deepCopy(preset.formation);
        if (typeof syncFormationToEquipped === 'function') syncFormationToEquipped();
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('purchase');
        if (typeof showGameAlert === 'function') {
            showGameAlert('Preset Loaded! 📋', 'Loaded formation "' + preset.name + '".');
        }
        saveProgress();
        if (typeof syncUI === 'function') syncUI();
        _refreshPresetUI();
    }

    // ----- CLEAR -----
    function clearFormationPreset(slotIndex) {
        initFormationPresets();
        if (slotIndex < 0 || slotIndex >= 3) return;
        state.formationPresets[slotIndex].formation = null;
        state.formationPresets[slotIndex].name = 'Preset ' + (slotIndex + 1);
        if (typeof SoundManager !== 'undefined') SoundManager.playFX('click');
        saveProgress();
        _refreshPresetUI();
    }

    // ----- RENAME -----
    function renameFormationPreset(slotIndex, newName) {
        initFormationPresets();
        if (slotIndex < 0 || slotIndex >= 3) return;
        var clean = String(newName || '').replace(/[<>"&]/g, '').trim();
        if (!clean) clean = 'Preset ' + (slotIndex + 1);
        if (clean.length > 16) clean = clean.substring(0, 16);
        state.formationPresets[slotIndex].name = clean;
        saveProgress();
        _refreshPresetUI();
    }

    // ----- PROMPT RENAME -----
    function _promptRename(slotIndex) {
        initFormationPresets();
        var current = state.formationPresets[slotIndex].name;
        // Build a small inline rename modal
        var existing = document.getElementById('preset-rename-modal');
        if (existing) existing.remove();

        var modal = document.createElement('div');
        modal.id = 'preset-rename-modal';
        modal.className = 'fixed inset-0 flex items-center justify-center';
        modal.style.cssText = 'z-index:9500;';
        modal.innerHTML =
            '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);" onclick="document.getElementById(\'preset-rename-modal\').remove()"></div>' +
            '<div style="position:relative;background:rgba(15,23,42,0.97);border:2px solid rgba(245,158,11,0.4);border-radius:12px;padding:20px;max-width:300px;width:90%;">' +
                '<div style="font-family:\'Press Start 2P\',monospace;font-size:10px;color:#f59e0b;margin-bottom:12px;text-transform:uppercase;">Rename Preset</div>' +
                '<input id="preset-rename-input" type="text" maxlength="16" value="' + current + '" style="width:100%;background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:white;padding:8px;font-size:12px;margin-bottom:12px;outline:none;box-sizing:border-box;" />' +
                '<div style="display:flex;gap:8px;">' +
                    '<button onclick="document.getElementById(\'preset-rename-modal\').remove();" style="flex:1;background:#334155;color:#9ca3af;border:1px solid #475569;border-radius:6px;padding:6px;font-size:10px;font-weight:bold;cursor:pointer;text-transform:uppercase;">Cancel</button>' +
                    '<button onclick="var v=document.getElementById(\'preset-rename-input\').value; renameFormationPreset(' + slotIndex + ',v); document.getElementById(\'preset-rename-modal\').remove();" style="flex:1;background:#d97706;color:white;border:1px solid #f59e0b;border-radius:6px;padding:6px;font-size:10px;font-weight:bold;cursor:pointer;text-transform:uppercase;">Save</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(modal);
        var inp = document.getElementById('preset-rename-input');
        if (inp) { inp.focus(); inp.select(); }
    }

    // ----- RENDER PRESET BUTTONS -----
    function renderPresetButtons() {
        initFormationPresets();
        var html = '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">';

        for (var i = 0; i < 3; i++) {
            var preset = state.formationPresets[i];
            var isFilled = preset.formation !== null;
            var name = preset.name || ('Preset ' + (i + 1));

            if (isFilled) {
                // Filled slot: solid amber border, load on click
                html +=
                    '<div style="position:relative;display:inline-flex;">' +
                        '<button onclick="loadFormationPreset(' + i + ')" ' +
                            'style="background:rgba(120,53,15,0.35);border:2px solid #d97706;border-radius:8px;padding:4px 10px 4px 8px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:all 0.15s;" ' +
                            'onmouseover="this.style.background=\'rgba(120,53,15,0.55)\'" onmouseout="this.style.background=\'rgba(120,53,15,0.35)\'" ' +
                            'title="Click to load: ' + name + '">' +
                            '<span style="font-size:12px;">📋</span>' +
                            '<span style="color:#fbbf24;font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + name + '</span>' +
                        '</button>' +
                        '<button onclick="event.stopPropagation(); _promptRename(' + i + ');" ' +
                            'style="position:absolute;top:-4px;left:-4px;background:#334155;border:1px solid #475569;border-radius:50%;width:14px;height:14px;color:#9ca3af;font-size:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;" ' +
                            'title="Rename preset">✎</button>' +
                        '<button onclick="event.stopPropagation(); clearFormationPreset(' + i + ');" ' +
                            'style="position:absolute;top:-4px;right:-4px;background:#7f1d1d;border:1px solid #991b1b;border-radius:50%;width:14px;height:14px;color:#fca5a5;font-size:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;" ' +
                            'title="Clear preset">✕</button>' +
                    '</div>';
            } else {
                // Empty slot: dashed border, save on click
                html +=
                    '<button onclick="saveFormationPreset(' + i + ')" ' +
                        'style="background:rgba(30,41,59,0.5);border:2px dashed rgba(255,255,255,0.15);border-radius:8px;padding:4px 10px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:all 0.15s;" ' +
                        'onmouseover="this.style.borderColor=\'rgba(245,158,11,0.5)\';this.style.background=\'rgba(30,41,59,0.7)\'" ' +
                        'onmouseout="this.style.borderColor=\'rgba(255,255,255,0.15)\';this.style.background=\'rgba(30,41,59,0.5)\'" ' +
                        'title="Save current formation to slot ' + (i + 1) + '">' +
                        '<span style="font-size:12px;">💾</span>' +
                        '<span style="color:#6b7280;font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;">Save ' + (i + 1) + '</span>' +
                    '</button>';
            }
        }

        html += '</div>';
        return html;
    }

    // ----- HTML FOR EMBEDDING -----
    function getPresetButtonsHTML() {
        return '<div style="margin:8px 0;">' +
            '<div style="font-size:9px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;font-weight:bold;margin-bottom:6px;">⚡ Formation Presets</div>' +
            '<div id="formation-presets-container">' + renderPresetButtons() + '</div>' +
        '</div>';
    }

    // ----- REFRESH (re-render in place if container exists) -----
    function _refreshPresetUI() {
        var container = document.getElementById('formation-presets-container');
        if (container) {
            container.innerHTML = renderPresetButtons();
        }
    }

    // ----- EXPOSE TO WINDOW -----
    window.initFormationPresets = initFormationPresets;
    window.saveFormationPreset = saveFormationPreset;
    window.loadFormationPreset = loadFormationPreset;
    window.clearFormationPreset = clearFormationPreset;
    window.renameFormationPreset = renameFormationPreset;
    window.renderPresetButtons = renderPresetButtons;
    window.getPresetButtonsHTML = getPresetButtonsHTML;
    window._promptRename = _promptRename;

})();
