import { React, useState } from "react";
import { StyleSheet, Dimensions, Pressable, Text, Modal, View, Platform, NativeModules } from "react-native";

import * as Print from 'expo-print';
import { PressablePrint } from  "../PressablePrint";

import { languages } from "../../languages/languages";

export function ModalPrinters (props) {

    const [selectedPrinter] = useState(null);

    const {width} = Dimensions.get("window");
    const {height} = Dimensions.get("window"); 
    const heightStatusBar = NativeModules.StatusBarManager.HEIGHT;

    const makePrintSheet = async (printSheet) => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        try {
            await Print.printAsync({
                html: printSheet,
                printerUrl: selectedPrinter?.url // iOS only
            });
        } catch(error){
            console.log(error, "error print");
        }
    };

    const firstLetterToUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return  (
                <Modal visible={props.statusModalPrinters}>
                    <Pressable style={[ {flexDirection: "row", justifyContent: "center", alignItems: "center"} ]} onPress={ props.makeStatusModalPrinters }>
                        <Text style={[ {flex: 1, height: (Platform.OS == "ios" ? Number(50) : Number(heightStatusBar+30)), lineHeight: (Platform.OS == "ios" ? Number(50) : Number(heightStatusBar+30)), fontSize: Number(15), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "white", borderBottomWidth: 0.75, borderColor: "white", backgroundColor: 'dodgerblue'} ]}>
                            {`${languages[0][props.idLanguage].back}`}
                        </Text>
                    </Pressable>

                    <View style={[ {marginTop: (Platform.OS == "ios" && height < 1200 ? Number(20) : Number(heightStatusBar)), flexDirection: "row", justifyContent: "center", alignItems: "center"} ]}>
                        <Text style={[ {flex: 1, height: (Platform.OS == "ios" ? Number(50) : Number(heightStatusBar+30)), lineHeight: (Platform.OS == "ios" ? Number(50) : Number(heightStatusBar+30)), fontSize: Number(width*0.07), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, color: "black"} ]}>
                            {firstLetterToUpperCase(languages[0][props.idLanguage].download)}
                        </Text>
                    </View>

                    <View style={[ {marginTop: (height < 1200 ? Number(height*0.05) : Number(height*0.1))} ]}>
                        <Pressable style={[ {justifyContent: "center", alignItems: "center"} ]}>
                            <View style={[ {height: (height < 1200 ? Number(70) : Number(heightStatusBar+50)), flexDirection: "column", alignItems: "center", marginBottom: 20 } ]}>
                                <Text style={[ {marginRight: Number(width*0.03), fontSize: (height < 1200 ? Number(width*0.04) : Number(width*0.025)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000", color: "black"} ]}>
                                    {`${firstLetterToUpperCase(languages[0][props.idLanguage].diameters)} / ${firstLetterToUpperCase(languages[0][props.idLanguage].formats)} / ${firstLetterToUpperCase(languages[0][props.idLanguage].radii)}`}
                                </Text>

                                <PressablePrint namePrintSheet={"ABAC"} idLanguage={props.idLanguage} makePrintSheet={makePrintSheet} style={[ {justifyContent: "center", alignItems: "center"} ]} />

                                {(selectedPrinter ? <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text> : false)}
                            </View>
                            
                            <View style={[ {height: (height < 1200 ? Number(70) : Number(heightStatusBar+50)), flexDirection: "column", alignItems: "center", marginBottom: 20 } ]}>
                                <Text style={[ {marginRight: Number(width*0.03), fontSize: (height < 1200 ? Number(width*0.04) : Number(width*0.025)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000", color: "black"} ]}>
                                    {`${firstLetterToUpperCase(languages[0][props.idLanguage].isoSheet)} / ${firstLetterToUpperCase(languages[0][props.idLanguage].nomenclature)}`}
                                </Text>

                                <PressablePrint namePrintSheet={"ISOSHEETNOMENCLATURE"} idLanguage={props.idLanguage} makePrintSheet={makePrintSheet} style={[ {justifyContent: "center", alignItems: "center"} ]} />

                                {(selectedPrinter ? <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text> : false)}
                            </View>

                            <View style={[ {height: (height < 1200 ? Number(70) : Number(heightStatusBar+50)), flexDirection: "column", alignItems: "center", marginBottom: 20 } ]}>
                                <Text style={[ {marginRight: Number(width*0.03), fontSize: (height < 1200 ? Number(width*0.04) : Number(width*0.025)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000", color: "black"} ]}>
                                    {`${firstLetterToUpperCase(languages[0][props.idLanguage].isoSheet)} / ${firstLetterToUpperCase(languages[0][props.idLanguage].annotations)}`}
                                </Text>

                                <PressablePrint namePrintSheet={"ISOSHEETANNOTATIONS"} idLanguage={props.idLanguage} makePrintSheet={makePrintSheet} style={[ {justifyContent: "center", alignItems: "center"} ]} />

                                {(selectedPrinter ? <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text> : false)}
                            </View>

                            <View style={[ {height: (height < 1200 ? Number(70) : Number(heightStatusBar+50)), flexDirection: "column", alignItems: "center"} ]}>
                                <Text style={[ {marginRight: Number(width*0.03), fontSize: (height < 1200 ? Number(width*0.04) : Number(width*0.025)), fontWeight: "bold", textAlign: "center", letterSpacing: 0.5, textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000", color: "black"} ]}>
                                    {`${firstLetterToUpperCase(languages[0][props.idLanguage].isoSheet)}`}
                                </Text>

                                <PressablePrint namePrintSheet={"ISOSHEET"} idLanguage={props.idLanguage} makePrintSheet={makePrintSheet} style={[ {justifyContent: "center", alignItems: "center"} ]} />

                                {(selectedPrinter ? <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text> : false)}
                            </View>
                        </Pressable>
                    </View>
                </Modal>
            )
    }

    const styles = StyleSheet.create({
        printer: {
            textAlign: 'center',
        },
    });