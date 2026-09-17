import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

function RotinaeScrollShowcase({ src, alt }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start center'],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [28, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.62, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

    return (
        <div ref={containerRef} className="rotinae-showcase" style={{ perspective: '1200px' }}>
            <motion.div
                style={{ rotateX: rotate, scale, y, opacity, transformOrigin: 'top center' }}
                className="rotinae-showcase-card"
            >
                <div className="rotinae-showcase-crop">
                    <img src={src} alt={alt} className="rotinae-showcase-img" />
                </div>
            </motion.div>
        </div>
    );
}

export default RotinaeScrollShowcase;
