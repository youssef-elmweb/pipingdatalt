import { React, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";

import Animated, { runOnJS, withTiming, Easing, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
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
    
    const absolutePositionHeight = useSharedValue(Number.parseFloat(props.absolutePositionHeight._value).toFixed(2));
    const reducerInfBegin = useSharedValue(false);
    const scaleBegin = useSharedValue(1);


    const getDiameterReducerAndHeightForDatas = (localHeight) => { // FOR DATAS
        let heightReducerPath = DATAS_REDUCER.heightRemainder - localHeight;

        let diameterSuperior = (props.diameterSuperiorReducer._value == 0 ? DATAS_PIPES[1][props.norme._value] : DATAS_PIPES[props.diameterSuperiorReducer._value][props.norme._value]);
        let diameterInferior = DATAS_PIPES[props.diameterInferiorReducer._value][props.norme._value]; 

        let heightReducer = (diameterSuperior - diameterInferior) * 3;
        let diameterReductionDiff = ((diameterSuperior - diameterInferior) * 0.5);
        let diameterReductionDiffExc = (diameterSuperior - diameterInferior);
        let angle = Math.asin(heightReducer / Math.hypot(heightReducer, diameterReductionDiff)) * DATAS_TRIGONOMETRICS.oneRad;
        let angleExc = Math.asin(heightReducer / Math.hypot(heightReducer, diameterReductionDiffExc)) * DATAS_TRIGONOMETRICS.oneRad;

        let heightReducerTop = Number.parseFloat((heightReducer) - ((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath).toFixed(2));
        let heightReducerBottom = Number.parseFloat(((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath).toFixed(2));
        
        let curveReducerTop = heightReducerTop / Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad); 
        let curveReducerBottom = heightReducerBottom / Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad);

        let curveReducerTopExc = heightReducerTop / Math.sin(angleExc * DATAS_TRIGONOMETRICS.oneDegreRad); 
        let curveReducerBottomExc = heightReducerBottom / Math.sin(angleExc * DATAS_TRIGONOMETRICS.oneDegreRad);

        let currentDiameterReductionDiff = Math.cos(angle * DATAS_TRIGONOMETRICS.oneDegreRad) * curveReducerBottom;

        let currentDiameterRedConcExc = DATAS_PIPES[props.diameterInferiorReducer._value][props.norme._value] + ((diameterReductionDiff - currentDiameterReductionDiff) * 2);

        DATAS_REDUCER.absolutePositionHeight = Number.parseFloat(localHeight.toFixed(props.baseDatas._value));
        DATAS_REDUCER.heightReducerTop = Number.parseFloat(heightReducerTop.toFixed(props.baseDatas._value));
        DATAS_REDUCER.heightReducerBottom = Number.parseFloat(heightReducerBottom.toFixed(props.baseDatas._value));
        DATAS_REDUCER.curveReducerTop = Number.parseFloat(curveReducerTop.toFixed(props.baseDatas._value));
        DATAS_REDUCER.curveReducerBottom = Number.parseFloat(curveReducerBottom.toFixed(props.baseDatas._value));
        DATAS_REDUCER.curveReducerTopExc = Number.parseFloat(curveReducerTopExc.toFixed(props.baseDatas._value));
        DATAS_REDUCER.curveReducerBottomExc = Number.parseFloat(curveReducerBottomExc.toFixed(props.baseDatas._value));
        DATAS_REDUCER.currentDiameterRedConcExc = Number.parseFloat(currentDiameterRedConcExc.toFixed(props.baseDatas._value));
    
        props.shareDiameterAndHeight(DATAS_REDUCER);
    }            

    const getDiameterReducerDiffForPath = (localHeight, beginAction) => { // FOR PATH SVG
        "worklet";

        absolutePositionHeight.value = localHeight;
        reducerInfBegin.value = beginAction;
    }

    const getDatasForReducer = (localHeight, renderDiameterReducerAndHeightForDatas, renderDiameterReducerDiffForPath, beginAction) => { 
        "worklet";

        runOnJS(renderDiameterReducerAndHeightForDatas)(localHeight);
        renderDiameterReducerDiffForPath(parseFloat(localHeight).toFixed(2), beginAction);
    }

    const REDUCER_CONC_MEMOIZED = useMemo(() => {
        return <ConcentricReducer scaleBegin={scaleBegin} reducerInfBegin={reducerInfBegin} absolutePositionHeight={absolutePositionHeight} sizeText={props.sizeText} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} />
    }, [])

    const REDUCER_EXC_MEMOIZED = useMemo(() => {
        return <ExcentricReducer scaleBegin={scaleBegin} reducerInfBegin={reducerInfBegin} absolutePositionHeight={absolutePositionHeight} sizeText={props.sizeText} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} />
    }, [])


    const panGesture = Gesture.Pan()
        .onBegin((event) => {
            if (event.absoluteY > Math.round((height*0.36)) && event.absoluteY <= Math.round(height*0.775)) {
                let localHeight = event.absoluteY;

                getDatasForReducer(Math.round(localHeight), getDiameterReducerAndHeightForDatas, getDiameterReducerDiffForPath, true);
            }
        })
        .onChange((event) => {
            let localHeight;

            if (event.absoluteY > Math.round(height*0.775)) { 
                localHeight = height*0.775;

                getDatasForReducer(Math.round(localHeight), getDiameterReducerAndHeightForDatas, getDiameterReducerDiffForPath, false);

                return;
            }
            if (event.absoluteY <= Math.round((height*0.36))) {
                localHeight = height*0.36;

                getDatasForReducer(Math.round(localHeight), getDiameterReducerAndHeightForDatas, getDiameterReducerDiffForPath, false);

                return;
            } else {
                localHeight = event.absoluteY;

                console.log(parseFloat(0.01).toFixed(1), "ici");

                getDatasForReducer(Math.round(localHeight), getDiameterReducerAndHeightForDatas, getDiameterReducerDiffForPath, false);
            }
        })
        .onTouchesUp(() => {
            reducerInfBegin.value = withTiming(0, {
                duration: 900,
                easing: Easing.out(Easing.exp)
            });
        })


    return  (
                <GestureHandlerRootView style={[ styles.elementSvg ]}>
                    <GestureDetector gesture={panGesture}>
                        <Animated.View>
                            <Svg preserveAspectRatio="xMidYMid slice" style={[ styles.elementSvg ]} viewBox={`${0} ${0} ${width} ${(height*1.12)}`}>
                                {(props.currentReducer == "reducer-conc" ?
                                    REDUCER_CONC_MEMOIZED 
                                : false)}

                                {(props.currentReducer == "reducer-exc" ?
                                    REDUCER_EXC_MEMOIZED 
                                : false)}
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






























