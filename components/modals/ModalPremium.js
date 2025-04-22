import { React } from "react";
import { StyleSheet, Dimensions, Pressable, Text, Modal, View, Image } from "react-native";

import { languages } from "../../languages/languages";

export function ModalPremium (props) {

    const {width} = Dimensions.get("window");
    const {height} = Dimensions.get("window"); 
    
    const firstLetterToUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return  (
        <View style={[ {justifyContent: "center", alignItems: "center"} ]}>
            <Modal style={[ {justifyContent: "center", alignItems: "center"} ]} animationType={"slide"} transparent={true} visible={props.statusModalPremium}>
                <Pressable style={[ {width: width, backgroundColor: "transparent"} ]} onPress={ props.makeStatusModalPremium }>
                    <Pressable style={[ {width: width, height: (height > 1200 ? Number(height*0.95) : Number(height*0.81)), marginTop: (height > 1200 ? Number(height*0.05) : Number(height*0.19)), paddingBottom: Number(width*0.05), justifyContent: 'space-between', alignSelf: "center", alignItems: 'center', opacity: 0.95, backgroundColor : "#151515"} ]} onTouchEnd={ (e) => { e.stopPropagation() } }>
                        <View style={[ {position: "relative", width: width, paddingVertical: Number(7.5), flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomWidth: 0.75, borderTopLeftRadius: 5, borderColor: "white", backgroundColor: "rgba(106, 13, 173, 0.4)"} ]}>
                            <Text style={[ {fontSize: Number(width*0.045), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "white"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].premium)}</Text> 

                            <Pressable style={[ {position: "absolute", right: Number(width*0.025), fontSize: (height > 1200 ? Number(width*0.025) : Number(width*0.033)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "black"} ]} onPressOut={ () => { return false; } }>
                                <Image alt={"equerre"} style={[ { width: width*0.1, height: width*0.1 } ]} source={require('../../assets/images/equerre_gold.png')} />
                            </Pressable>
                        </View>

                        <View style={[ {width: width, height: Number(height*0.75), flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "transparent"} ]}>
                            <View style={[ {width: Number(width*0.9), flexDirection: "column", justifyContent: "center", alignItems: "center"} ]}> 
                                <Text style={[ {fontSize: Number(width*0.035), textAlign: "center", color: "gold"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].premium_text_title)}</Text>

                                <View style={[ {width: width, padding: width*0.02, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#313131"} ]}>
                                    <Pressable style={[ styles.menuBox ]} backgroundColor={(props.elbowLayer === 'elbow-double' ? "forestgreen" : "tomato")} onPressOut={ () => { return false; } }>
                                        <Image alt={"elbow-double"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('../../assets/images/elbow_double.png')} />
                                    </Pressable>

                                    <Pressable style={[ styles.menuBox ]} backgroundColor={(props.elbowLayer === 'elbow-double-oriented' ? "forestgreen" : "tomato")} onPressOut={ () => { return false; } }>
                                        <Image alt={"elbow-double-oriented"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('../../assets/images/elbow_double_oriented.png')} />
                                    </Pressable>

                                    <Pressable style={[ styles.menuBox ]} backgroundColor={(props.elbowLayer === 'elbow-slices' ? "forestgreen" : "tomato")} onPressOut={ () => { return false; } }>
                                        <Image alt={"elbow-slices"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('../../assets/images/elbow_slice.png')} />
                                    </Pressable>
                                </View>

                                <View style={[ {width: width, marginBlockStart: 5, paddingHorizontal: Number(width*0.06), paddingVertical: Number(width*0.025), flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                    <Text style={[ {lineHeight: Number(width*0.06), fontSize: (height > 1200 ? Number(width*0.03) : Number(width*0.039)), textAlign: "center", color: "white"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].premium_text)}</Text>
                                </View>
                            </View>

                            <View style={[ {width: Number(width*0.9), marginVertical: (height > 1200 ? Number(width*0.075) : 0), flexDirection: "column", justifyContent: "center", alignItems: "center"} ]}> 
                                <Text style={[ {fontSize: Number(width*0.035), textAlign: "center", color: "gold"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].for_me_label)}</Text>

                                <View style={[ {width: width, marginBlockStart: 5, paddingHorizontal: Number(width*0.06), paddingVertical: Number(width*0.025), flexDirection: "row", justifyContent: "flex-start", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                    <Text style={[ {lineHeight: Number(width*0.06), fontSize: (height > 1200 ? Number(width*0.03) : Number(width*0.039)), color: "white"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].for_me)}</Text>
                                </View>
                            </View>

                            <Pressable style={[ { width: width*0.85, marginBottom: Number(width*0.05), justifyContent: "center", alignSelf: "center", alignItems: "center", borderRadius: 25, backgroundColor: 'rgba(106, 13, 173, 0.4)' } ]} onPress={ false }>
                                <Text style={[ { width: width*0.85, height: Number(width*0.125), lineHeight: width*0.125, fontSize: Number(height*0.03), fontWeight: "bold", textAlign: "center", letterSpacing: 1, color: "white" } ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].premium)}</Text>
                            </Pressable>

                            <Pressable style={[ { height: Number(width*0.035), marginBottom: (height > 1200 ? Number(width*0.025) : Number(width*0.075)), justifyContent: "center", alignSelf: "center", alignItems: "center" } ]} onPress={ props.makeStatusModalPremium }>
                                <Text style={[ { width: Number(width*0.35), height: Number(height*0.035), lineHeight: Number(height*0.035), fontSize: Number(height*0.02), textAlign: "center", letterSpacing: 0.5, color: "white", borderRadius: 25, backgroundColor: '#3498db' } ]}>{languages[0][props.idLanguage].later}</Text>
                            </Pressable>
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