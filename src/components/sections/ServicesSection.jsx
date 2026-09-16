import React from 'react';
import { ClipboardList, Compass, Layers, Cpu, Code2, Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FeatureCard, AnimatedContainer } from '@/components/ui/grid-feature-cards';

// Serviços — copy própria baseada no currículo/competências reais, organizada pelas etapas do
// processo (requisitos, arquitetura, sistema, IA, implementação, integração), não por categoria
// genérica de mercado.
const SERVICES = {
    pt: {
        eyebrow: 'O que eu faço',
        subtitle: 'Um processo completo de produto, do requisito ao código, com apoio de Inteligência Artificial.',
        items: [
            { icon: ClipboardList, title: 'Requisitos e Viabilidade', desc: 'Análise de requisitos funcionais e avaliação de viabilidade técnica antes de qualquer tela, pra garantir que o projeto começa na direção certa.' },
            { icon: Compass, title: 'Jornadas e Fluxos', desc: 'Mapeamento de jornadas, arquitetura da informação e wireframes que organizam a experiência do zero.' },
            { icon: Layers, title: 'Design System', desc: 'Componentes reutilizáveis e design tokens documentados que dão consistência visual e escalam junto com o produto.' },
            { icon: Cpu, title: 'IA no Processo de Design', desc: 'Agentes e ferramentas de Inteligência Artificial aplicados à pesquisa, documentação e prototipagem funcional.' },
            { icon: Code2, title: 'Handoff Funcional', desc: 'Protótipos em React próximos do código final, encurtando a distância entre o design e o time de desenvolvimento.' },
            { icon: Database, title: 'Migração e Integração', desc: 'Migração de dados e adaptação de portais dentro de ecossistemas enterprise, como WordPress para Liferay.' },
        ],
    },
    en: {
        eyebrow: 'What I Do',
        subtitle: 'A complete product process, from requirement to code, supported by Artificial Intelligence.',
        items: [
            { icon: ClipboardList, title: 'Requirements and Feasibility', desc: 'Functional requirements analysis and technical feasibility assessment before any screen exists, so the project starts in the right direction.' },
            { icon: Compass, title: 'Journeys and Flows', desc: 'Journey mapping, information architecture, and wireframes that organize the experience from scratch.' },
            { icon: Layers, title: 'Design System', desc: 'Reusable components and documented design tokens that bring visual consistency and scale with the product.' },
            { icon: Cpu, title: 'AI in the Design Process', desc: 'AI agents and tools applied to research, documentation, and functional prototyping.' },
            { icon: Code2, title: 'Functional Handoff', desc: 'React prototypes close to the final code, shortening the distance between design and the development team.' },
            { icon: Database, title: 'Migration and Integration', desc: 'Data migration and portal adaptation within enterprise ecosystems, such as WordPress to Liferay.' },
        ],
    },
};

const ServicesSection = () => {
    const { language } = useLanguage();
    const c = SERVICES[language] || SERVICES.pt;

    return (
        <section className="mx-4 md:mx-8 lg:mx-[150px] mt-24 scroll-mt-32" id="servicos">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">{c.eyebrow}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">{c.subtitle}</p>
            </div>

            <AnimatedContainer
                delay={0.2}
                className="grid grid-cols-1 divide-x divide-y divide-dashed divide-slate-200 dark:divide-white/10 border border-dashed border-slate-200 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-3"
            >
                {c.items.map((item) => (
                    <FeatureCard
                        key={item.title}
                        feature={{ title: item.title, icon: item.icon, description: item.desc }}
                    />
                ))}
            </AnimatedContainer>
        </section>
    );
};

export default ServicesSection;
