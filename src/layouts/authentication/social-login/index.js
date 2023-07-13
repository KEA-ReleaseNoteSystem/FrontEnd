import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import queryString from "query-string";

function SocialLogin() {

    const token = queryString.parse(window.location.search).token;
    const [isAuthenticated, setIsAuthenticated] = useState(true);


    useEffect(() => {
        localStorage.setItem("ACCESS_TOKEN", token);
        setIsAuthenticated(true);
      }, []);

    console.log(isAuthenticated);

    if(isAuthenticated) {
        return(
            <Navigate
            to={{
                pathname: "/home/manage-project"
            }}>
            </Navigate>
        );
    } else {
        return(
            <Navigate
            to={{
                pathname: "/authentication/sign-in"
            }}>
            </Navigate>
        );
    }
}

export default SocialLogin;