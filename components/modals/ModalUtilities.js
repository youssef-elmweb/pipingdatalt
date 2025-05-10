import React, { useState } from "react";
import { StyleSheet, Dimensions, Button, Pressable, Text, Modal, View, Image, SafeAreaView, FlatList } from "react-native";

import * as functions from "./../../library/functions.js";

import { languages } from "../../languages/languages";

import { ModalInfos } from "./ModalInfos.js";
import { ModalPremium } from "./ModalPremium.js";

import ModalConsent from "./ModalConsent.js";
import SponsorFallback from "../SponsorFallback.js";

export function ModalUtilities (props) {

    const [statusModalInfos, setStatusModalInfos] = useState(false);
    const [showModalConsent, setShowModalConsent] = useState(false);
    
    const {width} = Dimensions.get("window");
    const {height} = Dimensions.get("window"); 


    const DATA = [
        {
            id: 1,
            title: languages[0][props.idLanguage].download
        },
        {
            id: 2,
            title: <Pressable onPress={ () => setStatusModalInfos(true) }><View style={{ width: Number(width*0.6), flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}><Text style={ {height: height*0.06, lineHeight: Number(height*0.06), fontSize: Number(height*0.02), color: "white"} }>{languages[0][props.idLanguage].info}</Text></View></Pressable>
        },
        {
            id: 3,
            title: <Pressable title={languages[0][props.idLanguage].modify_choice} onPress={() => { setShowModalConsent(true); }}><Text style={ {height: height*0.06, lineHeight: Number(height*0.06), fontSize: Number(height*0.02), color: "white"} }>{languages[0][props.idLanguage].ad_preferences}</Text></Pressable>
        },
        {
            id: 4,
            title: languages[0][props.idLanguage].share
        },
        {
            id: 5,
            title: <Pressable onPress={ () => props.setStatusModalPremium(true) }><View style={{ width: Number(width*0.6), flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}><Text style={ {height: height*0.06, lineHeight: Number(height*0.06), fontSize: Number(height*0.02), color: "white"} }>{languages[0][props.idLanguage].premium}</Text></View></Pressable>
        },
    ];


    const Item = ({title}) => (
        <View style={ {width: Number(width*0.6), paddingLeft: Number(width*0.075), borderRightWidth: Number(0.75), borderColor: "gray", backgroundColor: '#202020'} }>
            <Text style={[ styles.titleUtility, {height: height*0.06, lineHeight: Number(height*0.06), fontSize: Number(height*0.02)} ]}>{title}</Text>
        </View>
    );

    const makeStatusModalInfos = () => {
        setStatusModalInfos(false); 
    }

    const makeStatusModalPremium = () => {
        props.makeStatusModalPremiumOnApp(false);
    }


    return  (
                <View>
                    <ModalInfos idLanguage={props.idLanguage} statusModalInfos={statusModalInfos} makeStatusModalInfos={makeStatusModalInfos} />
                    <ModalPremium idLanguage={props.idLanguage} statusModalPremium={props.statusModalPremiumOnApp} makeStatusModalPremium={makeStatusModalPremium} />
                    <ModalConsent showModalConsent={showModalConsent || null} setVisible={setShowModalConsent} />

                    <Modal style={[ {justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]} animationType={"slide"} transparent={true} visible={props.statusModalUtilities}>
                        <Pressable style={[ {width: width, backgroundColor: "transparent"} ]} onPress={ props.makeStatusModalUtilities } >
                            <Pressable style={[ {width: width, height: Number(height*0.74), flexDirection: "row", marginTop: Number(height*0.06), flexDirection: "column", justifyContent: "space-around", alignSelf: "flex-start", alignItems: "flex-start", opacity: 0.95, backgroundColor: "#353535"} ]} onTouchEnd={ (e) => { e.stopPropagation() } }>
                                <View style={[ {paddingBottom: width*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]}>
                                    <View style={[ {width: width*0.8, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderColor: "white", backgroundColor: "#2c3e50"} ]}>
                                        <Text style={[{ fontSize: height*0.02, fontWeight: "bold", color: "white", letterSpacing: 0.5 }]}>{languages[0][props.idLanguage].utilities}</Text> 
                                    </View>
                                    
                                    {(height > 650 ?
                                    <Pressable style={[ {width: width*0.2, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]} onPress={ props.makeStatusModalUtilities }>
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
                                    
                                    <FlatList key={"listUtilities"} data={DATA} renderItem={ ({item}) => <Pressable style={[ {height: height*0.1, marginTop: Number(height*0.0025)} ]} key={item.title} onPress={ () => { if (item.id == 1) { props.makeStatusModalUtilities(false); props.makeStatusModalPrinters(true); } else if (item.id == 4) { functions.onShare(); } }}><Item key={item.title} title={item.title} /></Pressable>} />
                                </SafeAreaView>
                            </Pressable>
                        </Pressable> 
                        
                        <SponsorFallback style={ { width: width } } />
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