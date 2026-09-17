import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowUpRight,
    Check,
    ChevronRight,
    Clock3,
    Sparkles,
} from 'lucide-react';
import RotinaeOrbitalArchitecture from '../components/RotinaeOrbitalArchitecture';
import RotinaeScrollShowcase from '../components/RotinaeScrollShowcase';
import { useLanguage } from '@/context/LanguageContext';
import './RotinaeCase.css';

function Reveal({ children, direction = 'up', delay = 0, className }) {
    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
    const value = direction === 'right' || direction === 'down' ? 80 : -80;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, filter: 'blur(10px)', [axis]: value }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', [axis]: 0 }}
            viewport={{ once: false, amount: 0.3, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    );
}

function RotinaeCase() {
    const { t } = useLanguage();

    useEffect(() => {
        const previousTitle = document.title;
        document.title = t('rotinaeCase.documentTitle');
        return () => { document.title = previousTitle; };
    }, [t]);

    return (
        <article className="rotinae-case">
            <section className="rotinae-hero" aria-labelledby="rotinae-title">
                <div className="rotinae-orb rotinae-orb-one" />
                <div className="rotinae-orb rotinae-orb-two" />

                <div className="rotinae-shell rotinae-hero-nav">
                    <Link to="/projetos" className="rotinae-back">
                        <ArrowLeft size={17} aria-hidden="true" /> {t('rotinaeCase.backToProjects')}
                    </Link>
                    <span className="rotinae-case-index">{t('rotinaeCase.caseIndex')}</span>
                </div>

                <div className="rotinae-shell rotinae-hero-grid">
                    <motion.div
                        className="rotinae-hero-copy"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <div className="rotinae-eyebrow">
                            <img src="/rotinae/app-icon.webp" alt="" />
                            {t('rotinaeCase.eyebrow')}
                        </div>
                        <h1 id="rotinae-title">Rotina<span>ê</span></h1>
                        <p className="rotinae-lead">{t('rotinaeCase.lead')}</p>
                        <p className="rotinae-summary">{t('rotinaeCase.summary')}</p>

                        <div className="rotinae-hero-actions">
                            <a href="#origem" className="rotinae-primary-button">
                                {t('rotinaeCase.ctaExplore')} <ChevronRight size={18} />
                            </a>
                            <a href="https://rotinae.com.br/" target="_blank" rel="noreferrer" className="rotinae-text-link">
                                {t('rotinaeCase.ctaPublished')} <ArrowUpRight size={17} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <RotinaeScrollShowcase src="/rotinae/hero-showcase.webp" alt={t('rotinaeCase.showcaseAlt')} />
            </section>

            <div className="rotinae-shell rotinae-chapter-strip">
                {t('rotinaeCase.chapters').map(({ n, title }) => <span key={n}><b>{n}</b>{title}</span>)}
            </div>

            <section className="rotinae-intro rotinae-shell" id="origem">
                <div className="rotinae-section-label">{t('rotinaeCase.s1.label')}</div>
                <Reveal className="rotinae-intro-grid">
                    <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s1.heading') }} />
                    <div>
                        <p>{t('rotinaeCase.s1.p1')}</p>
                        <p>{t('rotinaeCase.s1.p2')}</p>
                    </div>
                </Reveal>

                <div className="rotinae-opportunity-flow">
                    <div className="rotinae-opportunity-line" />
                    {t('rotinaeCase.s1.flow').map(({ title, desc }, i) => (
                        <Reveal key={title} className={i === 4 ? 'rotinae-opportunity-step featured' : 'rotinae-opportunity-step'} delay={i * 0.08}>
                            <span className="rotinae-opportunity-badge">0{i + 1}</span><strong>{title}</strong><p>{desc}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="rotinae-research rotinae-shell" id="pesquisa">
                <div className="rotinae-section-label">{t('rotinaeCase.s2.label')}</div>
                <Reveal className="rotinae-split-heading">
                    <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s2.heading') }} />
                    <p>{t('rotinaeCase.s2.intro')}</p>
                </Reveal>

                <Reveal className="rotinae-evidence-note" delay={0.05}>
                    <Sparkles size={18} />
                    <p><strong>{t('rotinaeCase.s2.noteStrong')}</strong> {t('rotinaeCase.s2.noteRest')}</p>
                </Reveal>

                <div className="rotinae-research-block">
                    <Reveal direction="left">
                        <span className="rotinae-research-kicker">{t('rotinaeCase.s2.benchmark.kicker')}</span>
                        <h3>{t('rotinaeCase.s2.benchmark.title')}</h3>
                        <p>{t('rotinaeCase.s2.benchmark.body')}</p>
                    </Reveal>
                    <Reveal direction="right" className="rotinae-requirement-cloud">
                        {t('rotinaeCase.s2.benchmark.tags').map(item => <span key={item}>{item}</span>)}
                    </Reveal>
                </div>

                <div className="rotinae-research-block">
                    <Reveal direction="left">
                        <span className="rotinae-research-kicker">{t('rotinaeCase.s2.visual.kicker')}</span>
                        <h3>{t('rotinaeCase.s2.visual.title')}</h3>
                        <p>{t('rotinaeCase.s2.visual.body')}</p>
                    </Reveal>
                    <Reveal direction="right" className="rotinae-opportunity-flow rotinae-opportunity-flow--nested">
                        <div className="rotinae-opportunity-line" />
                        {t('rotinaeCase.s2.visual.steps').map(({ title }, i, arr) => (
                            <div key={title} className={i === arr.length - 1 ? 'rotinae-opportunity-step featured' : 'rotinae-opportunity-step'}>
                                <span className="rotinae-opportunity-badge">0{i + 1}</span><strong>{title}</strong>
                            </div>
                        ))}
                    </Reveal>
                </div>

                <div className="rotinae-research-block">
                    <Reveal direction="left">
                        <span className="rotinae-research-kicker">{t('rotinaeCase.s2.users.kicker')}</span>
                        <h3>{t('rotinaeCase.s2.users.title')}</h3>
                        <p>{t('rotinaeCase.s2.users.body')}</p>
                    </Reveal>
                    <Reveal direction="right" className="rotinae-research-roles">
                        {t('rotinaeCase.s2.users.roles').map(({ code, title, desc }) => (
                            <div key={code}><span>{code}</span><strong>{title}</strong><p>{desc}</p></div>
                        ))}
                    </Reveal>
                </div>

                <div className="rotinae-research-block">
                    <Reveal direction="left">
                        <span className="rotinae-research-kicker">{t('rotinaeCase.s2.flows.kicker')}</span>
                        <h3>{t('rotinaeCase.s2.flows.title')}</h3>
                        <p>{t('rotinaeCase.s2.flows.body')}</p>
                    </Reveal>
                    <Reveal direction="right" className="rotinae-flow-chain">
                        {t('rotinaeCase.s2.flows.chain').map((step, i, arr) => (
                            <React.Fragment key={step}>
                                <span>{step}</span>
                                {i < arr.length - 1 && <ChevronRight size={14} />}
                            </React.Fragment>
                        ))}
                    </Reveal>
                </div>

                <Reveal className="rotinae-research-block rotinae-research-block--single">
                    <div>
                        <span className="rotinae-research-kicker">{t('rotinaeCase.s2.tests.kicker')}</span>
                        <h3>{t('rotinaeCase.s2.tests.title')}</h3>
                        <div className="rotinae-flow-chain rotinae-flow-chain--loop">
                            {t('rotinaeCase.s2.tests.loop').map((step, i, arr) => (
                                <React.Fragment key={step}>
                                    <span>{step}</span>
                                    {i < arr.length - 1 && <ChevronRight size={12} />}
                                </React.Fragment>
                            ))}
                        </div>
                        <p className="rotinae-research-example">{t('rotinaeCase.s2.tests.example')}</p>
                    </div>
                </Reveal>
            </section>

            <section className="rotinae-dark-section">
                <div className="rotinae-shell">
                    <div className="rotinae-section-label light">{t('rotinaeCase.s3.label')}</div>
                    <Reveal className="rotinae-dark-heading">
                        <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s3.heading') }} />
                        <p>{t('rotinaeCase.s3.intro')}</p>
                    </Reveal>

                    <div className="rotinae-orbital-panel">
                        <RotinaeOrbitalArchitecture />
                    </div>

                    <Reveal className="rotinae-evidence-note">
                        <Sparkles size={18} />
                        <p><strong>{t('rotinaeCase.s3.noteStrong')}</strong> {t('rotinaeCase.s3.noteRest')}</p>
                    </Reveal>
                </div>
            </section>

            <section className="rotinae-requirements rotinae-shell">
                <div className="rotinae-section-label">{t('rotinaeCase.s4.label')}</div>
                <Reveal className="rotinae-split-heading">
                    <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s4.heading') }} />
                    <p>{t('rotinaeCase.s4.intro')}</p>
                </Reveal>

                <div className="rotinae-role-evolution">
                    <Reveal className="rotinae-role-stage" direction="left">
                        <small>{t('rotinaeCase.s4.hypothesisLabel')}</small>
                        {t('rotinaeCase.s4.hypothesis').map(({ code, title }) => (
                            <div key={code}><span>{code}</span><strong>{title}</strong></div>
                        ))}
                    </Reveal>
                    <div className="rotinae-role-arrow"><span>{t('rotinaeCase.s4.arrowFrom')}</span><ChevronRight /><span>{t('rotinaeCase.s4.arrowTo')}</span></div>
                    <Reveal className="rotinae-role-stage current" direction="right">
                        <small>{t('rotinaeCase.s4.evolvedLabel')}</small>
                        {t('rotinaeCase.s4.evolved').map(({ code, title, desc }) => (
                            <div key={code}><span>{code}</span><strong>{title}</strong><p>{desc}</p></div>
                        ))}
                    </Reveal>
                </div>

                <Reveal className="rotinae-requirement-cloud">
                    {t('rotinaeCase.s4.tags').map(item => <span key={item}>{item}</span>)}
                </Reveal>
            </section>

            <section className="rotinae-evolution">
                <div className="rotinae-shell">
                    <div className="rotinae-section-label">{t('rotinaeCase.s5.label')}</div>
                    <div className="rotinae-split-heading">
                        <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s5.heading') }} />
                        <p>{t('rotinaeCase.s5.intro')}</p>
                    </div>

                    <div className="rotinae-timeline">
                        {t('rotinaeCase.s5.timeline').map((item, index) => (
                            <motion.article
                                key={item.step}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                viewport={{ once: false, amount: 0.3, margin: '0px 0px -120px 0px' }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                            >
                                <div className="rotinae-timeline-number">{item.step}</div>
                                <div className="rotinae-timeline-content">
                                    <div><h3>{item.title}</h3><span><Check size={13} />{item.status}</span></div>
                                    <dl>
                                        <div><dt>{t('rotinaeCase.s5.dtContext')}</dt><dd>{item.context}</dd></div>
                                        <div><dt>{t('rotinaeCase.s5.dtDecision')}</dt><dd>{item.decision}</dd></div>
                                        <div><dt>{t('rotinaeCase.s5.dtImpact')}</dt><dd>{item.impact}</dd></div>
                                    </dl>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="rotinae-mvp rotinae-shell">
                <div className="rotinae-section-label">{t('rotinaeCase.s6.label')}</div>
                <Reveal className="rotinae-split-heading">
                    <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s6.heading') }} />
                    <p>{t('rotinaeCase.s6.intro')}</p>
                </Reveal>

                <div className="rotinae-mvp-board">
                    <Reveal delay={0}>
                        <small>{t('rotinaeCase.s6.deliveredLabel')}</small>
                        {t('rotinaeCase.s6.delivered').map(item => <p key={item}><Check />{item}</p>)}
                    </Reveal>
                    <Reveal delay={0.08}>
                        <small>{t('rotinaeCase.s6.postponedLabel')}</small>
                        {t('rotinaeCase.s6.postponed').map(item => <p key={item}><Clock3 />{item}</p>)}
                    </Reveal>
                    <Reveal className="rotinae-plan-card" delay={0.16}>
                        <span>{t('rotinaeCase.s6.planLabel')}</span>
                        <strong>{t('rotinaeCase.s6.planPrice')}<small>{t('rotinaeCase.s6.planPeriod')}</small></strong>
                        <p>{t('rotinaeCase.s6.planDesc')}</p>
                        <hr />
                        <p className="rotinae-validation">{t('rotinaeCase.s6.planValidation')}</p>
                    </Reveal>
                </div>
            </section>

            <section className="rotinae-experience">
                <div className="rotinae-shell rotinae-experience-grid">
                    <Reveal direction="left">
                        <div className="rotinae-section-label light">{t('rotinaeCase.s7.label')}</div>
                        <h2 dangerouslySetInnerHTML={{ __html: t('rotinaeCase.s7.heading') }} />
                        <p>{t('rotinaeCase.s7.intro')}</p>
                        <div className="rotinae-token-row"><span>#21065F</span><span>#5416FF</span><span>#EEE9FF</span><span>Urbanist</span></div>
                    </Reveal>
                    <Reveal direction="right" className="rotinae-app-phone">
                        <div className="rotinae-app-phone-notch" />
                        <img src="/rotinae/inicio-mobile.webp" alt={t('rotinaeCase.phoneAlt')} />
                    </Reveal>
                </div>
            </section>

            <section className="rotinae-ai rotinae-shell">
                <Reveal className="rotinae-ai-card">
                    <div className="rotinae-ai-icon"><Sparkles /></div>
                    <div>
                        <span>{t('rotinaeCase.s8.aiLabel')}</span>
                        <h2>{t('rotinaeCase.s8.aiHeading')}</h2>
                    </div>
                    <p>{t('rotinaeCase.s8.aiBody')}</p>
                </Reveal>

                <div className="rotinae-challenges">
                    <div className="rotinae-section-label">{t('rotinaeCase.s8.challengesLabel')}</div>
                    {t('rotinaeCase.s8.challenges').map(({ title, body }, index) => (
                        <motion.article
                            key={title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: false, amount: 0.3, margin: '0px 0px -120px 0px' }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                        >
                            <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <section className="rotinae-result">
                <div className="rotinae-result-glow" />
                <Reveal className="rotinae-shell rotinae-result-content">
                    <img src="/rotinae/app-icon.webp" alt={t('rotinaeCase.result.iconAlt')} />
                    <span>{t('rotinaeCase.result.label')}</span>
                    <h2>{t('rotinaeCase.result.heading')}</h2>
                    <p>{t('rotinaeCase.result.body')}</p>
                    <a href="https://rotinae.com.br/" target="_blank" rel="noreferrer">{t('rotinaeCase.result.cta')} <ArrowUpRight /></a>
                </Reveal>
            </section>
        </article>
    );
}

export default RotinaeCase;
