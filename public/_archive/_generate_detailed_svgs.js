const fs = require('fs');

const detailedSVGs = {
    "mary": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"20\" y=\"76\" width=\"8\" height=\"8\" fill=\"#171717\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"8\" height=\"8\" fill=\"#171717\"/>\n" +
        "    <!-- Legs -->\n" +
        "    <rect x=\"22\" y=\"60\" width=\"4\" height=\"16\" fill=\"#fed7aa\"/>\n" +
        "    <rect x=\"34\" y=\"60\" width=\"4\" height=\"16\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Skirt -->\n" +
        "    <path d=\"M 18,45 L 42,45 L 44,60 L 16,60 Z\" fill=\"#0d9488\"/>\n" +
        "    <!-- Shirt/Blouse -->\n" +
        "    <rect x=\"18\" y=\"25\" width=\"24\" height=\"20\" fill=\"#14b8a6\" rx=\"2\"/>\n" +
        "    <!-- Cross Necklace -->\n" +
        "    <path d=\"M 24,25 Q 30,30 36,25\" fill=\"none\" stroke=\"#fcd34d\" stroke-width=\"1.5\"/>\n" +
        "    <rect x=\"29.5\" y=\"30\" width=\"1\" height=\"6\" fill=\"#fbbf24\"/>\n" +
        "    <rect x=\"28\" y=\"32\" width=\"4\" height=\"1\" fill=\"#fbbf24\"/>\n" +
        "    <!-- Arms -->\n" +
        "    <rect x=\"12\" y=\"26\" width=\"6\" height=\"20\" fill=\"#14b8a6\" rx=\"1\"/>\n" +
        "    <rect x=\"42\" y=\"26\" width=\"6\" height=\"20\" fill=\"#14b8a6\" rx=\"1\"/>\n" +
        "    <!-- Hands clasped in prayer -->\n" +
        "    <circle cx=\"28\" cy=\"42\" r=\"3\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"32\" cy=\"42\" r=\"3\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Blonde bob) -->\n" +
        "    <path d=\"M 18,16 C 18,-2 42,-2 42,16 L 44,24 L 16,24 Z\" fill=\"#fde047\"/>\n" +
        "    <path d=\"M 22,10 C 22,-2 38,-2 38,10 Z\" fill=\"#facc15\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <!-- Smile -->\n" +
        "    <path d=\"M 28,22 Q 30,24 32,22\" fill=\"none\" stroke=\"#f43f5e\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "beverly": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"20\" y=\"76\" width=\"8\" height=\"8\" fill=\"#111827\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"8\" height=\"8\" fill=\"#111827\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"20\" y=\"50\" width=\"8\" height=\"26\" fill=\"#334155\"/>\n" +
        "    <rect x=\"32\" y=\"50\" width=\"8\" height=\"26\" fill=\"#334155\"/>\n" +
        "    <!-- Blazer -->\n" +
        "    <rect x=\"16\" y=\"25\" width=\"28\" height=\"25\" fill=\"#1e293b\" rx=\"2\"/>\n" +
        "    <path d=\"M 26,25 L 30,35 L 34,25 Z\" fill=\"#f8fafc\"/> <!-- Shirt -->\n" +
        "    <!-- Arms -->\n" +
        "    <rect x=\"12\" y=\"26\" width=\"6\" height=\"20\" fill=\"#1e293b\" rx=\"1\"/>\n" +
        "    <rect x=\"42\" y=\"26\" width=\"6\" height=\"15\" fill=\"#1e293b\" rx=\"1\"/>\n" +
        "    <!-- Holding Book -->\n" +
        "    <g transform=\"rotate(-15 45 44)\">\n" +
        "        <rect x=\"38\" y=\"38\" width=\"12\" height=\"14\" fill=\"#8b4513\" rx=\"1\"/>\n" +
        "        <rect x=\"40\" y=\"38\" width=\"8\" height=\"14\" fill=\"#fef08a\"/>\n" +
        "        <rect x=\"38\" y=\"38\" width=\"2\" height=\"14\" fill=\"#78350f\"/>\n" +
        "    </g>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"15\" cy=\"48\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"43\" cy=\"43\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Gray bun) -->\n" +
        "    <circle cx=\"30\" cy=\"6\" r=\"5\" fill=\"#9ca3af\"/>\n" +
        "    <path d=\"M 18,16 C 18,4 42,4 42,16 Z\" fill=\"#d1d5db\"/>\n" +
        "    <!-- Glasses -->\n" +
        "    <rect x=\"23\" y=\"15\" width=\"5\" height=\"3\" fill=\"none\" stroke=\"#111827\" stroke-width=\"1\"/>\n" +
        "    <rect x=\"32\" y=\"15\" width=\"5\" height=\"3\" fill=\"none\" stroke=\"#111827\" stroke-width=\"1\"/>\n" +
        "    <line x1=\"28\" y1=\"16\" x2=\"32\" y2=\"16\" stroke=\"#111827\" stroke-width=\"1\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"25.5\" cy=\"16.5\" r=\"1\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34.5\" cy=\"16.5\" r=\"1\" fill=\"#000\"/>\n" +
        "    <!-- Stern Mouth -->\n" +
        "    <line x1=\"28\" y1=\"23\" x2=\"32\" y2=\"23\" stroke=\"#451a03\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "proton": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"18\" y=\"76\" width=\"10\" height=\"8\" fill=\"#27272a\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"10\" height=\"8\" fill=\"#27272a\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"20\" y=\"55\" width=\"8\" height=\"21\" fill=\"#71717a\"/>\n" +
        "    <rect x=\"32\" y=\"55\" width=\"8\" height=\"21\" fill=\"#71717a\"/>\n" +
        "    <!-- Lab Coat -->\n" +
        "    <path d=\"M 16,25 L 44,25 L 46,65 L 14,65 Z\" fill=\"#f8fafc\"/>\n" +
        "    <line x1=\"30\" y1=\"25\" x2=\"30\" y2=\"65\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>\n" +
        "    <rect x=\"24\" y=\"25\" width=\"12\" height=\"8\" fill=\"#1d4ed8\"/> <!-- Shirt under coat -->\n" +
        "    <path d=\"M 26,33 L 30,45 L 34,33 Z\" fill=\"#dc2626\"/> <!-- Tie -->\n" +
        "    <!-- Left Arm -->\n" +
        "    <rect x=\"12\" y=\"26\" width=\"6\" height=\"20\" fill=\"#f8fafc\" rx=\"1\"/>\n" +
        "    <!-- Right Arm Raised -->\n" +
        "    <path d=\"M 44,26 L 48,42\" stroke=\"#f8fafc\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"15\" cy=\"48\" r=\"2.5\" fill=\"#fde68a\"/>\n" +
        "    <circle cx=\"48\" cy=\"44\" r=\"2.5\" fill=\"#fde68a\"/>\n" +
        "    <!-- Lightsaber -->\n" +
        "    <g transform=\"rotate(15 48 44)\">\n" +
        "        <!-- Blade -->\n" +
        "        <rect x=\"47\" y=\"6\" width=\"2\" height=\"36\" fill=\"#ffffff\" stroke=\"#22c55e\" stroke-width=\"3\" rx=\"1\"/>\n" +
        "        <rect x=\"47\" y=\"6\" width=\"2\" height=\"36\" fill=\"#ffffff\" filter=\"drop-shadow(0 0 4px #22c55e)\"/>\n" +
        "        <!-- Hilt -->\n" +
        "        <rect x=\"46\" y=\"42\" width=\"4\" height=\"12\" fill=\"#9ca3af\" rx=\"1\"/>\n" +
        "        <line x1=\"46\" y1=\"45\" x2=\"50\" y2=\"45\" stroke=\"#111827\" stroke-width=\"1\"/>\n" +
        "    </g>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fde68a\" rx=\"3\"/>\n" +
        "    <!-- Old Hair (White side tufts) -->\n" +
        "    <path d=\"M 18,14 Q 22,8 24,14 Z\" fill=\"#e5e7eb\"/>\n" +
        "    <path d=\"M 42,14 Q 38,8 36,14 Z\" fill=\"#e5e7eb\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <path d=\"M 25,15 Q 26,14 27,15\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1\"/>\n" +
        "    <path d=\"M 33,15 Q 34,14 35,15\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1\"/>\n" +
        "    <!-- Grandfather Smile -->\n" +
        "    <path d=\"M 28,23 Q 30,25 32,23\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "kripke": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"18\" y=\"76\" width=\"10\" height=\"8\" fill=\"#451a03\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"10\" height=\"8\" fill=\"#451a03\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"20\" y=\"50\" width=\"8\" height=\"26\" fill=\"#1e3a8a\"/>\n" +
        "    <rect x=\"32\" y=\"50\" width=\"8\" height=\"26\" fill=\"#1e3a8a\"/>\n" +
        "    <!-- T-Shirt -->\n" +
        "    <rect x=\"16\" y=\"25\" width=\"28\" height=\"25\" fill=\"#dc2626\" rx=\"2\"/>\n" +
        "    <text x=\"30\" y=\"38\" text-anchor=\"middle\" font-size=\"10\" fill=\"#ffffff\" font-weight=\"bold\">CT</text>\n" +
        "    <!-- Arms -->\n" +
        "    <path d=\"M 16,28 L 22,46\" stroke=\"#dc2626\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n" +
        "    <path d=\"M 44,28 L 38,46\" stroke=\"#dc2626\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n" +
        "    <!-- Bow -->\n" +
        "    <path d=\"M 28,15 Q 15,35 28,55\" fill=\"none\" stroke=\"#d97706\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n" +
        "    <line x1=\"28\" y1=\"15\" x2=\"28\" y2=\"55\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n" +
        "    <!-- Arrow -->\n" +
        "    <line x1=\"18\" y1=\"35\" x2=\"40\" y2=\"35\" stroke=\"#92400e\" stroke-width=\"2\"/>\n" +
        "    <polygon points=\"18,35 22,33 22,37\" fill=\"#9ca3af\"/>\n" +
        "    <polygon points=\"38,33 42,35 38,37\" fill=\"#ef4444\"/>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"22\" cy=\"46\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"38\" cy=\"46\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Messy brown) -->\n" +
        "    <path d=\"M 18,12 Q 30,0 42,12 L 44,18 Q 30,-2 16,18 Z\" fill=\"#78350f\"/>\n" +
        "    <path d=\"M 20,8 L 22,12 M 28,6 L 30,10 M 36,8 L 34,12\" stroke=\"#78350f\" stroke-width=\"2\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"17\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"17\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <!-- Smirk -->\n" +
        "    <path d=\"M 27,22 L 30,22 Q 32,21 33,20\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "leslie": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"20\" y=\"76\" width=\"8\" height=\"8\" fill=\"#171717\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"8\" height=\"8\" fill=\"#171717\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"20\" y=\"55\" width=\"8\" height=\"21\" fill=\"#1e293b\"/>\n" +
        "    <rect x=\"32\" y=\"55\" width=\"8\" height=\"21\" fill=\"#1e293b\"/>\n" +
        "    <!-- Lab Coat -->\n" +
        "    <path d=\"M 16,25 L 44,25 L 46,60 L 14,60 Z\" fill=\"#f8fafc\"/>\n" +
        "    <line x1=\"30\" y1=\"25\" x2=\"30\" y2=\"60\" stroke=\"#e2e8f0\" stroke-width=\"2\"/>\n" +
        "    <rect x=\"24\" y=\"25\" width=\"12\" height=\"15\" fill=\"#0f172a\"/> <!-- Dark shirt -->\n" +
        "    <!-- Arms holding Sniper -->\n" +
        "    <path d=\"M 16,28 L 26,42\" stroke=\"#f8fafc\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n" +
        "    <path d=\"M 44,28 L 38,42\" stroke=\"#f8fafc\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n" +
        "    <!-- Sniper Rifle -->\n" +
        "    <rect x=\"15\" y=\"38\" width=\"35\" height=\"4\" fill=\"#334155\" rx=\"1\"/>\n" +
        "    <rect x=\"20\" y=\"42\" width=\"10\" height=\"3\" fill=\"#1e293b\"/> <!-- Magazine -->\n" +
        "    <rect x=\"32\" y=\"42\" width=\"4\" height=\"4\" fill=\"#1e293b\"/> <!-- Grip -->\n" +
        "    <rect x=\"22\" y=\"35\" width=\"8\" height=\"3\" fill=\"#1e293b\"/> <!-- Scope -->\n" +
        "    <rect x=\"21\" y=\"36\" width=\"10\" height=\"2\" fill=\"#475569\"/>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"26\" cy=\"42\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"38\" cy=\"42\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Dark curly) -->\n" +
        "    <path d=\"M 16,14 C 16,0 44,0 44,14 C 48,22 46,30 40,30 C 38,24 22,24 20,30 C 14,30 12,22 16,14 Z\" fill=\"#171717\"/>\n" +
        "    <!-- Glasses -->\n" +
        "    <circle cx=\"25.5\" cy=\"17.5\" r=\"2.5\" fill=\"none\" stroke=\"#000\" stroke-width=\"1.5\"/>\n" +
        "    <circle cx=\"34.5\" cy=\"17.5\" r=\"2.5\" fill=\"none\" stroke=\"#000\" stroke-width=\"1.5\"/>\n" +
        "    <line x1=\"28\" y1=\"17.5\" x2=\"32\" y2=\"17.5\" stroke=\"#000\" stroke-width=\"1.5\"/>\n" +
        "    <circle cx=\"25.5\" cy=\"17.5\" r=\"1\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34.5\" cy=\"17.5\" r=\"1\" fill=\"#000\"/>\n" +
        "    <!-- Smirk -->\n" +
        "    <path d=\"M 28,23 Q 30,24 33,22\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "bert": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"18\" ry=\"5\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"16\" y=\"76\" width=\"12\" height=\"8\" fill=\"#451a03\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"12\" height=\"8\" fill=\"#451a03\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"18\" y=\"50\" width=\"10\" height=\"26\" fill=\"#1e3a8a\"/>\n" +
        "    <rect x=\"32\" y=\"50\" width=\"10\" height=\"26\" fill=\"#1e3a8a\"/>\n" +
        "    <!-- Flannel Shirt (Large) -->\n" +
        "    <rect x=\"12\" y=\"24\" width=\"36\" height=\"28\" fill=\"#dc2626\" rx=\"4\"/>\n" +
        "    <line x1=\"16\" y1=\"24\" x2=\"16\" y2=\"52\" stroke=\"#7f1d1d\" stroke-width=\"2\"/>\n" +
        "    <line x1=\"24\" y1=\"24\" x2=\"24\" y2=\"52\" stroke=\"#7f1d1d\" stroke-width=\"2\"/>\n" +
        "    <line x1=\"36\" y1=\"24\" x2=\"36\" y2=\"52\" stroke=\"#7f1d1d\" stroke-width=\"2\"/>\n" +
        "    <line x1=\"44\" y1=\"24\" x2=\"44\" y2=\"52\" stroke=\"#7f1d1d\" stroke-width=\"2\"/>\n" +
        "    <line x1=\"12\" y1=\"32\" x2=\"48\" y2=\"32\" stroke=\"#7f1d1d\" stroke-width=\"2\"/>\n" +
        "    <line x1=\"12\" y1=\"42\" x2=\"48\" y2=\"42\" stroke=\"#7f1d1d\" stroke-width=\"2\"/>\n" +
        "    <!-- Arms -->\n" +
        "    <rect x=\"6\" y=\"26\" width=\"8\" height=\"22\" fill=\"#dc2626\" rx=\"2\"/>\n" +
        "    <path d=\"M 48,26 L 52,42\" stroke=\"#dc2626\" stroke-width=\"8\" stroke-linecap=\"round\"/>\n" +
        "    <!-- Rock Hammer -->\n" +
        "    <g transform=\"rotate(30 52 42)\">\n" +
        "        <rect x=\"50\" y=\"20\" width=\"4\" height=\"30\" fill=\"#d97706\" rx=\"1\"/>\n" +
        "        <rect x=\"46\" y=\"20\" width=\"12\" height=\"6\" fill=\"#9ca3af\" rx=\"1\"/>\n" +
        "        <polygon points=\"58,20 62,23 58,26\" fill=\"#6b7280\"/>\n" +
        "    </g>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"10\" cy=\"50\" r=\"3.5\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"52\" cy=\"42\" r=\"3.5\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"20\" y=\"8\" width=\"20\" height=\"20\" fill=\"#fed7aa\" rx=\"4\"/>\n" +
        "    <!-- Beard -->\n" +
        "    <path d=\"M 18,18 Q 30,30 42,18 L 40,26 Q 30,32 20,26 Z\" fill=\"#78350f\"/>\n" +
        "    <!-- Hair -->\n" +
        "    <path d=\"M 18,12 Q 30,-2 42,12 L 40,6 Q 30,0 20,6 Z\" fill=\"#78350f\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"15\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"15\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <!-- Friendly Smile in beard -->\n" +
        "    <path d=\"M 27,21 Q 30,23 33,21\" fill=\"none\" stroke=\"#451a03\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "wil": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"20\" y=\"76\" width=\"8\" height=\"8\" fill=\"#111827\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"8\" height=\"8\" fill=\"#111827\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"20\" y=\"50\" width=\"8\" height=\"26\" fill=\"#111827\"/>\n" +
        "    <rect x=\"32\" y=\"50\" width=\"8\" height=\"26\" fill=\"#111827\"/>\n" +
        "    <!-- Star Trek Uniform -->\n" +
        "    <rect x=\"16\" y=\"25\" width=\"28\" height=\"25\" fill=\"#dc2626\" rx=\"2\"/> <!-- Red Top -->\n" +
        "    <polygon points=\"24,25 36,25 30,32\" fill=\"#111827\"/> <!-- Black Neck -->\n" +
        "    <!-- Combadge -->\n" +
        "    <polygon points=\"34,32 36,36 32,36\" fill=\"#fbbf24\"/>\n" +
        "    <!-- Arms -->\n" +
        "    <rect x=\"12\" y=\"26\" width=\"6\" height=\"20\" fill=\"#dc2626\" rx=\"1\"/>\n" +
        "    <!-- Right arm holding phaser -->\n" +
        "    <path d=\"M 44,26 L 48,40\" stroke=\"#dc2626\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n" +
        "    <!-- Phaser -->\n" +
        "    <g transform=\"rotate(-15 48 40)\">\n" +
        "        <rect x=\"45\" y=\"35\" width=\"12\" height=\"4\" fill=\"#64748b\" rx=\"1\"/>\n" +
        "        <rect x=\"47\" y=\"39\" width=\"4\" height=\"6\" fill=\"#475569\" rx=\"1\"/>\n" +
        "        <circle cx=\"55\" cy=\"37\" r=\"1.5\" fill=\"#3b82f6\"/>\n" +
        "    </g>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"15\" cy=\"48\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"48\" cy=\"40\" r=\"2.5\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Neat Brown) -->\n" +
        "    <path d=\"M 20,12 C 20,0 40,0 40,12 L 42,16 Q 30,-2 18,16 Z\" fill=\"#451a03\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <!-- Smug Smile -->\n" +
        "    <path d=\"M 27,23 Q 32,25 34,22\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n" +
        "</svg>",

    "zack": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"16\" ry=\"5\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"18\" y=\"76\" width=\"10\" height=\"8\" fill=\"#f8fafc\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"10\" height=\"8\" fill=\"#f8fafc\"/>\n" +
        "    <!-- Pants (Jeans) -->\n" +
        "    <rect x=\"20\" y=\"50\" width=\"8\" height=\"26\" fill=\"#2563eb\"/>\n" +
        "    <rect x=\"32\" y=\"50\" width=\"8\" height=\"26\" fill=\"#2563eb\"/>\n" +
        "    <!-- Tank Top -->\n" +
        "    <rect x=\"18\" y=\"26\" width=\"24\" height=\"24\" fill=\"#f1f5f9\" rx=\"2\"/>\n" +
        "    <path d=\"M 22,26 L 30,34 L 38,26 Z\" fill=\"#fed7aa\"/> <!-- Chest showing -->\n" +
        "    <!-- Muscular Arms -->\n" +
        "    <path d=\"M 14,28 Q 10,38 12,48\" stroke=\"#fed7aa\" stroke-width=\"8\" fill=\"none\" stroke-linecap=\"round\"/>\n" +
        "    <path d=\"M 46,28 Q 50,38 48,48\" stroke=\"#fed7aa\" stroke-width=\"8\" fill=\"none\" stroke-linecap=\"round\"/>\n" +
        "    <!-- BIG Fists -->\n" +
        "    <circle cx=\"12\" cy=\"52\" r=\"5\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"48\" cy=\"52\" r=\"5\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Spiky Blonde) -->\n" +
        "    <path d=\"M 20,12 L 22,6 L 26,10 L 30,4 L 34,10 L 38,6 L 40,12 Z\" fill=\"#fde047\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <!-- Big Happy Smile -->\n" +
        "    <path d=\"M 26,22 Q 30,26 34,22\" fill=\"none\" stroke=\"#b45309\" stroke-width=\"2\"/>\n" +
        "</svg>",

    "emily": "<svg viewBox=\"0 0 60 90\" class=\"w-full h-full\">\n" +
        "    <ellipse cx=\"30\" cy=\"85\" rx=\"14\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>\n" +
        "    <!-- Shoes -->\n" +
        "    <rect x=\"20\" y=\"76\" width=\"8\" height=\"8\" fill=\"#0f172a\"/>\n" +
        "    <rect x=\"32\" y=\"76\" width=\"8\" height=\"8\" fill=\"#0f172a\"/>\n" +
        "    <!-- Pants -->\n" +
        "    <rect x=\"20\" y=\"50\" width=\"8\" height=\"26\" fill=\"#1e293b\"/>\n" +
        "    <rect x=\"32\" y=\"50\" width=\"8\" height=\"26\" fill=\"#1e293b\"/>\n" +
        "    <!-- Dark Top -->\n" +
        "    <rect x=\"18\" y=\"25\" width=\"24\" height=\"25\" fill=\"#0f172a\" rx=\"2\"/>\n" +
        "    <!-- Arms -->\n" +
        "    <path d=\"M 16,28 L 10,42\" stroke=\"#0f172a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n" +
        "    <path d=\"M 44,28 L 50,42\" stroke=\"#0f172a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n" +
        "    <!-- Daggers -->\n" +
        "    <path d=\"M 6,36 L 10,48 M 8,46 L 12,46\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n" +
        "    <path d=\"M 54,36 L 50,48 M 48,46 L 52,46\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n" +
        "    <!-- Hands -->\n" +
        "    <circle cx=\"10\" cy=\"44\" r=\"2\" fill=\"#fed7aa\"/>\n" +
        "    <circle cx=\"50\" cy=\"44\" r=\"2\" fill=\"#fed7aa\"/>\n" +
        "    <!-- Head -->\n" +
        "    <rect x=\"22\" y=\"10\" width=\"16\" height=\"16\" fill=\"#fed7aa\" rx=\"3\"/>\n" +
        "    <!-- Hair (Long Red) -->\n" +
        "    <path d=\"M 20,10 C 15,10 16,40 18,45 C 20,30 20,15 30,15 C 40,15 40,30 42,45 C 44,40 45,10 40,10 Z\" fill=\"#b91c1c\"/>\n" +
        "    <!-- Face -->\n" +
        "    <circle cx=\"26\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <circle cx=\"34\" cy=\"18\" r=\"1.5\" fill=\"#000\"/>\n" +
        "    <!-- Mysterious Smile -->\n" +
        "    <path d=\"M 28,23 Q 30,24 33,22\" fill=\"none\" stroke=\"#9f1239\" stroke-width=\"1.5\"/>\n" +
        "</svg>"
};

const animalSkins = {};
for (const [key, svg] of Object.entries(detailedSVGs)) {
    let skin = svg;
    skin = skin.replace('<!-- Shoes -->', "<path d=\"M 30,60 Q 50,70 45,80\" fill=\"none\" stroke=\"#f97316\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n        <!-- Shoes -->");
    skin = skin.replace('<!-- Head -->', "<!-- Animal Ears -->\n        <polygon points=\"20,10 24,0 28,8\" fill=\"#f97316\"/>\n        <polygon points=\"40,10 36,0 32,8\" fill=\"#f97316\"/>\n        <polygon points=\"22,8 24,4 26,8\" fill=\"#fef08a\"/>\n        <polygon points=\"38,8 36,4 34,8\" fill=\"#fef08a\"/>\n        <!-- Head -->");
    animalSkins[key + '_animal'] = skin;
}

const armySkins = {};
for (const [key, svg] of Object.entries(detailedSVGs)) {
    let skin = svg;
    skin = skin.replace('<!-- Head -->', "<!-- Head -->");
    skin = skin.replace('<!-- Hair', "<!-- Army Helmet -->\n        <path d=\"M 18,14 C 18,-2 42,-2 42,14 Z\" fill=\"#166534\"/>\n        <rect x=\"16\" y=\"14\" width=\"28\" height=\"3\" fill=\"#14532d\" rx=\"1\"/>\n        <!-- Hair");
    armySkins[key + '_army'] = skin;
}

const justiceSkins = {};
for (const [key, svg] of Object.entries(detailedSVGs)) {
    let skin = svg;
    skin = skin.replace('<!-- Shoes -->', "<!-- Cape -->\n        <path d=\"M 18,25 L 10,75 L 50,75 L 42,25 Z\" fill=\"#ef4444\"/>\n        <!-- Shoes -->");
    skin = skin.replace('<!-- Face -->', "<!-- Face -->\n        <rect x=\"22\" y=\"16\" width=\"16\" height=\"4\" fill=\"#000\" rx=\"2\"/>");
    justiceSkins[key + '_justice'] = skin;
}

const starwarsSkins = {};
for (const [key, svg] of Object.entries(detailedSVGs)) {
    let skin = svg;
    skin = skin.replace('<!-- Arms -->', "<!-- Jedi Robe -->\n        <path d=\"M 14,25 L 46,25 L 48,70 L 12,70 Z\" fill=\"#8b4513\" opacity=\"0.8\"/>\n        <!-- Arms -->");
    starwarsSkins[key + '_starwars'] = skin;
}

const mythologySkins = {};
for (const [key, svg] of Object.entries(detailedSVGs)) {
    let skin = svg;
    skin = skin.replace('<ellipse cx="30" cy="85" rx="15" ry="4" fill="rgba(0,0,0,0.2)"/>', "<circle cx=\"30\" cy=\"45\" r=\"40\" fill=\"#fef08a\" opacity=\"0.4\" filter=\"blur(5px)\"/>\n        <ellipse cx=\"30\" cy=\"85\" rx=\"15\" ry=\"4\" fill=\"rgba(0,0,0,0.2)\"/>");
    skin = skin.replace('<!-- Head -->', "<!-- Head -->");
    skin = skin.replace('<!-- Face -->', "<!-- Laurel Wreath -->\n        <path d=\"M 18,10 Q 30,0 42,10\" fill=\"none\" stroke=\"#ca8a04\" stroke-width=\"2\"/>\n        <circle cx=\"20\" cy=\"8\" r=\"1.5\" fill=\"#eab308\"/>\n        <circle cx=\"25\" cy=\"5\" r=\"1.5\" fill=\"#eab308\"/>\n        <circle cx=\"30\" cy=\"3\" r=\"1.5\" fill=\"#eab308\"/>\n        <circle cx=\"35\" cy=\"5\" r=\"1.5\" fill=\"#eab308\"/>\n        <circle cx=\"40\" cy=\"8\" r=\"1.5\" fill=\"#eab308\"/>\n        <!-- Face -->");
    mythologySkins[key + '_mythology'] = skin;
}

let v = fs.readFileSync('vectors.js', 'utf8');

for (const [key, svg] of Object.entries(detailedSVGs)) {
    const regex = new RegExp(`"\\b${key}\\b"\\s*:\\s*.*?</svg>\``, 's');
    if (regex.test(v)) {
        v = v.replace(regex, `"${key}": \`${svg}\``);
    } else {
        const endIdx = v.lastIndexOf('};');
        if (endIdx !== -1) {
            v = v.substring(0, endIdx) + `"${key}": \`${svg}\`,\n    ` + v.substring(endIdx);
        }
    }
}

let skinsStr = "";
const allSkins = {...animalSkins, ...armySkins, ...justiceSkins, ...starwarsSkins, ...mythologySkins};
for (const [key, svg] of Object.entries(allSkins)) {
    skinsStr += `\n    "${key}": \`${svg}\`,`;
}

const endIdx = v.lastIndexOf('};');
if (endIdx !== -1) {
    v = v.substring(0, endIdx) + skinsStr.substring(1) + '\n' + v.substring(endIdx);
} else {
    console.log('Could not find }; for skins insertion');
}

fs.writeFileSync('vectors.js', v);
console.log('Successfully updated 9 detailed characters and added 45 evolution skins!');
