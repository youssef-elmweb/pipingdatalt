//////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6903141213442953/1438804207';

const { height } = Dimensions.get("window");


export default function TestBannerAd( { userConsentContext } ) {
    
    if (userConsentContext == null) {
        return null;
    }


    return (
        <View style={styles.container}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                requestNonPersonalizedAdsOnly: (!userConsentContext),
                }}
                onAdLoaded={() => console.log("Ad banner loaded", userConsentContext)}
                onAdFailedToLoad={(error) => console.error('Ad failed', error)} />
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
