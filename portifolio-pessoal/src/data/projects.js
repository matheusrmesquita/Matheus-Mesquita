import maxCard from '../assets/Max - card.png';
import maxGif1 from '../assets/Max 1.gif';
import maxImg from '../assets/MAX Total 2.png';
import athexCard from '../assets/Athex - card.png';
import athex2 from '../assets/Athex (2).png';
import athex3 from '../assets/Athex 3.png';
import athex1 from '../assets/Athex 1.png';
import cocaCard from '../assets/Coca - card.png';
import cocaImg from '../assets/cocacola.png';
import comVesaliCard from '../assets/Comunidade vesali- card.png';
import comVesaliGif1 from '../assets/comunidade vesali 1.gif';
import comVesaliGif2 from '../assets/comunidade vesali 2.gif';
import comVesaliImg3 from '../assets/3.png';
import vesaliCard from '../assets/Ladingpages Vesali - card.png';
import metaconCard from '../assets/Metacon - card.png';
import metaconImg from '../assets/MEtacom total.png';
import sevCanCard from '../assets/servico candando - card.png';
import sistemaCard from '../assets/Sitemas de gestao - card.gif';
import flowPortalImg from '../assets/FlowPortal.png';

// Imports Serviço Candango
import sevCan1 from '../assets/Sev can1.webp';
import sevCan2 from '../assets/Sev can2.webp';
import sevCan3 from '../assets/Sev can3.webp';
import sevCan4 from '../assets/Sev can4.webp';
import sevCan5 from '../assets/Sev can5.webp';
import sevCan6 from '../assets/Sev can6.webp';
import sevCan7 from '../assets/Sev can 7.webp';
import sevCan8 from '../assets/Sev can8.webp';
import sevCan9 from '../assets/Sev can9.webp';
import sevCan10 from '../assets/Sev can10.webp';
import sevCan11 from '../assets/Sev can11.webp';
import sevCan12 from '../assets/Sev can12.webp';
import sevCan13 from '../assets/Sev can13.webp';
import sevCan14 from '../assets/Sev can14.webp';
import sevCan15 from '../assets/Sev can15.webp';
import sevCan16 from '../assets/Sev can516.webp';

export const projects = [
    {
        id: 5,
        title: "Sistema de Gestão e Processos Digitais",
        title_en: "Digital Management and Process System",
        role: "Engenheiro de Design / UX Strategy",
        role_en: "Design Engineer / UX Strategy",
        context: "Projeto real desenvolvido sob contrato, com dados sensíveis modificados para preservação de confidencialidade. O sistema é uma plataforma de gestão documental 100% digital que substitui fluxos analógicos por uma interface moderna e segura. O grande diferencial foi a agilidade: a proposta completa — incluindo página inicial com micro-interações funcionais, acessibilidade padrão e versão mobile — foi entregue em menos de 24 horas, apresentando um redesign disruptivo frente à solução atual.",
        context_en: "Real project developed under contract, with sensitive data modified for confidentiality. The system is a 100% digital document management platform replacing analog workflows with a modern, secure interface. The highlight was agility: the complete proposal — including homepage with functional micro-interactions, standard accessibility, and mobile version — was delivered in less than 24 hours, presenting a disruptive redesign compared to the current solution.",
        process: "O layout foca em Visibilidade do Status (H1) e Consistência (H4) através de um Design System proprietário. A entrega expressa exigiu priorização estratégica, garantindo que as interações funcionais e a responsividade mobile estivessem prontas para validação imediata do cliente.",
        process_en: "The layout focuses on System Status Visibility (H1) and Consistency (H4) through a proprietary Design System. The express delivery required strategic prioritization, ensuring functional interactions and mobile responsiveness were ready for immediate client validation.",
        technique: "Arquitetura baseada em React 18 e Vite com Bootstrap 5 customizado. Foco em performance ultra-rápida (HMR instantâneo) e acessibilidade nativa (modo alto contraste e fontes dinâmicas).",
        technique_en: "Architecture based on React 18 and Vite with customized Bootstrap 5. Focus on ultra-fast performance (instant HMR) and native accessibility (high contrast mode and dynamic fonts).",
        tags: ["2025", "Projeto Real", "Entrega 24h", "UX Design", "React 18", "Mobile First"],
        image: sistemaCard,
        gallery: [flowPortalImg]
    },
    {
        id: 6,
        title: "Athex",
        title_en: "Athex",
        role: "Web Design",
        role_en: "Web Design",
        context: "Projeto centralizado no braço de construção civil voltado especificamente para embaixadas.",
        context_en: "Project centered on the civil construction branch specifically focused on embassies.",
        aesthetics: "A estética exigida precisava transmitir solidez de concreto armado e diplomacia. Adotamos cores sóbrias, blocos visuais assentados com amplo respiro (whitespace/Gestalt) para criar uma imagem institucional profunda, confiável e imponente perante entes governamentais.",
        aesthetics_en: "The required aesthetics needed to convey reinforced concrete solidity and diplomacy. We adopted sober colors and visual blocks with ample whitespace (Gestalt) to create a deep, reliable, and imposing institutional image for government entities.",
        tags: ["2024", "UI Setor Corporativo", "Identidade Visual", "Figma", "Tipografia Premium"],
        image: athexCard,
        gallery: [athex1, athex2, athex3],
    },
    {
        id: 2,
        title: "Metacon",
        title_en: "Metacon",
        role: "Site institucional",
        role_en: "Institutional Website",
        context: "Este projeto foi desenvolvido com base nas melhores práticas de UX/UI, integrando as referências fornecidas pelo cliente e novas inspirações alinhadas aos objetivos do projeto. Realizamos um aprofundado estudo de benchmarking e análise de mercado para construir um sitemap e wireframe robustos.",
        context_en: "This project was developed based on UX/UI best practices, integrating client references and new inspirations aligned with project goals. We conducted deep benchmarking and market analysis to build a robust sitemap and wireframe.",
        process: "Para a validação, criamos um protótipo de alta fidelidade no Figma. Na etapa de UI, aplicamos os princípios da Gestalt e as heurísticas de Nielsen.",
        process_en: "For validation, we created a high-fidelity prototype in Figma. In the UI stage, we applied Gestalt principles and Nielsen heuristics.",
        technique: "Utilizamos o framework Bootstrap como base para o desenvolvimento, garantindo uma experiência de usuário consistente e eficiente. Desenvolvemos versões responsivas com Mobile-First, assegurando adaptação perfeita a telas variadas sem quebras visuais.",
        technique_en: "We used the Bootstrap framework as a base for development, ensuring a consistent and efficient user experience. We developed responsive versions with Mobile-First, ensuring perfect adaptation to varied screens without visual breaks.",
        tags: ["2024", "UX/UI Research", "Figma", "Bootstrap", "Gestalt", "Heurísticas de Nielsen"],
        image: metaconCard,
        gallery: [metaconImg]
    },
    {
        id: 3,
        title: "Max",
        title_en: "Max",
        role: "Framer Developer / UI Design",
        role_en: "Framer Developer / UI Design",
        context: "Avaliar e identificar as falhas da landing page atual da plataforma de streaming Max, propondo um redesenho mais eficaz e centrado na experiência do usuário.",
        context_en: "Evaluate and identify flaws in the current streaming platform Max's landing page, proposing a more effective and user-centered redesign.",
        process: "Os pontos considerados foram os princípios da Gestalt, as Heurísticas de Nielsen e os viéses cognitivos que não estavam sendo trabalhados na conversão da página original.",
        process_en: "Points considered were Gestalt principles, Nielsen Heuristics, and cognitive biases that were not being addressed in the original page conversion.",
        technique: "Após a reformulação estratégica do design, o novo layout – enriquecido com micro-interações focadas em retenção – foi desenvolvido e prototipado diretamente na plataforma Framer.",
        technique_en: "After strategic design reformulation, the new layout – enriched with retention-focused micro-interactions – was developed and prototyped directly on the Framer platform.",
        tags: ["Estudo de Caso", "2024", "Framer", "Prototipação", "UI Design", "Análise de Viés Cognitivo"],
        image: maxCard,
        gallery: [maxGif1, maxImg]
    },
    {
        id: 4,
        title: "Comunidade Vesali",
        title_en: "Vesali Community",
        role: "Framer Developer / UI design",
        role_en: "Framer Developer / UI Design",
        context: "O primeiro objetivo deste projeto foi desenvolver uma landing page com abordagem institucional para apresentar a Comunidade Vesali de forma clara e estratégica. A página foi estruturada para destacar os principais desafios enfrentados pelo público-alvo, demonstrar como a comunidade pode solucionar essas dores e evidenciar seus benefícios e mentores. Além disso, a experiência do usuário foi projetada para conduzi-lo de maneira intuitiva até a ação principal: ingressar no grupo exclusivo do WhatsApp.",
        context_en: "The first goal was to develop an institutional landing page to present the Vesali Community clearly and strategically. The page highlights audience challenges, demonstrates how the community solve these pain points, and showcases benefits and mentors.",
        highlight: "Desenvolver uma ferramenta baseada em um formulário para diagnosticar o nível de conhecimento do usuário nas principais áreas em que a comunidade oferece suporte. Os dados do diagnóstico são definidos com base nas informações fornecidas pelos mentores. Ao preencher todas as respostas, o usuário recebe um diagnóstico gerado em tempo real, exibido por meio de barras e um gráfico interativo. Isso proporciona maior segurança e autoridade no assunto, permitindo que o usuário compreenda melhor seus pontos fortes e áreas de melhoria.",
        highlight_en: "Develop a form-based tool to diagnose user knowledge in areas supported by the community. Diagnostic data is defined by mentors. Upon completion, the user receives a real-time diagnosis through interactive bars and charts.",
        tags: ["2024", "Framer Motion", "React", "Gráficos Interativos", "UI/UX"],
        image: comVesaliCard,
        gallery: [comVesaliGif1, comVesaliGif2, comVesaliImg3]
    },
    {
        id: 1,
        title: "Landing Pages Vesali",
        title_en: "Vesali Landing Pages",
        role: "Entregas de alta demanda para educação médica.",
        role_en: "High-demand delivery for medical education.",
        context: "Em meados de 2024, atuei como Web Designer principal na startup Vesali, sendo responsável pela criação de layouts estratégicos de landing pages voltadas ao nicho de cursos médicos.",
        context_en: "In mid-2024, I served as Lead Web Designer at the startup Vesali, responsible for creating strategic landing page layouts for the medical courses niche.",
        process: "O foco foi a otimização de conversão (CRO), utilizando testes A/B, Google Analytics e ferramentas de mapa de calor. O processo envolvia desde reuniões de briefing e sessões de brainstorming até a prototipação de alta fidelidade no Figma. Além do design, colaborei com a equipe de tráfego pago na criação de criativos de alta performance para maximizar a captação de leads.",
        process_en: "Focus was on Conversion Rate Optimization (CRO), using A/B testing, Google Analytics, and heatmap tools. The process ranged from briefing meetings and brainstorming sessions to high-fidelity prototyping in Figma. In addition to design, I collaborated with the paid traffic team to create high-performance creatives to maximize lead capture.",
        technique: "Neste case, apresento algumas landing pages desenvolvidas nesse período, exibindo apenas o que tenho autorização para mostrar.",
        technique_en: "In this case, I present some landing pages developed during this period, displaying only what I have authorization to show.",
        tags: ["2024", "CRO", "Testes A/B", "Google Analytics", "Hotjar", "Figma"],
        image: vesaliCard,
        gallery: [vesaliCard]
    },
    {
        id: 7,
        title: "Serviço Candango",
        title_en: "Serviço Candango",
        role: "UX Design / Research",
        role_en: "UX Design / Research",
        context: "Projeto detalhado de UX focado em pesquisa, arquitetura de informação e fluxos de usuário iterativos.",
        context_en: "Detailed UX project focused on research, information architecture, and iterative user flows.",
        tags: ["Estudo de Caso", "2023", "UX Research", "Behance", "Figma"],
        image: sevCanCard,
        gallery: [
            sevCan1, sevCan2, sevCan3, sevCan4, sevCan5,
            sevCan6, sevCan7, sevCan8, sevCan9, sevCan10,
            sevCan11, sevCan12, sevCan13, sevCan14, sevCan15, sevCan16
        ]
    },
    {
        id: 10,
        title: "Coca-Cola",
        title_en: "Coca-Cola",
        role: "Prototipagem de Interação",
        role_en: "Interaction Prototyping",
        context: "O intuito do projeto foi testar minhas habilidades de prototipagem e o modo de 'rolling effect' dentro da ferramenta Figma. O design foi criado com base em um vídeo de referência do LinkedIn. Tive a oportunidade de acessar o projeto e decompor as camadas para entender como funciona esse tipo de prototipagem. Após compreender as camadas e o funcionamento dos comandos, criei meu próprio design com os refrigerantes mais famosos do Brasil: Coca-Cola, Fanta e Sprite.",
        context_en: "The goal of the project was to test my prototyping skills and the 'rolling effect' mode within Figma. The design was based on a reference video from LinkedIn.",
        tags: ["Estudo de Caso", "2023", "Figma", "Protótipo", "High Fidelity", "Rolling Effect"],
        image: cocaCard,
        figmaLink: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1bEU7Ns7IbxpO8cKBIXGGw%3Fcontent-scaling%3Dfixed%26kind%3Dproto%26node-id%3D1515-15435%26page-id%3D1022%3A2%26scaling%3Dscale-down",
        gallery: []
    }
];
