// ============================================================
// SOUND EFFECTS — Web Audio API synthesized SFX for YS characters
// No external files needed — pure generated sounds
// ============================================================
(function() {
    'use strict';

    var audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } 
            catch(e) { return null; }
        }
        return audioCtx;
    }

    // Base sound generator
    function playTone(freq, duration, type, volume, delay) {
        var ctx = getAudioCtx();
        if (!ctx) return;
        var startTime = ctx.currentTime + (delay || 0);
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(volume || 0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    function playNoise(duration, volume) {
        var ctx = getAudioCtx();
        if (!ctx) return;
        var bufferSize = ctx.sampleRate * duration;
        var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(volume || 0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();
    }

    // ── CHARACTER-SPECIFIC SOUNDS ──

    var sfx = {
        // Young Sheldon — Train whistle + chug
        ys_young_sheldon: function() {
            playTone(880, 0.15, 'square', 0.08);
            playTone(660, 0.15, 'square', 0.06, 0.15);
            playTone(880, 0.2, 'square', 0.08, 0.3);
            playNoise(0.1, 0.03); // steam
        },
        // Missy — Cute sparkle sound
        ys_missy: function() {
            playTone(1200, 0.08, 'sine', 0.06);
            playTone(1400, 0.08, 'sine', 0.06, 0.08);
            playTone(1600, 0.12, 'sine', 0.08, 0.16);
            playTone(2000, 0.15, 'sine', 0.05, 0.28);
        },
        // George Cooper — Heavy thud + meat slap
        ys_george: function() {
            playTone(80, 0.2, 'sawtooth', 0.12);
            playTone(60, 0.15, 'square', 0.1, 0.1);
            playNoise(0.08, 0.06); // impact
        },
        // Meemaw — Coin jingle
        ys_meemaw: function() {
            playTone(2400, 0.06, 'sine', 0.05);
            playTone(3000, 0.06, 'sine', 0.05, 0.06);
            playTone(2800, 0.06, 'sine', 0.04, 0.12);
            playTone(3200, 0.08, 'sine', 0.05, 0.18);
            playTone(2600, 0.06, 'sine', 0.03, 0.24);
        },
        // Dr. Sturgis — Bubbling chemical
        ys_sturgis: function() {
            playTone(200, 0.1, 'sine', 0.06);
            playTone(300, 0.08, 'sine', 0.05, 0.08);
            playTone(250, 0.1, 'sine', 0.06, 0.14);
            playTone(400, 0.15, 'sawtooth', 0.08, 0.22); // explosion
            playNoise(0.15, 0.04);
        },
        // Billy Sparks — Chicken clucks
        ys_billy: function() {
            playTone(600, 0.05, 'square', 0.06);
            playTone(800, 0.04, 'square', 0.05, 0.06);
            playTone(650, 0.05, 'square', 0.06, 0.12);
            playTone(750, 0.04, 'square', 0.04, 0.18);
            playTone(700, 0.05, 'square', 0.05, 0.24);
        },
        // Georgie — Tire whoosh + impact
        ys_georgie: function() {
            playTone(150, 0.3, 'sawtooth', 0.05);
            playTone(100, 0.15, 'square', 0.08, 0.25);
            playNoise(0.1, 0.05); // impact
        },
        // Tam — Ninja star whoosh
        ys_tam: function() {
            playTone(1000, 0.08, 'sawtooth', 0.04);
            playTone(800, 0.06, 'sawtooth', 0.04, 0.05);
            playTone(1200, 0.08, 'sawtooth', 0.04, 0.1);
            playTone(600, 0.1, 'sawtooth', 0.03, 0.18);
        },
        // Pastor Jeff — Holy choir chord
        ys_pastor_jeff: function() {
            playTone(523, 0.4, 'sine', 0.04); // C
            playTone(659, 0.4, 'sine', 0.04); // E
            playTone(784, 0.4, 'sine', 0.04); // G
            playTone(1047, 0.3, 'sine', 0.03, 0.1); // high C
        },
        // Pastor Rob — Whip crack
        ys_pastor_rob: function() {
            playNoise(0.03, 0.12); // sharp crack
            playTone(2000, 0.05, 'sawtooth', 0.08, 0.02);
            playTone(4000, 0.03, 'square', 0.06, 0.04);
        }
    };

    // Generic hit/heal sounds
    sfx.heal = function() {
        playTone(523, 0.15, 'sine', 0.05);
        playTone(659, 0.15, 'sine', 0.05, 0.12);
        playTone(784, 0.2, 'sine', 0.06, 0.24);
    };

    sfx.crit = function() {
        playTone(1500, 0.08, 'square', 0.08);
        playTone(2000, 0.12, 'sawtooth', 0.06, 0.06);
        playNoise(0.05, 0.04);
    };

    sfx.loot = function() {
        playTone(1000, 0.08, 'sine', 0.05);
        playTone(1200, 0.08, 'sine', 0.05, 0.08);
        playTone(1500, 0.12, 'sine', 0.06, 0.16);
    };

    sfx.stun = function() {
        playTone(200, 0.3, 'square', 0.06);
        playTone(100, 0.2, 'square', 0.04, 0.15);
    };

    sfx.achievement = function() {
        playTone(523, 0.12, 'sine', 0.06);
        playTone(659, 0.12, 'sine', 0.06, 0.1);
        playTone(784, 0.12, 'sine', 0.06, 0.2);
        playTone(1047, 0.3, 'sine', 0.08, 0.3);
    };

    // ── PUBLIC API ──
    window.YSSfx = {
        play: function(charKey) {
            if (typeof state !== 'undefined' && state.muted) return;
            if (sfx[charKey]) sfx[charKey]();
        },
        playEffect: function(effectName) {
            if (typeof state !== 'undefined' && state.muted) return;
            if (sfx[effectName]) sfx[effectName]();
        }
    };

    console.log('[YS SFX] 10 character sound effects + 4 general effects loaded');
})();
