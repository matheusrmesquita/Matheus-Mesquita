import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

const WA_NUMBER = '5561982863674';

const Contato = () => {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = form;
        const text = `*Nome:* ${name}\n*E-mail:* ${email}\n\n*Mensagem:*\n${message}`;
        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="py-12 mx-4 md:mx-8 lg:mx-[150px] animate-in fade-in duration-500">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t('contact.title')}</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">{t('contact.subtitle')}</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 p-8 md:p-10 rounded-[16px] space-y-6"
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('contact.labelName')}</label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-[14px] bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#38889F]/50 transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        placeholder={t('contact.placeholderName')}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('contact.labelEmail')}</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-[14px] bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#38889F]/50 transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        placeholder={t('contact.placeholderEmail')}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('contact.labelMessage')}</label>
                    <textarea
                        id="message"
                        rows="4"
                        required
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-[14px] bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#38889F]/50 transition-all font-medium resize-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        placeholder={t('contact.placeholderMessage')}
                    />
                </div>

                {/* Botão envia para o WhatsApp */}
                <button type="submit" className="w-full">
                    <InteractiveHoverButton
                        text="Enviar pelo WhatsApp 💬"
                        className="w-full py-4 bg-[#25D366] border-[#25D366] text-white shadow-lg shadow-[#25D366]/20"
                    />
                </button>
            </form>
        </div>
    );
};

export default Contato;
