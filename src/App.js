import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TokenHandler from './auth/TokenHandler';
import Home from './components/Home';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import * as ROUTES from './constants/Routes';

function App() {
    return (
        <Routes>
            <Route path={ROUTES.AUTH_CALLBACK} element={<TokenHandler />} />
            <Route path={ROUTES.HOME} element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
    );
}

export default App;
