// ============================================================
// FORMATION SKILLS SYSTEM — Team-wide abilities from formation layouts
// Relies on global: state, characters, saveProgress(), showToast(),
//   SoundManager
// ============================================================

(function () {
  'use strict';

  /* ─────────────── FORMATION DEFINITIONS ─────────────── */

  var FORMATIONS = {
    tankWall: {
      name: 'Tank Wall',
      icon: '🛡️',
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.5)',
      desc: '+25% team DEF',
      requirement: '3+ characters in front lane',
      bonuses: { defPct: 0.25 },
      check: function (f) { return _countLane(f, 'front') >= 3; }
    },
    artilleryLine: {
      name: 'Artillery Line',
      icon: '🎯',
      color: '#ef4444',
      glow: 'rgba(239,68,68,0.5)',
      desc: '+20% team DMG',
      requirement: '3+ characters in back lane',
      bonuses: { dmgPct: 0.20 },
      check: function (f) { return _countLane(f, 'back') >= 3; }
    },
    balancedForce: {
      name: 'Balanced Force',
      icon: '⚖️',
      color: '#a78bfa',
      glow: 'rgba(167,139,250,0.5)',
      desc: '+10% all stats',
      requirement: 'Equal front & back characters',
      bonuses: { allPct: 0.10 },
      check: function (f) {
        var front = _countLane(f, 'front');
        var back  = _countLane(f, 'back');
        return front > 0 && front === back;
      }
    },
    supportCore: {
      name: 'Support Core',
      icon: '💚',
      color: '#22c55e',
      glow: 'rgba(34,197,94,0.5)',
      desc: '+30% healing',
      requirement: '2+ support class characters',
      bonuses: { healPct: 0.30 },
      check: function (f) { return _countClass(f, 'support') >= 2; }
    },
    dpsRush: {
      name: 'DPS Rush',
      icon: '⚔️',
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.5)',
      desc: '+15% crit & attack speed',
      requirement: '3+ DPS class characters',
      bonuses: { critPct: 0.15, atkSpeedPct: 0.15 },
      check: function (f) {
        // DPS includes dps, aoe, assassin, magic
        var count = _countClass(f, 'dps') + _countClass(f, 'aoe') + _countClass(f, 'assassin') + _countClass(f, 'magic');
        return count >= 3;
      }
    },
    fullSquad: {
      name: 'Full Squad',
      icon: '👥',
      color: '#22d3ee',
      glow: 'rgba(34,211,238,0.5)',
      desc: '+5% all stats per character',
      requirement: '5+ characters deployed',
      bonuses: { allPctPerChar: 0.05 },
      check: function (f) { return _countTotal(f) >= 5; }
    }
  };

  var FORMATION_KEYS = Object.keys(FORMATIONS);

  /* ─────────────── CSS INJECTION ─────────────── */

  var STYLE_ID = 'formation-skills-styles';

  function _injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      /* Formation buff icon above battle area */
      '.fskill-buff-bar{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;padding:4px 8px;min-height:28px;align-items:center;}' +

      '.fskill-buff-icon{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;font-size:9px;font-weight:bold;letter-spacing:0.3px;transition:all 0.3s ease;animation:fskill-buff-fade-in 0.5s ease-out;cursor:default;}' +

      '@keyframes fskill-buff-fade-in{0%{opacity:0;transform:translateY(-8px) scale(0.8)}100%{opacity:1;transform:translateY(0) scale(1)}}' +

      '@keyframes fskill-buff-pulse{0%,100%{box-shadow:0 0 6px var(--fskill-glow)}50%{box-shadow:0 0 14px var(--fskill-glow)}}' +
      '.fskill-buff-icon{animation:fskill-buff-fade-in 0.5s ease-out,fskill-buff-pulse 2.5s ease-in-out infinite 0.5s;}' +

      /* Formation display panel */
      '.fskill-panel{background:rgba(15,23,42,0.95);border:2px solid rgba(167,139,250,0.3);border-radius:14px;overflow:hidden;margin:8px 0;}' +

      '.fskill-panel-header{background:linear-gradient(to right,rgba(88,28,135,0.4),rgba(15,23,42,0.8));border-bottom:1px solid rgba(167,139,250,0.2);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;}' +
      '.fskill-panel-title{font-family:"Press Start 2P",monospace;font-size:9px;color:#a78bfa;text-transform:uppercase;letter-spacing:1.5px;text-shadow:0 0 8px rgba(167,139,250,0.4);}' +

      '.fskill-list{padding:8px 12px;}' +

      '.fskill-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;margin-bottom:4px;transition:all 0.2s ease;}' +
      '.fskill-row.active{background:rgba(88,28,135,0.15);border:1px solid rgba(167,139,250,0.2);}' +
      '.fskill-row.inactive{opacity:0.35;border:1px solid transparent;}' +

      '.fskill-row-icon{font-size:18px;width:28px;text-align:center;flex-shrink:0;}' +
      '.fskill-row-info{flex:1;min-width:0;}' +
      '.fskill-row-name{font-size:10px;font-weight:bold;color:#e2e8f0;}' +
      '.fskill-row-desc{font-size:8px;color:#9ca3af;margin-top:1px;}' +
      '.fskill-row-req{font-size:7px;color:#6b7280;margin-top:2px;font-style:italic;}' +
      '.fskill-row-status{font-size:9px;font-weight:bold;flex-shrink:0;padding:3px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px;}' +
      '.fskill-row-status.on{background:rgba(34,197,94,0.15);color:#86efac;border:1px solid rgba(34,197,94,0.3);}' +
      '.fskill-row-status.off{background:rgba(30,41,59,0.4);color:#4b5563;border:1px solid rgba(255,255,255,0.04);}' +

      /* Active formation highlight on battle screen */
      '.fskill-active-highlight{position:relative;}' +
      '.fskill-active-highlight::after{content:"";position:absolute;inset:-2px;border-radius:inherit;pointer-events:none;box-shadow:0 0 12px var(--fskill-glow,rgba(167,139,250,0.3));animation:fskill-buff-pulse 2.5s ease-in-out infinite;}';

    document.head.appendChild(s);
  }

  /* ─────────────── FORMATION COUNTING HELPERS ─────────────── */

  /**
   * Count characters in a specific lane of the current formation.
   * The state.formation has: front:[slot,slot], mid:[slot,slot,slot], back:[slot,slot,slot]
   */
  function _countLane(formation, lane) {
    if (!formation) return 0;
    var slots = formation[lane];
    if (!Array.isArray(slots)) return 0;
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
      if (slots[i] && slots[i] !== null) count++;
    }
    return count;
  }

  /** Count characters of a specific classType in the current formation */
  function _countClass(formation, classType) {
    if (!formation) return 0;
    var count = 0;
    var lanes = ['front', 'mid', 'back'];
    for (var l = 0; l < lanes.length; l++) {
      var slots = formation[lanes[l]];
      if (!Array.isArray(slots)) continue;
      for (var s = 0; s < slots.length; s++) {
        var charKey = slots[s];
        if (charKey && characters[charKey] && characters[charKey].classType === classType) {
          count++;
        }
      }
    }
    return count;
  }

  /** Count total characters in formation */
  function _countTotal(formation) {
    if (!formation) return 0;
    var count = 0;
    var lanes = ['front', 'mid', 'back'];
    for (var l = 0; l < lanes.length; l++) {
      var slots = formation[lanes[l]];
      if (!Array.isArray(slots)) continue;
      for (var s = 0; s < slots.length; s++) {
        if (slots[s] && slots[s] !== null) count++;
      }
    }
    return count;
  }

  /* ─────────────── DETECTION ENGINE ─────────────── */

  /**
   * Detect all active formations from the current state.formation.
   * Returns array of formation keys that are currently active.
   */
  function detectActiveFormations() {
    var formation = state.formation;
    if (!formation) return [];

    var active = [];
    for (var i = 0; i < FORMATION_KEYS.length; i++) {
      var key = FORMATION_KEYS[i];
      var def = FORMATIONS[key];
      try {
        if (def.check(formation)) {
          active.push(key);
        }
      } catch (e) {
        // Silently skip broken checks
      }
    }

    // Store for display
    state.activeFormationSkills = active;

    return active;
  }

  /**
   * Calculate combined formation bonuses.
   * Returns an object with all bonus values summed.
   * e.g. { dmgPct: 0.20, defPct: 0.25 }
   */
  function getFormationBonuses() {
    var active  = detectActiveFormations();
    var bonuses = {};

    for (var i = 0; i < active.length; i++) {
      var def = FORMATIONS[active[i]];
      if (!def || !def.bonuses) continue;

      var bKeys = Object.keys(def.bonuses);
      for (var b = 0; b < bKeys.length; b++) {
        var bk = bKeys[b];
        var bv = def.bonuses[bk];

        // Special: allPctPerChar multiplied by total char count
        if (bk === 'allPctPerChar') {
          var total = _countTotal(state.formation);
          var allBonus = bv * total;
          bonuses.allPct = (bonuses.allPct || 0) + allBonus;
          continue;
        }

        bonuses[bk] = (bonuses[bk] || 0) + bv;
      }
    }

    return bonuses;
  }

  /* ─────────────── BUFF ICON BAR (for battle area) ─────────────── */

  /**
   * Returns an HTML string for the active formation buff icons.
   * Embed this above the battle area.
   */
  function renderFormationBuffBar() {
    _injectStyles();
    var active = detectActiveFormations();

    if (active.length === 0) {
      return '<div class="fskill-buff-bar"><span style="font-size:8px;color:#374151;">No formation skills active</span></div>';
    }

    var html = '<div class="fskill-buff-bar">';
    for (var i = 0; i < active.length; i++) {
      var def = FORMATIONS[active[i]];
      html += '<div class="fskill-buff-icon" style="background:' + def.color + '15;border:1px solid ' + def.color + '33;color:' + def.color + ';--fskill-glow:' + def.glow + ';" title="' + def.name + ': ' + def.desc + '">' +
        '<span>' + def.icon + '</span>' +
        '<span>' + def.name + '</span>' +
      '</div>';
    }
    html += '</div>';
    return html;
  }

  /**
   * Auto-update the formation buff bar in the DOM.
   * Looks for element with id="formation-buff-bar".
   */
  function refreshFormationBuffBar() {
    var container = document.getElementById('formation-buff-bar');
    if (container) {
      container.innerHTML = renderFormationBuffBar();
    }
  }

  /* ─────────────── FORMATION PANEL (full display) ─────────────── */

  /**
   * Render a full panel showing all formations and their status.
   * Returns an HTML string.
   */
  function renderFormationSkillsPanel() {
    _injectStyles();
    var active = detectActiveFormations();
    var activeSet = {};
    for (var a = 0; a < active.length; a++) activeSet[active[a]] = true;

    var html = '<div class="fskill-panel">';

    // Header
    html += '<div class="fskill-panel-header">' +
      '<div class="fskill-panel-title">⚡ Formation Skills</div>' +
      '<div style="font-size:8px;color:#6b7280;">' + active.length + '/' + FORMATION_KEYS.length + ' active</div>' +
    '</div>';

    // List
    html += '<div class="fskill-list">';

    for (var i = 0; i < FORMATION_KEYS.length; i++) {
      var key   = FORMATION_KEYS[i];
      var def   = FORMATIONS[key];
      var isOn  = !!activeSet[key];

      html += '<div class="fskill-row ' + (isOn ? 'active' : 'inactive') + '">' +
        '<div class="fskill-row-icon">' + def.icon + '</div>' +
        '<div class="fskill-row-info">' +
          '<div class="fskill-row-name" style="' + (isOn ? 'color:' + def.color + ';' : '') + '">' + def.name + '</div>' +
          '<div class="fskill-row-desc">' + def.desc + '</div>' +
          '<div class="fskill-row-req">Requires: ' + def.requirement + '</div>' +
        '</div>' +
        '<div class="fskill-row-status ' + (isOn ? 'on' : 'off') + '">' + (isOn ? '✓ Active' : 'Inactive') + '</div>' +
      '</div>';
    }

    html += '</div></div>';
    return html;
  }

  /**
   * Auto-update the formation skills panel in the DOM.
   * Looks for element with id="formation-skills-panel".
   */
  function refreshFormationSkillsPanel() {
    var container = document.getElementById('formation-skills-panel');
    if (container) {
      container.innerHTML = renderFormationSkillsPanel();
    }
  }

  /* ─────────────── BATTLE START HOOK ─────────────── */

  /**
   * Call this on battle start to detect formation, display buff bar,
   * and show a toast with active formations.
   */
  function onBattleStartFormationCheck() {
    var active = detectActiveFormations();

    // Refresh the buff bar display
    refreshFormationBuffBar();

    // Toast active formations
    if (active.length > 0) {
      var names = [];
      for (var i = 0; i < active.length; i++) {
        var def = FORMATIONS[active[i]];
        names.push(def.icon + ' ' + def.name);
      }
      if (typeof showToast === 'function') {
        showToast('Formation Skills: ' + names.join(', '), 'info');
      }
    }

    return active;
  }

  /* ─────────────── COMBAT STAT APPLICATION ─────────────── */

  /**
   * Apply formation bonuses to a character's combat stats.
   * Call during battle stat calculation.
   * @param {object} stats — mutable stats object { dmg, def, hp, atkSpeed, critChance, healPower }
   * @returns {object} — modified stats
   */
  function applyFormationBonuses(stats) {
    if (!stats) return stats;

    var bonuses = getFormationBonuses();

    if (bonuses.dmgPct)      stats.dmg      = Math.floor(stats.dmg * (1 + bonuses.dmgPct));
    if (bonuses.defPct)      stats.def      = Math.floor((stats.def || 0) * (1 + bonuses.defPct)) || Math.floor(bonuses.defPct * 100);
    if (bonuses.healPct)     stats.healPower = (stats.healPower || 1) * (1 + bonuses.healPct);
    if (bonuses.critPct)     stats.critChance = (stats.critChance || 0) + bonuses.critPct;
    if (bonuses.atkSpeedPct) stats.atkSpeed   = Math.floor((stats.atkSpeed || 1000) * (1 - bonuses.atkSpeedPct)); // Lower = faster

    // allPct applies to everything
    if (bonuses.allPct) {
      stats.dmg      = Math.floor((stats.dmg || 0) * (1 + bonuses.allPct));
      stats.def      = Math.floor((stats.def || 0) * (1 + bonuses.allPct)) || Math.floor(bonuses.allPct * 100);
      stats.hp       = Math.floor((stats.hp || 0) * (1 + bonuses.allPct));
      stats.atkSpeed = Math.floor((stats.atkSpeed || 1000) * (1 - bonuses.allPct * 0.5)); // Half effect on speed
    }

    return stats;
  }

  /* ─────────────── EXPOSE GLOBALS ─────────────── */

  window.FORMATIONS                   = FORMATIONS;
  window.detectActiveFormations        = detectActiveFormations;
  window.getFormationBonuses           = getFormationBonuses;
  window.renderFormationBuffBar        = renderFormationBuffBar;
  window.refreshFormationBuffBar       = refreshFormationBuffBar;
  window.renderFormationSkillsPanel    = renderFormationSkillsPanel;
  window.refreshFormationSkillsPanel   = refreshFormationSkillsPanel;
  window.onBattleStartFormationCheck   = onBattleStartFormationCheck;
  window.applyFormationBonuses         = applyFormationBonuses;

  console.log('[FormationSkills] Formation Skills system loaded. ' + FORMATION_KEYS.length + ' formations defined.');

})();
