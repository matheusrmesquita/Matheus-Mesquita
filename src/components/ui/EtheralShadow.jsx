import React from 'react';

const MASK_URL = "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')";
const NOISE_URL = 'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")';

function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
    if (fromLow === fromHigh) return toLow;
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

// Névoa teal com máscara + ruído. A animação é só transform em CSS (keyframes `etheralDrift`
// em index.css), que roda no compositor da GPU: o filtro SVG original (feTurbulence +
// feDisplacementMap) travava a rolagem a cada repintura.
export function EtheralShadow({
    sizing = 'fill',
    color = 'rgba(56, 136, 159, 1)',
    animation = { scale: 100, speed: 90 },
    noise = { opacity: 1, scale: 1.2 },
    style,
    className,
}) {
    const animationEnabled = animation && animation.scale > 0;
    // speed 1..100 → ciclo de 60s..12s
    const duration = animationEnabled ? mapRange(animation.speed, 1, 100, 60, 12) : 0;
    const maskSize = sizing === 'stretch' ? '100% 100%' : 'cover';

    return (
        <div
            className={`absolute inset-0 pointer-events-none z-0 ${className || ''}`}
            style={{ overflow: 'hidden', contain: 'strict', ...style }}
        >
            <div
                className={animationEnabled ? 'etheral-drift' : undefined}
                style={{
                    position: 'absolute',
                    inset: '-15%',
                    filter: 'blur(4px)',
                    animationDuration: `${duration}s`,
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                        opacity: 0.8,
                        maskImage: MASK_URL,
                        WebkitMaskImage: MASK_URL,
                        maskSize,
                        WebkitMaskSize: maskSize,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                    }}
                />
            </div>
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: NOISE_URL,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: 'repeat',
                        opacity: noise.opacity / 2,
                        mixBlendMode: 'overlay',
                    }}
                />
            )}
        </div>
    );
}
