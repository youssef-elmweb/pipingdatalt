import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

const MIN_DELAY_MS = 10000; // 10 secondes
const LAST_SHOWN_KEY = 'last_ad_shown_at';

export const saveConsent = async (choice, setUserConsent, adUnitId) => {
    console.log(choice, "choice inside saveContent of adsmanager");
    await AsyncStorage.setItem("user_consent", choice.toString());
    let test = await AsyncStorage.getItem("user_consent");
    console.log(test, "choice afet getItem inside saveContent of adsmanager");
    setUserConsent(() => (choice));

    //loadAds(choice, adUnitId); // A reactiver en PROD Ne doit pas être en conflit avec loadAd de showAdIfReady
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


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


export const canShowAd = async () => {
    const last = await AsyncStorage.getItem(LAST_SHOWN_KEY);
    const lastShownAt = parseInt(last, 10) || 0;
    const now = Date.now();
  
    return (now - lastShownAt) >= MIN_DELAY_MS;
};
  
export const showAdIfReady = async (userConsent = false, adUnitId) => {
    const isReady = await canShowAd();

    if (!isReady) {
        //console.log("Pas de pub (trop tôt)");
        return false;
    }

    //console.log("Pub autorisée");

    await AsyncStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    //return loadAds(userConsent, adUnitId); // A reactiver en PROD Ne doit pas être en conflit avec loadAd de loadAds
};





