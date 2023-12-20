import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { LOGIN } from '../../constants/Routes';

export const ProtectedRoute = ({ children }) => {
    const { currentToken } = useAuth();
    if (!currentToken.access_token) {
        return <Navigate to={LOGIN} />;
    }
    return children;
};