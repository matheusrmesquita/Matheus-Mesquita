import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Simulação de autenticação rápida no front-end para o RF-02 (Gate)
const useAuth = () => {
    // Num cenário real, verificaríamos no localStorage ou Contexto.
    // Para fins de teste inicial, vamos deixar como falso para forçar a tela de login protegida
    const isAuth = sessionStorage.getItem('gov_auth') === 'true';
    return isAuth;
};

const PrivateRoute = () => {
    const isAuth = useAuth();

    // Se não estiver logado, para a rota real, podemos redirecionar ou (neste caso)
    // deixar o componente GovArea tratar o prompt de senha dentro dele mesmo.
    // Por arquitetura, o PrivateRoute garante que a lógica esteja centralizada.
    return isAuth ? <Outlet /> : <Navigate to="/gov" state={{ fromRoute: true }} />;
};

export default PrivateRoute;
