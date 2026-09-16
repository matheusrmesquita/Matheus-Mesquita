import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Card de feature com padrão de grade sutil no fundo (linhas + alguns quadrados preenchidos
// aleatoriamente) — usado em grades de serviços/diferenciais com borda tracejada entre células.
// Aceita um ícone (feature.icon) OU uma logo real (feature.logo) no lugar do ícone.
// Sem animação própria — quem anima é o AnimatedContainer que envolve a grade inteira (igual ao original).
export function FeatureCard({ feature, className, ...props }) {
    const p = genRandomPattern();
    const Icon = feature.icon;

    return (
        <div className={cn('relative overflow-hidden p-6', className)} {...props}>
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-slate-900/[0.02] dark:from-white/5 dark:to-white/[0.02] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={p}
                        className="absolute inset-0 h-full w-full fill-slate-900/5 stroke-slate-900/25 dark:fill-white/5 dark:stroke-white/25 mix-blend-overlay"
                    />
                </div>
            </div>

            {feature.logo ? (
                <div className={cn(
                    'relative z-20 w-20 h-14 rounded-lg flex items-center justify-center p-2.5 shadow-lg',
                    feature.logoBg === 'blue' ? 'bg-[#0F2A52]' : feature.logoBg === 'dark' ? 'bg-[#111]' : 'bg-white'
                )}>
                    <img src={feature.logo} alt={feature.institution || feature.title} className="w-full h-full object-contain" />
                </div>
            ) : (
                Icon && <Icon className="relative z-20 size-6 text-[#38889F]" strokeWidth={1.5} aria-hidden />
            )}

            <h3 className="relative z-20 mt-10 text-sm font-bold text-slate-900 dark:text-white md:text-base">{feature.title}</h3>
            {feature.description && (
                <p className="relative z-20 mt-2 text-xs font-light text-slate-600 dark:text-slate-400">{feature.description}</p>
            )}
            {feature.meta && <div className="relative z-20 mt-3">{feature.meta}</div>}
        </div>
    );
}

// Container que revela a grade inteira com blur (padrão original do componente) — respeita
// prefers-reduced-motion desligando a animação e mostrando o conteúdo direto.
export function AnimatedContainer({ className, delay = 0.1, children }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function GridPattern({ width, height, x, y, squares, ...props }) {
    const patternId = React.useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([sx, sy], index) => (
                        <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={sx * width} y={sy * height} />
                    ))}
                </svg>
            )}
        </svg>
    );
}

function genRandomPattern(length = 5) {
    return Array.from({ length }, () => [
        Math.floor(Math.random() * 4) + 7, // x aleatório entre 7 e 10
        Math.floor(Math.random() * 6) + 1, // y aleatório entre 1 e 6
    ]);
}
