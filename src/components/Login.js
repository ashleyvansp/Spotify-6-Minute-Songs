import React from 'react';
import { useAuth } from '../auth/AuthContext';

function Login() {
    const { login } = useAuth();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Login</h1>
                <button className="btn-spotify" onClick={login} >
                    Login with Spotify 
                </button>
            </header>
        </div>
    );
}

export default Login;

