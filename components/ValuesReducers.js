

import React from 'react';
import { StyleSheet, View, Text, Animated as AnimNat, Dimensions } from "react-native";

import { ValidatedValue } from './ValidatedValue.js';

import { Diameter } from './Diameter.js';


export function ValuesReducers (props) {

    const { height, width } = Dimensions.get("window");

    const ValidatedValueAnimated = AnimNat.createAnimatedComponent(ValidatedValue);


     return (
        <View style={{ flexDirection: "row" }}>

            <Diameter sizeText={props.sizeText} color={"magenta"} currentDiameter={props.currentDiameterInferiorReducer} norme={props.norme} idSettingsDiameter={props.idSettingsDiameter} />

            <Diameter sizeText={props.sizeText} color={"aqua"} currentDiameter={props.currentDiameterSuperiorReducer} norme={props.norme} idSettingsDiameter={props.idSettingsDiameter} />

            <View key={"diam-red-curves"} style={[ { width: width*0.27, marginInlineStart: width*0.05, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                <View style={[ { lineHeight: height*0.0225, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                    <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{"/"}</Text>
                </View>

                {(props.currentReducer == "reducer-conc" ?
                    <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                        <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="silver" valueForCheck={props.curveReducerTop} />
                        <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="white" valueForCheck={props.curveReducerBottom} />
                    </View>
                : false)}

                {(props.currentReducer == "reducer-exc" ?
                    <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                        <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="silver" valueForCheck={props.curveReducerTopExc} />
                        <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="white" valueForCheck={props.curveReducerBottomExc} />
                    </View>
                : false)}
            </View>

            <View key={"diam-red-heights"} style={[ { width: width*0.27, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                <View style={[ { lineHeight: height*0.0225, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                    <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{`H`}</Text>
                </View>

                <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                    <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="silver" valueForCheck={ props.heightReducerTop } />
                    <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={props.sizeText} color="lime" valueForCheck={ props.heightReducerBottom } />
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
    },
    datasTopBar: {
        marginBottom: 7.5,
        paddingRight: 11,
        paddingLeft: 11,
        fontWeight: "500",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#515151"
    }
});