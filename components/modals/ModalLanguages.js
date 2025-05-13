import React, { useState, useEffect } from "react";
import { Dimensions, Pressable, Text, Modal, View, SafeAreaView } from "react-native";

import RadioGroup from "react-native-radio-buttons-group";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BannerAd from "../ads/banner_ads/BannerAd.js";

import { languages } from "../../languages/languages";
import { languagesEurope } from '../../languages/languagesEurope.js';
import { languagesOther } from '../../languages/languagesOther.js';


export function ModalLanguages (props) {

    const {width, height} = Dimensions.get("window");

    const [userConsent, setUserConsent] = useState(null);

    console.log(userConsent, "userConsent in global scope of ModalLanguage");

    const userConsentLocalC = AsyncStorage.getItem("user_consent");

    useEffect(() => {
        const getStoredConsentInitial = async () => {

                let userConsentLocal = await userConsentLocalC;
                let choice;

                setUserConsent(userConsentLocal);
                
                console.log("✅ ", typeof userConsent, userConsent, "userConsentLocal in ModalLanguage before if");
                if (userConsentLocal != null) {
                    console.log(userConsentLocal, "userConsentLocal in ModalLanguage after if");
                    setUserConsent(userConsentLocal);
                } else {
                    console.log(userConsentLocal, "userConsentLocal in ModalLanguage before else");
                    if (userConsentLocal == "true") {
                        choice = true;
                        await AsyncStorage.setItem("user_consent", choice.toString());
                        setUserConsent(choice);
                    } else if (userConsentLocal == "false") {
                        choice = true;
                        await AsyncStorage.setItem("user_consent", choice.toString());
                        setUserConsent(choice);
                    }
                }
        };

        getStoredConsentInitial();
    }, [userConsent, userConsentLocalC]);
    

    return  (
        <View style={[ {justifyContent: "center", alignItems: "center"} ]}>
            <Modal style={[ {justifyContent: "center", alignItems: "center"} ]} animationType={"fade"} transparent={true} visible={props.statusModalLanguages}>
                <Pressable style={[ {width: width, marginBottom: height*0.025, justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', opacity: (height > 650 ? 0.9 : 0.97), backgroundColor : "#151515"} ]} onPressOut={ props.makeStatusModalLanguages  }>
                    <Pressable style={[ {width: width*0.9, height: Number(height*0.65), marginTop: Number(height*0.06), paddingBottom: height*0.025, justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', borderRadius: 5, backgroundColor : "#3b3b3b"} ]} onTouchEnd={ (e) => e.stopPropagation() }>
                        <View style={[ {width: (width*0.9), paddingTop: 5, paddingBottom: 7.5, flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomWidth: 0.75, borderTopLeftRadius: 5, borderColor: "white", backgroundColor: "olivedrab"} ]}>
                            <Text style={[ {fontSize: 15, fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "white"} ]}>{languages[0][props.idLanguage].languages}</Text> 
                        </View>

                        <View style={[ {flexDirection: "row", justifyContent: "center", alignSelf: "flex-start", alignItems: "flex-start"} ]}>
                            <SafeAreaView style={[ {flex: 1, justifyContent: "center", alignSelf: "flex-start", alignItems: "flex-start"} ]}>
                                <RadioGroup selectedId={props.idLanguage} radioButtons={languagesEurope} onPress={ props.setIdLanguage } />                        
                            </SafeAreaView>

                            <SafeAreaView style={[{flex: 1, justifyContent: "center", alignItems: "flex-start"}]}>
                                <RadioGroup selectedId={props.idLanguage} radioButtons={languagesOther} onPress={ props.setIdLanguage } />
                            </SafeAreaView>
                        </View>

                        <Pressable style={[ {justifyContent: "center", alignItems: "center"} ]} onPressOut={ props.makeStatusModalLanguages /*LANGUAGE_AFTER_MOUNT;*/ }>
                            <Text style={[ {width: width*0.35, height: height*0.035, lineHeight: height*0.035, fontSize: height*0.02, textAlign: "center", letterSpacing: 0.5, color: "white", borderRadius: 25, backgroundColor: '#3498db'} ]}>{languages[0][props.idLanguage].close}</Text>
                        </Pressable>
                    </Pressable>
                </Pressable> 

                <BannerAd userConsent={userConsent} />
            </Modal>
        </View>
    )
    
}

