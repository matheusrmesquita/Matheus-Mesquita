import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Layers, Target, Users, Landmark, Activity, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const content = {
    pt: {
        back: 'Voltar para a Home',
        tags: ['Estudo de Caso', 'DXP Educacional', 'Arquitetura da Informação'],
        title: 'Reestruturação de uma plataforma institucional de educação em uma DXP',
        intro1: 'Um dos problemas mais complicados de resolver em plataformas institucionais é quando o portal deixa de crescer de forma organizada e começa apenas a acumular estrutura.',
        intro2: 'Recentemente participei da reconstrução de um grande portal educacional em uma plataforma DXP que já carregava esse tipo de cenário há bastante tempo.',
        p1: 'A plataforma possuía problemas de estabilidade, inconsistências visuais, estruturas de navegação completamente diferentes coexistindo dentro da mesma experiência e uma arquitetura da informação que já não conseguia mais acompanhar o volume de conteúdos e áreas existentes.',
        p2: 'Em muitos momentos, determinadas páginas pareciam pertencer a produtos diferentes.',
        p3: 'Além disso, o portal precisava atender perfis extremamente distintos entre si: alunos, professores, candidatos, áreas institucionais, cursos técnicos, graduação e diversos outros serviços educacionais funcionando dentro do mesmo ecossistema.',
        p4: 'O desafio do projeto não era apenas redesenhar interface.',
        challengeLabel: 'O Grande Desafio',
        challenge: '"Era reorganizar uma experiência que havia perdido consistência estrutural ao longo do tempo."',
        s1Title: '1. O Mapeamento e Análise de Usabilidade',
        s1p1: 'O processo de levantamento durou cerca de três meses e começou com uma análise completa da arquitetura atual da plataforma. O objetivo dessa etapa não era apenas entender como o portal funcionava hoje, mas principalmente identificar impactos futuros no processo de migração e reconstrução da experiência.',
        s1p2: 'Mapeamos páginas, agrupamentos, hierarquias, relações entre áreas e estruturas de navegação existentes dentro da plataforma. Isso ajudou a entender como determinados conteúdos se relacionavam, quais áreas possuíam dependências mais críticas e onde existiam os maiores pontos de fragmentação da experiência.',
        s1p3: 'Paralelamente, conduzimos análises heurísticas utilizando as 10 heurísticas de usabilidade nas principais áreas do portal.',
        s1p4: 'Mais do que identificar problemas clássicos de UX, essa etapa ajudou a perceber como pequenas inconsistências acumuladas ao longo do tempo afetavam previsibilidade, compreensão e navegação.',
        s1callout: 'Em alguns casos, o problema não era ausência de funcionalidade, mas falta de coerência entre estruturas muito parecidas.',
        s1p5: 'Também realizamos benchmark com portais públicos, privados e outras instituições educacionais.',
        s1p6: 'O objetivo não era reproduzir referências visuais, mas entender padrões estruturais, formas de agrupamento de conteúdo e estratégias de navegação utilizadas em ambientes institucionais complexos.',
        s2Title: '2. O Fator Humano e Card Sorting',
        s2p1: 'Uma das etapas mais importantes do projeto foi a condução das dinâmicas de card sorting.',
        s2p2: 'Participaram alunos, professores, diretoria e outros grupos institucionais envolvidos diretamente com o ecossistema da plataforma. A ideia era entender como diferentes perfis organizavam mentalmente as informações presentes no portal.',
        s2cardTitle: 'Divergência de Modelos Mentais',
        s2cardQuote: '"O que fazia sentido para áreas administrativas nem sempre fazia sentido para alunos. Em alguns momentos, grupos diferentes interpretavam as mesmas categorias de maneiras completamente distintas."',
        s2cardDesc: 'Isso ajudou a perceber que boa parte da fragmentação da experiência vinha justamente da ausência de uma estrutura compartilhada de entendimento entre os diferentes públicos do portal.',
        s2p3: 'A partir dessas dinâmicas, começamos a reorganizar categorias, revisar nomenclaturas, redefinir hierarquias e estruturar uma nova lógica de navegação para a plataforma.',
        s2p4: 'Foi essa etapa que permitiu a construção do novo sitemap do portal.',
        s2p5: 'Com a arquitetura mais consolidada, iniciamos a criação dos wireframes. Os wireframes já foram desenvolvidos em um nível relativamente alto de fidelidade, muito próximos da proposta visual final, justamente para facilitar validações mais realistas durante os testes posteriores.',
        s3Title: '3. Wireframes e Testes de Usabilidade Contextuais',
        s3p1: 'A etapa seguinte foi a condução dos testes de usabilidade, que eu fiquei responsável por estruturar e executar.',
        s3p2: 'Os testes foram realizados tanto no desktop quanto no mobile e funcionavam a partir de missões específicas. Os usuários precisavam localizar informações, navegar entre áreas do portal e concluir determinados fluxos enquanto observávamos tempo de execução, dificuldade, tomada de decisão e interpretação da estrutura.',
        s3p3: 'Quando os usuários não conseguiam concluir determinada tarefa, o processo continuava mesmo assim. A ideia não era apenas medir sucesso ou falha, mas entender comportamento, percepção e expectativa durante a navegação.',
        s3p4: 'Além da execução das tarefas, também coletávamos feedback sobre a organização proposta, clareza da navegação e percepção geral da experiência.',
        s4Title: '4. Personas e Modelagem de Jornadas',
        s4p1: 'Essa etapa foi importante porque o portal precisava atender perfis muito diferentes entre si.',
        s4p2: 'A plataforma não envolvia apenas áreas escolares. Ela também precisava atender estruturas acadêmicas, cursos, graduação, áreas institucionais e diferentes serviços educacionais coexistindo dentro do mesmo ecossistema.',
        s4p3: 'Cada grupo possuía comportamentos e prioridades completamente diferentes.',
        s4p4: 'Com base nessas entrevistas e testes, estruturamos personas e mapas de jornada para representar os diferentes perfis presentes dentro da plataforma.',
        s4p5: 'Os mapas ajudaram a identificar padrões de comportamento, pontos de atrito, dificuldades recorrentes, expectativas de navegação e oportunidades de melhoria dentro da experiência.',
        s4p6: 'Grande parte das decisões tomadas posteriormente no layout final surgiram justamente dessas análises.',
        s4p7: 'O resultado foi uma proposta visual muito mais dinâmica, consistente e alinhada ao contexto educacional da instituição.',
        s4p8: 'Desenvolvemos páginas institucionais, páginas de cursos, componentes dinâmicos, estruturas de cards e novos padrões visuais capazes de manter mais consistência entre diferentes áreas do portal.',
        s5Title: '5. Conclusão: Resultados Estruturais',
        s5p1: 'Mas talvez o principal ganho do projeto não tenha sido apenas visual. Foi estrutural.',
        s5p2: 'Pela primeira vez, o portal começou a funcionar como uma experiência única em vez de múltiplas estruturas independentes coexistindo sem padrão claro.',
        s5p3: 'O processo de validação com o cliente também aconteceu de forma muito positiva. Grande parte das propostas foi aprovada logo nas primeiras apresentações porque boa parte das decisões já havia sido construída e validada anteriormente durante:',
        gridItems: ['Análises Heurísticas', 'Benchmarking', 'Card Sorting', 'Entrevistas com Usuários', 'Testes de Usabilidade', 'Arquitetura da Informação'],
        s5p4: 'As poucas alterações solicitadas estavam mais relacionadas a refinamentos específicos de determinadas páginas do que mudanças estruturais na direção do projeto.',
        s5p5: 'Ao final do processo, conseguimos entregar uma base muito mais consistente para desenvolvimento, com arquitetura reorganizada, fluxos mais claros, padrões visuais definidos, componentes estruturados e uma experiência muito mais previsível para diferentes perfis de usuários.',
        s5quote: 'Mais do que um redesign visual, o projeto acabou funcionando como um processo de reorganização estrutural da experiência digital da instituição.',
    },
    en: {
        back: 'Back to Home',
        tags: ['Case Study', 'Educational DXP', 'Information Architecture'],
        title: 'Restructuring an Institutional Education Platform into a DXP',
        intro1: 'One of the most complex problems to solve in institutional platforms is when the portal stops growing in an organized way and starts simply accumulating structure.',
        intro2: 'I recently participated in the reconstruction of a large educational portal on a DXP platform that had been carrying this kind of scenario for quite some time.',
        p1: 'The platform had stability issues, visual inconsistencies, completely different navigation structures coexisting within the same experience, and an information architecture that could no longer keep up with the volume of content and areas that existed.',
        p2: 'At many points, certain pages seemed to belong to entirely different products.',
        p3: 'In addition, the portal needed to serve extremely distinct user profiles: students, teachers, applicants, institutional departments, technical courses, undergraduate programs, and numerous other educational services operating within the same ecosystem.',
        p4: 'The project challenge was not simply to redesign an interface.',
        challengeLabel: 'The Core Challenge',
        challenge: '"It was about reorganizing an experience that had lost structural consistency over time."',
        s1Title: '1. Mapping and Usability Analysis',
        s1p1: 'The research phase lasted approximately three months and began with a comprehensive analysis of the platform\'s current architecture. The goal of this stage was not merely to understand how the portal worked today, but primarily to identify future impacts on the migration and experience reconstruction process.',
        s1p2: 'We mapped pages, groupings, hierarchies, relationships between areas, and existing navigation structures within the platform. This helped us understand how certain content related to one another, which areas had the most critical dependencies, and where the greatest points of experience fragmentation existed.',
        s1p3: 'In parallel, we conducted heuristic analyses using the 10 usability heuristics across the portal\'s main areas.',
        s1p4: 'More than identifying classic UX problems, this stage helped reveal how small, accumulated inconsistencies over time were affecting predictability, comprehension, and navigation.',
        s1callout: 'In some cases, the problem wasn\'t the absence of functionality, but a lack of coherence between very similar structures.',
        s1p5: 'We also conducted benchmarking with public portals, private platforms, and other educational institutions.',
        s1p6: 'The goal wasn\'t to reproduce visual references, but to understand structural patterns, content grouping approaches, and navigation strategies used in complex institutional environments.',
        s2Title: '2. The Human Factor and Card Sorting',
        s2p1: 'One of the most important stages of the project was the card sorting dynamics.',
        s2p2: 'Students, teachers, administrators, and other institutional groups directly involved with the platform\'s ecosystem participated. The idea was to understand how different profiles mentally organized the information present in the portal.',
        s2cardTitle: 'Divergence of Mental Models',
        s2cardQuote: '"What made sense to administrative departments didn\'t always make sense to students. At certain points, different groups interpreted the same categories in completely different ways."',
        s2cardDesc: 'This revealed that much of the experience fragmentation came precisely from the absence of a shared understanding structure among the portal\'s different audiences.',
        s2p3: 'From these dynamics, we began reorganizing categories, revising nomenclature, redefining hierarchies, and structuring a new navigation logic for the platform.',
        s2p4: 'It was this stage that enabled the construction of the portal\'s new sitemap.',
        s2p5: 'With the architecture more consolidated, we began creating the wireframes. These wireframes were developed at a relatively high fidelity level, very close to the final visual proposal, precisely to facilitate more realistic validations during subsequent testing.',
        s3Title: '3. Wireframes and Contextual Usability Tests',
        s3p1: 'The next stage was conducting usability tests, which I was responsible for structuring and executing.',
        s3p2: 'The tests were conducted on both desktop and mobile, and were based on specific missions. Users needed to locate information, navigate between portal areas, and complete certain flows while we observed execution time, difficulty, decision-making, and interpretation of the structure.',
        s3p3: 'When users couldn\'t complete a certain task, the process continued regardless. The idea wasn\'t simply to measure success or failure, but to understand behavior, perception, and expectations during navigation.',
        s3p4: 'In addition to task execution, we also gathered feedback on the proposed organization, navigation clarity, and overall experience perception.',
        s4Title: '4. Personas and Journey Mapping',
        s4p1: 'This stage was important because the portal needed to serve very different profiles.',
        s4p2: 'The platform wasn\'t limited to school-related areas. It also needed to serve academic structures, courses, undergraduate programs, institutional departments, and different educational services coexisting within the same ecosystem.',
        s4p3: 'Each group had completely different behaviors and priorities.',
        s4p4: 'Based on these interviews and tests, we structured personas and journey maps to represent the different profiles present within the platform.',
        s4p5: 'The maps helped identify behavioral patterns, friction points, recurring difficulties, navigation expectations, and improvement opportunities within the experience.',
        s4p6: 'Many of the decisions made later in the final layout emerged precisely from these analyses.',
        s4p7: 'The result was a much more dynamic, consistent visual proposal aligned with the institution\'s educational context.',
        s4p8: 'We developed institutional pages, course pages, dynamic components, card structures, and new visual patterns capable of maintaining greater consistency across different areas of the portal.',
        s5Title: '5. Conclusion: Structural Outcomes',
        s5p1: 'But perhaps the main gain of the project was not only visual. It was structural.',
        s5p2: 'For the first time, the portal began to function as a unified experience rather than multiple independent structures coexisting without a clear pattern.',
        s5p3: 'The client validation process also went very positively. Most proposals were approved in the first presentations because most decisions had already been built and validated during:',
        gridItems: ['Heuristic Analyses', 'Benchmarking', 'Card Sorting', 'User Interviews', 'Usability Testing', 'Information Architecture'],
        s5p4: 'The few changes requested were more related to specific page refinements rather than structural shifts in the project direction.',
        s5p5: 'At the end of the process, we delivered a much more consistent foundation for development, with reorganized architecture, clearer flows, defined visual patterns, structured components, and a much more predictable experience for different user profiles.',
        s5quote: 'More than a visual redesign, the project ended up functioning as a process of structural reorganization of the institution\'s digital experience.',
    }
};

const ArticleEducation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { language } = useLanguage();
    const c = content[language] || content.pt;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-24 mx-4 md:mx-8 lg:mx-[150px] min-h-screen"
        >
            <div className="max-w-4xl mx-auto">
                
                {/* Botão Voltar */}
                <Link 
                    to="/#artigos" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#38889F] transition-colors mb-8 font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {c.back}
                </Link>

                {/* Cabeçalho do Artigo */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            <BookOpen className="w-4 h-4" />
                            {c.tags[0]}
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            {c.tags[1]}
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            <Layers className="w-4 h-4" />
                            {c.tags[2]}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
                        {c.title}
                    </h1>
                </header>

                {/* Corpo do Artigo */}
                <article className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 space-y-8 leading-[1.9]">  
                    
                    {/* Destaque Inicial / Introdução */}
                    <div className="border-l-4 border-[#38889F] pl-6 py-2 my-8">
                        <p className="text-xl md:text-2xl text-slate-900 dark:text-white font-extrabold leading-snug text-pretty">
                            {c.intro1}
                        </p>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-4 font-medium">
                            {c.intro2}
                        </p>
                    </div>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.p1}</p>
                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.p2}</p>
                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        {c.p3.split('alunos, professores, candidatos, áreas institucionais, cursos técnicos, graduação')[0]}
                        {language === 'pt' && <strong>alunos, professores, candidatos, áreas institucionais, cursos técnicos, graduação</strong>}
                        {language === 'en' && <strong>students, teachers, applicants, institutional departments, technical courses, undergraduate programs</strong>}
                        {c.p3.split(language === 'pt' ? 'graduação' : 'undergraduate programs')[1]}
                    </p>
                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.p4}</p>

                    {/* Destaque principal do desafio */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-center my-8">
                        <span className="text-xs uppercase text-[#38889F] font-bold block mb-1">{c.challengeLabel}</span>
                        <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white m-0">
                            {c.challenge}
                        </p>
                    </div>

                    {/* SEÇÃO 1 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Target className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s1Title}
                            </h2>
                        </div>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s1p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s1p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s1p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s1p4}</p>

                        <div className="bg-amber-500/5 border-l-4 border-amber-500 p-6 rounded-r-2xl my-6 dark:bg-amber-500/10">
                            <p className="text-lg text-slate-800 dark:text-slate-200 font-medium m-0">
                                {c.s1callout.split('falta de coerência')[0]}
                                {language === 'pt' && <strong>falta de coerência</strong>}
                                {language === 'en' && <strong>a lack of coherence</strong>}
                                {c.s1callout.split(language === 'pt' ? 'falta de coerência' : 'a lack of coherence')[1]}
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s1p5}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s1p6}</p>
                    </section>

                    {/* SEÇÃO 2 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Users className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s2Title}
                            </h2>
                        </div>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s2p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s2p2}</p>

                        <div className="bg-[#38889F]/5 border border-[#38889F]/20 rounded-2xl p-6 my-8">
                            <h4 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                                <Users className="w-5 h-5 text-[#38889F]" />
                                {c.s2cardTitle}
                            </h4>
                            <p className="text-lg text-slate-700 dark:text-slate-350 italic m-0">{c.s2cardQuote}</p>
                            <p className="text-base text-slate-650 dark:text-slate-400 mt-4 m-0 font-medium">{c.s2cardDesc}</p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s2p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s2p4}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s2p5}</p>
                    </section>

                    {/* SEÇÃO 3 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Activity className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s3Title}
                            </h2>
                        </div>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p4}</p>
                    </section>

                    {/* SEÇÃO 4 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Landmark className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s4Title}
                            </h2>
                        </div>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p4}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p5}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p6}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p7}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p8}</p>
                    </section>

                    {/* SEÇÃO 5 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Award className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s5Title}
                            </h2>
                        </div>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90 font-semibold text-slate-800 dark:text-slate-200">{c.s5p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p3}</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
                            {c.gridItems.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center flex items-center justify-center">
                                    <span className="font-bold text-slate-800 dark:text-slate-250 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p4}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p5}</p>

                        <div className="bg-[#38889F]/10 dark:bg-[#38889F]/5 border-l-4 border-[#38889F] p-8 rounded-r-2xl my-10">
                            <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-relaxed m-0 italic text-pretty">
                                {c.s5quote}
                            </p>
                        </div>
                    </section>

                </article>
                
            </div>
        </motion.div>
    );
};

export default ArticleEducation;
