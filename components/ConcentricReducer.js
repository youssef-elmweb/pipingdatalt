import React from 'react';
import { Dimensions } from "react-native";
import { G, Path } from 'react-native-svg';

import { DATAS_REDUCER } from '../datas/datas_reducers.js';

import Animated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';

import { DATAS_TRIGONOMETRICS } from '../datas/datas_trigonometrics.js';


export function ConcentricReducer (props) {
    
    const { width, height } = Dimensions.get("window");
    const hypotenuseBaseBase = Math.hypot(DATAS_REDUCER.reducerHeight, DATAS_REDUCER.diameterReductionDiffBase);
    const angleBase = Math.asin(DATAS_REDUCER.reducerHeight / hypotenuseBaseBase) * DATAS_TRIGONOMETRICS.oneRad;


    const PathAnimated = Animated.createAnimatedComponent(Path);


    const reducerSuperior = useAnimatedProps(() => {
        let maxDiameter = Math.round(width*0.8);
        let minDiameter = Math.round(width*0.4);

        let absolutePositionHeight = props.absolutePositionHeight.value;

        let hypotenuse = ((Math.round(height - (height*0.225)) - absolutePositionHeight) / (Math.sin(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad)));
        let diameterReductionDiff = Math.cos(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;

        let diameterReductionDiffInverse = (Math.round((maxDiameter - minDiameter) / 2) - diameterReductionDiff);

        return  { 
                    d: `M ${Math.round(width*0.3)} ${Math.round(height*0.36)} L ${width*0.1 + ((width*0.2 - diameterReductionDiffInverse))} ${absolutePositionHeight} L ${width*0.5 + ((width*0.2 + diameterReductionDiffInverse))} ${absolutePositionHeight} L ${Math.round(width*0.7)} ${Math.round(height*0.36)}`, 
                    stroke: props.angleBegin.value ? "silver" : "white",
                    strokeWidth: props.angleBegin.value ? "5" : "2.75"
                };
    });

    const heightTop = useAnimatedProps(() => {
        let absolutePositionHeight = props.absolutePositionHeight.value;

        return { d: `M ${width*0.5} ${Math.round(height*0.36)} L ${width*0.5} ${Math.round(absolutePositionHeight)}` };
    });

    const heightBottom = useAnimatedProps(() => {
        let absolutePositionHeight = props.absolutePositionHeight.value;

        return { d: `M ${width*0.5} ${Math.round(height*0.775)} L ${width*0.5} ${Math.round(absolutePositionHeight)}` };
    });

    const pathBaseStaticSuperior = useAnimatedProps(() => {
        return  { 
                    strokeWidth: props.angleBegin.value ? "5.5" : "2.75",
                    stroke: "magenta"
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
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.5" stroke={"lime"} animatedProps={ heightTop } />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.5" stroke={"deepskyblue"} animatedProps={ heightBottom } />

            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"yellow"} d={ `M ${Math.round(width*0.9)} ${Math.round(height*0.775)} L ${width*0.7} ${height*0.36}` } />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"yellow"} d={ `M ${Math.round(width*0.1)} ${Math.round(height*0.775)} L ${width*0.3} ${height*0.36}` } />

            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" animatedProps={ reducerSuperior } style={ [highlightStyle] } />

            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" d={`M ${width*0.3} ${Math.round(height*0.36)} L ${width*0.7} ${Math.round(height*0.36)}` } animatedProps={ pathBaseStaticSuperior } style={ [highlightStyle] } />
            <PathAnimated strokeLinecap="round" strokeLinejoin={"round"} fill="none" strokeWidth="2.75" stroke={"aqua"} d={`M ${width*0.1} ${Math.round(height*0.775)} L ${width*0.9} ${Math.round(height*0.775)}`} />
        </G>
    )
}






