import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : null; 

export const saveConsent = async (choice, setUserConsent) => {
    await AsyncStorage.setItem("userConsent", choice.toString());
    setUserConsent(() => choice);
    loadAds(choice); 
};

export const loadAds = async (consent) => {
    try {
        await MobileAds().initialize();

        const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: !consent, 
        });

        interstitial.load();

        const adListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            interstitial.show();
        });

        return () => {
            adListener.remove();
        };
    }   catch (error) {
            console.error("Erreur lors du chargement des pubs :", error);
        }
};

