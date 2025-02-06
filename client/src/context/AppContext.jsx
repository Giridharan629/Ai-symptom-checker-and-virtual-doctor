import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) =>{
    
    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)
    const [result, setResult] = useState(null)

    const getAuthState = async ()=>{
        try {


            const {data} = await axios.get(backendUrl + "/api/auth/is-auth")

            if(data.success){
                setIsLoggedIn(true)
                getUserData()
            }
            
        } catch (error) {

            toast.error(error.message)
            
        }
    }

    const getUserData = async ()=>{
        try {

            const {data} = await axios.get(backendUrl + "/api/user/data")

            
            if(data.success){
                setUserData(data.userDetails)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {

            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        getAuthState()
    },[])

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
        result, setResult
    }
    

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}