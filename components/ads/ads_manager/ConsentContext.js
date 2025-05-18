import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { saveConsent } from './adsmanager';

const ConsentContext = createContext();


export const ConsentProvider = ({ children }) => {

    const [userConsentContext, setUserConsentContext] = useState(null);


    const refreshConsent = async () => {
        const value = await AsyncStorage.getItem("user_consent");
        (value == null ? false : setUserConsentContext(value === "true"));
    };

    const makeChoiceUserATT = async (choice) => {
        console.log("oui le choix est : ", choice);
    }

    useEffect(() => {
            refreshConsent(); 
    }, []);


    const saveConsentInitialContext = async (choice) => {
        await AsyncStorage.setItem("user_consent", choice.toString());
        setUserConsentContext(choice); 
        saveConsent(choice);
    };


    const saveConsentContext = async (choice) => {
        await AsyncStorage.setItem("user_consent", choice.toString());
        setUserConsentContext(choice); 
    };


    return (
        <ConsentContext.Provider value={{ userConsentContext, makeChoiceUserATT, saveConsentContext, saveConsentInitialContext }}>
            {children}
        </ConsentContext.Provider>
    );
    
};

export const useConsent = () => useContext(ConsentContext);
