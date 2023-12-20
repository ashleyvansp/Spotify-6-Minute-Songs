import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTHORIZATION_ENDPOINT } from "../constants/ApiEndpoints";
import { CLIENT_ID, SCOPE, REDIRECT_URL } from "../constants/Constants";

const AuthContext = createContext();

const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            console.warn(`Error getting ${keyName}: ${err}. Using default value: ${defaultValue}.`);
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.warn(`Error storing ${newValue}`);
        }

        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};

export const AuthProvider = ({ children }) => {
    const [currentToken, setCurrentToken] = useLocalStorage("currentToken", {
        access_token: localStorage.getItem('access_token') || null,
        refresh_token: localStorage.getItem('refresh_token') || null,
        expires_in: localStorage.getItem('expires_in') || null,
        expires: localStorage.getItem('expires') || null,
    });

    const saveToken = (response) => {
        const { access_token, refresh_token, expires_in } = response;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('expires_in', expires_in);

        const now = new Date();
        const expiry = new Date(now.getTime() + expires_in * 1000);
        localStorage.setItem('expires', expiry);

        setCurrentToken({
            access_token,
            refresh_token,
            expires_in,
            expires: expiry,
        });
    };

    const navigate = useNavigate();

    const redirectToSpotifyAuthorize = async () => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

        const code_verifier = randomString;
        const data = new TextEncoder().encode(code_verifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);

        const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        window.localStorage.setItem('code_verifier', code_verifier);

        const authUrl = new URL(AUTHORIZATION_ENDPOINT)
        const params = {
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPE,
            code_challenge_method: 'S256',
            code_challenge: code_challenge_base64,
            redirect_uri: REDIRECT_URL,
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    };

    const login = async () => {
        await redirectToSpotifyAuthorize();
    };

    const logout = () => {
        // setUser(null);
        navigate("/", { replace: true });
    };

    const value = {
        currentToken,
        login,
        saveToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};