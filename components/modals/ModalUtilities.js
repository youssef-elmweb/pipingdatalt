//////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Button, Pressable, TouchableOpacity, Text, Modal, View, Image, SafeAreaView, FlatList } from "react-native";

import * as functions from "./../../library/functions.js";

import { useConsent } from "../ads/ads_manager/ConsentContext.js";

import { languages } from "../../languages/languages";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalInfos } from "./ModalInfos.js";

import { showAdIfReady } from "../ads/ads_manager/adsmanager.js";

import ModalConsent from "./ModalConsent.js";
import BannerAd from "../ads/banner_ads/BannerAd.js";

export function ModalUtilities (props) {

    const {width, height} = Dimensions.get("window");

    const { userConsentContext, setUserConsentContext } = useConsent(); console.log(userConsentContext, "ModalUtilities global");

    const [statusModalInfos, setStatusModalInfos] = useState(false);
    const [showModalConsent, setShowModalConsent] = useState(false);


    useEffect(() => {
        const getStoredConsentInitial = async () => {

                let userConsentLocal = await AsyncStorage.getItem("user_consent");

                if (userConsentLocal != null) {
                    setUserConsentContext(userConsentContext);
                } 
        };

        getStoredConsentInitial();
    }, []);


    const DATA = [
        {
            id: 1,
            title: languages[0][props.idLanguage].download
        },
        {
            id: 2,
            title: languages[0][props.idLanguage].info
        },
        {
            id: 3,
            title: languages[0][props.idLanguage].ad_preferences
        },
        {
            id: 4,
            title: languages[0][props.idLanguage].share
        },
        {
            id: 5,
            title: languages[0][props.idLanguage].premium
        },
    ];


    const Item = ({title}) => (
        <View style={ {width: Number(width*0.6), paddingLeft: Number(width*0.075), borderRightWidth: Number(0.75), borderColor: "gray", backgroundColor: '#202020'} }>
            <Text style={[ styles.titleUtility, {height: height*0.06, lineHeight: Number(height*0.06), fontSize: Number(height*0.02)} ]}>{ title }</Text>
        </View>
    );

    const makeStatusModalInfos = () => {
        setStatusModalInfos(false); 
    }


    return  (
                <View>
                    <ModalInfos idLanguage={props.idLanguage} statusModalInfos={statusModalInfos} makeStatusModalInfos={makeStatusModalInfos} />
                    <ModalConsent showModalConsent={showModalConsent || null} setVisible={setShowModalConsent} userConsentContext={userConsentContext} setUserConsentContext={setUserConsentContext} />

                    <Modal style={[ {justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]} animationType={"slide"} transparent={true} visible={props.statusModalUtilities}>
                        <Pressable style={[ {width: width, backgroundColor: "transparent"} ]} onPress={ props.makeStatusModalUtilities } >
                            <Pressable style={[ {width: width, height: Number(height*0.74), flexDirection: "row", marginTop: Number(height*0.06), flexDirection: "column", justifyContent: "space-around", alignSelf: "flex-start", alignItems: "flex-start", opacity: 0.95, backgroundColor: "#353535"} ]} onTouchEnd={ (e) => { e.stopPropagation() } }>
                                <View style={[ {paddingBottom: width*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]}>
                                    <View style={[ {width: width*0.8, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderColor: "white", backgroundColor: "#2c3e50"} ]}>
                                        <Text style={[{ fontSize: height*0.02, fontWeight: "bold", color: "white", letterSpacing: 0.5 }]}>{languages[0][props.idLanguage].utilities}</Text> 
                                    </View>
                                    
                                    {(height > 650 ?
                                    <Pressable style={[ {width: width*0.2, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]} onPress={ () => { props.makeStatusModalUtilities(); showAdIfReady();} }>
                                        <View style={[ {width: width*0.2, height: height*0.06, lineHeight: height*0.035, fontSize: height*0.02, justifyContent: "center", alignItems: "center", textAlign: "center", letterSpacing: 0.5, color: "white", borderBottomWidth: 0.75, borderColor: "white", backgroundColor: 'dodgerblue'} ]}>
                                            <Image alt={"down"} style={[ {width: height*0.06, height: height*0.06} ]} source={ require("../../assets/images/chevron-bas.png") } />
                                        </View>
                                    </Pressable> : 

                                    <View style={[ {width: width*0.2, height: height*0.06, justifyContent: "center", alignItems: "center", backgroundColor: 'dodgerblue'} ]}>
                                        <Button style={[ {width: width*0.2, height: height*0.06, lineHeight: height*0.06, fontSize: height*0.02, backgroundColor: 'white'} ]} color={"white"} title={"⌄"} onPress={ props.makeStatusModalUtilities } />
                                    </View>)}
                                </View>

                                <SafeAreaView>
                                    <Text style={[ styles.titleUtility, {width: width*0.6, height: Number(height*0.05), marginVertical: Number(height*0.01), textAlign: "center", fontSize: Number(height*0.03)} ]}>{"PipingData"}</Text>
                                    
                                    <FlatList
                                        keyboardShouldPersistTaps="handled"
                                        keyExtractor={(item) => item.id.toString()}
                                        data={DATA}
                                        style={{ zIndex: 999, pointerEvents: 'box-none' }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={{ zIndex: 10, height: height * 0.1, backgroundColor: 'transparent' }}
                                                onPress={() => {
                                                        if (item.id === 1) props.makeStatusModalPrinters(true);
                                                        else if (item.id === 2) setStatusModalInfos(true);
                                                        else if (item.id === 3) setShowModalConsent(true);
                                                        else if (item.id === 4) functions.onShare();
                                                        else if (item.id === 5) props.makeStatusModalPremium(true);
                                                }}>
                                            <Item title={item.title} />
                                            </TouchableOpacity>
                                    )}/>
                                </SafeAreaView>
                            </Pressable>
                        </Pressable> 
                        
                        <BannerAd userConsentContext={userConsentContext} />
                    </Modal>
                </View>
            )
}

const styles = StyleSheet.create({
    titleUtility: {
        fontSize: 15,
        color: "white"
    }
});