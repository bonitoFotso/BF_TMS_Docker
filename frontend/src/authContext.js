// AuthContext.js

import API_URL from 'conf';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REFRESH } from 'store/actions';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const authToken = useSelector((state) => state.account.refresh);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const dispatcher = useDispatch();

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  }; 

  const updateToken = useCallback(async () => {
    console.log("Refresh token");
    const r = localStorage.getItem("authToken");
    const requestData = {
      //refresh: authToken,
      refresh: authToken,
      
    };
    console.log(requestData);
    try {
        const response = await fetch(`${API_URL}/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (response.status === 200) {
            const data = await response.json();
            //setAuthToken(data);
            //setCurrentUser(jwt_decode(data.access));
            localStorage.setItem("authToken", JSON.stringify(data.refresh));
            dispatcher({
              type: REFRESH,
              payload: { token: data.access, refresh: data.refresh }
          });
        } else {
            console.error("Erreur de serveur :", response.status, response.statusText);
            //logoutUser();
        }
    } catch (error) {
        console.error("Erreur de réseau :", error);
        // Gérez l'erreur de réseau ici
    }
}, [authToken, isLoading]);



  useEffect(() => {
    if (isLoading) {
      //updateToken()
      console.log(authToken);
    }

    const fourMinutes = 120 * 1000      
    let interval = setInterval(() => {
      if (authToken) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  },[authToken, isLoading, updateToken])


  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
