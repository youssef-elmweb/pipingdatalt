//////////////////////////////////////////////////////////////////////////////////////////
import { useMemo, useState } from "react";

import ModalConsentInitial from "../../modals/ModalConsentInitial.js";


export function InterstitialAdInitial() {

    const [visible, setVisible] = useState(null);


    const CONSENT_MODAL = useMemo(() => {
        return <ModalConsentInitial visible={visible} setVisible={setVisible} />
    }, [visible])


    return (

        CONSENT_MODAL

    );

}

