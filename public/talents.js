/**
 * talents.js — Character Talent System
 * Each character class type has a unique 3-tier talent tree.
 * Players pick one talent per tier (radio-select).
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  TALENT TREE DEFINITIONS  (keyed by classType)                     */
  /* ------------------------------------------------------------------ */

  var TALENT_TREES = {
    /* ---------- DPS (sheldon, kripke) ---------- */
    dps: {
      1: [
        { key: 'relentless', name: 'Relentless', desc: '+25% damage',                  icon: '⚔️' },
        { key: 'swift',      name: 'Swift',      desc: '+30% attack speed',            icon: '💨' },
        { key: 'precise',    name: 'Precise',    desc: '+20% critical hit chance',      icon: '🎯' }
      ],
      2: [
        { key: 'lifesteal',  name: 'Lifesteal',  desc: 'Heal 5% of damage dealt',      icon: '🩸' },
        { key: 'momentum',   name: 'Momentum',   desc: '+2% damage per kill streak',    icon: '🔥' },
        { key: 'focus',      name: 'Focus',       desc: '+10% damage to current target', icon: '👁️' }
      ],
      3: [
        { key: 'execute',    name: 'Execute',    desc: 'Instant kill enemies below 10% HP', icon: '💀' },
        { key: 'frenzy',     name: 'Frenzy',     desc: '2x speed for 5s every 30s',         icon: '⚡' },
        { key: 'sniper',     name: 'Sniper',     desc: 'First hit deals 3x damage',         icon: '🔫' }
      ]
    },

    /* ---------- Support (penny, bernie, mary, beverly) ---------- */
    support: {
      1: [
        { key: 'healer',   name: 'Healer',   desc: '+30% healing power',           icon: '💚' },
        { key: 'buffer',   name: 'Buffer',   desc: '+15% team damage aura',        icon: '📣' },
        { key: 'shielder', name: 'Shielder', desc: 'Team takes 10% less damage',   icon: '🛡️' }
      ],
      2: [
        { key: 'inspire',  name: 'Inspire',  desc: '+5% team crit chance',         icon: '✨' },
        { key: 'energize', name: 'Energize', desc: '+10% team attack speed',       icon: '⚡' },
        { key: 'fortify',  name: 'Fortify',  desc: 'Team +15% max HP',             icon: '🏰' }
      ],
      3: [
        { key: 'resurrection', name: 'Resurrection', desc: 'Revive 1 ally per wave',          icon: '👼' },
        { key: 'warcry',       name: 'War Cry',      desc: 'Team +50% damage for 5s',         icon: '📯' },
        { key: 'sanctuary',    name: 'Sanctuary',    desc: 'Team immune to damage for 3s',    icon: '🌟' }
      ]
    },

    /* ---------- Tank (leonard, stuart, proton, bert, zack) ---------- */
    tank: {
      1: [
        { key: 'fortress', name: 'Fortress', desc: '+40% max HP',                   icon: '🏯' },
        { key: 'thorns',   name: 'Thorns',   desc: 'Reflect 15% damage taken',      icon: '🌵' },
        { key: 'guardian',  name: 'Guardian',  desc: 'Taunt enemies to attack you',   icon: '🗿' }
      ],
      2: [
        { key: 'regen',    name: 'Regen',    desc: 'Recover 2% HP per second',      icon: '💗' },
        { key: 'stalwart', name: 'Stalwart', desc: 'Immune to debuffs',             icon: '🧱' },
        { key: 'bulk',     name: 'Bulk',     desc: '+5% damage per 1000 HP',        icon: '💪' }
      ],
      3: [
        { key: 'immortal',   name: 'Immortal',   desc: 'Survive lethal hit once per wave', icon: '♾️' },
        { key: 'earthquake',  name: 'Earthquake',  desc: 'AoE stun for 3 seconds',          icon: '🌋' },
        { key: 'ironwall',    name: 'Iron Wall',    desc: '50% damage reduction for 5s',     icon: '🪨' }
      ]
    },

    /* ---------- AoE (howard) ---------- */
    aoe: {
      1: [
        { key: 'blastradius', name: 'Blast Radius', desc: '+30% AoE range',             icon: '💥' },
        { key: 'chain',       name: 'Chain',        desc: 'Attacks hit +1 target',       icon: '⛓️' },
        { key: 'bombard',     name: 'Bombard',      desc: '+20% AoE damage',             icon: '🧨' }
      ],
      2: [
        { key: 'debris',     name: 'Debris',      desc: 'AoE leaves damage over time',   icon: '🔥' },
        { key: 'shockwave',  name: 'Shockwave',   desc: 'AoE slows enemies',             icon: '🌊' },
        { key: 'carpetbomb', name: 'Carpet Bomb', desc: '+15% AoE attack frequency',     icon: '🛩️' }
      ],
      3: [
        { key: 'nuke',       name: 'Nuke',       desc: 'Massive AoE blast every 20s',    icon: '☢️' },
        { key: 'cluster',    name: 'Cluster',    desc: 'Each hit spawns mini explosions', icon: '🎆' },
        { key: 'apocalypse', name: 'Apocalypse', desc: 'All enemies take 30% more dmg',  icon: '🌑' }
      ]
    },

    /* ---------- Magic (raj, amy, wil) ---------- */
    magic: {
      1: [
        { key: 'amplify',   name: 'Amplify',   desc: '+25% ability damage',            icon: '🔮' },
        { key: 'penetrate', name: 'Penetrate', desc: 'Ignore 20% enemy defense',       icon: '🗡️' },
        { key: 'arcane',    name: 'Arcane',    desc: '+15% all magic stats',            icon: '📖' }
      ],
      2: [
        { key: 'manasurge',  name: 'Mana Surge',  desc: 'Abilities cost 20% less',        icon: '💎' },
        { key: 'spellweave', name: 'Spellweave', desc: '10% chance to double-cast',       icon: '🌀' },
        { key: 'enchant',    name: 'Enchant',    desc: 'Buffs last 30% longer',            icon: '🪄' }
      ],
      3: [
        { key: 'singularity', name: 'Singularity', desc: 'Create a black hole for 10s',    icon: '🕳️' },
        { key: 'timestop',    name: 'Timestop',    desc: 'Freeze all enemies for 4s',      icon: '⏳' },
        { key: 'meteor',      name: 'Meteor',      desc: 'Summon a devastating meteor',    icon: '☄️' }
      ]
    },

    /* ---------- Assassin (leslie, emily) ---------- */
    assassin: {
      1: [
        { key: 'stealth',  name: 'Stealth',  desc: '15% chance to dodge attacks',    icon: '👤' },
        { key: 'backstab', name: 'Backstab', desc: '+40% damage from behind',        icon: '🗡️' },
        { key: 'poison',   name: 'Poison',   desc: 'DoT dealing 3% HP per second',   icon: '☠️' }
      ],
      2: [
        { key: 'shadow',  name: 'Shadow',  desc: '+10% critical hit chance',          icon: '🌑' },
        { key: 'vanish',  name: 'Vanish',  desc: 'Become untargetable for 2s',        icon: '💨' },
        { key: 'exploit', name: 'Exploit', desc: '+20% damage to debuffed enemies',   icon: '🎯' }
      ],
      3: [
        { key: 'deathmark',   name: 'Death Mark',  desc: 'Mark target for 2x dmg for 5s', icon: '💀' },
        { key: 'shadowclone', name: 'Shadow Clone', desc: 'Summon a clone to fight',       icon: '👥' },
        { key: 'assassinate', name: 'Assassinate',  desc: '5% chance to instant kill',     icon: '🔪' }
      ]
    }
  };

  /* ------------------------------------------------------------------ */
  /*  CHARACTER → CLASS TYPE MAP                                        */
  /* ------------------------------------------------------------------ */

  var CHAR_CLASS_MAP = {
    sheldon:  'dps',
    kripke:   'dps',
    penny:    'support',
    bernie:   'support',
    mary:     'support',
    beverly:  'support',
    leonard:  'tank',
    stuart:   'tank',
    proton:   'tank',
    bert:     'tank',
    zack:     'tank',
    howard:   'aoe',
    raj:      'magic',
    amy:      'magic',
    wil:      'magic',
    leslie:   'assassin',
    emily:    'assassin'
  };

  /* ------------------------------------------------------------------ */
  /*  TIER CONFIGURATION                                                */
  /* ------------------------------------------------------------------ */

  var TIER_CONFIG = {
    1: { level: 50,  cost: 10000,    color: '#f59e0b', label: 'Tier 1', colorName: 'amber'  },
    2: { level: 75,  cost: 100000,   color: '#a855f7', label: 'Tier 2', colorName: 'purple' },
    3: { level: 100, cost: 1000000,  color: '#f43f5e', label: 'Tier 3', colorName: 'rose'   }
  };

  var RESET_COST_DIAMONDS = 25;

  /* ------------------------------------------------------------------ */
  /*  HELPERS                                                           */
  /* ------------------------------------------------------------------ */

  /** Safely read nested game state values */
  function _getState() {
    return (window.state && window.state.talents) ? window.state.talents : {};
  }

  function _ensureCharState(charKey) {
    if (!window.state) { window.state = {}; }
    if (!window.state.talents) { window.state.talents = {}; }
    if (!window.state.talents[charKey]) {
      window.state.talents[charKey] = { tier1: null, tier2: null, tier3: null };
    }
    return window.state.talents[charKey];
  }

  /** Return character level — tries common state shapes */
  function _getCharLevel(charKey) {
    if (window.state && window.state.characters) {
      var c = window.state.characters[charKey];
      if (c) { return c.level || 0; }
    }
    return 0;
  }

  /** Return current money balance */
  function _getMoney() {
    if (window.state) { return window.state.money || 0; }
    return 0;
  }

  /** Deduct money */
  function _spendMoney(amount) {
    if (window.state) { window.state.money = (window.state.money || 0) - amount; }
  }

  /** Return current diamond balance */
  function _getDiamonds() {
    if (window.state) { return window.state.diamonds || 0; }
    return 0;
  }

  /** Deduct diamonds */
  function _spendDiamonds(amount) {
    if (window.state) { window.state.diamonds = (window.state.diamonds || 0) - amount; }
  }

  /** Pretty-print large numbers */
  function _fmt(n) {
    if (n >= 1e6) { return (n / 1e6).toFixed(1) + 'M'; }
    if (n >= 1e3) { return (n / 1e3).toFixed(1) + 'K'; }
    return String(n);
  }

  /** Capitalise first letter */
  function _cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /** Get class type for a character */
  function _classOf(charKey) {
    return CHAR_CLASS_MAP[charKey] || null;
  }

  /* ------------------------------------------------------------------ */
  /*  CORE API                                                          */
  /* ------------------------------------------------------------------ */

  /**
   * selectTalent(charKey, tier, talentKey)
   * Validates requirements, deducts cost, and sets the talent.
   */
  function selectTalent(charKey, tier, talentKey) {
    var classType = _classOf(charKey);
    if (!classType) { return { ok: false, msg: 'Unknown character.' }; }

    var tree = TALENT_TREES[classType];
    if (!tree || !tree[tier]) { return { ok: false, msg: 'Invalid tier.' }; }

    // Validate talent exists in tier
    var found = false;
    for (var i = 0; i < tree[tier].length; i++) {
      if (tree[tier][i].key === talentKey) { found = true; break; }
    }
    if (!found) { return { ok: false, msg: 'Talent not found in tier.' }; }

    var cfg = TIER_CONFIG[tier];
    var level = _getCharLevel(charKey);
    if (level < cfg.level) {
      return { ok: false, msg: 'Requires character level ' + cfg.level + '.' };
    }

    var charState = _ensureCharState(charKey);
    var tierKey = 'tier' + tier;

    // If already selected same talent, nothing to do
    if (charState[tierKey] === talentKey) {
      return { ok: true, msg: 'Already selected.' };
    }

    // If switching (already had a talent), it's free — just swap
    if (charState[tierKey] !== null) {
      charState[tierKey] = talentKey;
      _refreshModal(charKey);
      if (typeof window.saveGame === 'function') { window.saveGame(); }
      return { ok: true, msg: 'Talent changed.' };
    }

    // First pick — costs money
    var money = _getMoney();
    if (money < cfg.cost) {
      return { ok: false, msg: 'Need $' + _fmt(cfg.cost) + '.' };
    }

    _spendMoney(cfg.cost);
    charState[tierKey] = talentKey;
    _refreshModal(charKey);
    if (typeof window.saveGame === 'function') { window.saveGame(); }
    return { ok: true, msg: 'Talent unlocked!' };
  }

  /**
   * resetTalents(charKey)
   * Clears all talents for a character. Costs diamonds.
   */
  function resetTalents(charKey) {
    if (_getDiamonds() < RESET_COST_DIAMONDS) {
      return { ok: false, msg: 'Need ' + RESET_COST_DIAMONDS + ' diamonds.' };
    }
    _spendDiamonds(RESET_COST_DIAMONDS);
    if (window.state && window.state.talents) {
      window.state.talents[charKey] = { tier1: null, tier2: null, tier3: null };
    }
    _refreshModal(charKey);
    if (typeof window.saveGame === 'function') { window.saveGame(); }
    return { ok: true, msg: 'Talents reset.' };
  }

  /**
   * getTalentBonuses(charKey)
   * Returns an object describing every active effect for the character.
   */
  function getTalentBonuses(charKey) {
    var bonuses = {
      dmgMult:       1,
      atkSpeedMult:  1,
      critChance:    0,
      lifestealPct:  0,
      killStreakDmg:  0,
      focusDmg:      0,
      executeThresh: 0,
      frenzy:        false,
      sniperFirst:   1,
      healMult:      1,
      teamDmgAura:   0,
      teamDmgReduce: 0,
      teamCrit:      0,
      teamSpeed:     0,
      teamHpMult:    1,
      resurrection:  false,
      warCryDmg:     0,
      sanctuary:     false,
      hpMult:        1,
      thornsPct:     0,
      taunt:         false,
      regenPct:      0,
      debuffImmune:  false,
      bulkDmgPer1k:  0,
      immortal:      false,
      earthquakeStun: 0,
      ironWallReduce: 0,
      aoeRangeMult:  1,
      chainTargets:  0,
      aoeDmgMult:    1,
      aoeDoT:        false,
      aoeSlow:       false,
      aoeFreqMult:   1,
      nuke:          false,
      cluster:       false,
      apocalypseDmg: 0,
      abilityDmgMult:  1,
      defIgnore:       0,
      magicStatMult:   1,
      manaCostReduce:  0,
      doubleCast:      0,
      buffDurMult:     1,
      singularity:     false,
      timestop:        false,
      meteor:          false,
      dodgeChance:     0,
      backstabDmg:     0,
      poisonDot:       0,
      vanish:          false,
      exploitDmg:      0,
      deathMark:       false,
      shadowClone:     false,
      assassinatePct:  0
    };

    var charState = _getState()[charKey];
    if (!charState) { return bonuses; }

    var selected = [charState.tier1, charState.tier2, charState.tier3];
    for (var i = 0; i < selected.length; i++) {
      var t = selected[i];
      if (!t) { continue; }
      switch (t) {
        /* DPS */
        case 'relentless':  bonuses.dmgMult      *= 1.25; break;
        case 'swift':       bonuses.atkSpeedMult  *= 1.30; break;
        case 'precise':     bonuses.critChance    += 0.20; break;
        case 'lifesteal':   bonuses.lifestealPct   = 0.05; break;
        case 'momentum':    bonuses.killStreakDmg   = 0.02; break;
        case 'focus':       bonuses.focusDmg       = 0.10; break;
        case 'execute':     bonuses.executeThresh   = 0.10; break;
        case 'frenzy':      bonuses.frenzy          = true; break;
        case 'sniper':      bonuses.sniperFirst     = 3;    break;

        /* Support */
        case 'healer':      bonuses.healMult      *= 1.30; break;
        case 'buffer':      bonuses.teamDmgAura    = 0.15; break;
        case 'shielder':    bonuses.teamDmgReduce  = 0.10; break;
        case 'inspire':     bonuses.teamCrit       = 0.05; break;
        case 'energize':    bonuses.teamSpeed      = 0.10; break;
        case 'fortify':     bonuses.teamHpMult    *= 1.15; break;
        case 'resurrection': bonuses.resurrection  = true; break;
        case 'warcry':      bonuses.warCryDmg      = 0.50; break;
        case 'sanctuary':   bonuses.sanctuary      = true; break;

        /* Tank */
        case 'fortress':    bonuses.hpMult        *= 1.40; break;
        case 'thorns':      bonuses.thornsPct      = 0.15; break;
        case 'guardian':     bonuses.taunt          = true; break;
        case 'regen':       bonuses.regenPct       = 0.02; break;
        case 'stalwart':    bonuses.debuffImmune   = true; break;
        case 'bulk':        bonuses.bulkDmgPer1k   = 0.05; break;
        case 'immortal':    bonuses.immortal       = true; break;
        case 'earthquake':  bonuses.earthquakeStun = 3;    break;
        case 'ironwall':    bonuses.ironWallReduce = 0.50; break;

        /* AoE */
        case 'blastradius': bonuses.aoeRangeMult  *= 1.30; break;
        case 'chain':       bonuses.chainTargets   = 1;    break;
        case 'bombard':     bonuses.aoeDmgMult    *= 1.20; break;
        case 'debris':      bonuses.aoeDoT         = true; break;
        case 'shockwave':   bonuses.aoeSlow        = true; break;
        case 'carpetbomb':  bonuses.aoeFreqMult   *= 1.15; break;
        case 'nuke':        bonuses.nuke           = true; break;
        case 'cluster':     bonuses.cluster        = true; break;
        case 'apocalypse':  bonuses.apocalypseDmg  = 0.30; break;

        /* Magic */
        case 'amplify':     bonuses.abilityDmgMult *= 1.25; break;
        case 'penetrate':   bonuses.defIgnore       = 0.20; break;
        case 'arcane':      bonuses.magicStatMult  *= 1.15; break;
        case 'manasurge':   bonuses.manaCostReduce  = 0.20; break;
        case 'spellweave':  bonuses.doubleCast      = 0.10; break;
        case 'enchant':     bonuses.buffDurMult    *= 1.30; break;
        case 'singularity': bonuses.singularity     = true; break;
        case 'timestop':    bonuses.timestop        = true; break;
        case 'meteor':      bonuses.meteor          = true; break;

        /* Assassin */
        case 'stealth':     bonuses.dodgeChance    += 0.15; break;
        case 'backstab':    bonuses.backstabDmg     = 0.40; break;
        case 'poison':      bonuses.poisonDot       = 0.03; break;
        case 'shadow':      bonuses.critChance     += 0.10; break;
        case 'vanish':      bonuses.vanish          = true; break;
        case 'exploit':     bonuses.exploitDmg      = 0.20; break;
        case 'deathmark':   bonuses.deathMark       = true; break;
        case 'shadowclone': bonuses.shadowClone     = true; break;
        case 'assassinate': bonuses.assassinatePct  = 0.05; break;
      }
    }
    return bonuses;
  }

  /* ------------------------------------------------------------------ */
  /*  MODAL  UI                                                         */
  /* ------------------------------------------------------------------ */

  var MODAL_ID  = 'talent-modal-overlay';

  /** Inject the <style> block once */
  var _stylesInjected = false;
  function _injectStyles() {
    if (_stylesInjected) { return; }
    _stylesInjected = true;

    var css = '' +
      /* overlay */
      '#' + MODAL_ID + '{' +
        'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;' +
        'background:rgba(15,23,42,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);' +
        'opacity:0;transition:opacity .3s ease;pointer-events:none;' +
      '}' +
      '#' + MODAL_ID + '.tm-open{opacity:1;pointer-events:auto;}' +

      /* card */
      '.tm-card{' +
        'background:rgba(15,23,42,.95);border:1px solid rgba(255,255,255,.1);' +
        'border-radius:1rem;max-width:420px;width:92%;box-sizing:border-box;max-height:90vh;overflow-y:auto;max-height:88vh;overflow-y:auto;' +
        'padding:28px 24px 24px;color:#e2e8f0;font-family:"Inter","Segoe UI",system-ui,sans-serif;' +
        'box-shadow:0 25px 60px rgba(0,0,0,.6);transform:translateY(16px) scale(.97);' +
        'transition:transform .3s ease;' +
      '}' +
      '#' + MODAL_ID + '.tm-open .tm-card{transform:translateY(0) scale(1);}' +

      /* scrollbar */
      '.tm-card::-webkit-scrollbar{width:5px}' +
      '.tm-card::-webkit-scrollbar-track{background:transparent}' +
      '.tm-card::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:9px}' +

      /* header */
      '.tm-header{text-align:center;margin-bottom:20px}' +
      '.tm-name{font-size:1.3rem;font-weight:700;color:#f1f5f9}' +
      '.tm-badge{display:inline-block;margin-top:6px;padding:3px 10px;box-sizing:border-box;border-radius:999px;' +
        'font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;' +
        'background:rgba(255,255,255,.08);color:#94a3b8}' +

      /* tier section */
      '.tm-tier{margin-bottom:18px}' +
      '.tm-tier-label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;' +
        'margin-bottom:8px;display:flex;align-items:center;gap:6px}' +
      '.tm-tier-label .tm-dot{width:8px;height:8px;border-radius:50%;display:inline-block}' +
      '.tm-tier-lock{font-size:.68rem;color:#64748b;margin-left:auto;font-weight:400;text-transform:none;letter-spacing:0}' +

      /* talent row */
      '.tm-row{display:flex;gap:8px}' +
      '.tm-talent{flex:1;position:relative;cursor:pointer;padding:10px 8px;box-sizing:border-box;border-radius:.6rem;' +
        'border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03);' +
        'transition:border-color .2s,box-shadow .2s,background .2s;text-align:center}' +
      '.tm-talent:hover{background:rgba(255,255,255,.06)}' +
      '.tm-talent.tm-selected{border-color:var(--tm-glow);' +
        'box-shadow:0 0 14px var(--tm-glow-alpha);background:rgba(255,255,255,.07)}' +
      '.tm-talent.tm-locked{opacity:.35;pointer-events:none;filter:grayscale(.6)}' +

      /* radio indicator */
      '.tm-radio{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.2);' +
        'margin:0 auto 6px;transition:border-color .2s,background .2s}' +
      '.tm-selected .tm-radio{border-color:var(--tm-glow);background:var(--tm-glow)}' +

      /* icon / name / desc */
      '.tm-icon{font-size:1.2rem;margin-bottom:4px}' +
      '.tm-tname{font-size:.72rem;font-weight:700;color:#f1f5f9;margin-bottom:2px}' +
      '.tm-tdesc{font-size:.6rem;color:#94a3b8;line-height:1.3}' +

      /* cost tag */
      '.tm-cost{font-size:.6rem;color:#64748b;margin-top:5px}' +

      /* reset button */
      '.tm-reset{display:block;width:100%;margin-top:14px;padding:10px;border:1px solid rgba(255,255,255,.08);' +
        'border-radius:.5rem;background:rgba(244,63,94,.1);color:#fb7185;font-size:.75rem;font-weight:600;' +
        'cursor:pointer;transition:background .2s}' +
      '.tm-reset:hover{background:rgba(244,63,94,.2)}' +

      /* close btn */
      '.tm-close{position:absolute;top:12px;right:14px;background:none;border:none;color:#64748b;' +
        'font-size:1.4rem;cursor:pointer;line-height:1;transition:color .2s}' +
      '.tm-close:hover{color:#e2e8f0}' +

      /* toast */
      '.tm-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);padding:10px 20px;box-sizing:border-box;' +
        'border-radius:.5rem;font-size:.78rem;font-weight:600;color:#fff;z-index:100000;' +
        'pointer-events:none;opacity:0;transition:opacity .3s}' +
      '.tm-toast.tm-toast-show{opacity:1}' +

      /* talent button injected in pages */
      '.tm-talent-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;box-sizing:border-box;border-radius:.4rem;' +
        'border:1px solid rgba(245,158,11,.3);background:rgba(245,158,11,.1);color:#fbbf24;' +
        'font-size:.7rem;font-weight:600;cursor:pointer;transition:background .2s,border-color .2s}' +
      '.tm-talent-btn:hover{background:rgba(245,158,11,.2);border-color:rgba(245,158,11,.5)}' +
    '';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  /** Show a small toast notification */
  function _toast(msg, color) {
    var el = document.createElement('div');
    el.className = 'tm-toast';
    el.style.background = color || '#334155';
    el.textContent = msg;
    document.body.appendChild(el);
    // trigger reflow
    void el.offsetWidth;
    el.classList.add('tm-toast-show');
    setTimeout(function () {
      el.classList.remove('tm-toast-show');
      setTimeout(function () { el.remove(); }, 350);
    }, 1800);
  }

  /** Re-render the modal content for a character (keeps it open) */
  function _refreshModal(charKey) {
    var overlay = document.getElementById(MODAL_ID);
    if (!overlay) { return; }
    var card = overlay.querySelector('.tm-card');
    if (!card) { return; }
    card.innerHTML = _buildModalContent(charKey);
    _bindModalEvents(card, charKey);
  }

  /** Build inner HTML for the modal */
  function _buildModalContent(charKey) {
    var classType = _classOf(charKey);
    var tree = TALENT_TREES[classType];
    var charState = _ensureCharState(charKey);
    var charLevel = _getCharLevel(charKey);

    var html = '';

    // Close button
    html += '<button class="tm-close" data-action="close" title="Close">&times;</button>';

    // Header
    var displayName = _cap(charKey);
    html += '<div class="tm-header">';
    html += '<div class="tm-name">' + displayName + '</div>';
    html += '<span class="tm-badge">' + classType.toUpperCase() + '</span>';
    html += '</div>';

    // Tiers
    for (var tier = 1; tier <= 3; tier++) {
      var cfg = TIER_CONFIG[tier];
      var locked = charLevel < cfg.level;
      var tierKey = 'tier' + tier;
      var selectedKey = charState[tierKey];
      var hasSelection = selectedKey !== null;

      html += '<div class="tm-tier">';

      // Tier label
      html += '<div class="tm-tier-label">';
      html += '<span class="tm-dot" style="background:' + cfg.color + '"></span>';
      html += '<span style="color:' + cfg.color + '">' + cfg.label + '</span>';
      if (locked) {
        html += '<span class="tm-tier-lock">🔒 Level ' + cfg.level + '</span>';
      }
      html += '</div>';

      // Talent choices
      html += '<div class="tm-row">';
      var talents = tree[tier];
      for (var i = 0; i < talents.length; i++) {
        var t = talents[i];
        var isSelected = selectedKey === t.key;
        var cls = 'tm-talent';
        if (locked)     { cls += ' tm-locked'; }
        if (isSelected) { cls += ' tm-selected'; }

        html += '<div class="' + cls + '"' +
                ' style="--tm-glow:' + cfg.color + ';--tm-glow-alpha:' + cfg.color + '40"' +
                ' data-action="select" data-tier="' + tier + '" data-key="' + t.key + '">';
        html += '<div class="tm-radio"></div>';
        html += '<div class="tm-icon">' + t.icon + '</div>';
        html += '<div class="tm-tname">' + t.name + '</div>';
        html += '<div class="tm-tdesc">' + t.desc + '</div>';
        if (!hasSelection && !locked) {
          html += '<div class="tm-cost">$' + _fmt(cfg.cost) + '</div>';
        }
        html += '</div>';
      }
      html += '</div>'; // .tm-row
      html += '</div>'; // .tm-tier
    }

    // Reset button
    html += '<button class="tm-reset" data-action="reset">↻ Reset Talents (' + RESET_COST_DIAMONDS + ' 💎)</button>';

    return html;
  }

  /** Attach click handlers inside a modal card */
  function _bindModalEvents(card, charKey) {
    card.addEventListener('click', function (e) {
      var target = e.target.closest('[data-action]');
      if (!target) { return; }
      var action = target.getAttribute('data-action');

      if (action === 'close') {
        closeTalentModal();
      } else if (action === 'select') {
        var tier = parseInt(target.getAttribute('data-tier'), 10);
        var key  = target.getAttribute('data-key');
        var result = selectTalent(charKey, tier, key);
        if (!result.ok) {
          _toast(result.msg, '#dc2626');
        } else {
          _toast(result.msg, '#16a34a');
        }
      } else if (action === 'reset') {
        var res = resetTalents(charKey);
        if (!res.ok) {
          _toast(res.msg, '#dc2626');
        } else {
          _toast('Talents reset!', '#8b5cf6');
        }
      }
    });
  }

  /**
   * openTalentModal(charKey)
   * Creates (or replaces) the modal overlay and shows it.
   */
  function openTalentModal(charKey) {
    _injectStyles();

    var classType = _classOf(charKey);
    if (!classType) { _toast('Unknown character', '#dc2626'); return; }

    // Remove existing
    var existing = document.getElementById(MODAL_ID);
    if (existing) { existing.remove(); }

    // Build overlay
    var overlay = document.createElement('div');
    overlay.id = MODAL_ID;

    var card = document.createElement('div');
    card.className = 'tm-card';
    card.innerHTML = _buildModalContent(charKey);
    _bindModalEvents(card, charKey);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Close on overlay click (not card)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { closeTalentModal(); }
    });

    // Close on Escape
    var escHandler = function (e) {
      if (e.key === 'Escape') {
        closeTalentModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    // Animate in
    requestAnimationFrame(function () {
      overlay.classList.add('tm-open');
    });
  }

  /**
   * closeTalentModal()
   */
  function closeTalentModal() {
    var overlay = document.getElementById(MODAL_ID);
    if (!overlay) { return; }
    overlay.classList.remove('tm-open');
    setTimeout(function () { overlay.remove(); }, 300);
  }

  /* ------------------------------------------------------------------ */
  /*  INJECT TALENT BUTTONS                                             */
  /* ------------------------------------------------------------------ */

  /**
   * injectTalentButtons()
   * Scans the DOM for elements with [data-charkey] or .char-detail
   * and appends a "Talents" button if the character is >= level 50.
   */
  function injectTalentButtons() {
    _injectStyles();

    var targets = document.querySelectorAll('[data-charkey], .char-detail');
    for (var i = 0; i < targets.length; i++) {
      var el = targets[i];

      // Skip if we already injected
      if (el.querySelector('.tm-talent-btn')) { continue; }

      var charKey = el.getAttribute('data-charkey') || el.getAttribute('data-char') || null;
      if (!charKey) {
        // Try to infer from id or inner text
        var id = el.id || '';
        var match = id.match(/^char[-_]?([\w]+)/i);
        if (match) { charKey = match[1].toLowerCase(); }
      }
      if (!charKey || !_classOf(charKey)) { continue; }

      var level = _getCharLevel(charKey);
      if (level < 50) { continue; }

      var btn = document.createElement('button');
      btn.className = 'tm-talent-btn';
      btn.innerHTML = '🌟 Talents';
      btn.setAttribute('data-talent-for', charKey);
      (function (ck) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          openTalentModal(ck);
        });
      })(charKey);
      el.appendChild(btn);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  EXPORTS                                                           */
  /* ------------------------------------------------------------------ */

  window.openTalentModal    = openTalentModal;
  window.closeTalentModal   = closeTalentModal;
  window.selectTalent       = selectTalent;
  window.resetTalents       = resetTalents;
  window.injectTalentButtons = injectTalentButtons;
  window.getTalentBonuses   = getTalentBonuses;
  window.TALENT_TREES       = TALENT_TREES;

})();
