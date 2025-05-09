import { useEffect, useState } from "react";

import ModalConsent from "../modals/ModalConsent.js";


export function AdsGoogle() {

    const [userConsent, setUserConsent] = useState(null);
    const [visible, setVisible] = useState(false);

    const loadConsent = async (userConsent) => {
    try {
            if (userConsent == null) {
                setVisible(true);
            }   
    }   catch (error) {
            console.error("Erreur de chargement du consentement :", error);
        }
    };

    useEffect(() => {
        loadConsent(userConsent, setUserConsent);
    }, []);


    return (
        <ModalConsent visible={visible} setVisible={setVisible} setUserConsent={setUserConsent} />
    );

}

