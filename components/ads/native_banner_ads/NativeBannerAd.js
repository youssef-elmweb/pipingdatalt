//////////////////////////////////////////////////////////////////////////////////////////
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { NativeAdView, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.NATIVE : 'ca-app-pub-6903141213442953/1276212161';


export default function NativeBannerAd() {

  const nativeAdRef = useRef(null);


  useEffect(() => {
      const timeout = setTimeout(() => {
          nativeAdRef.current?.loadAd();
      }, 300);

      return () => clearTimeout(timeout);
  }, []);


  return (
      <NativeAdView ref={nativeAdRef} adUnitId={adUnitId} style={styles.adContainer}>
          <View style={{ height: 100, backgroundColor: 'lightgray' }} />
      </NativeAdView>
  );

}


const styles = StyleSheet.create({
    adContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
    }
});