// AuthHandler.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGIN, HOME } from '../constants/Routes';
import { TOKEN_ENDPOINT } from '../constants/ApiEndpoints';
import { useAuth } from './AuthContext';
import { CLIENT_ID, REDIRECT_URL } from '../constants/Constants';

async function makeTokenRequest(code) {
    const code_verifier = localStorage.getItem('code_verifier');
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URL,
            code_verifier: code_verifier,
        }),
    });

    return await response.json();
}

function TokenHandler() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const code = new URLSearchParams(location.search).get('code');

    useEffect(() => {
        if (code) {
            makeTokenRequest(code)
                .then((token) => {
                    auth.saveToken(token);
                    navigate(HOME);
                })
                .catch((error) => {
                    console.error('Error getting token:', error);
                    navigate(LOGIN);
                });
        } else {
            navigate(LOGIN);
        }
    });

    return (<div>Authenticating...</div>);
};

export default TokenHandler;
