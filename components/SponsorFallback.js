import React from 'react';
import { View, Image, TouchableOpacity, Linking, StyleSheet, Text, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


export default function SponsorFallback() {
    
    const displaySponsor = () => {
        Linking.openURL('https://elm-web.fr'); 
    };

    return (
        <View>
            <View style={styles.separator} />

            <TouchableOpacity onPress={displaySponsor} style={styles.container}>
                <Image source={require('../assets/images/logo-icon.png')} resizeMode="cover" style={styles.image} />
                
                <View style={styles.labelOverlay}>
                    <Text style={styles.label}>Sponsorisé</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#555',
        alignSelf: 'center'
    },
    container: {
        width: width,
        maxHeight: height * 0.175,
        backgroundColor: '#e0e0e0',
        borderTopWidth: 1,
        borderTopColor: "white",
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    labelOverlay: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "flex-end",
        width: width*0.3,
        backgroundColor: '#181818',
        borderStartStartRadius: 10
    },
    label: {
        color: 'white',
        fontSize: height*0.0175,
        lineHeight: height*0.025
    },
});

