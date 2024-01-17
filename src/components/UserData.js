import axios from "axios";
import { useState } from "react";
import '../styles/UserData.css'
import { userEndpoint } from "../constants/ApiEndpoints";
import { useAuth } from "../auth/AuthContext";

function UserData() {
    const { currentToken } = useAuth();
    const token = currentToken.access_token;    
    const [displayName, setDisplayName] = useState('');

    function showCurrentUser(token) { 
        axios.get(userEndpoint,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            ).then((response) => {
                setDisplayName(response.data.display_name);
            })
            .catch((error) => {
                console.log("Error getting user: " + error + "; with token " + token);
            });
    }

    showCurrentUser(token);
    return (
        <div className="UserData">
            <p>Signed in as {displayName ? displayName : "undefined"}</p>
        </div>
    )
}


export default UserData;