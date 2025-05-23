import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsentContext = createContext();


export const ConsentProvider = ({ children }) => {

    const [userConsentContext, setUserConsentContext] = useState(null);


    const refreshConsent = async () => {
        const value = await AsyncStorage.getItem("user_consent");
        (value == null ? false : setUserConsentContext(value === "true"));
    };

    const saveConsentInitialContext = async (choice) => {
        await AsyncStorage.setItem("user_consent", choice.toString());
        setUserConsentContext(choice); 
    };

    const saveConsentContext = async (choice) => {
        await AsyncStorage.setItem("user_consent", choice.toString());
        setUserConsentContext(choice); 
    };


    useEffect(() => {
            refreshConsent(); 
    }, []);


    return (
        <ConsentContext.Provider value={{ userConsentContext, setUserConsentContext, saveConsentContext, saveConsentInitialContext }}>
            {children}
        </ConsentContext.Provider>
    );
    
};

export const useConsent = () => useContext(ConsentContext);
