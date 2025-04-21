import { React } from "react";
import { Dimensions, Pressable, Text, Modal, View } from "react-native";

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
                        <View style={[ {position: "relative", width: width, paddingTop: Number(5), paddingBottom: Number(5), flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomWidth: 0.75, borderTopLeftRadius: 5, borderColor: "white", backgroundColor: "#00BFFF"} ]}>
                            <Text style={[ {fontSize: Number(width*0.045), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "white"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].premium)}</Text> 
                            <Text style={[ {position: "absolute", right: Number(width*0.025), fontSize: (height > 1200 ? Number(width*0.025) : Number(width*0.033)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "black"} ]}>{`${languages[0][props.idLanguage].version} 1.8.0`}</Text>
                        </View>

                        <View style={[ {width: width, height: Number(height*0.75), marginBottom: (height > 1200 ? Number(width*0.05) : Number(0)), flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "transparent"} ]}>
                            <View style={[ {width: Number(width*0.9), flexDirection: "column"} ]}> 
                                <Text style={[ {fontSize: Number(width*0.035), textAlign: "center", color: "#54a0ff"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].confidentiality)}</Text>

                                <View style={[ {padding: Number(width*0.025), flexDirection: "row", justifyContent: "flex-start", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                    <Text style={[ {lineHeight: Number(width*0.06), fontSize: (height > 1200 ? Number(width*0.03) : Number(width*0.039)), color: "white"} ]}>{languages[0][props.idLanguage].text_confidentiality}</Text>
                                </View>
                            </View>

                            <View style={[ {width: Number(width*0.9), marginVertical: (height > 1200 ? Number(width*0.075) : 0), flexDirection: "column"} ]}> 
                                <Text style={[ {fontSize: Number(width*0.035), textAlign: "center", color: "#54a0ff"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].for_me_label)}</Text>

                                <View style={[ {padding: Number(width*0.025), flexDirection: "row", justifyContent: "flex-start", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                    <Text style={[ {lineHeight: Number(width*0.06), fontSize: (height > 1200 ? Number(width*0.03) : Number(width*0.039)), color: "white"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].for_me)}</Text>
                                </View>
                            </View>

                            <View style={[ {width: Number(width*0.9), marginTop: (height > 1200 ? Number(width*0.05) : Number(0)), marginBottom: (height > 1200 ? Number(width*0.1) : Number(width*0.05)), flexDirection: "column"} ]}> 
                                <Text style={[ {fontSize: Number(width*0.035), textAlign: "center", color: "#54a0ff"} ]}>{firstLetterToUpperCase(languages[0][props.idLanguage].contact_label)}</Text>

                                <View style={[ {padding: Number(width*0.025), flexDirection: "column", justifyContent: "flex-start", alignItems: "center", borderRadius: 7.5, backgroundColor: "#252525"} ]}>
                                    <Text style={[ {padding: Number(width*0.01), color: "#3498db"} ]} onPress={ () => Linking.openURL('mailto:""') }>{languages[0][props.idLanguage].mail}</Text>
                                </View>
                            </View>

                            <Pressable style={[ {height: Number(width*0.035), marginBottom: (height > 1200 ? Number(width*0.025) : Number(width*0.075)), justifyContent: "center", alignSelf: "center", alignItems: "center"} ]} onPress={ props.makeStatusModalPremium }>
                                <Text style={[ {width: Number(width*0.35), height: Number(height*0.035), lineHeight: Number(height*0.035), fontSize: Number(height*0.02), textAlign: "center", letterSpacing: 0.5, color: "white", borderRadius: 25, backgroundColor: '#3498db'} ]}>{languages[0][props.idLanguage].close}</Text>
                            </Pressable>
                        </View>
                    </Pressable> 
                </Pressable>
            </Modal>
        </View>
    )
}