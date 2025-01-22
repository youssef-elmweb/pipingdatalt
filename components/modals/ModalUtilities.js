import { React } from "react";
import { StyleSheet, Dimensions, Pressable, Text, Modal, View, Image, SafeAreaView, FlatList } from "react-native";

import * as functions from "./../../library/functions.js";

import { languages } from "../../languages/languages";

export function ModalUtilities (props) {

    const {width} = Dimensions.get("window");
    const {height} = Dimensions.get("window"); 

    const DATA = [
        {
            id: 1,
            title: languages[0][props.idLanguage].download
        },
        {
            id: 2,
            title: languages[0][props.idLanguage].share
        }
    ];

    const Item = ({title}) => (
        <View style={ {width: Number(width*0.6), marginVertical: Number(8), paddingVertical: Number(9), paddingLeft: Number(15), paddingRight: Number(15), borderRightWidth: Number(0.75), borderColor: "gray", backgroundColor: '#202020'} }>
            <Text style={[ styles.titleUtility, {fontSize: Number(height*0.02)} ]}>{title}</Text>
        </View>
    );

    return  (
                <Modal style={[ {justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]} animationType={"slide"} transparent={true} visible={props.statusModalUtilities}>
                    <Pressable style={[ {width: width, backgroundColor: "transparent"} ]} onPress={ props.makeStatusModalUtilities } >
                        <Pressable style={[ {width: width, height: Number(height*0.81), flexDirection: "row", marginTop: Number(height*0.19), flexDirection: "column", justifyContent: "space-around", alignSelf: "flex-start", alignItems: "flex-start", opacity: 0.95, backgroundColor: "#353535"} ]} onTouchEnd={ (e) => { e.stopPropagation() } }>
                            <View style={[ {paddingTop: width*0.06, paddingBottom: width*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]}>
                                <View style={[ {width: width*0.8, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 0.75, borderColor: "white", backgroundColor: "#2c3e50"} ]}>
                                    <Text style={[{ fontSize: height*0.02, fontWeight: "bold", color: "white", letterSpacing: 0.5 }]}>{languages[0][props.idLanguage].utilities}</Text> 
                                </View>
                                
                                {(height > 650 ?
                                <Pressable style={[ {width: width*0.2, height: height*0.06, flexDirection: "row", justifyContent: "center", alignItems: "center"} ]} onPress={ props.makeStatusModalUtilities }>
                                    <View style={[ {width: width*0.2, height: height*0.06, lineHeight: height*0.035, fontSize: height*0.02, justifyContent: "center", alignItems: "center", textAlign: "center", letterSpacing: 0.5, color: "white", borderBottomWidth: 0.75, borderColor: "white", backgroundColor: 'dodgerblue'} ]}>
                                        <Image alt={"down"} style={[ {width: height*0.06, height: height*0.06} ]} source={ require("../../assets/image/chevron-bas.png") } />
                                    </View>
                                </Pressable> : 
                                <View style={[ {width: width*0.2, height: height*0.06, justifyContent: "center", alignItems: "center", backgroundColor: 'dodgerblue'} ]}>
                                    <Button style={[ {width: width*0.2, height: height*0.06, lineHeight: height*0.06, fontSize: height*0.02, backgroundColor: 'white'} ]} color={"white"} title={"⌄"} onPress={ props.makeStatusModalUtilities } />
                                </View>)}
                            </View>

                            <SafeAreaView style={[ {marginTop: Number(height*0.05)} ]}>
                                <FlatList key={"listUtilities"} data={DATA} renderItem={ ({item}) => <Pressable style={[ {marginTop: Number(height*0.005), marginBottom: Number(height*0.005)} ]} key={item.title} onPress={ () => { if (item.id == 1) { props.makeStatusModalUtilities(false); props.makeStatusModalPrinters(true); } else if (item.id == 2) { functions.onShare() } }}><Item key={item.title} title={item.title} /></Pressable>} />
                            </SafeAreaView>
                        </Pressable>
                    </Pressable> 
                </Modal>
            )
    }

    const styles = StyleSheet.create({
        titleUtility: {
            fontSize: 15,
            color: "white"
        }
    });