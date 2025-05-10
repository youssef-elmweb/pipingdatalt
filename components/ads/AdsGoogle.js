import { useEffect, useMemo, useState } from "react";

import ModalConsent from "../modals/ModalConsent.js";


export function AdsGoogle() {

    const [userConsent, setUserConsent] = useState(null);
    const [visible, setVisible] = useState(true);


    const loadConsent = async (userConsent) => {
        try {
            if (userConsent == null) {
                setVisible(() => true);
            }   
        }   catch (error) {
                console.error("Erreur de chargement du consentement :", error);
            }
    };

    
    useEffect(() => {
        loadConsent(userConsent, setUserConsent);
    }, []);

    const CONSENT_MODAL = useMemo(() => {
        return <ModalConsent visible={visible || null} setVisible={setVisible} setUserConsent={setUserConsent} />
    }, [visible])


    return (
        CONSENT_MODAL
    );

}

