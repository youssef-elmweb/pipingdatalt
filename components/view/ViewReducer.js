import { React, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";

import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
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

    const absolutePositionHeight = useSharedValue(Number.parseFloat(props.absolutePositionHeight._value).toFixed(/*props.baseAngle._value*/0));
    const heightRemainder = useSharedValue(Number.parseFloat(DATAS_REDUCER.heightRemainder).toFixed(/*props.baseAngle._value*/0));
    const reducerHeight = useSharedValue(Number.parseFloat(DATAS_REDUCER.reducerHeight).toFixed(/*props.baseAngle._value*/0));
    const diameterReductionDiffBase = useSharedValue(Number.parseFloat(DATAS_REDUCER.diameterReductionDiffBase).toFixed(/*props.baseAngle._value*/0));

    const hypotenuseBase = useSharedValue(Math.hypot(reducerHeight.value, diameterReductionDiffBase.value));
    const angle = useSharedValue(Math.asin(reducerHeight.value / hypotenuseBase.value) * DATAS_TRIGONOMETRICS.oneRad);

    const diameterReductionDiffInverse = useSharedValue(79);

    //console.log(DATAS_REDUCER.absolutePositionHeight, "DATAS_REDUCER.absolutePositionHeight dynamique", DATAS_REDUCER.heightRemainder, "DATAS_REDUCER.heightRemainder static");

    //console.log(reducerHeight.value, "reducerHeight.value static on SharedValue");



    const getDiameterReducerDiffForPath = (localHeight) => { // FOR PATH SVG
        "worklet";

        let hypotenuse = ((heightRemainder.value - localHeight) / (Math.sin(angle.value * DATAS_TRIGONOMETRICS.oneDegreRad)));
        let diameterReductionDiff = Math.cos(angle.value * DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;
        let diameterReductionDiffInverseLocal = Number(Math.round(diameterReductionDiffBase.value) - Math.round(diameterReductionDiff))
        
        console.log(localHeight, "localHeight");
        console.log(heightRemainder.value - localHeight);
        absolutePositionHeight.value = localHeight;

        diameterReductionDiffInverse.value = Number(Math.round(DATAS_REDUCER.diameterReductionDiffBase) - Math.round(diameterReductionDiff));

        //console.log(diameterReductionDiffInverse.value, "return final");
        //return diameterReductionDiffInverse // this result for paths rightSide, leftSide, rightSideBottom, leftSideBottom
    }

    const getDiameterReducerAndHeightForDatas = (localHeight) => { // FOR DATAS
        //console.log(props.absolutePositionHeight._value);
        //"worklet";
        /*let diameterSuperior = (props.diameterSuperiorReducer._value == 0 ? DATAS_PIPES[1][props.norme._value] : DATAS_PIPES[props.diameterSuperiorReducer._value][props.norme._value]);
        let diameterInferior = DATAS_PIPES[props.diameterInferiorReducer._value][props.norme._value]; 
        

        let heightReducerPath = DATAS_REDUCER.heightRemainder - localHeight;
        let heightReducer = (diameterSuperior - diameterInferior) * 3;

        let heightReducerTop = Math.round((heightReducer) - ((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath));
        let heightReducerBottom = Number.parseFloat(((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath).toFixed(1));

        //console.log(heightReducerTop, heightReducerBottom, "heightReducerTop, heightReducerBottom");

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

        //console.log(curveReducerTop, "curveReducerTop");
        //console.log(curveReducer, heightReducerBottom);


        props.shareDiameterAndHeight(DATAS_REDUCER);*/
    }




    const REDUCER_CONC_MEMOIZED = useMemo(() => {
        return <ConcentricReducer absolutePositionHeight={absolutePositionHeight} heightRemainder={heightRemainder} diameterReductionDiffInverse={diameterReductionDiffInverse} currentDiameterRedConc={props.currentDiameterRedConc} rightSide={null} leftSide={null} heightTop={null} rightSideBottom={null} leftSideBottom={null} heightBottom={null} excentricRightSide={null} excentricLeftSideBottom={null} sizeText={props.sizeText} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} />
    }, [diameterReductionDiffInverse, width, height])

    const REDUCER_EXC_MEMOIZED = useMemo(() => {
        return <ExcentricReducer currentDiameterRedExc={props.currentDiameterRedExc} rightSide={null} leftSide={null} heightTop={null} rightSideBottom={null} leftSideBottom={null} heightBottom={null} excentricRightSide={null} excentricLeftSideBottom={null} sizeText={props.sizeText} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} checkboxDatasInterfaceState={props.checkboxDatasInterfaceState} />
    }, [])




    const panGesture = Gesture.Pan()
        .onChange((event) => {
            if (event.absoluteY > Math.round(height*0.775)) { // there SIN DYNAMCLY RETURN
                runOnJS(getDiameterReducerAndHeightForDatas)(Math.round(height*0.775));
                getDiameterReducerDiffForPath(Math.round(height*0.775));
                return false;
            }
            if (event.absoluteY < Math.round((height*0.36))) {
                runOnJS(getDiameterReducerAndHeightForDatas)(Math.round(height*0.36));
                getDiameterReducerDiffForPath(Math.round(height*0.36));
                return false;
            } else {
                runOnJS(getDiameterReducerAndHeightForDatas)(Math.round(event.absoluteY));
                getDiameterReducerDiffForPath(Math.round(event.absoluteY));
            }
        })
        .onEnd(() => {
    });


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































