import { React, useRef } from "react";
import { StyleSheet, Dimensions, View, PanResponder, Animated } from "react-native";
import { Svg } from 'react-native-svg';

import { ConcentricReducer } from "../ConcentricReducer.js";
import { ExcentricReducer } from "../ExcentricReducer.js";

import { DATAS_PIPES } from "../../datas/datas_pipes.js";
import { DATAS_TRIGONOMETRICS } from "../../datas/datas_trigonometrics.js";
import { DATAS_REDUCER } from "../../datas/datas_reducers.js";


////////////////////////////////////////////// CONCENTRIC REDUCER
////////////////////////////////////////////////////////////////////
export function ViewReducer (props) {

    //////////////////// GENERAL CONST //////////////////////////////////
    const { width, height } = Dimensions.get("window");

    const hypotenuseBase = Math.hypot(DATAS_REDUCER.reducerHeight, DATAS_REDUCER.diameterReductionDiffBase);
    const angle = Math.asin(DATAS_REDUCER.reducerHeight / hypotenuseBase) * DATAS_TRIGONOMETRICS.oneRad;

    const inputRange = [];
    const outputRangePathRightSide = [];
    const outputRangePathLeftSide = [];
    const outputRangePathHeightTop = [];

    const outputRangePathRightSideBottom = [];
    const outputRangePathLeftSideBottom = [];
    const outputRangePathHeightBottom = [];

    const outputRangePathExcentricRightSide = [];
    const outputRangePathExcentricLeftSideBottom = [];

    const PANX = useRef(new Animated.Value(Number(parseFloat(width*0.1).toFixed(2)))).current;
    const PANY = useRef(new Animated.Value(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)))).current;
    const PAN = useRef(new Animated.ValueXY({x: PANX._value, y: PANY._value})).current;
    //////////////////// GENERAL CONST //////////////////////////////////


    const getDiameterReducerDiffForPath = (localHeight) => { // FOR PATH SVG
        let hypotenuse = ((DATAS_REDUCER.heightRemainder - localHeight) / (Math.sin(angle*DATAS_TRIGONOMETRICS.oneDegreRad)));
        let diameterReductionDiff = Math.cos(angle*DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;

        return Number(Math.round(DATAS_REDUCER.diameterReductionDiffBase) - Math.round(diameterReductionDiff));
    }

    const getDiameterReducerAndHeightForDatas = (localHeight) => { // FOR DATAS
        let diameterSuperior = (props.diameterSuperiorReducer._value == 0 ? DATAS_PIPES[1][props.norme._value] : DATAS_PIPES[props.diameterSuperiorReducer._value][props.norme._value]);
        let diameterInferior = DATAS_PIPES[props.diameterInferiorReducer._value][props.norme._value]; 
        

        let heightReducerPath = DATAS_REDUCER.heightRemainder - localHeight;
        let heightReducer = (diameterSuperior - diameterInferior) * 3;

        let heightReducerTop = Math.round((heightReducer) - ((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath));
        let heightReducerBottom = Number.parseFloat(((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath).toFixed(1));

        console.log(heightReducerTop, heightReducerBottom, "heightReducerTop, heightReducerBottom");

        let diameterReductionDiff = ((diameterSuperior - diameterInferior) * 0.5);
        let angle = Math.asin(heightReducer / Math.hypot(heightReducer, diameterReductionDiff)) * DATAS_TRIGONOMETRICS.oneRad;
        
        let curveReducer = heightReducer / (Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad));
        let curveReducerBottom = heightReducerBottom / (Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad));
        let curveReducerTop = curveReducer - curveReducerBottom;

        let currentDiameterReductionDiff = Math.cos(angle * DATAS_TRIGONOMETRICS.oneDegreRad) * curveReducerBottom;

        let currentDiameterRedConc = DATAS_PIPES[props.diameterInferiorReducer._value][props.norme._value] + ((diameterReductionDiff - currentDiameterReductionDiff) * 2);
        let currentDiameterRedExc = DATAS_PIPES[props.diameterInferiorReducer._value][props.norme._value] + ((diameterReductionDiff - currentDiameterReductionDiff));

        DATAS_REDUCER.absolutePositionHeight = Number.parseFloat(localHeight.toFixed(1));
        DATAS_REDUCER.currentDiameterRedConc = Number.parseFloat(currentDiameterRedConc.toFixed(1));
        DATAS_REDUCER.currentDiameterRedExc = Number.parseFloat(currentDiameterRedExc.toFixed(1));
        DATAS_REDUCER.heightReducerTop = Math.round(heightReducerTop);
        DATAS_REDUCER.heightReducerBottom = Math.round(heightReducerBottom);
        DATAS_REDUCER.curveReducerTop = Math.round(curveReducerTop);
        DATAS_REDUCER.curveReducerBottom = Math.round(curveReducerBottom);

        console.log(curveReducerTop, "curveReducerTop");
        console.log(curveReducer, heightReducerBottom);



        props.shareDiameterAndHeight(DATAS_REDUCER);
    }


    for (let i = Math.round(height*0.36); i <= Math.round(height*0.775); i++) {  
        let rightSide = `M ${Math.round(width*0.5)} ${i} L ${width*0.5 + ((width*0.2 + getDiameterReducerDiffForPath(i)))} ${i} L ${Math.round(width*0.7)} ${Math.round(height*0.36)}`;
        let leftSide = `M ${Math.round(width*0.5)} ${i} L ${width*0.5 - ((width*0.2 + getDiameterReducerDiffForPath(i)))} ${i} L ${Math.round(width*0.3)} ${Math.round(height*0.36)}`;

        let rightSideBottom = `M ${Math.round(width*0.1)} ${Math.round(height*0.775)} L ${width*0.5 - ((width*0.2 + getDiameterReducerDiffForPath(i)))} ${i}`;
        let leftSideBottom = `M ${Math.round(width*0.9)} ${Math.round(height*0.775)} L ${width*0.5 + ((width*0.2 + getDiameterReducerDiffForPath(i)))} ${i}`;

        let heightTop = `M ${width*0.5} ${Math.round(height*0.36)} L ${width*0.5} ${Math.round(i)}`;
        let heightBottom = `M ${width*0.5} ${Math.round(height*0.775)} L ${width*0.5} ${Math.round(i)}`;

        let excentricRightSide = `M ${Math.round(width*0.5)} ${i} L ${width*0.5 + (width*0.2)} ${i} L ${Math.round(width*0.7)} ${Math.round(height*0.36)}`;
        let excentricLeftSideBottom = `M ${Math.round(width*0.7)} ${Math.round(height*0.775)} L ${width*0.5 + ((width*0.2))} ${i}`;

        inputRange.push(Math.round(i));

        outputRangePathRightSide.push(rightSide);
        outputRangePathLeftSide.push(leftSide);
        outputRangePathHeightTop.push(heightTop);

        outputRangePathRightSideBottom.push(rightSideBottom);
        outputRangePathLeftSideBottom.push(leftSideBottom);
        outputRangePathHeightBottom.push(heightBottom);

        outputRangePathExcentricRightSide.push(excentricRightSide);
        outputRangePathExcentricLeftSideBottom.push(excentricLeftSideBottom);
    }


    const rightSide = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathRightSide, 
        extrapolate: "clamp"
    })

    const leftSide = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathLeftSide, 
        extrapolate: "clamp"
    })

    const heightTop = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathHeightTop, 
        extrapolate: "clamp"
    })

    const rightSideBottom = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathRightSideBottom, 
        extrapolate: "clamp"
    })

    const leftSideBottom = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathLeftSideBottom, 
        extrapolate: "clamp"
    })

    const heightBottom = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathHeightBottom, 
        extrapolate: "clamp"
    })

    const excentricRightSide = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathExcentricRightSide, 
        extrapolate: "clamp"
    })

    const excentricLeftSideBottom = props.absolutePositionHeight.interpolate({
        inputRange: inputRange,
        outputRange: outputRangePathExcentricLeftSideBottom, 
        extrapolate: "clamp"
    })


    ////////////////////////////////////////////// CONCENTRIC REDUCER
    ////////////////////////////////////////////////////////////////////
    const panResponderConcentricReducer = useRef( 

        PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => {     
                /*if (gestureState.moveY > ((height*0.5) + (width*0.4))) {
                    PANX.setValue(Number(parseFloat(width*0.1).toFixed(2)));
                    PANY.setValue(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)));

                    return false;
                }
                if (gestureState.moveY < ((height*0.5) + (width*0.4)) && gestureState.moveX < (width*0.1)) {
                    PANX.setValue(Number(parseFloat(width*0.1).toFixed(2)));
                    PANY.setValue(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)));

                    return false;
                }
                else {
                    true;
                }*/
            },

            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                /*if (gestureState.moveY > ((height*0.5) + (width*0.4))) {
                    PANX.setValue(Number(parseFloat(width*0.1).toFixed(2)));
                    PANY.setValue(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)));
                    
                    return false;
                }
                if (gestureState.moveY < ((height*0.5) + (width*0.4)) && gestureState.moveX < (width*0.1)) {
                    PANX.setValue(Number(parseFloat(width*0.1).toFixed(2)));
                    PANY.setValue(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)));

                    return false;
                }
                else {
                    true;
                }*/
            },

            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (gestureState.moveY > Math.round(height*0.775)) { // there SIN DYNAMCLY RETURN
                    getDiameterReducerAndHeightForDatas(Math.round(height*0.775));
                    getDiameterReducerDiffForPath(Math.round(height*0.775));
                }   if (gestureState.moveY < Math.round((height*0.36))) {
                        getDiameterReducerAndHeightForDatas(Math.round(height*0.36));
                        getDiameterReducerDiffForPath(Math.round(height*0.36));
                    }

                PAN.setOffset({
                    x: parseFloat(PANX._value),
                    y: parseFloat(PANY._value)
                });

                return true;
            },

            onPanResponderGrant: () => { Animated.event([null, {dx: PAN.x, dy: PAN.y}], {useNativeDriver: false}) },

            onPanResponderMove: Animated.event([null, {dx: PAN.x, dy: PAN.y}], {useNativeDriver: false, listener: (evt, gestureState) => {
                if (gestureState.moveY > Math.round(height*0.775)) { // there SIN DYNAMCLY RETURN
                    getDiameterReducerAndHeightForDatas(Math.round(height*0.775));
                    getDiameterReducerDiffForPath(Math.round(height*0.775));
                    return false;
                }
                if (gestureState.moveY < Math.round((height*0.36))) {
                    getDiameterReducerAndHeightForDatas(Math.round(height*0.36));
                    getDiameterReducerDiffForPath(Math.round(height*0.36));
                    return false;
                } else {
                    getDiameterReducerAndHeightForDatas(Math.round(gestureState.moveY));
                    getDiameterReducerDiffForPath(Math.round(gestureState.moveY));
                }
            }}),

            onPanResponderRelease: () => {
                PAN.flattenOffset();
            }
        })
    ).current;
    ////////////////////////////////////////////// CONCENTRIC REDUCER
    ////////////////////////////////////////////////////////////////////

    return  (
                <View>
                    <Svg preserveAspectRatio="xMidYMid slice" style={[ styles.elementSvg ]} viewBox={`${0} ${0} ${width} ${(height*1.12)}`} {...panResponderConcentricReducer.panHandlers}>
                        {(props.currentReducer == "reducer-conc" ?
                            <ConcentricReducer currentDiameterRedConc={props.currentDiameterRedConc} rightSide={rightSide} leftSide={leftSide} heightTop={heightTop} rightSideBottom={rightSideBottom} leftSideBottom={leftSideBottom} heightBottom={heightBottom} excentricRightSide={excentricRightSide} excentricLeftSideBottom={excentricLeftSideBottom} sizeText={props.sizeText} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} /> 
                        : false)}

                        {(props.currentReducer == "reducer-exc" ?
                            <ExcentricReducer currentDiameterRedExc={props.currentDiameterRedExc} rightSide={rightSide} leftSide={leftSide} heightTop={heightTop} rightSideBottom={rightSideBottom} leftSideBottom={leftSideBottom} heightBottom={heightBottom} excentricRightSide={excentricRightSide} excentricLeftSideBottom={excentricLeftSideBottom} sizeText={props.sizeText} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} /> 
                        : false)}
                    </Svg>
                </View>
            )
}

const styles = StyleSheet.create({
    elementSvg: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.47,
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#252525" 
    }
});