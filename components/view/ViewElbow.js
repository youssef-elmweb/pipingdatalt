import { React, useEffect, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";

import * as functions from "../../library/functions.js";

import { Svg, G } from 'react-native-svg';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import { Elbow } from  "../../components/Elbow.js";
import { ListCurvesStd } from "../ListCurvesStd.js";
import { ReTextSvg } from "../ReTextSvg.js";

import { DATAS_ELBOWS } from "../../datas/datas_elbows.js";
import { DATAS_TRIGONOMETRICS } from "../../datas/datas_trigonometrics.js";

////////////////////////////////////////////// ELBOW
////////////////////////////////////////////////////////////////////
export function ViewElbow (props) {

    const { width, height } = Dimensions.get("window");

    const angle = useSharedValue(props.curvesMeasure.angle._value);
    const ReTextSvgAnimated = Animated.createAnimatedComponent(ReTextSvg);

    useEffect(() => {
        console.log(angle.value, "angle on ViewElbow");
    })

    const renderDatasAngleOnUi = (localValueAngle) => { 
        DATAS_ELBOWS.angle = Number(parseFloat(localValueAngle).toFixed(0));
        props.shareAngleElbow(DATAS_ELBOWS);
    }

    const renderPathAngle = (localValueAngle) => {
        "worklet";
        angle.value = localValueAngle;
    }

    const renderPathAngleOnJs = (localValueAngle) => {
        "worklet";
        renderPathAngle(localValueAngle);   
    }

    const getAngle = (localValueAngle, renderDatasOnUi, renderValueOnJs) => { 
        "worklet";

        runOnJS(renderDatasOnUi)(localValueAngle);
        renderValueOnJs(parseFloat(localValueAngle).toFixed(2));
    }

    const ELBOW_MEMOIZED = useMemo(() => {
        return <Elbow angle={angle} currentDiameter={props.currentDiameter} diameter={props.diameter} format={props.format} formatElbow={props.formatElbow} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} curvesMeasure={props.curvesMeasure} fontSizeInterpolate={null} letterSpacingInterpolate={null} norme={props.norme} idSettingsMeasure={props.idSettingsMeasure} idSettingsAngle={props.baseAngle} idSettingsDatas={props.idSettingsDatas} pathIntrado={null} pathExtrado={null} pathRadiusRight={null} pathRadiusLeft={null} circleRadius={null} />;
    }, [angle, width, height])
  

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            let hypotenuse;
            let localAngle;

                if (event.absoluteY > (((height*0.5) + (width*0.52))) - (Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad) * event.absoluteX)) { 
                    //runOnJS(getAngle)(1); 
                    getAngle(1, renderDatasAngleOnUi, renderPathAngleOnJs);
                
                    return;
                }
                if (event.absoluteY < ((height*0.5) + (width*0.45)) && event.absoluteX < (width*0.1)) {
                    //runOnJS(getAngle)(90); 
                    getAngle(90, renderDatasAngleOnUi, renderPathAngleOnJs);
                
                    return;
                }   else if (event.absoluteX < (width*0.15)) {
                        //runOnJS(getAngle)(90); 
                        getAngle(90, renderDatasAngleOnUi, renderPathAngleOnJs);
                    
                        return;
                    }   else {
                            hypotenuse = functions.getHypotenuse((event.absoluteX - (width*0.15)).toFixed(2), (((height*0.5) + (width*0.52)) - event.absoluteY).toFixed(2));  
                            localAngle = functions.getAngleByAbscissa((event.absoluteX - (width*0.15)).toFixed(2), hypotenuse.toFixed(2));
                            
                            //runOnJS(getAngle)(parseFloat(localAngle.toFixed(/*props.baseAngle._value*/0)));  
                            getAngle(localAngle, renderDatasAngleOnUi, renderPathAngleOnJs);
                        }
        })
        .onEnd(() => {

    });


    return (
        <GestureHandlerRootView style={[ styles.elementSvg ]}>
            <GestureDetector gesture={panGesture}>
                <Animated.View>
                    <Svg style={[ styles.elementSvg ]} viewBox={`-${width*0.1} -${(height*0.48)} ${width} ${(height*0.5)}`}> 
                        {ELBOW_MEMOIZED}

                        { (props.checkboxDatasInterfaceState == true ? 
                            <G>
                                <ListCurvesStd measureUnit={props.measureUnit} angle={angle} idSettingsDatas={props.idSettingsDatas} norme={props.norme} curvesMeasure={props.curvesMeasure} idSettingsMeasure={props.idSettingsMeasure} currentDiameter={props.currentDiameter} formatElbow={props.formatElbow} />
                            </G> :
                            false) 
                        }
                    </Svg> 
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
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