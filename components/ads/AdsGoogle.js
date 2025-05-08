import { useEffect, useState } from "react";
import { View } from "react-native";
import * as adsmamager from "../ads/interstitial-hook/adsmanager.js";


export function AdsGoogle() {

    const [userConsent, setUserConsent] = useState(null);


    useEffect(() => {
        adsmamager.loadConsent(userConsent, setUserConsent);
    }, []);


    return (
        <View>
        </View>
    );

}

