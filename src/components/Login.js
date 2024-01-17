import React from 'react';
import { useAuth } from '../auth/AuthContext';
import '../App.css';

function Login() {
    const { login } = useAuth();

    return (
        <div className="App">
            <header className="App-header">
                <button className="btn-spotify" onClick={login} >
                    Login with Spotify 
                </button>
            </header>
        </div>
    );
}

export default Login;

