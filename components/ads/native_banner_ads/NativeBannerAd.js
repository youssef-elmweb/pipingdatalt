import React from 'react';
import { View, StyleSheet } from 'react-native';

import { NativeAdView, HeadlineView, TaglineView, AdvertiserView, MediaView, CallToActionView } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? 'ca-app-pub-3940256099942544/2247696110' : 'ca-app-pub-6903141213442953/1276212161';


export function NativeBannerAd() {

    return (
      <NativeAdView adUnitID={adUnitId} style={{ height: 100, backgroundColor: 'lightgray' }} />
    );
    
}


const styles = StyleSheet.create({
  adContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: 10,
  },
  adContent: {
    flexDirection: 'column',
    width: '100%',
  },
  media: {
    height: 150,
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#d3d3d3',
  },
  textContainer: {
    marginTop: 10,
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  advertiser: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  ctaButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
