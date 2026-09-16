import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router não reseta o scroll ao trocar de rota (SPA). Sem isso, navegar pra uma página
// nova a partir de um ponto rolado da anterior faz ela abrir já no meio/fim — pulando o topo
// e fazendo qualquer animação de entrada (whileInView) parecer que "não disparou", porque a
// seção já estava dentro da viewport desde o primeiro frame.
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Links tipo to="/#artigos" (voltar de um artigo pra Home) precisam rolar até a
        // âncora, não pro topo — mas a seção só existe depois que a página de destino
        // termina de montar, daí o pequeno atraso antes de procurar o elemento.
        if (hash) {
            const id = hash.replace('#', '');
            const timeout = window.setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
            }, 50);
            return () => window.clearTimeout(timeout);
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
