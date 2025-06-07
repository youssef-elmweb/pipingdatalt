import React from 'react';
import { StyleSheet, View, Text, Animated as AnimNat, Dimensions } from "react-native";

import { Diameter } from './Diameter.js';

import { languages } from '../languages/languages.js';

import { ReText } from './ReText.js';


export function ValuesElbow (props) {

    const { height, width } = Dimensions.get("window");

    const ReTextAnimated = AnimNat.createAnimatedComponent(ReText);


     return (
        <View style={{ flexDirection: "row" }}>
            <Diameter sizeText={props.sizeText} color={"aqua"} currentDiameter={props.currentDiameter} norme={props.norme} idSettingsDiameter={props.idSettingsDiameter} />

            <View key={"intra-extra"} style={[ { flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                <View style={[ { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRightWidth: width*0.025, borderColor: "#252525", backgroundColor: "transparent" } ]}>
                    <Text style={[ styles.labelTopBar, {width: width*0.375, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{`${languages[0][props.idLanguage].intra} / ${languages[0][props.idLanguage].extra}`}</Text>
                </View>

                <View style={[ { width: width*0.35, paddingInlineStart: width*0.125, backgroundColor: "transparent"} ]}>
                    <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color={props.colorDatasCurves} name={props.intra} />
                    <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color={props.colorDatasCurves} name={props.extra} />
                </View>
            </View>

            <View key={"angle-radius"} style={[ { flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                <View style={[ { lineHeight: height*0.0225, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                    <Text style={[ styles.labelTopBar, {width: width*0.325, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{`${languages[0][props.idLanguage].angle} / ${languages[0][props.idLanguage].radius}`}</Text>
                </View>

                <View style={[ {width: width*0.35, paddingInlineStart: width*0.125, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                    <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="white" angle={ props.angle } />
                    <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="lime" name={ props.radius } />
                </View>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    labelTopBar: {
        fontWeight: "500",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#515151"
    }
});