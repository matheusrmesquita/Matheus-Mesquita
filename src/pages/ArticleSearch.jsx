import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Compass, Search, HelpCircle, AlertCircle, Cpu, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { articleSearchContent } from '@/data/articleSearchContent';

const ArticleSearch = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { language } = useLanguage();
    const c = articleSearchContent[language] || articleSearchContent.pt;

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
                    {c.back}
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            <BookOpen className="w-4 h-4" />
                            {c.tag1}
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            {c.tag2}
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#38889F] font-semibold text-sm tracking-wide uppercase w-max">
                            <Search className="w-4 h-4" />
                            {c.tag3}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
                        {c.title}
                    </h1>
                </header>

                {/* Article Body */}
                <article className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 space-y-8 leading-[1.9]">
                    
                    {/* Introdução com destaque elegante */}
                    <div className="border-l-4 border-[#38889F] pl-6 py-2 my-8">
                        <p className="text-2xl md:text-3xl text-slate-900 dark:text-white font-extrabold leading-snug text-pretty">
                            {c.introHighlight}
                        </p>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-4 font-medium">
                            {c.introSub}
                        </p>
                    </div>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        <strong>{c.p1}</strong>
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        {c.p2}
                    </p>

                    {/* Destaque visual */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl my-8">
                        <p className="text-lg md:text-xl text-pretty font-medium text-slate-800 dark:text-slate-200 italic m-0">
                            {c.quote1}
                        </p>
                    </div>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        {c.p3}
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        {c.p4}
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        {c.p5}
                    </p>

                    <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                        {c.p6}
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
                                {c.s1title}
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s1p1}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s1p2}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s1p3}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s1p4}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s1p5}
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
                            {c.s1p6}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s1p7}
                        </p>

                        {/* Grid de perguntas para quebrar o texto corrido */}
                        <div className="my-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-[#38889F]" />
                                {c.questionsTitle}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {c.questions.map((item, idx) => (
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
                            {c.s1p8}
                        </p>
                    </section>

                    {/* SEÇÃO 2 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s2title}
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s2p1}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s2p2}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s2p3}
                        </p>

                        {/* Bloco de 3 colunas de limitações */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                            <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                <span className="block text-2xl font-extrabold text-[#38889F] mb-1">{c.col1label}</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.col1sub}</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">{c.col1desc}</p>
                            </div>
                            <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                <span className="block text-2xl font-extrabold text-[#38889F] mb-1">{c.col2label}</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.col2sub}</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">{c.col2desc}</p>
                            </div>
                            <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                <span className="block text-2xl font-extrabold text-[#38889F] mb-1">{c.col3label}</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.col3sub}</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">{c.col3desc}</p>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s2p4}
                        </p>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s2p5}
                        </p>

                        {/* Pivot Point */}
                        <div className="border-y border-slate-200 dark:border-slate-800 py-8 my-8 text-center">
                            <span className="text-xs uppercase tracking-widest text-[#38889F] font-bold block mb-2">{c.pivotLabel}</span>
                            <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white italic max-w-2xl mx-auto leading-normal">
                                {c.pivot}
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">
                            {c.s2p6}
                        </p>
                    </section>

                    {/* SEÇÃO 3 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s3title}
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p4}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p5}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p6}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p7}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p8}</p>

                        {/* Citação em destaque */}
                        <div className="border-l-4 border-[#38889F] bg-slate-50 dark:bg-slate-900/30 p-6 rounded-r-xl my-6">
                            <p className="text-lg font-bold text-slate-900 dark:text-white m-0 italic">
                                {c.quote2}
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p9}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p10}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p11}</p>

                        {/* Card do papel da IA no fluxo de notícias */}
                        <div className="bg-[#38889F]/5 border border-[#38889F]/20 rounded-2xl p-6 my-8">
                            <h4 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 mb-3">
                                <Cpu className="w-5 h-5 text-[#38889F]" />
                                {c.aiCardTitle}
                            </h4>
                            <p className="text-base text-slate-700 dark:text-slate-350 m-0">
                                {c.aiCardDesc}
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-lg font-extrabold text-slate-900 dark:text-white m-0">
                                    {c.aiCardQuote}
                                </p>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s3p12}</p>
                    </section>

                    {/* SEÇÃO 4 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s4title}
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p4}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p5}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p6}</p>

                        {/* Destaque de definição */}
                        <div className="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-[#38889F] p-5 my-6 rounded-r-xl">
                            <span className="text-xs uppercase text-[#38889F] font-bold block mb-1">{c.newProposalLabel}</span>
                            <p className="text-xl font-bold text-slate-900 dark:text-white m-0">
                                {c.newProposal}
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p7}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p8}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p9}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p10}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p11}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p12}</p>

                        {/* Tabela de modularidade de busca */}
                        <div className="my-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 m-0">
                                <thead className="bg-slate-50 dark:bg-slate-900/60">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{c.tableCol1}</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{c.tableCol2}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-950/20 divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                                    {c.tableRows.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.t}</td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-450 font-medium">{row.d}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p13}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s4p14}</p>
                    </section>

                    {/* SEÇÃO 5 */}
                    <section className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-7 h-7 text-[#38889F]" />
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                {c.s5title}
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p1}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p2}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p3}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p4}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p5}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p6}</p>

                        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-center my-6">
                            <p className="text-xl font-extrabold text-[#38889F] m-0">{c.conclusionQuote1}</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white mt-3 mb-0">{c.conclusionQuote2}</p>
                        </div>

                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p7}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p8}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p9}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p10}</p>
                        <p className="text-lg md:text-xl text-pretty font-medium opacity-90">{c.s5p11}</p>

                        {/* Callout Final e Conclusão */}
                        <div className="bg-[#38889F]/10 dark:bg-[#38889F]/5 border-l-4 border-[#38889F] p-8 rounded-r-2xl my-10">
                            <span className="text-xs uppercase tracking-widest text-[#38889F] font-bold block mb-2">{c.finalLabel}</span>
                            <p className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-relaxed m-0 italic text-pretty">
                                {c.finalQuote}
                            </p>
                        </div>
                    </section>

                </article>
                
            </div>
        </motion.div>
    );
};

export default ArticleSearch;

