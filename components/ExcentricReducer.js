import React from 'react';
import { Dimensions } from "react-native";
import { G, Path } from 'react-native-svg';

import { DATAS_REDUCER } from '../datas/datas_reducers.js';

import Animated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';

import { DATAS_TRIGONOMETRICS } from '../datas/datas_trigonometrics.js';


export function ExcentricReducer (props) {
    
    const { width, height } = Dimensions.get("window");
    const hypotenuseBaseBase = Math.hypot(DATAS_REDUCER.reducerHeight, DATAS_REDUCER.diameterReductionDiffBase);
    const angleBase = Math.asin(DATAS_REDUCER.reducerHeight / hypotenuseBaseBase) * DATAS_TRIGONOMETRICS.oneRad;


    const PathAnimated = Animated.createAnimatedComponent(Path);


    const reducerInferior = useAnimatedProps(() => {
        let maxDiameter = Math.round(width*0.8);
        let minDiameter = Math.round(width*0.4);

        let absoluteHeight = props.absoluteHeight.value;

        let hypotenuse = ((Math.round(height - (height*0.225)) - absoluteHeight) / (Math.sin(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad)));
        let diameterReductionDiff = Math.cos(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;

        let diameterReductionDiffInverse = (Math.round((maxDiameter - minDiameter) / 2) - diameterReductionDiff);

        return  {   
                    d: `M ${Math.round(width*0.1)} ${Math.round(height*0.775)} L ${width*0.1 + ((width*0.2 - diameterReductionDiffInverse))} ${absoluteHeight} L ${width*0.5 + ((width*0.2))} ${absoluteHeight}`,
                    stroke: props.reducerInfBegin.value ? "silver" : "white",
                    strokeWidth: props.reducerInfBegin.value ? "5" : "2.75"
                };
    });

    const rightHeightReducerInferior = useAnimatedProps(() => {
        let absoluteHeight = props.absoluteHeight.value;

        return  {    
                    d: `M ${Math.round(width*0.7)} ${Math.round(height*0.775)} L ${Math.round(width*0.7)} ${absoluteHeight}`,
                    stroke: props.reducerInfBegin.value ? "silver" : "white",
                    strokeWidth: props.reducerInfBegin.value ? "5" : "2.75"
                };
    });

    const heightBottom = useAnimatedProps(() => {
        let absoluteHeight = props.absoluteHeight.value;

        return { d: `M ${width*0.5} ${Math.round(height*0.775)} L ${width*0.5} ${Math.round(absoluteHeight)}` };
    });

    const pathBaseStaticInferior = useAnimatedProps(() => {
        return  { 
                    stroke: props.reducerInfBegin.value ? "silver" : "white",
                    strokeWidth: props.reducerInfBegin.value ? "5" : "2.75",
                };
    });
    
    
    const highlightStyle = useAnimatedStyle(() => {
        return {
            opacity: props.scaleBegin.value,
            transform: [
                { scale: props.scaleBegin.value },
            ],
        };
    });


    return (

        <G>
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="1.5" stroke={"silver"} d={ `M ${width*0.5} ${Math.round(height*0.36)} L ${width*0.5} ${Math.round(height*0.775)}` } />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="1.5" stroke={"lime"} animatedProps={ heightBottom } />

            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"silver"} d={ `M ${Math.round(width*0.7)} ${Math.round(height*0.775)} L ${width*0.7} ${height*0.36}` } />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"silver"} d={ `M ${Math.round(width*0.1)} ${Math.round(height*0.775)} L ${width*0.3} ${height*0.36}` } />

            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" animatedProps={ reducerInferior } style={ [highlightStyle] } />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" animatedProps={rightHeightReducerInferior} style={ [highlightStyle] } />

            <Path strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"white"} d={`M ${width*0.3} ${Math.round(height*0.36)} L ${width*0.7} ${Math.round(height*0.36)}`} />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"aqua"} d={`M ${width*0.1} ${Math.round(height*0.775)} L ${width*0.7} ${Math.round(height*0.775)}`} animatedProps={ pathBaseStaticInferior } style={ [highlightStyle] } />
        </G>
    )
}