import { React, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";

import * as functions from "../../library/functions.js";

import { Svg, G } from 'react-native-svg';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import { Elbow } from  "../../components/Elbow.js";
import { ListCurvesStd } from "../ListCurvesStd.js";

import { DATAS_ELBOWS } from "../../datas/datas_elbows.js";
import { DATAS_TRIGONOMETRICS } from "../../datas/datas_trigonometrics.js";


////////////////////////////////////////////// ELBOW
////////////////////////////////////////////////////////////////////
export function ViewElbow (props) {

    const { width, height } = Dimensions.get("window");

    const angle = useSharedValue(Number.parseFloat(props.curvesMeasure.angle._value).toFixed(props.baseAngle._value));

    const renderDatasForDatas = (localValueAngle) => { 
        DATAS_ELBOWS.angle = Number(parseFloat(localValueAngle).toFixed(props.baseAngle._value));
        props.shareAngleElbow(DATAS_ELBOWS);
    }

    const renderAngleForPaths = (localValueAngle) => {
        "worklet";
        angle.value = localValueAngle;   
    }

    const getAngle = (localValueAngle, renderDatasForDatas, renderAngleForPaths) => { 
        "worklet";

        runOnJS(renderDatasForDatas)(localValueAngle);
        renderAngleForPaths(parseFloat(localValueAngle).toFixed(2));
    }

    const ELBOW_MEMOIZED = useMemo(() => {
        return <Elbow angle={angle} currentDiameter={props.currentDiameter} diameter={props.diameter} format={props.format} formatElbow={props.formatElbow} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} curvesMeasure={props.curvesMeasure} fontSizeInterpolate={null} letterSpacingInterpolate={null} norme={props.norme} idSettingsMeasure={props.idSettingsMeasure} idSettingsAngle={props.baseAngle} idSettingsDatas={props.idSettingsDatas} pathIntrado={null} pathExtrado={null} pathRadiusRight={null} pathRadiusLeft={null} circleRadius={null} />;
    }, [angle, width, height])
  

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            let hypotenuse;
            let localAngle;

                if (event.absoluteY > (((height*0.5) + (width*0.52))) - (Math.sin(DATAS_TRIGONOMETRICS.oneDegreRad) * event.absoluteX)) { 

                    getAngle(1, renderDatasForDatas, renderAngleForPaths);
                
                    return;
                }
                if (event.absoluteY < ((height*0.5) + (width*0.45)) && event.absoluteX < (width*0.1)) {

                    getAngle(90, renderDatasForDatas, renderAngleForPaths);
                
                    return;
                }   else if (event.absoluteX < (width*0.15)) {

                        getAngle(90, renderDatasForDatas, renderAngleForPaths);
                    
                        return;
                    }   else {
                            hypotenuse = functions.getHypotenuse((event.absoluteX - (width*0.15)).toFixed(2), (((height*0.5) + (width*0.52)) - event.absoluteY).toFixed(2));  
                            localAngle = functions.getAngleByAbscissa((event.absoluteX - (width*0.15)).toFixed(2), hypotenuse.toFixed(2));
                            
                            getAngle(localAngle, renderDatasForDatas, renderAngleForPaths);
                        }
        })
        .onEnd(() => {

    });


    return (
        <GestureHandlerRootView style={[ styles.elementSvg ]}>
            <GestureDetector gesture={panGesture}>
                <Animated.View>
                    <Svg style={[ styles.elementSvg ]} viewBox={`-${width*0.1} -${(height*0.48)} ${width} ${(height*0.5)}`}> 
                        { ELBOW_MEMOIZED }

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