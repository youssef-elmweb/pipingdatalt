import React from 'react';
import { View, Image, TouchableOpacity, Linking, StyleSheet, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SponsorFallback() {
  const handlePress = () => {
    Linking.openURL('https://elm-web.fr'); 
  };

  return (
    <>
      <View style={styles.separator} />

      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <Image
          source={require('../assets/images/logo-icon.png')} 
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.labelOverlay}>
          <Text style={styles.label}>Sponsorisé</Text>
        </View>

      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#555',
    alignSelf: 'center',
    marginTop: 1,
  },
  container: {
    marginTop: 5,
    maxHeight: height * 0.175,
    width: width * 0.92,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  labelOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderTopLeftRadius: 6,
  },
  label: {
    color: 'white',
    fontSize: 12,
  },
});

