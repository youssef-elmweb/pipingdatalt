import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : null; 

export const loadConsent = async (userConsent, setUserConsent) => {
  try {
      if (userConsent == null) {
          Alert.alert(
              "Publicité personnalisée",
              "J'accepte les publicités personnalisées pour une meilleure expérience ?",
              [
                  { text: "Non", onPress: () => saveConsent(false, setUserConsent) },
                  { text: "Oui", onPress: () => saveConsent(true, setUserConsent) }
              ]
          );

      }   
  }   catch (error) {
          console.error("Erreur de chargement du consentement :", error);
      }
};

export const saveConsent = async (choice, setUserConsent) => {
  await AsyncStorage.setItem("userConsent", choice.toString());
  setUserConsent(() => choice);
  loadAds(choice); 
};

export const loadAds = async (consent) => {
  try {
      await MobileAds().initialize();

      const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
          requestNonPersonalizedAdsOnly: !consent, // ici false quand pub acceptée pour que non personnalisé soit false donc = pubs personnalisées
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

