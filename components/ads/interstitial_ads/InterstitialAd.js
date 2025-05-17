//////////////////////////////////////////////////////////////////////////////////////////
import { useMemo, useState } from "react";

import { Platform } from "react-native";

import ModalConsentInitial from "../../modals/ModalConsentInitial";


export function InterstitialAd() {

    const [visible, setVisible] = useState(null);

    const CONSENT_MODAL = useMemo(() => {
        return <ModalConsentInitial visible={visible} setVisible={setVisible} />
    }, [visible])


    return (

        (Platform.OS == "ios" ?
        false :
        CONSENT_MODAL)

    );

}

