import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6903141213442953/1438804207';
const { height } = Dimensions.get("window");


export default function TestBannerAd() {
    
    const [userConsent, setUserConsent] = useState(null);


    useEffect(() => {
        const fetchConsent = async () => {
        try {
            const value = await AsyncStorage.getItem("user_consent");
            const parsed = value === "true";
            setUserConsent(parsed);
        } catch (err) {
            console.error("Error AsyncStorage:", err);
        }
        };
        fetchConsent();
    }, []);

    if (userConsent === null) {
        return null;
    }


    return (
        <View style={styles.container}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                requestNonPersonalizedAdsOnly: !userConsent,
                }}
                onAdLoaded={() => console.log('Banner loaded')}
                onAdFailedToLoad={(err) => console.error('Banner failed:', err)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.15,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});
