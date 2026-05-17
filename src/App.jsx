import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Projects from './pages/Projects';
import Articles from './pages/Articles';
import ProjectDetails from './pages/ProjectDetails';
import ArticleSearch from './pages/ArticleSearch';
import ArticleEducation from './pages/ArticleEducation';
import { LanguageProvider } from './context/LanguageContext';
import WhatsAppFloat from './components/ui/WhatsAppFloat';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Wrapper principal para suportar tema dinâmico */}
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
          <Navbar />

          <main className="flex-grow pt-24 pb-12 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/projetos/:id" element={<ProjectDetails />} />
              <Route path="/artigos" element={<Articles />} />
              <Route path="/artigos/busca" element={<ArticleSearch />} />
              <Route path="/artigos/dxp-educacao" element={<ArticleEducation />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppFloat />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
