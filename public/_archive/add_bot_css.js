const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

const newCSS = `
/* Robot Animations */
.robot-melee-bump {
    animation: robotBump 0.3s ease-in-out;
}

@keyframes robotBump {
    0% { transform: translateY(0); }
    30% { transform: translateY(-30px) scale(1.1); }
    50% { transform: translateY(-40px) scale(1.1); }
    100% { transform: translateY(0) scale(1); }
}

.laser-beam {
    position: absolute;
    width: 4px;
    height: 15px;
    background: #3b82f6;
    box-shadow: 0 0 8px #60a5fa, 0 0 12px #93c5fd;
    border-radius: 4px;
    z-index: 50;
    pointer-events: none;
    transform-origin: center;
    animation: fireLaser 0.4s linear forwards;
}

.laser-beam.plasma {
    background: #ec4899;
    box-shadow: 0 0 8px #f472b6, 0 0 12px #fbcfe8;
    width: 6px;
    height: 20px;
    border-radius: 50%;
}

.laser-beam.bullet {
    background: #facc15;
    box-shadow: 0 0 4px #fde047;
    width: 3px;
    height: 10px;
}

@keyframes fireLaser {
    0% {
        transform: translate(0, 0) rotate(var(--angle, 0deg));
        opacity: 1;
    }
    80% {
        opacity: 1;
    }
    100% {
        transform: translate(var(--target-x), var(--target-y)) rotate(var(--angle, 0deg));
        opacity: 0;
    }
}
`;

fs.writeFileSync('styles.css', css + '\n' + newCSS);
console.log("Added bot CSS animations");
