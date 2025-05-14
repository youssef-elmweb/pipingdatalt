//////////////////////////////////////////////////////////////////////////////////////////
import { React, useMemo } from "react";
import { Dimensions, Pressable, Text, Modal, View, SafeAreaView } from "react-native";

import RadioGroup from 'react-native-radio-buttons-group';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import BannerAd from "../ads/banner_ads/BannerAd.js";

import { useConsent } from "../ads/ads_manager/ConsentContext.js";

import { languages } from "../../languages/languages";

import { UNITS_MEASURES } from "../../datas/units_measures";

export function ModalSettings (props) {

    const {width, height} = Dimensions.get("window");

    const { userConsentContext } = useConsent(); 


///////////////// constants datas //////////////////////////////////
const settingsMeasure = useMemo(() => ([
    {
        id: 0, // acts as primary key, should be unique and non-empty string
        label: languages[0][props.idLanguage]["mm"],
        value: 0,
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: 5, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {padding: 1, justifyContent: "flex-start"}
    },
    {
        id: 1,
        label: languages[0][props.idLanguage]["inch"],
        value: 1,
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: 5, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {padding: 1, justifyContent: "flex-start"}
    }
]), [props.idLanguage]);

const settingsDiameter = useMemo(() => ([
    {
        id: 0, 
        label: languages[0][props.idLanguage]["dn"],
        value: 0,
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: 5, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {padding: 1, justifyContent: "flex-start"}
    },
    {
        id: 1,
        label: (props.idLanguage == "en" ? languages[0][props.idLanguage]["inch"] + " Ø" : "Ø " + languages[0][props.idLanguage]["inch"]),
        value: 1,
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: 5, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {padding: 1, justifyContent: "flex-start"}
    }
]), [props.idLanguage]);

const settingsAngle = useMemo(() => ([
    {
        id: 0, 
        label: languages[0][props.idLanguage].integer,
        value: '0',
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: width*0.015, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {paddingTop: width*0.01, paddingBottom: width*0.01, justifyContent: "flex-start"}
    },
    {
        id: 1,
        label:  "1 ",
        value: '1',
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: width*0.015, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {paddingTop: width*0.01, paddingBottom: width*0.01, justifyContent: "flex-start"}
    },
    {
        id: 2,
        label: languages[0][props.idLanguage].decimals,
        value: '2',
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: width*0.015, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {paddingTop: width*0.01, paddingBottom: width*0.01, justifyContent: "flex-start"}
    }
]), [languages[0][props.idLanguage].integer, languages[0][props.idLanguage].decimal, languages[0][props.idLanguage].decimals]);

const settingsDatas = useMemo(() => ([
    {
        id: 0, 
        disabled: (UNITS_MEASURES[props.idSettingsMeasure].label != "inch" ? false : true),
        label: languages[0][props.idLanguage].integer,
        value: '0',
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: width*0.015, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {paddingTop: width*0.01, paddingBottom: width*0.01, justifyContent: "flex-start"}
    },
    {
        id: 1,
        label: "1 ",
        value: '1',
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: width*0.015, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {paddingTop: width*0.01, paddingBottom: width*0.01, justifyContent: "flex-start"}
    },
    {
        id: 2,
        label: languages[0][props.idLanguage].decimals,
        value: '2',
        color: "white",
        layout: "row",
        size: 15,
        labelStyle: {marginLeft: width*0.015, fontSize: height*0.015, fontWeight: "400", color: "white"},
        containerStyle: {paddingTop: width*0.01, paddingBottom: width*0.01, justifyContent: "flex-start", fontSize: 10}
    }
]), [UNITS_MEASURES[props.idSettingsMeasure].label, languages[0][props.idLanguage].integer, languages[0][props.idLanguage].decimal, languages[0][props.idLanguage].decimals]);
///////////////// constants datas //////////////////////////////////
    
    return  (
        <View style={[ {justifyContent: "center", alignItems: "center"} ]}>
            <Modal style={[ {justifyContent: "center", alignItems: "center"} ]} animationType={"fade"} transparent={true} visible={props.statusModalSettings}>
                <Pressable style={[ {width: width, marginBottom: height*0.025, justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', opacity: (height > 650 ? 0.9 : 0.97), backgroundColor : "#151515"} ]} onPressOut={ props.makeStatusModalSettings }>
                    <Pressable style={[ {width: (width*0.9), height: Number(height*0.65), marginTop: Number(height*0.06), paddingBottom: height*0.025, justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', borderRadius: 5, backgroundColor : "#3b3b3b"} ]} onTouchEnd={ (e) => e.stopPropagation() }>
                        <View style={[ {width: width*0.9, paddingTop: 5, paddingBottom: 7.5, flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopLeftRadius: 5, borderBottomWidth: 0.75, borderTopRightRadius: 5, borderColor: "white", backgroundColor: "#2c3e50"} ]}>
                            <Text style={[ {fontSize: height*0.02, fontWeight: "bold", textAlign: "center", color: "white", letterSpacing: 0.5} ]}>{`${languages[0][props.idLanguage].settings}`}</Text> 
                        </View>

                        <View style={[ {flexDirection: "column"} ]}>
                            <Text style={[ {marginBottom: 5, justifyContent: "center", fontSize: height*0.015, fontWeight: "bold", letterSpacing: 0.5, textAlign: "center", color: "aqua"} ]}>{`${languages[0][props.idLanguage].unit_measure}`}</Text>
                            
                            <View style={[ {width: width*0.85, marginBottom: width*0.03, justifyContent: "center", alignItems: "center"} ]}>
                                <SafeAreaView style={[ {width: width*0.85, marginBottom: width*0.03, paddingTop: width*0.01, paddingBottom: width*0.01, paddingLeft: width*0.15, fontSize: height*0.015, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", borderRadius: 25, backgroundColor: "gray"} ]}>
                                    <RadioGroup layout={"row"} radioButtons={settingsMeasure} selectedId={props.idSettingsMeasure} onPress={props.setIdSettingsMeasure} /><Text style={[ {fontSize: height*0.015, fontWeight: "bold", color: "white"} ]}>[...]</Text>
                                </SafeAreaView>

                                <SafeAreaView style={[ {width: width*0.85, paddingTop: width*0.01, paddingBottom: width*0.01, paddingLeft: width*0.15, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", borderRadius: 25, backgroundColor: "gray"} ]}>
                                    <RadioGroup layout={"row"} radioButtons={settingsDiameter} selectedId={props.idSettingsDiameter} onPress={props.setIdSettingsDiameter} />                   
                                </SafeAreaView>
                            </View>

                            <View style={[ {marginBottom: width*0.05, justifyContent: "center", alignItems: "center"} ]}>
                                <Text style={[ {marginBottom: 5, justifyContent: "center", fontSize: height*0.015, fontWeight: "bold", letterSpacing: 0.5, textAlign: "center", color: "aqua"} ]}>{`${languages[0][props.idLanguage].angle_base}`}</Text>

                                <SafeAreaView style={[ {width: width*0.85, paddingLeft: width*0.07, flexDirection: "row", justifyContent: "flex-start", borderRadius: 25, backgroundColor: "gray"} ]}>
                                    <RadioGroup layout={"row"} radioButtons={settingsAngle} selectedId={props.idSettingsAngle} onPress={props.setIdSettingsAngle} />                        
                                </SafeAreaView>
                            </View>

                            <View style={[ {marginBottom: width*0.05, justifyContent: "center", alignItems: "center"} ]}>
                                <Text style={[ {marginBottom: 5, justifyContent: "center", fontSize: height*0.015, fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "aqua"} ]}>{`${languages[0][props.idLanguage].datas_base}`}</Text>

                                <SafeAreaView style={[ {width: width*0.85, paddingLeft: width*0.07, flexDirection: "row", justifyContent: "flex-start", borderRadius: 25, backgroundColor: "gray"} ]}>
                                    <RadioGroup layout={"row"} radioButtons={settingsDatas} selectedId={props.idSettingsDatas} onPress={props.setIdSettingsDatas} />                       
                                </SafeAreaView>
                            </View>

                            <View style={[ {marginBottom: width*0.05, flexDirection: "column", justifyContent: "center"} ]}>
                                <Text style={[ {marginBottom: 7.5, justifyContent: "center", fontSize: height*0.015, fontWeight: "bold", letterSpacing: 0.5, textAlign: "center", color: "aqua"} ]}>{`${languages[0][props.idLanguage].values} - ${languages[0][props.idLanguage].interface}`}</Text>

                                <View style={[ {flexDirection: "row", justifyContent: "space-evenly"} ]}>
                                    <BouncyCheckbox size={height*0.02} fillColor={"tomato"} textContainerStyle={ {marginLeft: 5} } textStyle={ {fontSize: height*0.015, fontWeight: "400", textDecorationLine: "none", color: "white"} } text={languages[0][props.idLanguage].interface} isChecked={props.checkboxDatasInterfaceState} onPress={ props.makeCheckboxDatasInterfaceState } />
                                </View>
                            </View>
                        </View>

                        <Pressable style={[ {justifyContent: "center", alignItems: "center"} ]} onPressOut={ props.makeStatusModalSettings }>
                            <Text style={[ {width: width*0.35, height: height*0.035, lineHeight: height*0.035, fontSize: height*0.02, textAlign: "center", color: "white", letterSpacing: 0.5, borderRadius: 25, backgroundColor: '#3498db'} ]}>{`${languages[0][props.idLanguage].close}`}</Text>
                        </Pressable>
                    </Pressable>
                </Pressable> 
                <BannerAd userConsentContext={userConsentContext} />
            </Modal>
        </View>
    )
    
}          