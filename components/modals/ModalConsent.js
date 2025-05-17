//////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

import { useConsent } from '../ads/ads_manager/ConsentContext.js';

export default function ModalConsent({ statusModalConsent, setStatusModalConsent }) {

    const { saveConsentContext } = useConsent(); 

    const storedConsent = async (choice) => {
        saveConsentContext(choice);
    };


    return (
        <Modal transparent visible={statusModalConsent} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Publicité</Text>
                    <Text style={styles.message}>J'accepte les publicités personnalisées pour une meilleure expérience ?</Text>
                    
                    <View style={styles.buttons}>
                        <Pressable style={styles.button} onPress={() => { storedConsent(false); setStatusModalConsent(false); }}>
                            <Text style={styles.buttonText}>Non</Text>
                        </Pressable>

                        <Pressable style={styles.button} onPress={() => { storedConsent(true); setStatusModalConsent(false); }}>
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


