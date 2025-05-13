import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

const MIN_DELAY_MS = 10000; // 10 secondes
const LAST_SHOWN_KEY = 'last_ad_shown_at';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-6903141213442953/3572577794';

export const saveConsent = async (choice = true) => {
    return showAd(choice); // A reactiver en PROD Ne doit pas être en conflit avec loadAd de showAdIfReady
};

export const showAd = async (consent) => {
    console.log(typeof consent, consent, "consent in showAd");
    try {
        console.log("Avant initialize");
        await MobileAds().initialize();
        console.log("Après initialize");

        console.log(typeof consent, consent, "consent inside showAd inside after try in adsmanager");

        const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: !consent, 
        });

        interstitial.load();

        const adListenerLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            console.log("Interstitial loaded, attempting to show...");
            interstitial.show();
        });

        const adListenerError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
            console.error("Erreur de chargement interstitielle :", error);
        });

        const adListenerClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            console.log("L'utilisateur a fermé l'interstitielle");
          });

        return () => {
            adListenerLoaded.remove();
            adListenerError.remove();
            adListenerClosed.remove();
        };
    }   catch (error) {
            console.error("Erreur lors du chargement des pubs :", error);
        }
};


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


export const canShowAd = async () => {
    const last = await AsyncStorage.getItem(LAST_SHOWN_KEY);
    const lastShownAt = parseInt(last, 10) || 10000;
    const now = Date.now();
  
    return (now - lastShownAt) >= MIN_DELAY_MS;
};
  
export const showAdIfReady = async () => {
    const isReady = await canShowAd();

    if (!isReady) {
        console.log("Pas de pub (trop tôt)");
        return false;
    }

    console.log("Pub autorisée");

    let userConsentInitialLocal = await AsyncStorage.getItem("user_consent_initial");

    await AsyncStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    console.log(userConsentInitialLocal, "userConsentInitialLocal after showAdIfReady");
    return showAd(userConsentInitialLocal, adUnitId); // A reactiver en PROD Ne doit pas être en conflit avec loadAd de showAd
};





