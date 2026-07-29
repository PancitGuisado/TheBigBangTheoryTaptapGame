// ============================================================
// EQUIPMENT ENCHANTMENT SYSTEM
// Relies on global: state, characters, saveProgress(), showToast(),
//   showGameAlert(), SoundManager, RARITY_COLORS
// ============================================================

(function () {
  'use strict';

  /* ─────────────── ENCHANTMENT TYPES ─────────────── */

  var ENCHANTMENT_TYPES = {
    fire: {
      name: 'Fire',
      icon: '🔥',
      color: '#ef4444',
      glow: 'rgba(239,68,68,0.6)',
      desc: '+15% DMG, burn effect',
      statBonus: { dmgPct: 0.15 },
      effectType: 'burn'
    },
    ice: {
      name: 'Ice',
      icon: '❄️',
      color: '#38bdf8',
      glow: 'rgba(56,189,248,0.6)',
      desc: '+10% slow on hit',
      statBonus: {},
      effectType: 'slow',
      slowPct: 0.10
    },
    lightning: {
      name: 'Lightning',
      icon: '⚡',
      color: '#a78bfa',
      glow: 'rgba(167,139,250,0.6)',
      desc: '+20% crit chance',
      statBonus: { critPct: 20 },
      effectType: 'crit'
    },
    lifesteal: {
      name: 'Lifesteal',
      icon: '🩸',
      color: '#f472b6',
      glow: 'rgba(244,114,182,0.6)',
      desc: '+8% HP on hit',
      statBonus: { lifestealPct: 0.08 },
      effectType: 'lifesteal'
    },
    thorns: {
      name: 'Thorns',
      icon: '🌵',
      color: '#22c55e',
      glow: 'rgba(34,197,94,0.6)',
      desc: 'Reflect 10% DMG taken',
      statBonus: { reflectPct: 0.10 },
      effectType: 'reflect'
    },
    fortune: {
      name: 'Fortune',
      icon: '🪙',
      color: '#fbbf24',
      glow: 'rgba(251,191,36,0.6)',
      desc: '+25% coin drops',
      statBonus: { coinDropPct: 0.25 },
      effectType: 'coinBonus'
    }
  };

  var ENCHANT_TYPE_KEYS = Object.keys(ENCHANTMENT_TYPES);

  var ENCHANT_COST_DIAMONDS = 200;
  var REROLL_COST_DIAMONDS  = 100;

  /* ─────────────── CSS INJECTION ─────────────── */

  var STYLE_ID = 'enchantment-styles';

  function _injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      /* Overlay */
      '.enchant-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(8px);z-index:9800;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;padding:12px;}' +
      '.enchant-overlay.active{opacity:1;}' +

      /* Modal */
      '.enchant-modal{background:linear-gradient(145deg,#0f172a 0%,#1a1a2e 50%,#0f172a 100%);border:2px solid rgba(167,139,250,0.4);border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 0 80px rgba(167,139,250,0.12),inset 0 1px 0 rgba(255,255,255,0.05);transform:scale(0.9);transition:transform 0.3s ease;}' +
      '.enchant-overlay.active .enchant-modal{transform:scale(1);}' +

      /* Header */
      '.enchant-header{background:linear-gradient(to right,rgba(88,28,135,0.5),rgba(15,23,42,0.8));border-bottom:2px solid rgba(167,139,250,0.3);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-radius:16px 16px 0 0;}' +
      '.enchant-title{font-family:"Press Start 2P",monospace;font-size:11px;color:#a78bfa;text-transform:uppercase;letter-spacing:2px;text-shadow:0 0 12px rgba(167,139,250,0.6);}' +
      '.enchant-close{background:none;border:none;color:#9ca3af;font-size:20px;cursor:pointer;padding:4px 8px;line-height:1;transition:color 0.15s;}' +
      '.enchant-close:hover{color:#fff;}' +

      /* Step indicators */
      '.enchant-steps{display:flex;justify-content:center;gap:6px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04);}' +
      '.enchant-step{display:flex;align-items:center;gap:4px;padding:6px 12px;border-radius:20px;font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s;}' +
      '.enchant-step.active{background:rgba(167,139,250,0.2);color:#c4b5fd;border:1px solid rgba(167,139,250,0.4);}' +
      '.enchant-step.inactive{background:rgba(30,41,59,0.4);color:#4b5563;border:1px solid rgba(255,255,255,0.04);}' +
      '.enchant-step.done{background:rgba(34,197,94,0.15);color:#86efac;border:1px solid rgba(34,197,94,0.3);}' +

      /* Equipment list */
      '.enchant-equip-list{display:grid;grid-template-columns:1fr;gap:6px;padding:12px 16px;max-height:280px;overflow-y:auto;}' +
      '.enchant-equip-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:all 0.2s;border:2px solid rgba(255,255,255,0.06);background:rgba(15,23,42,0.6);}' +
      '.enchant-equip-item:hover{border-color:rgba(167,139,250,0.4);background:rgba(88,28,135,0.15);}' +
      '.enchant-equip-item.selected{border-color:rgba(167,139,250,0.6);background:rgba(88,28,135,0.25);box-shadow:0 0 16px rgba(167,139,250,0.15);}' +
      '.enchant-equip-name{font-size:11px;font-weight:bold;color:#e2e8f0;}' +
      '.enchant-equip-info{font-size:9px;color:#6b7280;margin-top:2px;}' +
      '.enchant-equip-enchant-badge{font-size:8px;padding:2px 6px;border-radius:4px;font-weight:bold;margin-top:3px;display:inline-block;}' +

      /* Enchantment type picker */
      '.enchant-type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px 16px;}' +
      '.enchant-type-card{position:relative;text-align:center;padding:14px 8px;border-radius:12px;cursor:pointer;transition:all 0.2s;border:2px solid rgba(255,255,255,0.06);background:rgba(15,23,42,0.6);}' +
      '.enchant-type-card:hover{transform:translateY(-2px);}' +
      '.enchant-type-card.selected{transform:translateY(-2px);}' +
      '.enchant-type-icon{font-size:24px;display:block;margin-bottom:4px;}' +
      '.enchant-type-name{font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;}' +
      '.enchant-type-desc{font-size:8px;color:#9ca3af;margin-top:3px;}' +

      /* Confirm panel */
      '.enchant-confirm{padding:16px;text-align:center;}' +
      '.enchant-preview{background:rgba(30,41,59,0.6);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin:8px 0 14px;}' +
      '.enchant-preview-name{font-size:12px;font-weight:900;margin-bottom:4px;}' +
      '.enchant-preview-desc{font-size:10px;color:#a5b4fc;margin-top:4px;}' +

      /* Buttons */
      '.enchant-btn{display:inline-block;margin:4px;padding:10px 20px;border:2px solid;border-radius:8px;font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:all 0.2s;}' +
      '.enchant-btn-primary{background:linear-gradient(135deg,#6d28d9,#7c3aed);border-color:#a78bfa;color:#fff;box-shadow:0 0 16px rgba(167,139,250,0.25);}' +
      '.enchant-btn-primary:hover{box-shadow:0 0 30px rgba(167,139,250,0.4);transform:translateY(-1px);}' +
      '.enchant-btn-secondary{background:#1e293b;border-color:#475569;color:#9ca3af;}' +
      '.enchant-btn-secondary:hover{background:#334155;color:#e2e8f0;}' +
      '.enchant-btn-reroll{background:linear-gradient(135deg,#b45309,#d97706);border-color:#fbbf24;color:#fff;box-shadow:0 0 16px rgba(251,191,36,0.2);}' +
      '.enchant-btn-reroll:hover{box-shadow:0 0 30px rgba(251,191,36,0.35);}' +
      '.enchant-btn-disabled{opacity:0.4;cursor:not-allowed;pointer-events:none;}' +

      /* Sparkle animation */
      '@keyframes enchant-sparkle{0%{transform:scale(0) rotate(0deg);opacity:1}50%{transform:scale(1.2) rotate(180deg);opacity:0.8}100%{transform:scale(0) rotate(360deg);opacity:0}}' +
      '.enchant-sparkle{position:fixed;pointer-events:none;z-index:9860;}' +
      '.enchant-sparkle-dot{position:absolute;width:4px;height:4px;border-radius:50%;animation:enchant-sparkle 0.8s ease-out forwards;}' +

      '@keyframes enchant-success-glow{0%{box-shadow:0 0 0 rgba(167,139,250,0)}50%{box-shadow:0 0 60px 20px rgba(167,139,250,0.4)}100%{box-shadow:0 0 0 rgba(167,139,250,0)}}' +
      '.enchant-success{animation:enchant-success-glow 1s ease-out;}' +

      /* Enchanted item glow on equipment cards */
      '.enchant-glow-fire{box-shadow:0 0 12px 2px rgba(239,68,68,0.4) !important;animation:enchant-glow-pulse-fire 2s ease-in-out infinite;}' +
      '.enchant-glow-ice{box-shadow:0 0 12px 2px rgba(56,189,248,0.4) !important;animation:enchant-glow-pulse-ice 2s ease-in-out infinite;}' +
      '.enchant-glow-lightning{box-shadow:0 0 12px 2px rgba(167,139,250,0.4) !important;animation:enchant-glow-pulse-lightning 2s ease-in-out infinite;}' +
      '.enchant-glow-lifesteal{box-shadow:0 0 12px 2px rgba(244,114,182,0.4) !important;animation:enchant-glow-pulse-lifesteal 2s ease-in-out infinite;}' +
      '.enchant-glow-thorns{box-shadow:0 0 12px 2px rgba(34,197,94,0.4) !important;animation:enchant-glow-pulse-thorns 2s ease-in-out infinite;}' +
      '.enchant-glow-fortune{box-shadow:0 0 12px 2px rgba(251,191,36,0.4) !important;animation:enchant-glow-pulse-fortune 2s ease-in-out infinite;}' +

      '@keyframes enchant-glow-pulse-fire{0%,100%{box-shadow:0 0 8px 2px rgba(239,68,68,0.3)}50%{box-shadow:0 0 18px 4px rgba(239,68,68,0.6)}}' +
      '@keyframes enchant-glow-pulse-ice{0%,100%{box-shadow:0 0 8px 2px rgba(56,189,248,0.3)}50%{box-shadow:0 0 18px 4px rgba(56,189,248,0.6)}}' +
      '@keyframes enchant-glow-pulse-lightning{0%,100%{box-shadow:0 0 8px 2px rgba(167,139,250,0.3)}50%{box-shadow:0 0 18px 4px rgba(167,139,250,0.6)}}' +
      '@keyframes enchant-glow-pulse-lifesteal{0%,100%{box-shadow:0 0 8px 2px rgba(244,114,182,0.3)}50%{box-shadow:0 0 18px 4px rgba(244,114,182,0.6)}}' +
      '@keyframes enchant-glow-pulse-thorns{0%,100%{box-shadow:0 0 8px 2px rgba(34,197,94,0.3)}50%{box-shadow:0 0 18px 4px rgba(34,197,94,0.6)}}' +
      '@keyframes enchant-glow-pulse-fortune{0%,100%{box-shadow:0 0 8px 2px rgba(251,191,36,0.3)}50%{box-shadow:0 0 18px 4px rgba(251,191,36,0.6)}}' +

      /* Resource bar */
      '.enchant-resource{display:flex;align-items:center;gap:4px;font-size:9px;color:#9ca3af;padding:4px 8px;background:rgba(30,41,59,0.4);border-radius:6px;border:1px solid rgba(255,255,255,0.04);}' +
      '.enchant-resource-val{color:#a78bfa;font-weight:bold;}' +

      /* Empty state */
      '.enchant-empty{text-align:center;padding:30px 16px;color:#4b5563;font-size:10px;}' +
      '.enchant-empty-icon{font-size:36px;display:block;margin-bottom:8px;opacity:0.4;}';

    document.head.appendChild(s);
  }

  /* ─────────────── STATE INIT ─────────────── */

  function _initState() {
    if (state.enchantScrolls === undefined) state.enchantScrolls = 0;
    if (state.resources && state.resources.diamond === undefined) state.resources.diamond = 0;
  }

  /* ─────────────── HELPERS ─────────────── */

  /** Get all equipment from inventory that can be enchanted (equipped or in bag) */
  function _getAllEquipment() {
    _initState();
    var items = [];

    // From inventory
    if (Array.isArray(state.inventory)) {
      for (var i = 0; i < state.inventory.length; i++) {
        var it = state.inventory[i];
        if (it && (it.type === 'weapon' || it.type === 'armor' || it.type === 'accessory' || it.type === 'hat' || it.type === 'ring')) {
          items.push({ item: it, source: 'inventory', index: i, equippedTo: null });
        }
      }
    }

    // From equipped
    if (state.charEquipment) {
      var cKeys = Object.keys(state.charEquipment);
      for (var c = 0; c < cKeys.length; c++) {
        var charKey = cKeys[c];
        var slots = state.charEquipment[charKey];
        if (!slots) continue;
        var slotKeys = Object.keys(slots);
        for (var s = 0; s < slotKeys.length; s++) {
          var slotKey = slotKeys[s];
          var eqItem  = slots[slotKey];
          if (eqItem && eqItem.name) {
            items.push({ item: eqItem, source: 'equipped', charKey: charKey, slotKey: slotKey, equippedTo: charKey });
          }
        }
      }
    }

    return items;
  }

  function _getRarityColor(rarity) {
    var colors = {
      common: '#9ca3af', rare: '#3b82f6', epic: '#a855f7', legendary: '#f59e0b'
    };
    return colors[rarity] || '#9ca3af';
  }

  function _getEnchantGlowClass(enchantType) {
    return ENCHANTMENT_TYPES[enchantType] ? 'enchant-glow-' + enchantType : '';
  }

  /* ─────────────── ENCHANTING LOGIC ─────────────── */

  function enchantItem(itemRef, enchantType) {
    _initState();

    if (!ENCHANTMENT_TYPES[enchantType]) {
      if (typeof showToast === 'function') showToast('Unknown enchantment type!', 'error');
      return false;
    }

    var diamonds = (state.resources && state.resources.diamond) || 0;
    var scrolls  = state.enchantScrolls || 0;

    if (diamonds < ENCHANT_COST_DIAMONDS) {
      if (typeof showToast === 'function') showToast('Not enough 💎 Diamonds! Need ' + ENCHANT_COST_DIAMONDS + ', have ' + diamonds + '.', 'error');
      return false;
    }
    if (scrolls < 1) {
      if (typeof showToast === 'function') showToast('Not enough 📜 Enchantment Scrolls!', 'error');
      return false;
    }

    // Deduct cost
    state.resources.diamond -= ENCHANT_COST_DIAMONDS;
    state.enchantScrolls    -= 1;

    // Apply enchantment
    var item = _resolveItem(itemRef);
    if (!item) {
      if (typeof showToast === 'function') showToast('Equipment not found!', 'error');
      return false;
    }

    item.enchantment = { type: enchantType, level: 1 };

    if (typeof saveProgress === 'function') saveProgress();

    // Animation
    _playSparkleAnimation();

    var enc = ENCHANTMENT_TYPES[enchantType];
    if (typeof showToast === 'function') {
      showToast(enc.icon + ' ' + item.name + ' enchanted with ' + enc.name + '!', 'success');
    }
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('purchase');

    return true;
  }

  function rerollEnchantment(itemRef) {
    _initState();

    var item = _resolveItem(itemRef);
    if (!item || !item.enchantment) {
      if (typeof showToast === 'function') showToast('This item has no enchantment to re-roll!', 'error');
      return false;
    }

    var diamonds = (state.resources && state.resources.diamond) || 0;
    if (diamonds < REROLL_COST_DIAMONDS) {
      if (typeof showToast === 'function') showToast('Not enough 💎 Diamonds! Need ' + REROLL_COST_DIAMONDS + ', have ' + diamonds + '.', 'error');
      return false;
    }

    state.resources.diamond -= REROLL_COST_DIAMONDS;

    // Pick a new type (different from current)
    var currentType = item.enchantment.type;
    var available = ENCHANT_TYPE_KEYS.filter(function (k) { return k !== currentType; });
    var newType   = available[Math.floor(Math.random() * available.length)];

    item.enchantment.type = newType;

    if (typeof saveProgress === 'function') saveProgress();

    _playSparkleAnimation();

    var enc = ENCHANTMENT_TYPES[newType];
    if (typeof showToast === 'function') {
      showToast(enc.icon + ' Re-rolled to ' + enc.name + '!', 'success');
    }
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('purchase');

    return true;
  }

  /** Resolve an item reference to the actual item object in state */
  function _resolveItem(ref) {
    if (!ref) return null;

    if (ref.source === 'inventory' && typeof ref.index === 'number') {
      return (state.inventory && state.inventory[ref.index]) || null;
    }
    if (ref.source === 'equipped' && ref.charKey && ref.slotKey) {
      return (state.charEquipment && state.charEquipment[ref.charKey] && state.charEquipment[ref.charKey][ref.slotKey]) || null;
    }
    // Direct item reference
    if (ref.item) return ref.item;
    return null;
  }

  /* ─────────────── SPARKLE ANIMATION ─────────────── */

  function _playSparkleAnimation() {
    var container = document.createElement('div');
    container.className = 'enchant-sparkle';
    container.style.left = '0';
    container.style.top  = '0';
    container.style.width  = '100vw';
    container.style.height = '100vh';

    var colors = ['#a78bfa', '#c4b5fd', '#fbbf24', '#22d3ee', '#f472b6', '#fff'];
    for (var i = 0; i < 24; i++) {
      var dot = document.createElement('div');
      dot.className = 'enchant-sparkle-dot';
      dot.style.background = colors[i % colors.length];
      dot.style.left = (50 + (Math.random() - 0.5) * 50) + '%';
      dot.style.top  = (50 + (Math.random() - 0.5) * 40) + '%';
      dot.style.width  = (3 + Math.random() * 5) + 'px';
      dot.style.height = dot.style.width;
      dot.style.animationDelay = (i * 0.04) + 's';
      container.appendChild(dot);
    }

    document.body.appendChild(container);
    setTimeout(function () { container.remove(); }, 1200);
  }

  /* ─────────────── MODAL UI ─────────────── */

  var _step        = 1; // 1=select equipment, 2=select enchantment, 3=confirm
  var _selEquipRef = null;
  var _selEnchType = null;
  var _overlayEl   = null;

  function openEnchantmentModal() {
    _initState();
    _injectStyles();
    _step        = 1;
    _selEquipRef = null;
    _selEnchType = null;

    var old = document.getElementById('enchant-modal-overlay');
    if (old) old.remove();

    _overlayEl = document.createElement('div');
    _overlayEl.id = 'enchant-modal-overlay';
    _overlayEl.className = 'enchant-overlay';
    _overlayEl.addEventListener('click', function (e) {
      if (e.target === _overlayEl) closeEnchantmentModal();
    });

    var modal = document.createElement('div');
    modal.className = 'enchant-modal';
    modal.id = 'enchant-modal-inner';
    _overlayEl.appendChild(modal);

    document.body.appendChild(_overlayEl);
    _renderEnchantModal();

    requestAnimationFrame(function () { _overlayEl.classList.add('active'); });
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
  }

  function closeEnchantmentModal() {
    if (!_overlayEl) return;
    _overlayEl.classList.remove('active');
    setTimeout(function () {
      if (_overlayEl && _overlayEl.parentNode) _overlayEl.remove();
      _overlayEl = null;
    }, 300);
  }

  function _renderEnchantModal() {
    var modal = document.getElementById('enchant-modal-inner');
    if (!modal) return;

    var html = '';

    // Header
    html += '<div class="enchant-header">' +
      '<div class="enchant-title">✨ Enchantments</div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<div class="enchant-resource">📜 Scrolls: <span class="enchant-resource-val">' + (state.enchantScrolls || 0) + '</span></div>' +
        '<div class="enchant-resource">💎 <span class="enchant-resource-val">' + ((state.resources && state.resources.diamond) || 0) + '</span></div>' +
        '<button class="enchant-close" onclick="closeEnchantmentModal()">&times;</button>' +
      '</div>' +
    '</div>';

    // Step indicator
    html += '<div class="enchant-steps">' +
      '<div class="enchant-step ' + (_step === 1 ? 'active' : (_step > 1 ? 'done' : 'inactive')) + '">① Equipment</div>' +
      '<div class="enchant-step ' + (_step === 2 ? 'active' : (_step > 2 ? 'done' : 'inactive')) + '">② Enchantment</div>' +
      '<div class="enchant-step ' + (_step === 3 ? 'active' : 'inactive') + '">③ Confirm</div>' +
    '</div>';

    // Step content
    if (_step === 1)      html += _renderStep1();
    else if (_step === 2) html += _renderStep2();
    else if (_step === 3) html += _renderStep3();

    modal.innerHTML = html;
  }

  /* ─── Step 1: Select Equipment ─── */
  function _renderStep1() {
    var items = _getAllEquipment();

    if (items.length === 0) {
      return '<div class="enchant-empty">' +
        '<span class="enchant-empty-icon">🎒</span>' +
        'No equipment found.<br>Acquire gear from battles or the forge!' +
      '</div>';
    }

    var html = '<div class="enchant-equip-list">';

    for (var i = 0; i < items.length; i++) {
      var entry = items[i];
      var item  = entry.item;
      var rColor = _getRarityColor(item.rarity);
      var isSelected = _selEquipRef &&
        ((_selEquipRef.source === 'inventory' && entry.source === 'inventory' && _selEquipRef.index === entry.index) ||
         (_selEquipRef.source === 'equipped' && entry.source === 'equipped' && _selEquipRef.charKey === entry.charKey && _selEquipRef.slotKey === entry.slotKey));

      var enchBadge = '';
      if (item.enchantment && item.enchantment.type && ENCHANTMENT_TYPES[item.enchantment.type]) {
        var enc = ENCHANTMENT_TYPES[item.enchantment.type];
        enchBadge = '<div class="enchant-equip-enchant-badge" style="background:' + enc.color + '22;color:' + enc.color + ';border:1px solid ' + enc.color + '44;">' +
          enc.icon + ' ' + enc.name + '</div>';
      }

      // Build a serializable ref
      var refStr = '';
      if (entry.source === 'inventory') {
        refStr = '{source:\'inventory\',index:' + entry.index + '}';
      } else {
        refStr = '{source:\'equipped\',charKey:\'' + entry.charKey + '\',slotKey:\'' + entry.slotKey + '\'}';
      }

      html += '<div class="enchant-equip-item ' + (isSelected ? 'selected' : '') + '" onclick="window._enchantSelectEquip(' + refStr + ')">' +
        '<div style="width:36px;height:36px;border-radius:8px;border:2px solid ' + rColor + ';display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(15,23,42,0.8);flex-shrink:0;">' +
          (item.type === 'weapon' ? '⚔️' : item.type === 'armor' ? '🛡️' : item.type === 'hat' ? '🎩' : item.type === 'ring' ? '💍' : '📿') +
        '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div class="enchant-equip-name" style="color:' + rColor + ';">' + (item.name || 'Unknown') + '</div>' +
          '<div class="enchant-equip-info">' + (item.rarity || 'common') + ' ' + (item.type || 'gear') +
            (entry.equippedTo ? ' — on ' + (characters[entry.equippedTo] ? characters[entry.equippedTo].name : entry.equippedTo) : '') +
            (item.enhanceLevel ? ' +' + item.enhanceLevel : '') +
          '</div>' +
          enchBadge +
        '</div>' +
      '</div>';
    }

    html += '</div>';

    // Next button
    html += '<div style="padding:12px 16px;text-align:center;">';
    if (_selEquipRef) {
      html += '<button class="enchant-btn enchant-btn-primary" onclick="window._enchantGoStep(2)">Next → Select Enchantment</button>';
    } else {
      html += '<div style="font-size:9px;color:#4b5563;margin-top:4px;">Select an equipment piece to enchant</div>';
    }
    html += '</div>';

    return html;
  }

  /* ─── Step 2: Select Enchantment Type ─── */
  function _renderStep2() {
    var html = '<div class="enchant-type-grid">';

    for (var i = 0; i < ENCHANT_TYPE_KEYS.length; i++) {
      var key = ENCHANT_TYPE_KEYS[i];
      var enc = ENCHANTMENT_TYPES[key];
      var isSelected = _selEnchType === key;

      html += '<div class="enchant-type-card ' + (isSelected ? 'selected' : '') + '" ' +
        'style="border-color:' + (isSelected ? enc.color : 'rgba(255,255,255,0.06)') + ';' +
          (isSelected ? 'background:' + enc.color + '15;box-shadow:0 0 20px ' + enc.glow + ';' : '') +
        '" onclick="window._enchantSelectType(\'' + key + '\')">' +
        '<span class="enchant-type-icon">' + enc.icon + '</span>' +
        '<div class="enchant-type-name" style="color:' + enc.color + ';">' + enc.name + '</div>' +
        '<div class="enchant-type-desc">' + enc.desc + '</div>' +
      '</div>';
    }

    html += '</div>';

    // Nav buttons
    html += '<div style="padding:12px 16px;text-align:center;display:flex;gap:8px;justify-content:center;">';
    html += '<button class="enchant-btn enchant-btn-secondary" onclick="window._enchantGoStep(1)">← Back</button>';
    if (_selEnchType) {
      html += '<button class="enchant-btn enchant-btn-primary" onclick="window._enchantGoStep(3)">Next → Confirm</button>';
    }
    html += '</div>';

    return html;
  }

  /* ─── Step 3: Confirm ─── */
  function _renderStep3() {
    var item = _resolveItem(_selEquipRef);
    var enc  = ENCHANTMENT_TYPES[_selEnchType];
    if (!item || !enc) return '<div class="enchant-empty">Error: missing selection</div>';

    var diamonds = (state.resources && state.resources.diamond) || 0;
    var scrolls  = state.enchantScrolls || 0;
    var canAfford = diamonds >= ENCHANT_COST_DIAMONDS && scrolls >= 1;
    var hasExisting = item.enchantment && item.enchantment.type;
    var rColor = _getRarityColor(item.rarity);

    var html = '<div class="enchant-confirm">';

    // Equipment preview
    html += '<div class="enchant-preview">' +
      '<div style="font-size:24px;margin-bottom:6px;">' + enc.icon + '</div>' +
      '<div class="enchant-preview-name" style="color:' + rColor + ';">' + item.name + '</div>' +
      '<div style="font-size:10px;margin:6px 0;color:#6b7280;">will receive</div>' +
      '<div class="enchant-preview-name" style="color:' + enc.color + ';">' + enc.icon + ' ' + enc.name + ' Enchantment</div>' +
      '<div class="enchant-preview-desc">' + enc.desc + '</div>' +
    '</div>';

    // Warning if already enchanted
    if (hasExisting) {
      var oldEnc = ENCHANTMENT_TYPES[item.enchantment.type];
      html += '<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:8px;margin-bottom:10px;font-size:9px;color:#fca5a5;">' +
        '⚠️ This will replace the existing <strong>' + (oldEnc ? oldEnc.name : item.enchantment.type) + '</strong> enchantment!' +
      '</div>';
    }

    // Cost display
    var dOk = diamonds >= ENCHANT_COST_DIAMONDS;
    var sOk = scrolls >= 1;
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:10px 0;font-size:10px;">' +
      '<div style="padding:4px 10px;border-radius:6px;background:rgba(30,41,59,0.6);border:1px solid rgba(255,255,255,0.06);">' +
        '💎 <span style="color:' + (dOk ? '#34d399' : '#f87171') + ';">' + diamonds + '/' + ENCHANT_COST_DIAMONDS + '</span>' +
      '</div>' +
      '<div style="padding:4px 10px;border-radius:6px;background:rgba(30,41,59,0.6);border:1px solid rgba(255,255,255,0.06);">' +
        '📜 <span style="color:' + (sOk ? '#34d399' : '#f87171') + ';">' + scrolls + '/1</span>' +
      '</div>' +
    '</div>';

    // Buttons
    html += '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px;">';
    html += '<button class="enchant-btn enchant-btn-secondary" onclick="window._enchantGoStep(2)">← Back</button>';
    if (canAfford) {
      html += '<button class="enchant-btn enchant-btn-primary" onclick="window._enchantConfirm()">✨ Enchant!</button>';
    } else {
      html += '<button class="enchant-btn enchant-btn-primary enchant-btn-disabled">Insufficient Resources</button>';
    }
    html += '</div>';

    // Re-roll section (if already enchanted)
    if (hasExisting) {
      var canReroll = diamonds >= REROLL_COST_DIAMONDS;
      html += '<div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);">' +
        '<div style="font-size:9px;color:#6b7280;margin-bottom:6px;">Or re-roll existing enchantment (💎 ' + REROLL_COST_DIAMONDS + ')</div>' +
        '<button class="enchant-btn enchant-btn-reroll' + (canReroll ? '' : ' enchant-btn-disabled') + '" onclick="window._enchantReroll()">🎲 Re-Roll</button>' +
      '</div>';
    }

    html += '</div>';
    return html;
  }

  /* ─── Modal Navigation ─── */

  function _enchantSelectEquip(ref) {
    _selEquipRef = ref;
    _renderEnchantModal();
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
  }

  function _enchantSelectType(type) {
    _selEnchType = type;
    _renderEnchantModal();
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
  }

  function _enchantGoStep(step) {
    _step = step;
    _renderEnchantModal();
    if (typeof SoundManager !== 'undefined' && SoundManager.playFX) SoundManager.playFX('click');
  }

  function _enchantConfirm() {
    if (!_selEquipRef || !_selEnchType) return;
    var success = enchantItem(_selEquipRef, _selEnchType);
    if (success) {
      setTimeout(function () {
        _step = 1;
        _selEquipRef = null;
        _selEnchType = null;
        _renderEnchantModal();
      }, 600);
    }
  }

  function _enchantReroll() {
    if (!_selEquipRef) return;
    var success = rerollEnchantment(_selEquipRef);
    if (success) {
      setTimeout(function () { _renderEnchantModal(); }, 400);
    }
  }

  /* ─────────────── SCROLL GRANTING HELPER ─────────────── */

  /**
   * Grant enchantment scrolls — call from mini-boss kills, tower rewards, etc.
   * e.g. grantEnchantScrolls(3);
   */
  function grantEnchantScrolls(amount) {
    _initState();
    if (!amount || amount <= 0) return;
    state.enchantScrolls = (state.enchantScrolls || 0) + Math.floor(amount);
    if (typeof saveProgress === 'function') saveProgress();
  }

  /* ─────────────── COMBAT INTEGRATION ─────────────── */

  /**
   * Get the enchantment bonus for an equipped item.
   * Returns the ENCHANTMENT_TYPES entry or null.
   */
  function getItemEnchantment(item) {
    if (!item || !item.enchantment || !item.enchantment.type) return null;
    return ENCHANTMENT_TYPES[item.enchantment.type] || null;
  }

  /**
   * Apply enchant glow CSS class to a DOM element based on item's enchantment.
   */
  function applyEnchantGlow(element, item) {
    if (!element || !item || !item.enchantment || !item.enchantment.type) return;
    var cls = _getEnchantGlowClass(item.enchantment.type);
    if (cls) element.classList.add(cls);
  }

  /* ─────────────── EXPOSE GLOBALS ─────────────── */

  window.openEnchantmentModal  = openEnchantmentModal;
  window.closeEnchantmentModal = closeEnchantmentModal;
  window.enchantItem           = enchantItem;
  window.rerollEnchantment     = rerollEnchantment;
  window.grantEnchantScrolls   = grantEnchantScrolls;
  window.getItemEnchantment    = getItemEnchantment;
  window.applyEnchantGlow      = applyEnchantGlow;
  window.ENCHANTMENT_TYPES     = ENCHANTMENT_TYPES;

  // Internal nav handlers (called from onclick in rendered HTML)
  window._enchantSelectEquip = _enchantSelectEquip;
  window._enchantSelectType  = _enchantSelectType;
  window._enchantGoStep      = _enchantGoStep;
  window._enchantConfirm     = _enchantConfirm;
  window._enchantReroll      = _enchantReroll;

  console.log('[Enchantments] Equipment Enchantment system loaded. ' + ENCHANT_TYPE_KEYS.length + ' enchantment types available.');

})();
