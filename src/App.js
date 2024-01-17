import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TokenHandler from './auth/TokenHandler';
import Home from './components/Home';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import * as ROUTES from './constants/Routes';
import UserData from './components/UserData';
import PlaylistCreator from './components/PlaylistCreator';

function App() {
    return (
        <Routes>
            <Route path={ROUTES.AUTH_CALLBACK} element={<TokenHandler />} />
            <Route path={ROUTES.HOME} element={
                <ProtectedRoute>
                    <UserData />
                    <PlaylistCreator />
                </ProtectedRoute>
            } />
            <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
    );
}

export default App;
