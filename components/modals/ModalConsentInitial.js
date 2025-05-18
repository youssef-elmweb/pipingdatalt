//////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import { getChoiceATT } from '../ads/ads_manager/adsmanager.js';

import { useConsent } from '../ads/ads_manager/ConsentContext.js';


export default function ModalConsentInitial( { visible, setVisible } ) {

    const { saveConsentInitialContext, setUserConsentContext, userConsentContext } = useConsent();

    useEffect(() => {
        const getStoredConsentInitial = async () => {

                let userConsentInitialLocal = await AsyncStorage.getItem("user_consent");

                if (userConsentInitialLocal != null) {
                    setUserConsentContext(true);
                    setVisible(false);
                } else {
                    setVisible(true);
                }
        };

        const getChoiceInitialATT = async () => {
            let request = await getChoiceATT();
            console.log(request, "request ATT récupéré");

            const getChoiceUserConsentIOS = async () => {
                if (request !== "undetermined") {
                    console.log(request, "voici la valeur actuel de userConsent IOS");
                }
                return true; // ici si request !== "undetermined" on retourne false ou true selon la valeur de request
            }

            if (Platform.OS === 'ios') {
                if (request === "undetermined") {
                    const { status } = await requestTrackingPermissionsAsync();
                    console.log("ATT permission status after request:", status);
                    return null;
                } else {
                    let choiceUserConsentIOS = await getChoiceUserConsentIOS(); // on récupere la valeur true ou false pour setUserConsentContext(true ou false);
                    console.log(choiceUserConsentIOS, "choiceUserConsentIOS en retour");
                    //setUserConsentContext(choiceUserConsentIOS);
                }        
            } else {
                getStoredConsentInitial();
            }
            return;
        }


        getChoiceInitialATT();
    }, []);


    const initStoredConsentInitial = async (choice) => {
        setVisible(false);
        saveConsentInitialContext(choice);
    };


    return (
        (Platform.OS === 'ios' == "true" ?
            getChoiceInitialATT()
        :
            (userConsentContext != "true" ?
                <Modal transparent visible={visible} animationType="fade">
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>Publicité</Text>
                            <Text style={styles.message}>J'accepte les publicités personnalisées pour une meilleure expérience.</Text>
                            <Text style={styles.message}>J'ai la possibilité de changer d'avis dans la section Utilities onglet ad preferences.</Text>

                            <View style={styles.buttons}>
                                <Pressable style={styles.button} onPress={() => { let choice = true; initStoredConsentInitial(choice); }}>
                                    <Text style={styles.buttonText}>J'ai compris</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            : false)
        )

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