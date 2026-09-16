import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import { LanguageProvider } from './context/LanguageContext';
import WhatsAppFloat from './components/ui/WhatsAppFloat';

// Code-splitting: só a Home (rota inicial) entra no bundle principal. As demais páginas
// viram chunks separados, carregados sob demanda ao navegar — reduz o JS inicial sem
// tirar nenhuma animação (o Suspense só troca o que aparece antes do chunk chegar).
const Sobre = lazy(() => import('./pages/Sobre'));
const Contato = lazy(() => import('./pages/Contato'));
const Projects = lazy(() => import('./pages/Projects'));
const Articles = lazy(() => import('./pages/Articles'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const ArticleSearch = lazy(() => import('./pages/ArticleSearch'));
const ArticleEducation = lazy(() => import('./pages/ArticleEducation'));
const ArticleCongresso = lazy(() => import('./pages/ArticleCongresso'));

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* Wrapper principal para suportar tema dinâmico */}
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
          <Navbar />

          <main className="flex-grow flex flex-col pt-20 md:pt-24 w-full">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/projetos" element={<Projects />} />
                <Route path="/projetos/:id" element={<ProjectDetails />} />
                <Route path="/artigos" element={<Articles />} />
                <Route path="/artigos/busca" element={<ArticleSearch />} />
                <Route path="/artigos/dxp-educacao" element={<ArticleEducation />} />
                <Route path="/artigos/congresso" element={<ArticleCongresso />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <WhatsAppFloat />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
