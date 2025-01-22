import { React, useRef } from "react";
import { StyleSheet, Dimensions, PanResponder, Animated } from "react-native";
import { Svg } from 'react-native-svg';
import { Elbow } from  "../../components/Elbow.js";

import * as functions from "../../library/functions.js";

import { DATAS_ELBOWS } from "../../datas/datas_elbows.js";
import { DATAS_TRIGONOMETRICS } from "../../datas/datas_trigonometrics.js";

////////////////////////////////////////////// ELBOW
////////////////////////////////////////////////////////////////////
export function ViewElbow (props) {

    const { width, height } = Dimensions.get("window");

    const radiusIntra = (width*0.24);
    const radiusExtra = (width*0.8);

    const inputRange = [];
    const outputRangePathAngle = [];
    const outputRangeIntrado = [];
    const outputRangeExtrado = []; 
    const outputRangePathRadiusRight = [];
    const outputRangePathRadiusLeft = [];
    const outputRangeCircleRadius = [];

    const SvgAnimated = Animated.createAnimatedComponent(Svg);

    const PANX = useRef(new Animated.Value(Number(parseFloat(width*0.1).toFixed(2)))).current;
    const PANY = useRef(new Animated.Value(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)))).current;
    const PAN = useRef(new Animated.ValueXY({x: PANX._value, y: PANY._value})).current;


    const getAngle = (localValueAngle) => { 
        if (props.buttonDecrease === true) {
            if (props.baseAngle == 1 && props.angle._value > parseFloat(1).toFixed(0)) {
                props.angle.setValue(parseFloat((props.angle._value - 0.1).toFixed(1))); 
            }   
            else if (props.baseAngle == 2 && props.angle._value > parseFloat(1).toFixed(0)) {
                props.angle.setValue(parseFloat((props.angle._value - 0.01).toFixed(2)));
            }

        }   else if (props.buttonIncrease === true) {
                if (props.baseAngle == 1 && props.angle._value < parseFloat(90).toFixed(0)) {
                    props.angle.setValue(parseFloat((props.angle._value + 0.1).toFixed(1)));

                } else if (props.baseAngle == 2 && props.angle._value < parseFloat(90).toFixed(0)) {
                    props.angle.setValue(parseFloat((props.angle._value + 0.01).toFixed(2)));
                }

        }   else {
                props.buttonDecrease = false;
                props.buttonIncrease = false;

                props.angle.setValue(parseFloat(localValueAngle.toFixed(props.baseAngle))); // OUTPUT ANGLE BASE VALUE
            } 
    
            DATAS_ELBOWS.angle = Number(parseFloat(localValueAngle).toFixed(2));
            props.shareAngleElbow(DATAS_ELBOWS);
    }

    for (let i = 0; i < 91; i++) {  // 1 OR 0 in "i = 1;"
        let angle = (i * DATAS_TRIGONOMETRICS.oneDegreRad);

        let x = Math.cos(angle);
        let y = -Math.sin(angle);

        let pathAngle = `M ${Math.cos(angle) * width*0.24} ${-Math.sin(angle) * width*0.24} L ${Math.cos(angle) * width*0.8} ${-Math.sin(angle) * width*0.8}`;
        let pathIntrado = `M ${radiusIntra}, 0 A ${radiusIntra}, ${radiusIntra} 0 0 0, ${x * radiusIntra}, ${y * radiusIntra}`;
        let pathExtrado = `M ${radiusExtra}, 0 A ${radiusExtra}, ${radiusExtra} 0 0 0, ${x * radiusExtra}, ${y * radiusExtra}`;
        let pathRadiusRight = `M ${width*0.52} ${0} L ${width*0.52} -${Math.tan((angle/2))*(width*0.52)}`;
        let pathRadiusLeft = `M ${Math.cos(angle) * (width*0.52)} ${(-Math.sin(angle)) * (width*0.52)} L ${width*0.52} -${Math.tan((angle/2))*(width*0.52)}`;
        let circleRadius = `-${Math.tan((angle/2))*(width*0.52)}`;

        inputRange.push(i);

        outputRangePathAngle.push(pathAngle);
        outputRangeIntrado.push(pathIntrado);
        outputRangeExtrado.push(pathExtrado);
        outputRangePathRadiusRight.push(pathRadiusRight); 
        outputRangePathRadiusLeft.push(pathRadiusLeft);
        outputRangeCircleRadius.push(circleRadius);
    }

    const pathAngle = props.angle.interpolate({
        inputRange,
        outputRange: outputRangePathAngle, 
        extrapolate: "clamp"
    })

    const pathIntrado = props.angle.interpolate({
        inputRange,
        outputRange: outputRangeIntrado, 
        extrapolate: "clamp"
    })

    const pathExtrado = props.angle.interpolate({
        inputRange,
        outputRange: outputRangeExtrado, 
        extrapolate: "clamp"
    })

    const pathRadiusRight = props.angle.interpolate({
        inputRange,
        outputRange: outputRangePathRadiusRight, 
        extrapolate: "clamp"
    })

    const pathRadiusLeft = props.angle.interpolate({
        inputRange,
        outputRange: outputRangePathRadiusLeft, 
        extrapolate: "clamp"
    })

    const circleRadius = props.angle.interpolate({
        inputRange,
        outputRange: outputRangeCircleRadius, 
        extrapolate: "clamp"
    })

    const fontSizeInterpolate = props.angle.interpolate({
        inputRange: [0, 90],
        outputRange: [13, 21], 
        extrapolate: "clamp"
    })

    const letterSpacingInterpolate = props.angle.interpolate({ 
        inputRange: [0, 90],
        outputRange: [5, 11], 
        extrapolate: "clamp"
    })    

    const panResponderElbow = useRef( 

        PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => {     
                false;
            },

            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                false;
            },

            onMoveShouldSetPanResponder: (evt, gestureState) => {
                PANX.setValue(parseFloat(gestureState.moveX.toFixed(2)));
                PANY.setValue(parseFloat(gestureState.moveY.toFixed(2)));

                if (gestureState.moveY > ((height*0.5) + (width*0.4))) {
                    PANX.setValue(Number(parseFloat(width*0.1).toFixed(2)));
                    PANY.setValue(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)))

                    return false;
                }
                if (gestureState.moveY < ((height*0.5) + (width*0.4)) && gestureState.moveX < (width*0.1)) {
                    PANX.setValue(Number(parseFloat(width*0.1).toFixed(2)));
                    PANY.setValue(Number(parseFloat((height*0.5)+(width*0.4)).toFixed(2)));

                    return false;
                }

                PAN.setOffset({
                    x: parseFloat(PANX._value),
                    y: parseFloat(PANY._value)
                });

                return true;
            },

            onPanResponderGrant: () => { Animated.event([null, {dx: PAN.x, dy: PAN.y}], {useNativeDriver: false}) },

            onPanResponderMove: Animated.event([null, {dx: PAN.x, dy: PAN.y}], {useNativeDriver: false, listener: (evt, gestureState) => {

            let hypotenuse;
            let angle;

                if (gestureState.moveY > (((height*0.5) + (width*0.46)) - (Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad)*gestureState.moveX))) { // there SIN DYNAMCLY RETURN
                    angle = 1;         

                    getAngle(Number(angle));

                    return false;
                }
                if (gestureState.moveY < ((height*0.5) + (width*0.46)) && gestureState.moveX < (width*0.1)) {
                    angle = Number(90);

                    getAngle(Number(angle)); 

                    return false;
                } else {
                    PANX.setValue(parseFloat(gestureState.moveX.toFixed(2)));
                    PANY.setValue(parseFloat(gestureState.moveY.toFixed(2)));

                    hypotenuse = functions.getHypotenuse((gestureState.moveX - (width*0.1)).toFixed(2), (((height*0.5) + (width*0.46)) - gestureState.moveY).toFixed(2));  
                    angle = functions.getAngleByAbscissa((gestureState.moveX - (width*0.1)).toFixed(2), hypotenuse.toFixed(2));

                    getAngle(parseFloat(angle.toFixed(props.baseAngle._value)));  // OUTPUT ANGLE BASE VALUE
                }
            }}),

            onPanResponderRelease: () => {
                PAN.flattenOffset();
            }
        })
    ).current;
    ////////////////////////////////////////////// ELBOW
    ////////////////////////////////////////////////////////////////////

    return (
        <SvgAnimated style={[ styles.elementSvg ]} viewBox={`-${width*0.1} -${(height*0.45)} ${width} ${(height*0.5)}`} {...panResponderElbow.panHandlers}>
            <Elbow style={[ styles.elbowSvg ]} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} curvesMeasure={props.curvesMeasure} fontSizeInterpolate={fontSizeInterpolate} letterSpacingInterpolate={letterSpacingInterpolate} radius={props.radius} currentDiameter={props.currentDiameter} norme={props.norme} formatElbow={props.formatElbow} idSettingsMeasure={props.idSettingsMeasure} idSettingsAngle={props.baseAngle} idSettingsDatas={props.idSettingsDatas} pathAngle={pathAngle} pathIntrado={pathIntrado} pathExtrado={pathExtrado} pathRadiusRight={pathRadiusRight} pathRadiusLeft={pathRadiusLeft} circleRadius={circleRadius} /> 
        </SvgAnimated> 
    )
}

const styles = StyleSheet.create({
    elementSvg: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height*0.5,
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#252525" 
    }
});