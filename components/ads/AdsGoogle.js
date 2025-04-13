import { useEffect, useState } from "react";
import { View, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MobileAds, InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : null; 


export function AdsGoogle() {

    const [userConsent, setUserConsent] = useState(null);
    

    const loadConsent = async () => {

        try {

            if (userConsent !== null) {

                loadAds(userConsent);

            } else {
                  Alert.alert(
                      "Publicité personnalisée",
                      "J'accepte les publicités personnalisées pour une meilleure expérience ?",
                      [
                          { text: "Non", onPress: () => saveConsent(false) },
                          { text: "Oui", onPress: () => saveConsent(true) }
                      ]
                  );
              }
        } catch (error) {
            console.error("Erreur de chargement du consentement :", error);
        }
    };

    const saveConsent = async (choice) => {
        await AsyncStorage.setItem("userConsent", choice.toString());
        setUserConsent(choice);
    };

    const loadAds = async (consent) => {
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

        } catch (error) {
            console.error("Erreur lors du chargement des pubs :", error);
        }
    };


    useEffect(() => {
        loadConsent();
    }, [userConsent]);


    return (
        <View>
        </View>
    );

}

