// Skin Combat Animation Generator v4
// Adapts default character attack/injured poses for all themed skins
// by recoloring body elements and preserving themed accessories + effects
(function() {
    if (typeof vectors === 'undefined') return;

    // =========================================================================
    // THEME ATTACK EFFECTS (visual particle overlays per skin theme)
    // =========================================================================
    var themeAttackEffects = {
        animal: [
            '<path d="M 2,15 L 12,25 M 5,14 L 15,24 M 8,13 L 18,23" stroke="#ef4444" stroke-width="1.5" opacity="0.8"/>',
            '<path d="M 48,15 L 58,25 M 51,14 L 61,24 M 54,13 L 64,23" stroke="#ef4444" stroke-width="1.5" opacity="0.8"/>',
            '<circle cx="8" cy="20" r="1.5" fill="#f97316" opacity="0.6"/>',
            '<circle cx="52" cy="18" r="1.5" fill="#f97316" opacity="0.6"/>',
            '<circle cx="5" cy="28" r="1" fill="#fb923c" opacity="0.5"/>',
            '<circle cx="55" cy="26" r="1" fill="#fb923c" opacity="0.5"/>',
            '<path d="M 3,22 L 8,18 L 5,25 L 10,21" fill="#ea580c" opacity="0.5"/>',
            '<path d="M 57,22 L 52,18 L 55,25 L 50,21" fill="#ea580c" opacity="0.5"/>'
        ].join(''),
        army: [
            '<circle cx="4" cy="28" r="5" fill="#fbbf24" opacity="0.6"/>',
            '<circle cx="4" cy="28" r="2.5" fill="#fff" opacity="0.8"/>',
            '<line x1="8" y1="28" x2="-5" y2="26" stroke="#fbbf24" stroke-width="1" opacity="0.6"/>',
            '<line x1="8" y1="30" x2="-3" y2="32" stroke="#fbbf24" stroke-width="0.8" opacity="0.4"/>',
            '<line x1="8" y1="26" x2="-4" y2="22" stroke="#fbbf24" stroke-width="0.6" opacity="0.3"/>',
            '<rect x="50" y="35" width="2" height="1" fill="#d97706" transform="rotate(30,51,35.5)"/>',
            '<rect x="48" y="40" width="2" height="1" fill="#d97706" transform="rotate(-15,49,40.5)"/>',
            '<rect x="52" y="38" width="2" height="1" fill="#d97706" transform="rotate(45,53,38.5)"/>'
        ].join(''),
        justice: [
            '<circle cx="30" cy="40" r="30" fill="none" stroke="#3b82f6" stroke-width="1.2" opacity="0.25"/>',
            '<circle cx="30" cy="40" r="24" fill="none" stroke="#60a5fa" stroke-width="0.8" opacity="0.2"/>',
            '<path d="M 6,42 L 2,36 L 8,38 L 4,32" stroke="#60a5fa" stroke-width="1.5" fill="none" opacity="0.8"/>',
            '<path d="M 54,42 L 58,36 L 52,38 L 56,32" stroke="#60a5fa" stroke-width="1.5" fill="none" opacity="0.8"/>',
            '<path d="M 18,22 Q 10,50 8,84 L 14,84 Q 12,50 18,26" fill="#1e3a8a" opacity="0.4"/>',
            '<path d="M 42,22 Q 50,50 52,84 L 46,84 Q 48,50 42,26" fill="#1e3a8a" opacity="0.4"/>',
            '<circle cx="30" cy="35" r="8" fill="#3b82f6" opacity="0.12"/>'
        ].join(''),
        starwars: [
            '<rect x="1" y="0" width="3" height="40" rx="1" fill="#22c55e" opacity="0.75"/>',
            '<rect x="1.5" y="0" width="2" height="40" fill="#fff" opacity="0.5"/>',
            '<rect x="-1" y="0" width="7" height="40" rx="2" fill="#22c55e" opacity="0.12"/>',
            '<rect x="1" y="40" width="3" height="6" fill="#6b7280"/>',
            '<rect x="0" y="42" width="5" height="1" fill="#9ca3af"/>',
            '<circle cx="30" cy="8" r="14" fill="none" stroke="#a78bfa" stroke-width="0.8" opacity="0.25" stroke-dasharray="3,2"/>',
            '<circle cx="3" cy="10" r="1.5" fill="#22c55e" opacity="0.4"/>',
            '<circle cx="3" cy="20" r="1" fill="#22c55e" opacity="0.3"/>',
            '<circle cx="3" cy="30" r="1.5" fill="#22c55e" opacity="0.4"/>'
        ].join(''),
        mythology: [
            '<circle cx="30" cy="35" r="32" fill="#eab308" opacity="0.06"/>',
            '<circle cx="30" cy="35" r="22" fill="#fbbf24" opacity="0.05"/>',
            '<polygon points="4,28 8,18 6,24 10,16" fill="#fbbf24" opacity="0.8"/>',
            '<polygon points="56,28 52,18 54,24 50,16" fill="#fbbf24" opacity="0.8"/>',
            '<path d="M 2,16 Q 4,12 3,8 Q 6,12 5,16" fill="#f97316" opacity="0.6"/>',
            '<path d="M 58,16 Q 56,12 57,8 Q 54,12 55,16" fill="#f97316" opacity="0.6"/>',
            '<circle cx="16" cy="0" r="1.2" fill="#fbbf24" opacity="0.7"/>',
            '<circle cx="44" cy="0" r="1.2" fill="#fbbf24" opacity="0.7"/>',
            '<circle cx="30" cy="-3" r="1.5" fill="#eab308" opacity="0.6"/>'
        ].join('')
    };

    // =========================================================================
    // THEME INJURED EFFECTS
    // =========================================================================
    var themeInjuredEffects = {
        animal: [
            '<line x1="20" y1="30" x2="25" y2="35" stroke="#7c2d12" stroke-width="1" opacity="0.5"/>',
            '<line x1="22" y1="28" x2="27" y2="33" stroke="#7c2d12" stroke-width="0.8" opacity="0.4"/>',
            '<line x1="35" y1="28" x2="40" y2="33" stroke="#7c2d12" stroke-width="1" opacity="0.5"/>',
            '<circle cx="36" cy="14" r="2.5" fill="#7c3aed" opacity="0.4"/>',
            '<path d="M 42,8 Q 46,4 44,1" stroke="#92400e" stroke-width="1.5" fill="none" opacity="0.6"/>'
        ].join(''),
        army: [
            '<rect x="10" y="35" width="6" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>',
            '<circle cx="35" cy="32" r="1.5" fill="#1c1917"/>',
            '<circle cx="35" cy="32" r="2.5" fill="none" stroke="#7c2d12" stroke-width="0.5"/>',
            '<ellipse cx="25" cy="50" rx="4" ry="2" fill="#78716c" opacity="0.3"/>'
        ].join(''),
        justice: [
            '<path d="M 16,55 L 12,65 L 16,62 L 14,72 L 18,70 L 16,80" fill="#1e3a8a" opacity="0.25"/>',
            '<circle cx="30" cy="35" r="10" fill="#3b82f6" opacity="0.05"/>',
            '<circle cx="24" cy="16" r="2" fill="#7c3aed" opacity="0.4"/>',
            '<line x1="28" y1="33" x2="32" y2="37" stroke="#1e293b" stroke-width="0.8"/>'
        ].join(''),
        starwars: [
            '<rect x="2" y="32" width="2" height="10" fill="#22c55e" opacity="0.35"/>',
            '<circle cx="3" cy="34" r="1.5" fill="#fff" opacity="0.25"/>',
            '<circle cx="35" cy="30" r="2" fill="#451a03" opacity="0.5"/>',
            '<circle cx="35" cy="30" r="3" fill="#7c2d12" opacity="0.2"/>',
            '<path d="M 34,28 Q 36,24 34,20" stroke="#6b7280" stroke-width="0.8" fill="none" opacity="0.4"/>'
        ].join(''),
        mythology: [
            '<circle cx="30" cy="35" r="20" fill="#eab308" opacity="0.03"/>',
            '<path d="M 20,1 Q 22,3 24,1" stroke="#78716c" stroke-width="1" fill="none"/>',
            '<circle cx="36" cy="15" r="2" fill="#7c3aed" opacity="0.35"/>',
            '<path d="M 26,40 L 28,44 L 24,42" fill="#d6d3d1" opacity="0.4"/>'
        ].join('')
    };

    var commonBandage = '<rect x="22" y="5" width="16" height="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" rx="1"/>';
    var commonBruise = '<circle cx="25" cy="16" r="2.5" fill="#7c3aed" opacity="0.4"/>';

    // =========================================================================
    // COLOR EXTRACTION UTILITIES
    // =========================================================================

    // Extract shirt/sleeve/arm color from idle SVG
    function extractShirt(svg) {
        // Rect arms (x=6-14, y=24-28, width=4-8)
        var m = svg.match(/<rect x="(6|[7-9]|1[0-4])" y="2[4-8]" width="[4-8]" height="\d+" fill="([^"]+)"/);
        if (m) return m[2];
        // Path-based arms (Penny/Kripke/Emily etc)
        var p = svg.match(/<path d="M 1[4-8],2[6-9] [^"]*" stroke="([^"]+)" stroke-width/);
        if (p) return p[1];
        // Bernie arm path (M 18,30-32)
        var b = svg.match(/<path d="M 18,3[0-2] [^"]*" stroke="([^"]+)" stroke-width/);
        if (b) return b[1];
        // Torso rect fallback
        var t = svg.match(/<rect x="1[2-8]" y="2[0-8]" width="2[0-9]" height="\d+" fill="([^"]+)"/);
        if (t) return t[1];
        // Penny-style path torso
        var pt = svg.match(/<path d="M 1[6-8],2[4-8] Q[^"]*" fill="([^"]+)"/);
        if (pt) return pt[1];
        return null;
    }

    // Extract pants color from idle SVG
    function extractPants(svg) {
        var m = svg.match(/<rect x="\d+" y="(4[4-9]|5[0-8])" width="\d+" height="\d+" fill="(#[^"]+)"/);
        return m ? m[2] : null;
    }

    // Extract shoes/boot color from idle SVG
    function extractShoes(svg) {
        var m = svg.match(/<rect x="\d+" y="(6[4-9]|7[0-8])" width="\d+" height="\d+" fill="(#[^"]+)"/);
        return m ? m[2] : null;
    }

    // Extract torso accent color (jacket overlay, different from shirt)
    function extractAccent(svg, shirtColor) {
        var re = /<rect x="(\d+)" y="(2[0-8])" width="(\d+)" height="\d+" fill="(#[^"]+)"/g;
        var m;
        while ((m = re.exec(svg)) !== null) {
            var w = parseInt(m[3]), color = m[4];
            if (color !== shirtColor && color !== '#fed7aa' && color !== '#fde68a' && w >= 6) {
                return color;
            }
        }
        return null;
    }

    // Extract border/stroke accent (jacket border lines)
    function extractBorder(svg, shirtColor) {
        var re = /<line x1="\d+" y1="(2[0-8])" x2="\d+" y2="(4\d|5[0-2])" stroke="(#[^"]+)"/g;
        var m;
        while ((m = re.exec(svg)) !== null) {
            if (m[3] !== shirtColor) return m[3];
        }
        return null;
    }

    // Build full palette from SVG
    function extractPalette(svg) {
        var shirt = extractShirt(svg);
        var pants = extractPants(svg);
        var shoes = extractShoes(svg);
        var accent = extractAccent(svg, shirt);
        var border = extractBorder(svg, shirt);
        return { shirt: shirt, pants: pants, shoes: shoes, accent: accent, border: border };
    }

    // =========================================================================
    // SVG RECOLORING ENGINE
    // =========================================================================

    function recolorSvg(svg, fromPalette, toPalette) {
        // Build unique replacements (avoid double-replacing same color)
        var replacements = [];
        var usedFrom = {};

        function addReplacement(from, to) {
            if (from && to && from !== to && !usedFrom[from]) {
                // Don't replace skin tones, shadow, or common neutrals
                if (from === '#fed7aa' || from === '#fde68a' || from === '#000' || from === '#000000') return;
                usedFrom[from] = true;
                replacements.push([from, to]);
            }
        }

        addReplacement(fromPalette.shirt, toPalette.shirt);
        addReplacement(fromPalette.pants, toPalette.pants);
        addReplacement(fromPalette.shoes, toPalette.shoes);
        addReplacement(fromPalette.accent, toPalette.accent);
        addReplacement(fromPalette.border, toPalette.border);

        // Apply replacements using temporary placeholders to avoid chain-replacement
        var placeholders = [];
        for (var i = 0; i < replacements.length; i++) {
            var placeholder = '___COLOR_PLACEHOLDER_' + i + '___';
            placeholders.push(placeholder);
            svg = svg.split(replacements[i][0]).join(placeholder);
        }
        for (var j = 0; j < replacements.length; j++) {
            svg = svg.split(placeholders[j]).join(replacements[j][1]);
        }

        return svg;
    }

    // =========================================================================
    // EMBLEM EXTRACTION & SWAP
    // =========================================================================

    // Find the chest emblem (circle at cx≈30, cy≈33-38 + following content element)
    function findEmblem(svg) {
        var circleRe = /<circle cx="3[0-2]" cy="3[2-8]" r="[5-8]" fill="[^"]*"\/>/;
        var circleMatch = svg.match(circleRe);
        if (!circleMatch) return null;

        var result = circleMatch[0];
        var afterPos = circleMatch.index + circleMatch[0].length;
        var afterCircle = svg.substring(afterPos);

        // Grab up to 2 following elements that look like emblem content
        var remaining = afterCircle;
        for (var i = 0; i < 2; i++) {
            var nextEl = remaining.match(/^\s*(<(?:polygon|text|path|rect|line) [^>]*(?:\/>|>[^<]*<\/[^>]+>))/);
            if (!nextEl) break;
            result += nextEl[1];
            remaining = remaining.substring(nextEl.index + nextEl[0].length);
        }

        return result;
    }

    // Replace emblem in SVG by position (cx≈30, cy≈33-38)
    function replaceEmblem(svg, newEmblem) {
        if (!newEmblem) return svg;

        var circleRe = /<circle cx="3[0-2]" cy="3[2-8]" r="[5-8]" fill="[^"]*"\/>/;
        var circleMatch = svg.match(circleRe);
        if (!circleMatch) return svg;

        var startPos = circleMatch.index;
        var endPos = circleMatch.index + circleMatch[0].length;
        var afterCircle = svg.substring(endPos);

        // Find the end of emblem content elements
        var remaining = afterCircle;
        for (var i = 0; i < 2; i++) {
            var nextEl = remaining.match(/^\s*(<(?:polygon|text|path|rect|line) [^>]*(?:\/>|>[^<]*<\/[^>]+>))/);
            if (!nextEl) break;
            endPos += nextEl.index + nextEl[0].length;
            remaining = remaining.substring(nextEl.index + nextEl[0].length);
        }

        return svg.substring(0, startPos) + newEmblem + svg.substring(endPos);
    }

    // =========================================================================
    // THEME ACCESSORY EXTRACTION (ears, helmets, crowns, masks)
    // =========================================================================

    function extractAccessories(idleSvg) {
        var svgEnd = idleSvg.lastIndexOf('</svg>');
        if (svgEnd < 0) return '';

        // Find the last standard face element (mouth line or path)
        // All characters end their standard face features with the mouth
        var mouthPatterns = [
            // Wave1 mouth line (y=18)
            /<line x1="28" y1="18" x2="32" y2="18"[^>]*\/>/g,
            // Wave2 mouth line (y=22-24)
            /<line x1="28" y1="2[2-4]" x2="32" y2="2[2-4]"[^>]*\/>/g,
            // Path mouth (smile/smirk patterns)
            /<path d="M 2[6-9],2[2-5] Q[^"]*"[^>]*\/>/g,
            // Penny/Amy style mouth
            /<path d="M 27,24 Q[^"]*"[^>]*\/>/g,
            // Emily style
            /<path d="M 28,23 Q[^"]*"[^>]*\/>/g,
            // Zack wide mouth
            /<path d="M 26,2[2-4] Q[^"]*"[^>]*\/>/g
        ];

        var lastEnd = -1;
        mouthPatterns.forEach(function(p) {
            var m;
            while ((m = p.exec(idleSvg)) !== null) {
                var end = m.index + m[0].length;
                if (end > lastEnd) lastEnd = end;
            }
        });

        if (lastEnd < 0) return '';

        var accessories = idleSvg.substring(lastEnd, svgEnd).trim();
        return accessories.length > 0 ? accessories : '';
    }

    // =========================================================================
    // PROCESS ALL 85 THEMED SKINS
    // =========================================================================

    var charKeys = ['sheldon','leonard','penny','howard','raj','amy','bernie','stuart',
                    'mary','beverly','proton','kripke','leslie','bert','wil','zack','emily'];
    var skinThemes = ['animal','army','justice','starwars','mythology'];

    var count = 0;
    var failCount = 0;

    charKeys.forEach(function(charKey) {
        // Get the default character entry (should have been upgraded by character_animations.js)
        var defaultEntry = vectors[charKey];
        if (!defaultEntry || typeof defaultEntry === 'string') return;
        if (!defaultEntry.attack || !defaultEntry.injured || !defaultEntry.idle) return;

        // Extract default palette from default idle SVG
        var defaultPalette = extractPalette(defaultEntry.idle);

        // Find default emblem for swapping
        var defaultEmblem = findEmblem(defaultEntry.idle);

        skinThemes.forEach(function(theme) {
            var skinKey = charKey + '_' + theme;
            var entry = vectors[skinKey];
            if (!entry) return;

            // Skip if already has both attack and injured
            if (typeof entry === 'object' && entry.attack && entry.injured) return;

            var idleSvg = typeof entry === 'string' ? entry : (entry.idle || null);
            if (!idleSvg) return;

            // Extract themed palette from themed idle SVG
            var themedPalette = extractPalette(idleSvg);

            // 1. RECOLOR: Take default attack/injured SVGs and swap colors
            var attackSvg = recolorSvg(defaultEntry.attack, defaultPalette, themedPalette);
            var injuredSvg = recolorSvg(defaultEntry.injured, defaultPalette, themedPalette);

            // 2. EMBLEM SWAP: Replace default emblem with themed emblem
            var themedEmblem = findEmblem(idleSvg);
            if (themedEmblem) {
                attackSvg = replaceEmblem(attackSvg, themedEmblem);
                injuredSvg = replaceEmblem(injuredSvg, themedEmblem);
            }

            // 3. ACCESSORIES: Extract themed accessories (ears, helmets, etc.)
            var accessories = extractAccessories(idleSvg);
            if (accessories) {
                attackSvg = attackSvg.replace('</svg>', accessories + '</svg>');
                injuredSvg = injuredSvg.replace('</svg>', accessories + '</svg>');
            }

            // 4. THEME EFFECTS: Append theme-specific visual overlays
            var atkEffects = themeAttackEffects[theme] || '';
            if (atkEffects) {
                attackSvg = attackSvg.replace('</svg>', atkEffects + '</svg>');
            }

            var injEffects = commonBandage + commonBruise + (themeInjuredEffects[theme] || '');
            injuredSvg = injuredSvg.replace('</svg>', injEffects + '</svg>');

            // 5. STORE the results
            if (typeof entry === 'string') {
                vectors[skinKey] = { idle: idleSvg, attack: attackSvg, injured: injuredSvg };
            } else {
                entry.attack = entry.attack || attackSvg;
                entry.injured = entry.injured || injuredSvg;
            }
            count++;
        });
    });

    console.log('[SkinCombatAnims v4] Adapted ' + count + ' themed skins with full-body attack/injured poses');
})();
