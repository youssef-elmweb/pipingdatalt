import { React } from "react";
import { StyleSheet, Dimensions, Pressable, Text, Modal, View, Image, Linking } from "react-native";

import * as functions from "../../library/functions.js";

import { showAdIfReady } from "../ads/ads_manager/adsmanager.js";

import { languages } from "../../languages/languages";

export function ModalPremium (props) {

    const {width} = Dimensions.get("window");
    const {height} = Dimensions.get("window"); 
    

    return  (
        <View style={[ {justifyContent: "center", alignItems: "center"} ]}>
            <Modal style={[ {justifyContent: "center", alignItems: "center"} ]} animationType={"slide"} transparent={true} visible={props.statusModalPremium}>
                <Pressable style={[ {width: width, backgroundColor: "transparent"} ]} onPress={ props.makeStatusModalPremium }>
                    <Pressable style={[ {width: width, height: height*0.9, marginTop: (height*0.1), justifyContent: 'space-between', alignSelf: "center", alignItems: 'flex-end', opacity: 0.975, backgroundColor : "#151515"} ]} onTouchEnd={ (e) => { e.stopPropagation() } }>
                        <View style={[ {position: "relative", width: width, paddingVertical: Number(7.5), flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomWidth: 1, borderTopLeftRadius: 5, borderColor: "white", backgroundColor: "rgba(106, 13, 173, 0.4)"} ]}>
                            <Text style={[ {fontSize: Number(width*0.045), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "white"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium)}</Text> 

                            <Pressable style={[ {position: "absolute", left: Number(width*0.025), fontSize: (height > 1200 ? Number(width*0.025) : Number(width*0.033)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "black"} ]} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.production.pipingdata&hl=fr')}>
                                <Image alt={"compas"} style={[ { width: width*0.1, height: width*0.1 } ]} source={require('../../assets/images/compas_silver.png')} />
                            </Pressable>

                            <Pressable style={[ {position: "absolute", right: Number(width*0.025), fontSize: (height > 1200 ? Number(width*0.025) : Number(width*0.033)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "black"} ]} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.production.pipingdata&hl=fr')}>
                                <Image alt={"equerre"} style={[ { width: width*0.1, height: width*0.1 } ]} source={require('../../assets/images/equerre_silver.png')} />
                            </Pressable>
                        </View>

                        <View style={[ {width: width, height: Number(height*0.9), flexDirection: "column", justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent"} ]}>
                            <View style={[ {width: Number(width*0.9), height: Number(height*0.25), flexDirection: "column", justifyContent: "center", alignItems: "center"} ]}> 
                                <Text style={[ {fontSize: Number(width*0.035), textAlign: "center", color: "gold"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_text_title)}</Text>

                                <View style={[ {width: width, padding: width*0.015, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#313131"} ]}>
                                    <View style={[ {width: width*0.9, paddingHorizontal: Number(width*0.06), paddingVertical: Number(width*0.02), flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                        <Text style={[ {lineHeight: Number(width*0.05), fontSize: (height > 1200 ? Number(width*0.0277) : Number(width*0.04)), textAlign: "center", color: "lime"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_infos)}</Text>
                                    </View>
                                </View>

                                <View style={[ {width: width, marginBlockStart: 2.5, paddingHorizontal: Number(width*0.06), paddingVertical: Number(width*0.015), flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                    <Text style={[ {lineHeight: Number(width*0.06), fontSize: Number(width*0.03), textAlign: "center", color: "white"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_text)}</Text>
                                </View>
                            </View>

                            <View style={[ { flexDirection: "column", marginTop: height*0.015, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent"} ]}>                                 
                                <View style={[ {flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: "transparent"} ]}> 
                                    <View style={[ {width: width/2.95, maxHeight: height*0.33, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]}> 
                                        <Pressable style={[ styles.menuBox ]} backgroundColor={"forestgreen"} onPressOut={ () => { return false; } }>
                                            <Image alt={"elbow-double"} style={[ { width: width*0.075, height: width*0.075 } ]} source={require('../../assets/images/elbow_double.png')} />
                                        </Pressable>

                                        <View style={[ {width: width/3, minHeight: height*0.345, maxHeight: height*0.345, paddingTop: Number(width*0.013), paddingHorizontal: Number(width*0.03), flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                            <Text style={[ {lineHeight: Number(width*0.06), fontSize: Number(width*0.03), color: "white"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_elbow_double)}</Text>
                                        </View>
                                    </View>

                                    <View style={[ {width: width/2.95, maxHeight: height*0.33, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]}> 
                                        <Pressable style={[ styles.menuBox ]} backgroundColor={"forestgreen"} onPressOut={ () => { return false; } }>
                                            <Image alt={"elbow-double-oriented"} style={[ { width: width*0.075, height: width*0.075 } ]} source={require('../../assets/images/elbow_double_oriented.png')} />
                                        </Pressable>

                                        <View style={[ {width: width/3, minHeight: height*0.345, maxHeight: height*0.345, paddingTop: Number(width*0.013), paddingHorizontal: Number(width*0.03), flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                            <Text style={[ {lineHeight: Number(width*0.06), fontSize: Number(width*0.03), color: "white"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_elbow_double_oriented)}</Text>
                                        </View>
                                    </View>

                                    <View style={[ {width: width/2.95, maxHeight: height*0.33, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]}> 
                                        <Pressable style={[ styles.menuBox ]} backgroundColor={"forestgreen"} onPressOut={ () => { return false; } }>
                                            <Image alt={"elbow-slices"} style={[ { width: width*0.075, height: width*0.075 } ]} source={require('../../assets/images/elbow_slice.png')} />
                                        </Pressable>

                                        <View style={[ {width: width/3, minHeight: height*0.345, maxHeight: height*0.345, paddingTop: Number(width*0.013), paddingHorizontal: Number(width*0.03), flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                            <Text style={[ {lineHeight: Number(width*0.06), fontSize: Number(width*0.03), color: "white"} ]}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_elbow_slices)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={[ { height: height*0.225, flexDirection: "column", justifyContent: "flex-end", alignItems: "center", backgroundColor: "transparent"} ]}>                                 
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: height * 0.015, letterSpacing: 0.5 }}>{functions.firstLetterToUpperCase(languages[0][props.idLanguage].premium_launch_offer)}</Text>
                                    
                                    <Pressable style={{ width: width * 0.85, justifyContent: "center", alignSelf: "center", alignItems: "center", borderWidth: 2.5, borderColor: "silver", borderRadius: 25, backgroundColor: 'green' }} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.production.pipingdata&hl=fr')}>
                                        <Text style={{ width: width * 0.85, marginVertical: height * 0.01, lineHeight: width * 0.075, fontSize: width * 0.05, fontWeight: "bold", textAlign: "center", letterSpacing: 1.5, color: "white" }}>{`${functions.firstLetterToUpperCase(languages[0][props.idLanguage].pro)} 0.99 €`}</Text>
                                    </Pressable>
                                </View>

                                <Pressable style={[ { justifyContent: "center", alignSelf: "center", alignItems: "center", borderTopWidth: (height*0.01), borderBottomWidth: (height*0.05), borderColor: "transparent", } ]} onPress={ () => { props.makeStatusModalPremiumOnModalPremium(); showAdIfReady();} }>
                                    <Text style={[ { width: Number(width*0.45), lineHeight: Number(height*0.05), fontSize: Number(height*0.02), textAlign: "center", letterSpacing: 0.5, color: "white", borderRadius: 25, backgroundColor: '#3498db' } ]}>{languages[0][props.idLanguage].later}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable> 
                </Pressable>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    menuBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }
});