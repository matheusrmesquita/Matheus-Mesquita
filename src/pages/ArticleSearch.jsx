import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Compass, Search, HelpCircle, AlertCircle, Cpu, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleSearch = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-24 mx-4 md:mx-8 lg:mx-[150px] min-h-screen"
        >
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button */}
                <Link 
                    to="/#artigos" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#38889F] transition-colors mb-8 font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Voltar para a Home
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            <BookOpen className="w-4 h-4" />
                            Estudo de Caso
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            Projeto Real
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            <Search className="w-4 h-4" />
                            Arquitetura de Busca
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
                        Análise estrutural e redesign da experiência de busca em uma plataforma institucional
                    </h1>
                </header>

                {/* Article Body */}
                <article className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 space-y-8 leading-[1.9]">
                    
                    {/* Introdução com destaque elegante */}
                    <div className="border-l-4 border-[#38889F] pl-6 py-2 my-8">
                        <p className="text-2xl md:text-3xl text-slate-900 dark:text-white font-extrabold leading-snug text-pretty">
                            Uma busca raramente falha sozinha.
                        </p>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-4 font-medium">
                            Essa talvez tenha sido a principal percepção que surgiu durante um projeto recente envolvendo a reestruturação da experiência de busca dentro de um grande portal institucional construído em plataforma DXP.
                        </p>
                    </div>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        A proposta inicial parecia relativamente direta: <strong>melhorar a relevância dos resultados exibidos para os usuários</strong>. Em teoria, era um problema de busca. Na prática, rapidamente começou a parecer um problema estrutural muito maior.
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        O primeiro caminho pensado foi quase automático. Categorizar conteúdos, estruturar taxonomias, organizar metadados e, a partir disso, criar filtros dinâmicos e mecanismos de refinamento mais inteligentes. A lógica parecia simples: se o conteúdo estivesse corretamente categorizado, a busca finalmente conseguiria compreender contexto, intenção e relevância.
                    </p>

                    {/* Destaque visual */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl my-8">
                        <p className="text-lg md:text-xl text-pretty font-medium text-slate-800 dark:text-slate-200 italic m-0">
                            "Mas existe uma diferença importante entre organizar informação e entender como um sistema realmente produz significado."
                        </p>
                    </div>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        O portal em questão era extremamente grande. Um ambiente institucional complexo, com múltiplos subsites, diferentes estruturas de conteúdo, padrões inconsistentes de publicação e, principalmente, <strong>diferentes mecanismos de busca coexistindo</strong> dentro da mesma experiência.
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        E isso começou a ficar evidente muito rápido.
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        A busca principal do portal não necessariamente retornava resultados relevantes, recentes ou semanticamente coerentes com aquilo que o usuário procurava.
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        Às vezes, uma busca simples trazia documentos desconectados do contexto pesquisado. Em outros casos, retornava títulos técnicos impossíveis de interpretar fora da lógica interna do sistema. Algumas descrições pareciam fragmentos de metadados vazando diretamente para a interface, como se o usuário estivesse enxergando pedaços da estrutura do portal em vez de conteúdo propriamente dito.
                    </p>

                    {/* Bloco de Citação - Exemplo visual */}
                    <blockquote className="pl-6 border-l-4 border-[#38889F] my-10 italic text-slate-800 dark:text-slate-200 text-xl md:text-2xl font-semibold bg-slate-50 dark:bg-slate-900/30 py-4 pr-4 rounded-r-xl">
                        "Era como pesquisar “tipos de gatos” e receber “tigres” como principal correspondência, acompanhado de documentos chamados algo como “XX-AB-Z17-v2”. Tecnicamente, talvez existisse alguma relação textual. Mas semanticamente, a busca falhava completamente em entender intenção."
                    </blockquote>

                    {/* SEÇÃO 1 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Compass className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                1. A Investigação Arquitetural
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E foi nesse ponto que o projeto começou a deixar de ser apenas sobre busca. A primeira etapa acabou se transformando em uma <strong>investigação arquitetural do portal</strong>.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Utilizamos crawlers externos para mapear estruturas, entender hierarquias e identificar padrões de navegação. Paralelamente, junto ao time de desenvolvimento, começamos a construir extrações específicas para separar conteúdos, identificar documentos, mapear links externos e estruturar uma visão mais ampla da plataforma.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Inicialmente, o resultado parecia razoável. O mapeamento apontava cerca de quatro mil páginas distribuídas dentro do ecossistema do portal. <strong>Mas o número estava errado.</strong>
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Conversando com a equipe responsável, surgiu uma percepção importante: boa parte do conteúdo não existia exatamente como “página” dentro da lógica que o crawler conseguia interpretar.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Na plataforma DXP, determinados conteúdos web funcionam quase como entidades independentes. Uma seção de notícias, por exemplo, podia conter milhares de conteúdos publicados sem necessariamente expandir a estrutura tradicional de páginas visíveis para o crawler.
                        </p>

                        {/* Callout box para o "Portal Invisível" */}
                        <div className="bg-amber-500/5 border-l-4 border-amber-500 p-6 rounded-r-2xl my-8 dark:bg-amber-500/10">
                            <div className="flex items-center gap-3 mb-2">
                                <AlertCircle className="w-6 h-6 text-amber-500" />
                                <span className="font-bold text-amber-800 dark:text-amber-400 text-lg">Descoberta Crítica</span>
                            </div>
                            <p className="text-lg text-slate-800 dark:text-slate-200 font-medium m-0">
                                Na prática, havia uma grande camada de <strong>"conteúdos invisíveis"</strong> ao crawler dentro do portal.
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E talvez esse tenha sido um dos momentos mais importantes do projeto. Porque ali começou a ficar claro que a busca não estava falhando apenas por ausência de categorização. Ela falhava porque a própria estrutura de informação possuía múltiplas camadas que nem sempre conversavam entre si.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            A partir disso, comecei a trabalhar diretamente com extrações internas junto ao time de desenvolvimento. O objetivo deixou de ser apenas mapear páginas e passou a ser entender a natureza dos conteúdos existentes.
                        </p>

                        {/* Grid de perguntas para quebrar o texto corrido */}
                        <div className="my-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-[#38889F]" />
                                Perguntas Fundamentais da Investigação
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { q: "Quais tipos de conteúdo existiam?", desc: "Identificação da natureza informacional real do ecossistema." },
                                    { q: "Como eram estruturados?", desc: "Análise dos schemas e formas de preenchimento adotados." },
                                    { q: "Quais possuíam categorização?", desc: "Inventário de tags e metadados herdados do passado." },
                                    { q: "Quais eram indexados?", desc: "Mapeamento dos robôs e escopo de visibilidade da busca." },
                                    { q: "Quais mecanismos de busca conseguiam interpretá-los corretamente?", desc: "Auditoria de crawlers e ferramentas de indexação nativas." },
                                    { q: "E, principalmente, por que algumas buscas específicas funcionavam surpreendentemente bem mesmo sem uma estrutura aparentemente organizada?", desc: "Identificação de padrões informais de sucesso que já funcionavam." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                                        <span className="font-bold text-slate-950 dark:text-slate-100 text-lg leading-snug">
                                            {item.q}
                                        </span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                                            {item.desc}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Foi aí que a investigação começou a mudar de direção.
                        </p>
                    </section>

                    {/* SEÇÃO 2 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                2. A Contradição e a Ilusão da Categorização em Massa
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Em algum momento do processo, comecei a perceber uma contradição importante. Alguns conteúdos retornavam resultados extremamente assertivos mesmo sem qualquer categorização estruturada.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E isso mudava completamente a hipótese inicial do projeto. Porque até então, a ideia parecia relativamente lógica: categorizar os conteúdos do portal, estruturar taxonomias mais organizadas e permitir que o mecanismo de busca utilizasse essas relações para melhorar relevância.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Mas a realidade do portal não sustentava essa abordagem de forma viável. O volume estimado ultrapassava facilmente centenas de milhares de conteúdos. E mais do que isso: boa parte deles já existia há anos dentro de fluxos diferentes de publicação, padrões distintos de preenchimento e níveis variados de qualidade estrutural.
                        </p>

                        {/* Bloco de 3 colunas de limitações */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                            <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                <span className="block text-2xl font-extrabold text-[#38889F] mb-1">Manual</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Impraticável</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Categorizar centenas de milhares de conteúdos legados manualmente consumiria anos de esforço de equipe.</p>
                            </div>
                            <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                <span className="block text-2xl font-extrabold text-[#38889F] mb-1">IA Geral</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Falta de Confiança</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Classificar retrospectivamente com IA gera inconsistências difíceis de validar em larga escala.</p>
                            </div>
                            <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                <span className="block text-2xl font-extrabold text-[#38889F] mb-1">Conceito</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Organizar vs Confiar</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Existe uma diferença fundamental entre conseguir classificar conteúdo e confiar estruturalmente no resultado.</p>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Mesmo utilizando modelos capazes de categorizar semanticamente os materiais, ainda existiria uma camada difícil de validar em larga escala. Amostragens poderiam indicar bons resultados, mas não necessariamente garantiriam consistência dentro de um ecossistema tão heterogêneo.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E foi aí que o projeto começou a mudar de direção mais uma vez.
                        </p>

                        {/* Pivot Point */}
                        <div className="border-y border-slate-200 dark:border-slate-800 py-8 my-8 text-center">
                            <span className="text-xs uppercase tracking-widest text-[#38889F] font-bold block mb-2">O Ponto de Virada</span>
                            <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white italic max-w-2xl mx-auto leading-normal">
                                A pergunta deixou de ser: "como categorizar tudo?" e passou a ser: "como produzir relevância dentro de um ambiente estruturalmente inconsistente?"
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Essa mudança foi importante porque ela alterava completamente a estratégia. Em vez de tentar reorganizar integralmente o portal, comecei a trabalhar em intervenções mais específicas e menos idealizadas.
                        </p>
                    </section>

                    {/* SEÇÃO 3 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                3. Intervenções Estratégicas e o Papel da IA
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            A primeira delas envolvia as próprias categorias existentes. Muitos conteúdos possuíam vocabulários técnicos redundantes, nomenclaturas internas ou classificações que faziam sentido apenas para a estrutura administrativa do portal, mas não para quem utilizava a busca.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Na prática, parte da experiência de busca expunha a lógica interna do sistema em vez de traduzir significado para o usuário. <strong>Então a proposta deixou de ser “criar mais categorias” e passou a ser “reduzir ruído estrutural”.</strong>
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Filtrar categorias técnicas, remover redundâncias e identificar quais classificações realmente poderiam contribuir para relevância contextual dentro da busca.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Ao mesmo tempo, surgiu outra frente importante da investigação: entender os próprios componentes que estruturavam o portal. Além da busca, o projeto também previa um levantamento técnico de portlets, ADTs e endpoints utilizados ao longo da plataforma. Isso exigiu um mergulho ainda mais profundo na arquitetura da plataforma DXP.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Mas o ponto mais interessante foi perceber que, diferente dos conteúdos web, muitos desses componentes não possuíam uma estrutura semântica consistente que pudesse ser aproveitada diretamente pelo mecanismo de busca. E talvez isso não fosse exatamente um problema.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Em vez de tentar forçar categorização sobre elementos extremamente heterogêneos, comecei a entender que parte da arquitetura precisava continuar flexível. Nem todo portlet representava o mesmo tipo de informação, nem todo asset carregava o mesmo contexto e nem toda estrutura precisava ser tratada da mesma forma.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Nesse momento, a busca começou a deixar de parecer um mecanismo único. Ela passou a parecer um ecossistema de comportamentos diferentes convivendo dentro do mesmo portal. E isso exigia uma abordagem menos universal e mais contextual.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            O processo inteiro levou algumas semanas entre mapeamentos, extrações internas, análises estruturais e levantamento de fluxos de publicação. Mais do que entender páginas, o objetivo passou a ser compreender como o conteúdo nascia, quem controlava determinadas estruturas, quais perfis administravam áreas específicas e como tudo isso impactava diretamente a encontrabilidade das informações.
                        </p>

                        {/* Citação em destaque */}
                        <div className="border-l-4 border-[#38889F] bg-slate-50 dark:bg-slate-900/30 p-6 rounded-r-xl my-6">
                            <p className="text-lg font-bold text-slate-900 dark:text-white m-0 italic">
                                "Porque, no fim, busca não é apenas indexação. Busca é consequência da forma como uma organização produz, estrutura e distribui informação."
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E foi justamente nesse ponto que a camada de UX começou a se conectar com governança. Em vez de tentar categorizar retrospectivamente todo o ecossistema existente, a estratégia passou a focar principalmente nos novos fluxos de publicação.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Especialmente no caso das notícias. Ali existia algo importante: um processo relativamente controlado, previsível e com possibilidade real de obrigatoriedade estrutural.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Um projeto paralelo já previa um novo fluxo editorial com categorização obrigatória para conteúdos jornalísticos. Então, em vez de reconstruir o passado inteiro do portal, a proposta começou a olhar para o futuro da publicação. A ideia não era alcançar perfeição estrutural imediata. Era começar a produzir consistência daqui para frente.
                        </p>

                        {/* Card do papel da IA no fluxo de notícias */}
                        <div className="bg-[#38889F]/5 border border-[#38889F]/20 rounded-2xl p-6 my-8">
                            <h4 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                                <Cpu className="w-5 h-5 text-[#38889F]" />
                                IA Focada no Fluxo de Notícias
                            </h4>
                            <p className="text-base text-slate-700 dark:text-slate-350 m-0">
                                Enquanto categorizar o portal inteiro retroativamente era inviável, o fluxo de notícias apresentava recorrência temática e padrão editorial ideais para IA. A proposta usou modelos de categorização semântica automatizada no nascimento do conteúdo, permitindo validações muito mais confiáveis.
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-lg font-extrabold text-slate-900 dark:text-white m-0">
                                    "O problema raramente está no modelo. O problema normalmente está no ambiente onde ele precisa operar."
                                </p>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E talvez essa tenha sido uma das percepções mais importantes do projeto inteiro: em ambientes muito grandes, às vezes melhorar busca não significa reorganizar tudo. Significa criar condições para que o sistema pare de se degradar.
                        </p>
                    </section>

                    {/* SEÇÃO 4 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                4. Os Requisitos e a Modulabilidade Contextual
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Depois do levantamento arquitetural, da análise estrutural dos conteúdos e do entendimento dos fluxos internos do portal, o projeto entrou em uma terceira camada: transformar observação em regra. Foi nesse momento que comecei a estruturar efetivamente os requisitos da nova experiência de busca.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Mas a essa altura, a ideia inicial já tinha mudado completamente. O objetivo já não era construir “uma busca perfeita”. Era construir uma busca coerente com a realidade estrutural do portal. E isso mudou a forma como os requisitos foram pensados.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            A primeira proposta foi trabalhar uma busca faseada. Uma busca geral capaz de atravessar diferentes tipos de conteúdo, mas acompanhada de mecanismos de refinamento contextual. Filtros por período, ordenações por relevância e data, buscas textuais mais precisas e estruturas capazes de aproximar intenção do usuário do conteúdo realmente esperado.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Porque um dos problemas mais perceptíveis da experiência atual era que o sistema parecia devolver informação sem interpretar contexto. Resultados tecnicamente relacionados apareciam como relevantes mesmo quando semanticamente eram completamente desconectados daquilo que a pessoa procurava.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E isso criava um efeito estranho: o portal parecia conhecer os próprios dados, mas não parecia compreender linguagem humana. Parte importante da proposta envolvia justamente limpar esse ruído estrutural.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Metadados excessivamente técnicos, siglas internas, nomenclaturas administrativas e títulos pouco interpretáveis acabavam vazando diretamente para a experiência de busca. Em muitos momentos, o usuário não enxergava conteúdo. Enxergava fragmentos da arquitetura interna do sistema.
                        </p>

                        {/* Destaque de definição */}
                        <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-[#38889F] p-5 my-6 rounded-r-xl">
                            <span className="text-xs uppercase text-[#38889F] font-bold block mb-1">A Nova Proposta</span>
                            <p className="text-xl font-bold text-slate-900 dark:text-white m-0">
                                Então o trabalho deixou de ser apenas melhorar indexação. Passou a ser melhorar tradução: <span className="text-[#38889F]">Traduzir estrutura técnica em encontrabilidade.</span>
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Na busca geral, isso significava reorganizar relevância textual, permitir ordenações mais previsíveis e trabalhar mecanismos capazes de aproximar resultados semanticamente úteis daquilo que o usuário realmente esperava encontrar.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Mas o comportamento da busca também variava dependendo do tipo de conteúdo. E talvez essa tenha sido outra percepção importante do projeto: não fazia sentido tratar todos os conteúdos do portal da mesma forma.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            As notícias, por exemplo, possuíam uma estrutura relativamente mais controlada. Existia contexto temporal, temas recorrentes, possibilidades reais de categorização e um fluxo editorial mais previsível. Ali, fazia sentido trabalhar filtros por tema, período, metadados e categorização obrigatória.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Já em outros contextos, especialmente documentos, a lógica precisava ser diferente. E foi curioso perceber que algumas soluções já existiam dentro do próprio portal. Determinadas páginas possuíam mecanismos de busca muito mais eficientes do que a busca principal.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Em vez de reconstruir esses comportamentos do zero, parte da estratégia passou a reutilizar padrões que já demonstravam bons resultados em contextos específicos. Isso alterou bastante a direção do projeto.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Porque, ao invés de criar um mecanismo universal, comecei a trabalhar a ideia de <strong>modularidade contextual</strong>. Cada tipo de conteúdo exigia uma lógica diferente de encontrabilidade.
                        </p>

                        {/* Tabela de modularidade de busca */}
                        <div className="my-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 m-0">
                                <thead className="bg-slate-50 dark:bg-slate-900/60">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tipo de Conteúdo</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prioridade Estrutural</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-950/20 divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Documentos</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-450 font-medium">Acesso rápido, leitura clara dos resultados e ações diretas como download imediato.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Notícias</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-450 font-medium">Contextualização temporalidade, classificação editorial e filtragem temática.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Geral</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-450 font-medium">Relações dinâmicas entre busca de texto livre, metadados limpos e navegação de suporte.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            No fim, a solução começou a deixar de parecer “uma busca”. Ela passou a parecer uma camada de interpretação entre usuário e estrutura institucional.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E talvez essa tenha sido a principal mudança de percepção ao longo do projeto inteiro. Porque inicialmente eu acreditava que o problema estava na ausência de categorização. Mas aos poucos começou a ficar claro que o verdadeiro problema era outro: <strong>o portal possuía informação demais, estrutura demais e contexto de menos.</strong>
                        </p>
                    </section>

                    {/* SEÇÃO 5 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                5. Conclusão: Encontrabilidade e Governança
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            A etapa final do projeto foi justamente transformar toda essa investigação em uma proposta coerente entre arquitetura, experiência e viabilidade técnica. Nesse ponto, os documentos já começavam a conversar entre si.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            O levantamento estrutural da plataforma DXP deixava de ser apenas um inventário técnico e passava a sustentar decisões reais de encontrabilidade. A arquitetura da informação começava a refletir limitações concretas do ecossistema. E os requisitos deixavam de ser apenas funcionalidades isoladas para se tornarem mecanismos de mediação entre usuário, conteúdo e estrutura institucional.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Talvez essa tenha sido uma das partes mais importantes do processo inteiro: fazer com que as soluções não existissem separadamente. A busca precisava conversar com os fluxos editoriais. Os fluxos editoriais precisavam conversar com governança. E a governança precisava conversar com a realidade operacional do portal.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            No documento de requisitos, isso acabou se traduzindo em diferentes camadas de interpretação da busca. Busca textual, busca por metadados, refinamentos contextuais, filtros temporais, ordenações e mecanismos de aproximação semântica começaram a ser tratados como comportamentos diferentes dentro da mesma experiência.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            E uma discussão interessante surgiu justamente nesse ponto. Inicialmente, existia a ideia de trabalhar aproximação contextual entre termos pesquisados e conteúdos semanticamente relacionados. Mas, ao longo das conversas técnicas, ficou cada vez mais claro que talvez o primeiro passo não fosse “interpretar intenção complexa”.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Talvez o primeiro passo fosse algo mais simples: garantir que o sistema conseguisse devolver, com precisão, aquilo que explicitamente existia dentro do conteúdo. Pode parecer uma decisão pequena, mas em ambientes informacionais muito grandes isso muda completamente a estratégia.
                        </p>

                        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-center my-6">
                            <p className="text-xl font-extrabold text-[#38889F] m-0">
                                "Porque antes de tentar prever contexto, o sistema precisa conseguir recuperar relevância."
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white mt-3 mb-0">
                                Uma busca institucional não necessariamente precisa parecer inteligente. Ela precisa parecer confiável.
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            A partir disso, os filtros deixaram de ser tratados como solução principal e passaram a funcionar como reforço contextual da busca textual. Não era mais sobre obrigar o usuário a navegar por dezenas de classificações internas. Era sobre permitir que a busca textual funcionasse de forma suficientemente precisa para que os refinamentos atuassem apenas como apoio.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            No fim, a ideia nunca foi transformar o portal em um mecanismo semântico perfeito. A ideia era reduzir atrito entre intenção e informação.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            A última camada do projeto acabou sendo a materialização visual dessa estrutura. Os layouts da nova experiência de busca foram desenhados pensando menos em interface isolada e mais em interpretação de conteúdo. Resultados passaram a assumir comportamentos diferentes dependendo do tipo de informação retornada. Documentos priorizavam ações rápidas, como download. Notícias contextualizavam temporalidade e tema. Outros conteúdos passaram a respeitar melhor sua própria natureza informacional.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            Até mesmo a entrega do catálogo técnico seguiu essa lógica. Em vez de consolidar tudo em PDFs estáticos e fragmentados, a documentação foi estruturada em uma experiência navegável em HTML, permitindo visualizar fluxos, componentes, imagens e relações estruturais de forma mais dinâmica. Porque, no fundo, o próprio projeto já começava a questionar estruturas rígidas demais.
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            O projeto ainda não foi implementado. E talvez isso torne toda a discussão ainda mais interessante. Porque este não é exatamente um texto sobre resultado final. É um texto sobre percepção estrutural. Sobre o momento em que um problema aparentemente simples de busca começa a revelar questões muito maiores sobre arquitetura da informação, governança de conteúdo, encontrabilidade e organização institucional.
                        </p>

                        {/* Callout Final e Conclusão */}
                        <div className="bg-[#38889F]/10 dark:bg-[#38889F]/5 border-l-4 border-[#38889F] p-8 rounded-r-2xl my-10">
                            <span className="text-xs uppercase tracking-widest text-[#38889F] font-bold block mb-2">Conclusão de Impacto</span>
                            <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-relaxed m-0 italic text-pretty">
                                "No início, eu acreditava que o desafio seria categorizar melhor os conteúdos. No final, comecei a perceber que a busca raramente falha sozinha. Ela normalmente apenas expõe aquilo que a arquitetura inteira já não consegue mais esconder."
                            </p>
                        </div>
                    </section>

                </article>
                
            </div>
        </motion.div>
    );
};

export default ArticleSearch;
