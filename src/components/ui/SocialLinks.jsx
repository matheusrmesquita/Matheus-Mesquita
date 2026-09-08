import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

/* eslint-disable react-refresh/only-export-components */

// Ícone Behance como SVG inline (paths extraídos do arquivo enviado)
const BehanceIcon = ({ className }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="m43.9 46.1c1.4-2.2 2.2-4.7 2.1-7.5-.1-7.4-6.3-13.2-13.6-13.2h-20.7c-1 0-1.7.8-1.7 1.7v45.2c0 1 .8 1.7 1.7 1.7h23c8.5 0 15.6-6.8 15.6-15.4 0-5.1-2.5-9.7-6.4-12.5zm-24.9-11.7h13.5c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4h-13.5zm16 30.7h-16v-12.8h16c3.5 0 6.4 2.9 6.4 6.4s-2.9 6.4-6.4 6.4z" />
        <path d="m89.9 55.5c0-10.5-8.3-19.1-18.5-19.1s-18.5 8.6-18.5 19.1 8.3 19.1 18.5 19.1c6.2 0 12-3.2 15.4-8.5.4-.7.8-1.4 1.2-2.1.3-.5-.1-1.1-.7-1.1h-9.1c-.2 0-.4.1-.5.2-1.7 1.7-3.8 2.5-6.2 2.5-4.5 0-8.3-3.4-9.3-7.9h26c1 0 1.8-.8 1.8-1.8zm-18.5-10.1c3.3 0 6.2 1.8 7.9 4.6h-15.9c1.7-2.7 4.7-4.6 8-4.6z" />
        <path d="m79.1 34.2h-16.5c-.8 0-1.4-.6-1.4-1.4v-4.1c0-.8.6-1.4 1.4-1.4h16.4c.8 0 1.4.6 1.4 1.4v4.1c.1.7-.6 1.4-1.3 1.4z" />
    </svg>
);

const MediumIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
);

// Lista única de redes sociais — compartilhada entre Footer, Sobre etc.
export const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/uxmesquita',
        icon: Instagram,
        hoverColor: 'hover:text-[#E1306C]',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/matheusrmesquita',
        icon: Linkedin,
        hoverColor: 'hover:text-[#0077B5]',
    },
    {
        label: 'Behance',
        href: 'https://www.behance.net/matheusrmesquita',
        icon: BehanceIcon,
        hoverColor: 'hover:text-[#1769ff]',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/matheusrmesquita',
        icon: Github,
        hoverColor: 'hover:text-white',
    },
    {
        label: 'Medium',
        href: 'https://medium.com/@matheusrmesquita',
        icon: MediumIcon,
        hoverColor: 'hover:text-white',
    },
];

const SocialLinks = ({ className, iconClassName = 'w-[18px] h-[18px]' }) => (
    <div className={cn('flex items-center gap-1', className)}>
        {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
            <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn('p-2 text-slate-500 transition-colors', hoverColor)}
            >
                <Icon className={iconClassName} />
            </a>
        ))}
    </div>
);

export default SocialLinks;
