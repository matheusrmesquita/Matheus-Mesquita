import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WA_NUMBER = '5561982863674';
const WA_DEFAULT_MSG = encodeURIComponent('Olá, Matheus! Vi seu portfólio e gostaria de conversar sobre um projeto. 🚀');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_DEFAULT_MSG}`;

const WhatsAppFloat = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-xl rounded-[14px] px-4 py-3 mb-1"
                    >
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Fale comigo</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Respondido em até 1h útil</span>
                        </div>
                        <button
                            onClick={() => setShowTooltip(false)}
                            className="ml-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botão Principal */}
            <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fale comigo pelo WhatsApp"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40"
            >
                {/* Pulso animado */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
                {/* Ícone WhatsApp SVG */}
                <svg
                    viewBox="0 0 32 32"
                    className="w-7 h-7 fill-white relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16.001 2C8.268 2 2 8.268 2 16.001c0 2.49.654 4.826 1.796 6.857L2 30l7.343-1.774A13.934 13.934 0 0 0 16.001 30C23.732 30 30 23.732 30 16.001 30 8.268 23.732 2 16.001 2zm0 25.455a11.41 11.41 0 0 1-5.813-1.589l-.416-.247-4.358 1.053 1.08-4.248-.27-.437A11.413 11.413 0 0 1 4.545 16c0-6.317 5.14-11.455 11.456-11.455S27.455 9.683 27.455 16 22.317 27.455 16.001 27.455zm6.283-8.563c-.344-.172-2.037-1.005-2.352-1.12-.316-.114-.546-.172-.775.172-.23.344-.887 1.12-1.088 1.349-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.021-.912-1.71-2.037-1.91-2.381-.2-.344-.02-.53.151-.701.155-.155.344-.4.516-.6.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.601-.086-.172-.775-1.867-1.063-2.558-.28-.672-.564-.58-.775-.59l-.659-.012a1.265 1.265 0 0 0-.916.43c-.315.344-1.203 1.177-1.203 2.87s1.231 3.33 1.402 3.56c.173.23 2.424 3.7 5.873 5.19.82.354 1.46.565 1.959.723.823.261 1.572.224 2.164.136.66-.099 2.037-.832 2.323-1.635.286-.802.286-1.49.2-1.635-.085-.144-.314-.23-.659-.4z" />
                </svg>
            </motion.a>
        </div>
    );
};

export default WhatsAppFloat;
