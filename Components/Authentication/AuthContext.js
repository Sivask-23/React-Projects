import React, { createContext, useContext, useState } from 'react'



const authContext=createContext();
export const AuthContext = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("userToken") !== null);

    const Logout=()=>{
        sessionStorage.removeItem("userToken");
        setIsAuthenticated(false);
    }

    const loginCall=()=>{
        setIsAuthenticated(true);
    }

  return (
    <authContext.Provider value={{isAuthenticated, Logout, loginCall}}>{children}</authContext.Provider>
  )
}


export const useAuth=()=>useContext(authContext)
