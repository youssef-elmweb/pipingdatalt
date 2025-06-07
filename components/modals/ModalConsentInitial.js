//////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Platform, AppState } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import { getChoiceATT, getStatusConsentIos } from '../ads/ads_manager/adsmanager.js';

import { useConsent } from '../ads/ads_manager/ConsentContext.js';


export default function ModalConsentInitial( { visible, setVisible } ) {

    const { saveConsentInitialContext, setUserConsentContext, saveConsentContext } = useConsent();

    useEffect(() => {
        const getStoredConsentInitialAndroid = async () => {

            let userConsentInitialLocal = await AsyncStorage.getItem("user_consent");

            if (userConsentInitialLocal != null) {
                setVisible(false);
                setUserConsentContext(true); // true = valeur initialisée par defaut
            }   else {
                    setVisible(true);
                }
        };

        const getStoredConsentInitial = async () => {
            if (Platform.OS === 'ios') {
                let request = await getChoiceATT();

                if (request === "undetermined") {

                    await requestTrackingPermissionsAsync();
                    
                    const subscription = AppState.addEventListener('change', async (nextAppState) => {
                    if (nextAppState === 'active') {
                        let choiceUserConsentIOS = await getChoiceATT();
                        let choiceUserConsentIOSToBoolean = await getStatusConsentIos(choiceUserConsentIOS);
                        
                        saveConsentInitialContext(choiceUserConsentIOSToBoolean);
                    }
                    }); return () => subscription.remove();

                }   else {
                        let choiceUserConsentIOSToBoolean = await getStatusConsentIos(request);
                        saveConsentContext(choiceUserConsentIOSToBoolean);
                }
            }   else {
                    getStoredConsentInitialAndroid();
                }
        }

        getStoredConsentInitial();
    }, []);


    const initStoredConsentInitial = async (choice) => {
        setVisible(false);
        saveConsentInitialContext(choice);
    };


    if (Platform.OS === "ios") return null;
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Publicité</Text>
                    <Text style={styles.message}>J'accepte les publicités personnalisées pour une meilleure expérience.</Text>
                    <Text style={styles.message}>J'ai la possibilité de changer d'avis dans la section Utilities onglet ad preferences.</Text>

                    <View style={styles.buttons}>
                        <Pressable style={styles.button} onPress={() => { initStoredConsentInitial(true); }}>
                            <Text style={styles.buttonText}>J'ai compris</Text>
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