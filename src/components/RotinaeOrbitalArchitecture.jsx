import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bell, Database, GitBranch, Link, LockKeyhole, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = [Smartphone, LockKeyhole, Database, Bell, GitBranch];
const RELATED_IDS = [[2, 3, 4, 5], [1], [1], [1], [1]];
const RADIUS = 170;

function RotinaeOrbitalArchitecture() {
    const { t } = useLanguage();
    const architectureData = t('rotinaeCase.architecture.nodes').map((node, i) => ({
        id: i + 1,
        tag: node.tag,
        name: node.name,
        description: node.description,
        icon: ICONS[i],
        relatedIds: RELATED_IDS[i],
    }));
    const [expandedId, setExpandedId] = useState(null);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);

    useEffect(() => {
        if (!autoRotate) return undefined;
        const timer = setInterval(() => {
            setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
        }, 50);
        return () => clearInterval(timer);
    }, [autoRotate]);

    const collapse = () => {
        setExpandedId(null);
        setAutoRotate(true);
    };

    const toggleItem = (id) => {
        if (expandedId === id) {
            collapse();
            return;
        }
        const index = architectureData.findIndex((item) => item.id === id);
        setRotationAngle(270 - (index / architectureData.length) * 360);
        setExpandedId(id);
        setAutoRotate(false);
    };

    const activeItem = architectureData.find((item) => item.id === expandedId);
    const relatedIds = activeItem ? activeItem.relatedIds : [];

    return (
        <div
            ref={containerRef}
            onClick={(e) => { if (e.target === containerRef.current || e.target === orbitRef.current) collapse(); }}
            className="relative mx-auto flex h-[440px] w-full max-w-[560px] items-center justify-center"
        >
            <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
                <div className="absolute z-10 hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5416ff] via-[#7546ff] to-[#a98cff] animate-pulse sm:flex">
                    <div className="absolute h-[70px] w-[70px] animate-ping rounded-full border border-white/20 opacity-60" />
                    <div className="h-6 w-6 rounded-full bg-white/85" />
                </div>

                <div className="absolute h-[300px] w-[300px] rounded-full border border-white/10" />

                {architectureData.map((item, index) => {
                    const angle = ((index / architectureData.length) * 360 + rotationAngle) % 360;
                    const radian = (angle * Math.PI) / 180;
                    const x = RADIUS * Math.cos(radian);
                    const y = RADIUS * Math.sin(radian);
                    const zIndex = Math.round(100 + 50 * Math.cos(radian));
                    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));
                    const isExpanded = expandedId === item.id;
                    const isRelated = relatedIds.includes(item.id);
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className="absolute cursor-pointer transition-all duration-700"
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                                zIndex: isExpanded ? 200 : zIndex,
                                opacity: isExpanded ? 1 : opacity,
                            }}
                            onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                        >
                            <div
                                className={cn(
                                    'flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300',
                                    isExpanded
                                        ? 'scale-125 border-[#a98cff] bg-[#a98cff] text-white shadow-lg shadow-[#5416ff]/40'
                                        : isRelated
                                            ? 'border-[#a98cff] bg-[#a98cff]/20 text-white animate-pulse'
                                            : 'border-white/25 bg-black text-[#9a97a3]'
                                )}
                            >
                                <Icon size={17} />
                            </div>

                            <div className={cn(
                                'absolute top-[52px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-wider transition-all duration-300',
                                isExpanded ? 'scale-110 text-white' : 'text-white/55'
                            )}>
                                {item.tag}
                            </div>

                            {isExpanded && (
                                <div className="absolute top-20 left-1/2 w-64 -translate-x-1/2 rounded-2xl border border-white/15 bg-[#0d0620]/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-lg">
                                    <span className="text-[9px] font-black tracking-[.14em] text-[#a98cff]">{item.tag}</span>
                                    <strong className="mt-1 block text-[15px] text-white">{item.name}</strong>
                                    <p className="mt-2 text-xs leading-relaxed text-white/65">{item.description}</p>

                                    {item.relatedIds.length > 0 && (
                                        <div className="mt-4 border-t border-white/10 pt-3">
                                            <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                                                <Link size={10} /> {t('rotinaeCase.architecture.connectedLayers')}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.relatedIds.map((relId) => {
                                                    const related = architectureData.find((i) => i.id === relId);
                                                    return (
                                                        <button
                                                            key={relId}
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}
                                                            className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] text-white/75 transition-colors hover:border-[#a98cff]/60 hover:text-white"
                                                        >
                                                            {related?.tag} <ArrowRight size={9} />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <span className="pointer-events-none absolute bottom-3 right-4 text-[9px] font-medium tracking-wide text-white/25">
                {t('rotinaeCase.architecture.clickHint')}
            </span>
        </div>
    );
}

export default RotinaeOrbitalArchitecture;
