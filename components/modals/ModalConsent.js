import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TestIds } from "react-native-google-mobile-ads";

import { saveConsent, showAdIfReady } from '../ads/adsmanager.js';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-6903141213442953/3572577794'; 


export default function ModalConsent({ visible = null, showModalConsent, setVisible, setUserConsent }) {

const handleClickWithAd = async () => {
    const consentValue = AsyncStorage.getItem("user_consent");

    const consent = consentValue === "true";
    
    await showAdIfReady(consent, adUnitId);
};

/*
    const handleClickWithAd = async () => {
    try {
        const consentValue = await AsyncStorage.getItem("user_consent");
        const consent = consentValue === "true";

        await showAdIfReady(consent, adUnitId);
    } catch (error) {
        console.error("Erreur lors de la récupération du consentement :", error);
    }
    };
*/

    return (
        <Modal transparent visible={visible || !!showModalConsent} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Publicité</Text>
                    <Text style={styles.message}>J'accepte les publicités personnalisées pour une meilleure expérience ?</Text>
                    
                    <View style={styles.buttons}>
                        <Pressable style={styles.button} onPress={() => { const setter = typeof setUserConsent === 'function' ? setUserConsent : () => {}; saveConsent(false, setter, adUnitId); setVisible(false); handleClickWithAd(); }}>
                            <Text style={styles.buttonText}>Non</Text>
                        </Pressable>

                        <Pressable style={styles.button} onPress={() => { const setter = typeof setUserConsent === 'function' ? setUserConsent : () => {}; saveConsent(true, setter, adUnitId); setVisible(false); handleClickWithAd(); }}>
                            <Text style={styles.buttonText}>Oui</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );

}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        textAlign: 'center',
        marginBottom: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});


