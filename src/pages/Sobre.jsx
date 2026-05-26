import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import matheusImage from '@/assets/global/Matheus.png';
import walterImage from '@/assets/global/Walter.jpeg';

/* ─── Animação de entrada ─── */
const FadeUp = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

/* ─── Contador animado ─── */
const Counter = ({ value, suffix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const duration = 1200;
        const startTime = performance.now();
        const tick = (now) => {
            const p = Math.min((now - startTime) / duration, 1);
            const ease = p * p * (3 - 2 * p);
            setCount(Math.floor(ease * value));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(value);
        };
        requestAnimationFrame(tick);
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Conteúdo bilíngue ─── */
const content = {
    pt: {
        label: 'Sobre a Brand',
        h1a: 'Performance',
        h1b: 'Digital',
        tagline: 'Uma agência de crescimento focada em escalar resultados reais.',
        intro: 'Combinamos inteligência de dados, tráfego pago e estratégia de mídias sociais para construir presenças digitais dominantes para empresas que buscam o topo.',
        manifesto_label: 'Manifesto',
        manifesto_aside_num: '01',
        manifesto_aside_title: 'Por que a Brand existe',
        manifesto_aside_sub: 'Não somos uma agência genérica.\nSomos um acelerador de presença.',
        manifesto_p1_bold: 'Vivemos em um mercado saturado de cliques vazios.',
        manifesto_p1: ' Negócios que não dominam sua aquisição de clientes acabam reféns do acaso, não por falta de produto, mas por falta de estratégia.',
        manifesto_quote: 'Escalamos empresas que estão prontas para crescer e precisam de tração.',
        manifesto_p2_bold: 'performance estratégica transforma negócios',
        manifesto_p2_pre: 'A Brand nasceu da convicção de que ',
        manifesto_p2_suf: '. Não como vaidade, mas como ferramenta de escala. Cada ação deve ampliar o alcance e a autoridade da marca.',
        manifesto_p3: 'Trabalhamos com empresas que recusam o básico. Que entendem que tráfego pago não é custo, é motor. Que sabem que a presença social é o canal direto com o cliente.',
        manifesto_p4: 'Entregamos crescimento, não apenas relatórios. Estratégia, não execução cega. Parceria, não fornecimento.',
        manifesto_p4_bold: 'Quando a Brand acelera, a visibilidade expande.',
        numbers_label: 'Em números',
        numbers: [
            { value: 47, suffix: '+', label: 'Projetos entregues com excelência' },
            { value: 5,  suffix: '',  label: 'Anos construindo marcas relevantes' },
            { value: 98, suffix: '%', label: 'Taxa de retenção de clientes' },
            { value: 12, suffix: '',  label: 'Países onde nossas marcas operam' },
        ],
        values_label: 'O que nos guia',
        values: [
            { num: '01', title: 'Clareza antes de criação', desc: 'Antes de qualquer pixel, entendemos o negócio. Estratégia mal definida gera design que não converte. Começamos com as perguntas certas.' },
            { num: '02', title: 'Design com intenção', desc: 'Cada escolha visual tem uma razão. Cor, tipografia e espaçamento não são arbitrários. Design bom não chama atenção para si mesmo; direciona o olhar.' },
            { num: '03', title: 'Execução sem concessões', desc: 'Entregamos o que foi pensado, não o que foi mais fácil de implementar. Qualidade de execução é o que separa o bom do memorável.' },
            { num: '04', title: 'Parceria de longo prazo', desc: 'Não somos fornecedores de projeto. Somos parceiros de crescimento. O sucesso do cliente é o nosso critério de sucesso.' },
            { num: '05', title: 'Tecnologia a serviço da marca', desc: 'Usamos as ferramentas mais avançadas disponíveis por critério, não por trend, porque as melhores marcas merecem a melhor infraestrutura digital.' },
            { num: '06', title: 'Honestidade como padrão', desc: 'Se a caminho não está certo, dizemos. Preferiríamos perder um projeto do que entregar algo que não vai funcionar para o cliente.' },
        ],
        founders_label: 'Fundadores',
        founders_intro: 'Especialistas que pensam como fundadores.',
        founders_sub: 'Nossa equipe combina formação sólida com experiência de mercado. Designers, estrategistas e desenvolvedores que entendem que o resultado final é o único critério que importa.',
        founders: [
            {
                name: 'Matheus Mesquita',
                role: 'Fundador & Diretor de Criação',
                bio: 'Especialista em UX/UI, experiência do usuário e estratégias digitais orientadas à performance. Atua na criação de interfaces intuitivas, responsivas e escaláveis, unindo design, comportamento do usuário e visão estratégica para desenvolver experiências digitais que geram engajamento, conversão e crescimento real para marcas e negócios.'
            },
            {
                name: 'Walter Ribes',
                role: 'Co-fundador & Tech Strategy',
                bio: 'Responsável por estratégias de aquisição, performance digital e automação de marketing. Atua na construção de ecossistemas completos de conversão, unindo tráfego pago, páginas de alta performance, conteúdo estratégico e mensuração precisa de dados, com foco em otimização de CPA, ROI e LTV.'
            }
        ],
        services_label: 'O que fazemos',
        services: [
            { num: '01', name: 'Gestão de Tráfego Pago',             tags: ['Meta Ads', 'Google Ads', 'ROI Focus'] },
            { num: '02', name: 'Estratégia de Mídias Sociais',        tags: ['Autoridade', 'Engajamento', 'Escala'] },
            { num: '03', name: 'Funis de Alta Conversão',            tags: ['Landing Pages', 'CRM', 'Tracking'] },
            { num: '04', name: 'Estratégia de Crescimento Digital',   tags: ['Growth', 'Posicionamento', 'Market Share'] },
            { num: '05', name: 'Performance & Análise de Dados',     tags: ['ROI', 'Business Intelligence', 'Escalabilidade'] },
        ],
        cta_title_line1: 'Pronto para construir',
        cta_title_line2: 'algo',
        cta_title_em: 'que importa?',
        cta_btn: 'Iniciar um projeto',
        cta_ghost: 'Ver nossos projetos'
    },
    en: {
        label: 'About Brand',
        h1a: 'Digital',
        h1b: 'Performance',
        tagline: 'A growth agency focused on scaling real results.',
        intro: 'We combine data intelligence, paid traffic, and social media strategy to build dominant digital presences for companies seeking the top.',
        manifesto_label: 'Manifesto',
        manifesto_aside_num: '01',
        manifesto_aside_title: 'Why Brand exists',
        manifesto_aside_sub: 'We are not a generic agency.\nWe are a visibility accelerator.',
        manifesto_p1_bold: 'We live in a market saturated with empty clicks.',
        manifesto_p1: ' Businesses that do not master their customer acquisition end up hostage to chance, not for lack of product, but for lack of strategy.',
        manifesto_quote: 'We scale companies that are ready to grow and need traction.',
        manifesto_p2_bold: 'strategic performance transforms business',
        manifesto_p2_pre: 'Brand was born from the conviction that ',
        manifesto_p2_suf: '. Not as vanity, but as a scale tool. Every action must expand the brand\'s reach and authority.',
        manifesto_p3: 'We work with companies that refuse the basics. Who understand that paid traffic is not a cost, it is an engine. Who know that social presence is the direct channel with the customer.',
        manifesto_p4: 'We deliver growth, not just reports. Strategy, not blind execution. Partnership, not supply.',
        manifesto_p4_bold: 'When Brand accelerates, visibility expands.',
        numbers_label: 'By the numbers',
        numbers: [
            { value: 47, suffix: '+', label: 'Projects delivered with excellence' },
            { value: 5,  suffix: '',  label: 'Years building relevant brands' },
            { value: 98, suffix: '%', label: 'Client retention rate' },
            { value: 12, suffix: '',  label: 'Countries where our brands operate' },
        ],
        values_label: 'What guides us',
        values: [
            { num: '01', title: 'Clarity before creation', desc: 'Before any pixel, we understand the business. Poorly defined strategy generates design that doesn\'t convert. We start with the right questions.' },
            { num: '02', title: 'Intentional design', desc: 'Every visual choice has a reason. Color, typography, and spacing are never arbitrary. Good design doesn\'t call attention to itself; it directs the eye.' },
            { num: '03', title: 'Uncompromising execution', desc: 'We deliver what was thought, not what was easier to implement. Execution quality is what separates the good from the memorable.' },
            { num: '04', title: 'Long-term partnership', desc: 'We are not project vendors. We are growth partners. Client success is our success criterion.' },
            { num: '05', title: 'Technology serving the brand', desc: 'We use the most advanced tools available by choice, not because of trends, because the best brands deserve the best digital infrastructure.' },
            { num: '06', title: 'Honesty as a standard', desc: 'If the path is not right, we say so. We would rather lose a project than deliver something that won\'t work for the client.' },
        ],
        founders_label: 'Founders',
        founders_intro: 'Experts focused on scale.',
        founders_sub: 'Our team combines solid training with market experience. Designers, strategists, and developers who understand that real impact is the only metric that matters.',
        founders: [
            {
                name: 'Matheus Mesquita',
                role: 'Founder & Performance Director',
                bio: 'Specialist in UX/UI, user experience, and performance-oriented digital strategies. Creates intuitive, responsive, and scalable interfaces by combining design, user behavior, and strategic vision to develop digital experiences that generate engagement, conversion, and real growth for brands and businesses.'
            },
            {
                name: 'Walter Ribes',
                role: 'Co-founder & Tech Strategy',
                bio: 'Responsible for acquisition strategies, digital performance, and marketing automation. Builds complete conversion ecosystems by combining paid traffic, high-performance pages, strategic content, and precise data measurement, focused on CPA, ROI, and LTV optimization.'
            }
        ],
        services_label: 'What we do',
        services: [
            { num: '01', name: 'Paid Traffic Management',          tags: ['Meta Ads', 'Google Ads', 'ROI Focus'] },
            { num: '02', name: 'Social Media Strategy',             tags: ['Authority', 'Engagement', 'Scale'] },
            { num: '03', name: 'High Conversion Funnels',           tags: ['Landing Pages', 'CRM', 'Tracking'] },
            { num: '04', name: 'Digital Growth Strategy',           tags: ['Growth', 'Positioning', 'Market Share'] },
            { num: '05', name: 'Performance & Data Analysis',       tags: ['ROI', 'BI', 'Scalability'] },
        ],
        cta_title_line1: 'Ready to build',
        cta_title_line2: 'something',
        cta_title_em: 'that matters?',
        cta_btn: 'Start a project',
        cta_ghost: 'See our projects'
    }
};

const Sobre = () => {
    const { language } = useLanguage();
    const c = content[language] || content.pt;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full overflow-x-hidden bg-[#050505] text-[#F5F5F5] font-sans">
            
            {/* ─── SEÇÃO 1: HEADER ─── */}
            <header className="brand-section pt-32 md:pt-48 pb-16 md:pb-24 border-b border-white/5 relative overflow-hidden">
                <div className="sb-header-glow absolute top-[-20%] right-[-10%] w-[55%] h-[120%] pointer-events-none" 
                     style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(255,90,31,0.12) 0%, rgba(204,74,0,0.05) 40%, transparent 65%)' }}></div>
                <div className="sb-header-grain absolute inset-0 opacity-[0.025] pointer-events-none"
                     style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/xml\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '280px' }}></div>
                
                <div className="brand-container relative z-10">
                    <FadeUp>
                        <div className="sb-header-label" data-num="00">{c.label}</div>
                    </FadeUp>
                    
                    <div className="brand-grid items-end mt-8">
                        <FadeUp delay={0.1} className="col-span-12 md:col-span-7">
                            <h1 className="sb-header-title">
                                {c.h1a}<br /> <em className="headline-stroke">{c.h1b}</em>
                            </h1>
                        </FadeUp>
                        <FadeUp delay={0.2} className="col-span-12 md:col-span-5 xl:col-span-4 xl:col-start-9">
                            <p className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-white mb-6">
                                {c.tagline}
                            </p>
                            <p className="text-base text-zinc-400 leading-relaxed">
                                {c.intro}
                            </p>
                        </FadeUp>
                    </div>
                </div>
            </header>

            {/* ─── SEÇÃO 2: MANIFESTO ─── */}
            <section className="brand-section brand-section-block relative overflow-hidden bg-[#0d0d0d] border-b border-white/5">
                <div className="brand-container relative z-10">
                    <FadeUp>
                        <div className="sb-section-label" data-num="01">{c.manifesto_label}</div>
                    </FadeUp>

                    <div className="brand-grid mt-12 md:mt-20">
                        <div className="sb-manifesto-aside col-span-12 md:col-span-4">
                            <div className="sb-manifesto-aside-num" aria-hidden="true">{c.manifesto_aside_num}</div>
                            <h2 className="sb-manifesto-aside-title">{c.manifesto_aside_title}</h2>
                            <p className="sb-manifesto-aside-sub">{c.manifesto_aside_sub}</p>
                        </div>

                        <div className="sb-manifesto-body col-span-12 md:col-span-7 md:col-start-6">
                            <FadeUp delay={0.1}>
                                <p className="sb-manifesto-para">
                                    <strong className="text-white">{c.manifesto_p1_bold}</strong>
                                    {c.manifesto_p1}
                                </p>
                            </FadeUp>
                            
                            <FadeUp delay={0.2}>
                                <div className="sb-manifesto-quote">
                                    <p>{c.manifesto_quote}</p>
                                </div>
                            </FadeUp>

                            <FadeUp delay={0.3}>
                                <p className="sb-manifesto-para">
                                    {c.manifesto_p2_pre}
                                    <strong className="text-white">{c.manifesto_p2_bold}</strong>
                                    {c.manifesto_p2_suf}
                                </p>
                                <p className="sb-manifesto-para">{c.manifesto_p3}</p>
                                <p className="sb-manifesto-para">{c.manifesto_p4}</p>
                            </FadeUp>

                            <FadeUp delay={0.4} className="mt-12">
                                <p className="text-brand-glow font-bold text-lg md:text-xl tracking-tight uppercase">
                                    {c.manifesto_p4_bold}
                                </p>
                            </FadeUp>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SEÇÃO 4: VALORES ─── */}
            <section className="brand-section brand-section-block bg-[#0d0d0d] border-b border-white/5">
                <div className="brand-container">
                    <FadeUp>
                        <div className="sb-section-label" data-num="03">{c.values_label}</div>
                    </FadeUp>

                    <div className="sb-values-grid mt-16 md:mt-24">
                        {c.values.map((v, i) => (
                            <FadeUp key={i} delay={i * 0.05}>
                                <div className="sb-value-card">
                                    <span className="sb-value-num">{v.num}</span>
                                    <h3 className="sb-value-title">{v.title}</h3>
                                    <p className="sb-value-desc">{v.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SEÇÃO 5: FUNDADORES ─── */}
            <section className="brand-section brand-section-block bg-[#050505] border-b border-white/5">
                <div className="brand-container">
                    <FadeUp>
                        <div className="sb-section-label" data-num="04">{c.founders_label}</div>
                    </FadeUp>

                    <div className="team-intro mb-16 md:mb-24">
                        <h2 className="team-intro-text">
                            {c.founders_intro}
                        </h2>
                        <p className="team-intro-sub">
                            {c.founders_sub}
                        </p>
                    </div>

                    <div className="sb-founders-grid">
                        {c.founders.slice(0, 2).map((f, i) => (
                            <FadeUp key={i} delay={i * 0.15}>
                               <div className="sb-member-card">
                                    <div className="sb-member-photo" role="img" aria-label={`Foto de ${f.name}`}>
                                        <img
                                            src={i === 0 ? matheusImage : walterImage}
                                            alt={f.name}
                                            className="w-full h-full object-cover"
                                            style={i === 1 ? { objectPosition: '50% 20%' } : undefined}
                                        />
                                    </div>
                                    <div className="sb-member-info">
                                        <span className="sb-member-name">{f.name}</span>
                                        <span className="sb-member-role">{f.role}</span>
                                    </div>
                                    <p className="sb-member-bio">{f.bio}</p>
                               </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SEÇÃO 6: SERVIÇOS ─── */}
            <section className="brand-section brand-section-block bg-[#0d0d0d] border-b border-white/5" id="servicos">
                <div className="brand-container">
                    <FadeUp>
                        <div className="sb-section-label" data-num="05">{c.services_label}</div>
                    </FadeUp>

                    <div className="flex flex-col mt-16 md:mt-24">
                        {c.services.map((s, i) => (
                            <FadeUp key={i} delay={i * 0.1} className="group border-b border-white/5 first:border-t md:hover:pl-4 transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 md:py-10">
                                    <div className="flex items-center gap-5 md:gap-12">
                                        <span className="font-mono text-xs text-zinc-700 group-hover:text-brand-glow transition-colors">{s.num}</span>
                                        <h4 className="text-2xl md:text-4xl font-bold text-white group-hover:text-brand-glow transition-colors tracking-tight">{s.name}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                        {s.tags.map((t, j) => (
                                            <span key={j} className="text-[10px] uppercase tracking-widest text-zinc-500 border border-white/10 px-3 py-1 rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="sb-cta-strip brand-section" id="contato">
                <div className="sb-cta-glow" aria-hidden="true"></div>
                <div className="brand-container sb-cta-inner">
                    <h2 className="sb-cta-title">
                        <span>{c.cta_title_line1}</span>
                        <span>{c.cta_title_line2} <em>{c.cta_title_em}</em></span>
                    </h2>
                    <div className="sb-cta-actions">
                        <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF5A1F] text-white font-bold rounded hover:bg-[#FF6B00] transition-all hover:-translate-y-1 group">
                            {c.cta_btn}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                            </svg>
                        </a>
                        <Link to="/projetos" className="text-zinc-500 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1 text-sm font-medium transition-colors flex items-center gap-2">
                            {c.cta_ghost} <span className="text-lg">→</span>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Sobre;
