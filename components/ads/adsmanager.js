import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType } from "react-native-google-mobile-ads";


export const saveConsent = async (choice, setUserConsent, adUnitId) => {
    await AsyncStorage.setItem("user_consent", choice.toString());
    setUserConsent(() => (choice));
    //loadAds(choice, adUnitId); // A REACTIVER APRES DEVELOPMENT ET ET TESTER DE TEMPS EN TEMPS
};

export const loadAds = async (consent, adUnitId) => {
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


