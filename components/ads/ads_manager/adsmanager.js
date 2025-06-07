//////////////////////////////////////////////////////////////////////////////////////////
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

const MIN_DELAY_MS = 300000; // 5 minutes
const LAST_SHOWN_KEY = 'last_ad_shown_at';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-6903141213442953/3572577794';

////////////////////////////// IOS ATT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
export const getChoiceATT = async () => {
    const { status } = await getTrackingPermissionsAsync();
    return status;
}

export const getStatusConsentIos = async (choice) => {
    let valueBool;

    if (choice === "undetermined") {
        valueBool = false; // voir quoi mettre (null ou false) par defaut car par defaut == undetermined
    } else if (choice === "denied") {
        valueBool = false;
    } else if (choice === "granted") {
        valueBool = true;
    }
    return valueBool;
}
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// IOS ATT /////////////////////////////////////////////////////

export const saveConsent = async (choice = null) => {
    return showAd(choice); 
};

export const showAd = async (consent) => {

    try {
        await MobileAds().initialize();

        const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: !consent, 
        });

        interstitial.load();

        const adListenerLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            interstitial.show();
            console.log("Ad loaded");
        });

        const adListenerError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
            console.error("Ad failed", error);
        });

        const adListenerClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            console.log("Ad closed");
          });

        return () => {
            adListenerLoaded.remove();
            adListenerError.remove();
            adListenerClosed.remove();
        };
    }   catch (error) {
            console.error("Error loading ad:", error);
        }

};

export const canShowAd = async () => {
    const last = await AsyncStorage.getItem(LAST_SHOWN_KEY);
    const lastShownAt = parseInt(last, 10) || 10000;
    const now = Date.now();
  
    return (now - lastShownAt) >= MIN_DELAY_MS;
};
  
export const showAdIfReady = async () => {
    const isReady = await canShowAd();

    if (!isReady) {
        return false;
    }

    let userConsentLocal = await AsyncStorage.getItem("user_consent");
    (userConsentLocal !== null ? (userConsentLocal === "true" ? userConsentLocal = true : userConsentLocal = false) : false);
    
    await AsyncStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());

    showAd(userConsentLocal, adUnitId); 
};





