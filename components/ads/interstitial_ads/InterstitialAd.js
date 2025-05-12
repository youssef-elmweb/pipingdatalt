import { useEffect, useMemo, useState } from "react";

import ModalConsentInitial from "../../modals/ModalConsentInitial";


export function InterstitialAd() {

    const [userConsent, setUserConsent] = useState(null);
    const [visible, setVisible] = useState(true);
    





    const CONSENT_MODAL = useMemo(() => {
        return <ModalConsentInitial visible={visible} setVisible={setVisible} setUserConsent={setUserConsent} />
    }, [visible])


    return (
        (userConsent == null ?
            CONSENT_MODAL
        : false)
    );

}

