import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Sobre from '@/pages/Sobre';
import Contato from '@/pages/Contato';
import Projects from '@/pages/Projects';
import Articles from '@/pages/Articles';
import ProjectDetails from '@/pages/ProjectDetails';
import ArticleTemplate from '@/pages/ArticleTemplate';
import Login from '@/pages/Login';
import AdminLayout from '@/pages/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import ArticlesList from '@/pages/admin/ArticlesList';
import ArticleEditor from '@/pages/admin/ArticleEditor';
import ProjectsList from '@/pages/admin/ProjectsList';
import ProjectForm from '@/pages/admin/ProjectForm';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';

const AdminRoute = ({ children }) => (
    <ProtectedRoute>
        <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<Login />} />

              {/* Admin — sem Navbar/Footer públicos */}
              <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
              <Route path="/admin/artigos" element={<AdminRoute><ArticlesList /></AdminRoute>} />
              <Route path="/admin/artigos/novo" element={<AdminRoute><ArticleEditor /></AdminRoute>} />
              <Route path="/admin/artigos/:id" element={<AdminRoute><ArticleEditor /></AdminRoute>} />
              <Route path="/admin/projetos" element={<AdminRoute><ProjectsList /></AdminRoute>} />
              <Route path="/admin/projetos/novo" element={<AdminRoute><ProjectForm /></AdminRoute>} />
              <Route path="/admin/projetos/:id" element={<AdminRoute><ProjectForm /></AdminRoute>} />

              {/* Site público */}
              <Route path="/*" element={
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
                      <Route path="/artigos/:slug" element={<ArticleTemplate />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                  <WhatsAppFloat />
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </MotionConfig>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
