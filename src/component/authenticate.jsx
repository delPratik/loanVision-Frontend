import React, { useContext } from 'react'
import {createContext } from "react";

export const AuthContext= createContext() ;
 const AuthProvider=({children})=>{
    const tokenValue=(serverToken)=>{
        return localStorage.setItem("token",serverToken);

    }
    return <AuthContext.Provider value={tokenValue}>
{children}
    </AuthContext.Provider>
 }
 export const useAuth=()=>{
    const authContextvalue=useContext(AuthContext);
    if(!authContextvalue){
        throw new Error("useAuth used outside of provider ");
    }
    return useContext(AuthContext)
 }
 export default AuthProvider;
