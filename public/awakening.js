// ============================================================
// CHARACTER AWAKENING SYSTEM
// Relies on global: state, characters, saveProgress(), showToast(),
//   showGameAlert(), SoundManager
// ============================================================

(function () {
  'use strict';

  /* ─────────────── CONSTANTS ─────────────── */

  var AWAKEN_COST_DIAMONDS = 5000;
  var AWAKEN_COST_SHARDS   = 100;
  var MAX_LEVEL            = 100;

  /* ─── Unique ultimate abilities per character ─── */
  var ULTIMATE_ABILITIES = {
    sheldon: {
      name: 'Bazinga Blast',
      desc: '500% DMG nuke every 30s',
      icon: '💥',
      color: '#22d3ee',
      dmgMult: 5.0,
      cooldown: 30,
      type: 'nuke'
    },
    leonard: {
      name: 'Experimental Laser',
      desc: 'Piercing beam hits all enemies',
      icon: '🔬',
      color: '#a78bfa',
      dmgMult: 2.5,
      cooldown: 25,
      type: 'pierce'
    },
    penny: {
      name: 'Nebraska Fury',
      desc: '3x attack speed for 10s',
      icon: '🌪️',
      color: '#f472b6',
      atkSpeedMult: 3.0,
      duration: 10,
      cooldown: 35,
      type: 'atkSpeed'
    },
    howard: {
      name: 'Space Station Strike',
      desc: 'Orbital bombardment AOE',
      icon: '🛰️',
      color: '#fb923c',
      dmgMult: 4.0,
      cooldown: 28,
      type: 'aoe'
    },
    raj: {
      name: 'Bollywood Dance',
      desc: 'Team-wide ATK buff 20% for 15s',
      icon: '💃',
      color: '#facc15',
      buffPct: 0.20,
      duration: 15,
      cooldown: 40,
      type: 'teamBuff'
    },
    amy: {
      name: 'Neural Network',
      desc: 'Heals entire team 30% HP',
      icon: '🧠',
      color: '#34d399',
      healPct: 0.30,
      cooldown: 35,
      type: 'teamHeal'
    },
    bernie: {
      name: 'Microbe Swarm',
      desc: 'DOT poison on all enemies',
      icon: '🦠',
      color: '#a3e635',
      dotPct: 0.05,
      dotDuration: 8,
      cooldown: 30,
      type: 'dot'
    },
    stuart: {
      name: 'Comic Book Slash',
      desc: 'Critical guaranteed for 5s',
      icon: '📕',
      color: '#f87171',
      duration: 5,
      cooldown: 25,
      type: 'critBoost'
    }
  };

  // Generic ultimate for any character not explicitly defined
  var GENERIC_ULTIMATE = {
    name: 'Awakened Strike',
    desc: '300% DMG burst',
    icon: '⭐',
    color: '#fbbf24',
    dmgMult: 3.0,
    cooldown: 30,
    type: 'nuke'
  };

  /* ─────────────── CSS INJECTION ─────────────── */

  var STYLE_ID = 'awakening-styles';

  function _injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      /* Star badge on portrait */
      '.awaken-star{position:absolute;top:-4px;right:-4px;font-size:16px;filter:drop-shadow(0 0 6px rgba(250,204,21,0.8));z-index:5;animation:awaken-star-pulse 2s ease-in-out infinite;}' +
      '@keyframes awaken-star-pulse{0%,100%{transform:scale(1);filter:drop-shadow(0 0 6px rgba(250,204,21,0.8))}50%{transform:scale(1.2);filter:drop-shadow(0 0 12px rgba(250,204,21,1))}}' +

      /* Modal overlay */
      '.awaken-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(8px);z-index:9800;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;padding:12px;}' +
      '.awaken-overlay.active{opacity:1;}' +

      /* Modal card */
      '.awaken-modal{background:linear-gradient(145deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%);border:2px solid rgba(250,204,21,0.4);border-radius:16px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 0 80px rgba(250,204,21,0.15),inset 0 1px 0 rgba(255,255,255,0.05);transform:scale(0.9);transition:transform 0.3s ease;}' +
      '.awaken-overlay.active .awaken-modal{transform:scale(1);}' +

      /* Header */
      '.awaken-header{background:linear-gradient(to right,rgba(120,53,15,0.6),rgba(30,27,75,0.8));border-bottom:2px solid rgba(250,204,21,0.3);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-radius:16px 16px 0 0;}' +
      '.awaken-title{font-family:"Press Start 2P",monospace;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;text-shadow:0 0 12px rgba(250,204,21,0.6);}' +
      '.awaken-close{background:none;border:none;color:#9ca3af;font-size:20px;cursor:pointer;padding:4px 8px;line-height:1;transition:color 0.15s;}' +
      '.awaken-close:hover{color:#fff;}' +

      /* Character grid */
      '.awaken-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:10px;padding:16px;}' +

      /* Character card */
      '.awaken-char{position:relative;background:rgba(15,23,42,0.8);border:2px solid rgba(255,255,255,0.08);border-radius:12px;padding:10px 6px;text-align:center;cursor:pointer;transition:all 0.2s ease;}' +
      '.awaken-char:hover{border-color:rgba(250,204,21,0.4);transform:translateY(-2px);box-shadow:0 4px 20px rgba(250,204,21,0.1);}' +
      '.awaken-char.awakened{border-color:rgba(250,204,21,0.5);background:linear-gradient(135deg,rgba(120,53,15,0.25),rgba(15,23,42,0.8));}' +
      '.awaken-char.locked{opacity:0.4;cursor:not-allowed;}' +
      '.awaken-char-icon{font-size:28px;margin-bottom:4px;display:block;}' +
      '.awaken-char-name{font-size:8px;color:#d1d5db;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;}' +
      '.awaken-char-lvl{font-size:7px;color:#6b7280;margin-top:2px;}' +
      '.awaken-char-ult{font-size:7px;color:#fbbf24;margin-top:3px;font-weight:bold;}' +

      /* Detail panel */
      '.awaken-detail{background:rgba(15,23,42,0.95);border-top:2px solid rgba(250,204,21,0.2);padding:16px;border-radius:0 0 16px 16px;}' +
      '.awaken-detail-name{font-family:"Press Start 2P",monospace;font-size:10px;color:#fbbf24;text-align:center;margin-bottom:8px;text-shadow:0 0 8px rgba(250,204,21,0.5);}' +
      '.awaken-detail-ult{background:rgba(30,27,75,0.6);border:1px solid rgba(139,92,246,0.3);border-radius:10px;padding:12px;margin:10px 0;text-align:center;}' +
      '.awaken-detail-ult-name{font-size:12px;font-weight:900;margin-bottom:4px;}' +
      '.awaken-detail-ult-desc{font-size:10px;color:#a5b4fc;margin-top:4px;}' +
      '.awaken-cost-row{display:flex;align-items:center;justify-content:center;gap:16px;margin:12px 0;font-size:10px;color:#d1d5db;}' +
      '.awaken-cost-item{display:flex;align-items:center;gap:4px;padding:4px 10px;background:rgba(30,41,59,0.6);border-radius:6px;border:1px solid rgba(255,255,255,0.06);}' +
      '.awaken-cost-ok{color:#34d399;}' +
      '.awaken-cost-bad{color:#f87171;}' +

      /* Awaken button */
      '.awaken-btn{display:block;width:100%;margin-top:10px;padding:12px;border:2px solid;border-radius:10px;font-family:"Press Start 2P",monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;cursor:pointer;transition:all 0.2s ease;font-weight:bold;}' +
      '.awaken-btn-ready{background:linear-gradient(135deg,#b45309,#d97706);border-color:#fbbf24;color:#fff;box-shadow:0 0 20px rgba(250,204,21,0.3);}' +
      '.awaken-btn-ready:hover{box-shadow:0 0 40px rgba(250,204,21,0.5);transform:translateY(-1px);}' +
      '.awaken-btn-done{background:linear-gradient(135deg,#065f46,#047857);border-color:#34d399;color:#a7f3d0;cursor:default;}' +
      '.awaken-btn-locked{background:#1e293b;border-color:#334155;color:#4b5563;cursor:not-allowed;opacity:0.6;}' +

      /* Dramatic awakening animation */
      '@keyframes awaken-flash{0%{opacity:0}10%{opacity:1}30%{opacity:0.3}50%{opacity:1}70%{opacity:0.2}100%{opacity:0}}' +
      '.awaken-flash-overlay{position:fixed;inset:0;background:radial-gradient(circle,rgba(250,204,21,0.9) 0%,rgba(250,204,21,0) 70%);z-index:9900;pointer-events:none;animation:awaken-flash 1.2s ease-out forwards;}' +

      '@keyframes awaken-burst{0%{transform:scale(0);opacity:1}100%{transform:scale(3);opacity:0}}' +
      '.awaken-burst{position:fixed;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(250,204,21,0.8),transparent);z-index:9850;pointer-events:none;animation:awaken-burst 1s ease-out forwards;}' +

      '@keyframes awaken-particles{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-120px) scale(0);opacity:0}}' +
      '.awaken-particle{position:fixed;width:6px;height:6px;border-radius:50%;z-index:9860;pointer-events:none;animation:awaken-particles 1.5s ease-out forwards;}' +

      /* Resource indicator */
      '.awaken-resource{display:flex;align-items:center;gap:4px;font-size:9px;color:#9ca3af;padding:4px 8px;background:rgba(30,41,59,0.4);border-radius:6px;border:1px solid rgba(255,255,255,0.04);}' +
      '.awaken-resource-val{color:#fbbf24;font-weight:bold;}';

    document.head.appendChild(s);
  }

  /* ─────────────── STATE INIT ─────────────── */

  function _initState() {
    if (!state.awakened)        state.awakened = {};
    if (!state.awakeningShards) state.awakeningShards = 0;
    // Ensure resources.diamond exists (already does in base state, but safety)
    if (state.resources && state.resources.diamond === undefined) state.resources.diamond = 0;
  }

  /* ─────────────── HELPERS ─────────────── */

  function _getUltimate(charKey) {
    return ULTIMATE_ABILITIES[charKey] || GENERIC_ULTIMATE;
  }

  function _isMaxLevel(charKey) {
    var r = state.roster[charKey];
    return r && r.level >= MAX_LEVEL;
  }

  function _isAwakened(charKey) {
    return !!(state.awakened && state.awakened[charKey]);
  }

  function _canAffordAwaken() {
    var diamonds = (state.resources && state.resources.diamond) || 0;
    var shards   = state.awakeningShards || 0;
    return diamonds >= AWAKEN_COST_DIAMONDS && shards >= AWAKEN_COST_SHARDS;
  }

  /* Return a character-icon emoji based on key */
  function _charEmoji(key) {
    var map = {
      sheldon: '🧪', leonard: '🔬', penny: '🌟', howard: '🚀',
      raj: '🔭', amy: '🧬', bernie: '💊', stuart: '📚',
      mary: '✝️', beverly: '📋', proton: '⚛️', kripke: '🧊',
      leslie: '🔧', bert: '🪨', wil: '🎭', zack: '💪',
      emily: '🗡️', denise: '🤖'
    };
    return map[key] || '👤';
  }

  /* ─────────────── AWAKENING LOGIC ─────────────── */

  function awakenCharacter(charKey) {
    _initState();

    if (!characters[charKey]) return;
    if (_isAwakened(charKey)) {
      if (typeof showToast === 'function') showToast(characters[charKey].name + ' is already awakened!', 'info');
      return;
    }
    if (!_isMaxLevel(charKey)) {
      if (typeof showToast === 'function') showToast(characters[charKey].name + ' must be Level ' + MAX_LEVEL + ' to awaken!', 'error');
      return;
    }
    if (!_canAffordAwaken()) {
      var need = [];
      if ((state.resources.diamond || 0) < AWAKEN_COST_DIAMONDS) need.push(AWAKEN_COST_DIAMONDS + ' 💎');
      if ((state.awakeningShards || 0) < AWAKEN_COST_SHARDS) need.push(AWAKEN_COST_SHARDS + ' 🔮 Shards');
      if (typeof showToast === 'function') showToast('Not enough resources! Need: ' + need.join(' + '), 'error');
      return;
    }

    // Deduct cost
    state.resources.diamond -= AWAKEN_COST_DIAMONDS;
    state.awakeningShards   -= AWAKEN_COST_SHARDS;

    // Mark awakened
    state.awakened[charKey] = true;

    // Save
    if (typeof saveProgress === 'function') saveProgress();

    // Dramatic animation
    _playAwakenAnimation();

    // Toast
    var ult = _getUltimate(charKey);
    setTimeout(function () {
      if (typeof showToast === 'function') {
        showToast('⭐ ' + characters[charKey].name + ' AWAKENED! Unlocked: ' + ult.icon + ' ' + ult.name, 'success');
      }
      if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('purchase');
    }, 800);

    // Refresh modal
    setTimeout(function () { _renderModalContent(); }, 1200);
  }

  /* ─────────────── ANIMATION ─────────────── */

  function _playAwakenAnimation() {
    // Flash overlay
    var flash = document.createElement('div');
    flash.className = 'awaken-flash-overlay';
    document.body.appendChild(flash);
    setTimeout(function () { flash.remove(); }, 1300);

    // Burst
    var burst = document.createElement('div');
    burst.className = 'awaken-burst';
    burst.style.left = 'calc(50% - 100px)';
    burst.style.top  = 'calc(50% - 100px)';
    document.body.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 1100);

    // Particles
    var colors = ['#fbbf24', '#f59e0b', '#fde68a', '#fff', '#a78bfa', '#22d3ee'];
    for (var i = 0; i < 20; i++) {
      (function (idx) {
        var p = document.createElement('div');
        p.className = 'awaken-particle';
        p.style.background = colors[idx % colors.length];
        p.style.left = (50 + (Math.random() - 0.5) * 40) + '%';
        p.style.top  = (50 + (Math.random() - 0.5) * 30) + '%';
        p.style.animationDelay = (idx * 0.06) + 's';
        p.style.animationDuration = (1 + Math.random() * 0.8) + 's';
        document.body.appendChild(p);
        setTimeout(function () { p.remove(); }, 2500);
      })(i);
    }
  }

  /* ─────────────── STAR BADGE ─────────────── */

  /**
   * Call this after rendering character portraits to add ⭐ badges.
   * Looks for elements with data-char-portrait="charKey" and appends a star.
   */
  function applyAwakenBadges() {
    _initState();
    var portraits = document.querySelectorAll('[data-char-portrait]');
    for (var i = 0; i < portraits.length; i++) {
      var el  = portraits[i];
      var key = el.getAttribute('data-char-portrait');
      // Remove existing badge
      var existing = el.querySelector('.awaken-star');
      if (existing) existing.remove();
      // Add if awakened
      if (_isAwakened(key)) {
        el.style.position = 'relative';
        var star = document.createElement('span');
        star.className = 'awaken-star';
        star.textContent = '⭐';
        star.title = 'Awakened';
        el.appendChild(star);
      }
    }
  }

  /* ─────────────── MODAL UI ─────────────── */

  var _selectedChar = null;
  var _overlayEl    = null;

  function openAwakeningModal() {
    _initState();
    _injectStyles();
    _selectedChar = null;

    // Remove existing
    var old = document.getElementById('awakening-modal-overlay');
    if (old) old.remove();

    // Build overlay
    _overlayEl = document.createElement('div');
    _overlayEl.id = 'awakening-modal-overlay';
    _overlayEl.className = 'awaken-overlay';
    _overlayEl.addEventListener('click', function (e) {
      if (e.target === _overlayEl) closeAwakeningModal();
    });

    // Modal wrapper
    var modal = document.createElement('div');
    modal.className = 'awaken-modal';
    modal.id = 'awakening-modal-inner';
    _overlayEl.appendChild(modal);

    document.body.appendChild(_overlayEl);

    // Render content
    _renderModalContent();

    // Animate in
    requestAnimationFrame(function () {
      _overlayEl.classList.add('active');
    });

    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
  }

  function closeAwakeningModal() {
    if (!_overlayEl) return;
    _overlayEl.classList.remove('active');
    setTimeout(function () {
      if (_overlayEl && _overlayEl.parentNode) _overlayEl.remove();
      _overlayEl = null;
    }, 300);
  }

  function _renderModalContent() {
    var modal = document.getElementById('awakening-modal-inner');
    if (!modal) return;

    var html = '';

    // Header
    html += '<div class="awaken-header">' +
      '<div class="awaken-title">⭐ Awakening</div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<div class="awaken-resource">🔮 Shards: <span class="awaken-resource-val">' + (state.awakeningShards || 0) + '</span></div>' +
        '<div class="awaken-resource">💎 Diamonds: <span class="awaken-resource-val">' + ((state.resources && state.resources.diamond) || 0) + '</span></div>' +
        '<button class="awaken-close" onclick="closeAwakeningModal()">&times;</button>' +
      '</div>' +
    '</div>';

    // Character grid
    html += '<div class="awaken-grid">';
    var charKeys = Object.keys(characters);
    for (var i = 0; i < charKeys.length; i++) {
      var key  = charKeys[i];
      var cfg  = characters[key];
      var r    = state.roster[key];
      var lvl  = r ? r.level : 0;
      var isMax  = lvl >= MAX_LEVEL;
      var isAwak = _isAwakened(key);
      var isSel  = _selectedChar === key;
      var cls  = 'awaken-char';
      if (isAwak)      cls += ' awakened';
      else if (!isMax) cls += ' locked';

      var borderExtra = isSel ? 'border-color:rgba(250,204,21,0.8);box-shadow:0 0 24px rgba(250,204,21,0.25);' : '';

      html += '<div class="' + cls + '" style="' + borderExtra + '" onclick="window._awakenSelectChar(\'' + key + '\')">' +
        '<span class="awaken-char-icon">' + _charEmoji(key) + '</span>' +
        (isAwak ? '<span class="awaken-star" style="position:absolute;top:-3px;right:-3px;">⭐</span>' : '') +
        '<div class="awaken-char-name">' + cfg.name + '</div>' +
        '<div class="awaken-char-lvl">Lv. ' + lvl + (isMax ? ' ✓' : '/' + MAX_LEVEL) + '</div>' +
        (isAwak ? '<div class="awaken-char-ult">' + _getUltimate(key).icon + ' ' + _getUltimate(key).name + '</div>' : '') +
      '</div>';
    }
    html += '</div>';

    // Detail panel (if character selected)
    if (_selectedChar && characters[_selectedChar]) {
      html += _buildDetailPanel(_selectedChar);
    }

    modal.innerHTML = html;
  }

  function _buildDetailPanel(charKey) {
    var cfg     = characters[charKey];
    var ult     = _getUltimate(charKey);
    var isAwak  = _isAwakened(charKey);
    var isMax   = _isMaxLevel(charKey);
    var canPay  = _canAffordAwaken();
    var diamonds = (state.resources && state.resources.diamond) || 0;
    var shards   = state.awakeningShards || 0;

    var html = '<div class="awaken-detail">';

    // Name
    html += '<div class="awaken-detail-name">' + _charEmoji(charKey) + ' ' + cfg.name + '</div>';

    // Ultimate ability preview
    html += '<div class="awaken-detail-ult" style="border-color:' + ult.color + '33;">' +
      '<div class="awaken-detail-ult-name" style="color:' + ult.color + ';">' + ult.icon + ' ' + ult.name + '</div>' +
      '<div class="awaken-detail-ult-desc">' + ult.desc + '</div>' +
    '</div>';

    if (isAwak) {
      // Already awakened
      html += '<button class="awaken-btn awaken-btn-done">⭐ Awakened</button>';
    } else if (!isMax) {
      // Not max level
      html += '<div style="text-align:center;font-size:9px;color:#6b7280;margin:8px 0;">Reach Level ' + MAX_LEVEL + ' to awaken this character.</div>';
      html += '<button class="awaken-btn awaken-btn-locked" disabled>Requires Lv. ' + MAX_LEVEL + '</button>';
    } else {
      // Can attempt awakening
      var dOk = diamonds >= AWAKEN_COST_DIAMONDS;
      var sOk = shards >= AWAKEN_COST_SHARDS;

      html += '<div class="awaken-cost-row">' +
        '<div class="awaken-cost-item"><span>💎</span><span class="' + (dOk ? 'awaken-cost-ok' : 'awaken-cost-bad') + '">' + diamonds + '/' + AWAKEN_COST_DIAMONDS + '</span></div>' +
        '<div class="awaken-cost-item"><span>🔮</span><span class="' + (sOk ? 'awaken-cost-ok' : 'awaken-cost-bad') + '">' + shards + '/' + AWAKEN_COST_SHARDS + '</span></div>' +
      '</div>';

      if (canPay) {
        html += '<button class="awaken-btn awaken-btn-ready" onclick="awakenCharacter(\'' + charKey + '\')">⭐ Awaken Now</button>';
      } else {
        html += '<button class="awaken-btn awaken-btn-locked" disabled>Insufficient Resources</button>';
      }
    }

    html += '</div>';
    return html;
  }

  function _selectChar(charKey) {
    _selectedChar = charKey;
    _renderModalContent();
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
  }

  /* ─────────────── SHARD GRANTING HELPER ─────────────── */

  /**
   * Grant awakening shards — call from boss-kill or daily-mission rewards.
   * e.g. grantAwakeningShards(5);
   */
  function grantAwakeningShards(amount) {
    _initState();
    if (!amount || amount <= 0) return;
    state.awakeningShards = (state.awakeningShards || 0) + Math.floor(amount);
    if (typeof saveProgress === 'function') saveProgress();
  }

  /* ─────────────── COMBAT INTEGRATION ─────────────── */

  /**
   * Returns an awakened character's ultimate ability config, or null.
   * Combat systems can call this to check & apply ultimate effects.
   */
  function getAwakenedUltimate(charKey) {
    _initState();
    if (!_isAwakened(charKey)) return null;
    return _getUltimate(charKey);
  }

  /**
   * Check if a character is awakened.
   */
  function isCharacterAwakened(charKey) {
    _initState();
    return _isAwakened(charKey);
  }

  /* ─────────────── EXPOSE GLOBALS ─────────────── */

  window.awakenCharacter       = awakenCharacter;
  window.openAwakeningModal    = openAwakeningModal;
  window.closeAwakeningModal   = closeAwakeningModal;
  window.applyAwakenBadges     = applyAwakenBadges;
  window.grantAwakeningShards  = grantAwakeningShards;
  window.getAwakenedUltimate   = getAwakenedUltimate;
  window.isCharacterAwakened   = isCharacterAwakened;
  window._awakenSelectChar     = _selectChar;

  /* ─────────────── AWAKENING CONSTANTS (for external use) ─────────────── */
  window.AWAKEN_COST_DIAMONDS  = AWAKEN_COST_DIAMONDS;
  window.AWAKEN_COST_SHARDS    = AWAKEN_COST_SHARDS;
  window.ULTIMATE_ABILITIES    = ULTIMATE_ABILITIES;

  console.log('[Awakening] Character Awakening system loaded. ' + Object.keys(ULTIMATE_ABILITIES).length + ' unique ultimates defined.');

})();
