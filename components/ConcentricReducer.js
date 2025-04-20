import React, { useState, useEffect } from 'react';
import { Dimensions } from "react-native";
import { G, Path } from 'react-native-svg';

import { DATAS_REDUCER } from '../datas/datas_reducers.js';

import Animated, { useAnimatedProps } from 'react-native-reanimated';

import { DATAS_TRIGONOMETRICS } from '../datas/datas_trigonometrics.js';


export function ConcentricReducer (props) {
    
    const [currentMinDiameter, setcurrentMinDiameter] = useState("white");

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

        return { d: `M ${Math.round(width*0.3)} ${Math.round(height*0.36)} L ${width*0.1 + ((width*0.2 - diameterReductionDiffInverse))} ${absolutePositionHeight} L ${width*0.5 + ((width*0.2 + diameterReductionDiffInverse))} ${absolutePositionHeight} L ${Math.round(width*0.7)} ${Math.round(height*0.36)}` };
    });

    const rightSideBottom = useAnimatedProps(() => {
        let maxDiameter = Math.round(width*0.8);
        let minDiameter = Math.round(width*0.4);

        let absolutePositionHeight = props.absolutePositionHeight.value;

        let hypotenuse = ((Math.round(height - (height*0.225)) - absolutePositionHeight) / (Math.sin(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad)));
        let diameterReductionDiff = Math.cos(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;

        let diameterReductionDiffInverse = (Math.round((maxDiameter - minDiameter) / 2) - diameterReductionDiff);

        return { d: `M ${Math.round(width*0.9)} ${Math.round(height*0.775)} L ${width*0.5 + ((width*0.2 + diameterReductionDiffInverse))} ${absolutePositionHeight}` };
    });

    const leftSideBottom = useAnimatedProps(() => {
        let maxDiameter = Math.round(width*0.8);
        let minDiameter = Math.round(width*0.4);

        let absolutePositionHeight = props.absolutePositionHeight.value;

        let hypotenuse = ((Math.round(height - (height*0.225)) - absolutePositionHeight) / (Math.sin(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad)));
        let diameterReductionDiff = Math.cos(angleBase * DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;

        let diameterReductionDiffInverse = (Math.round((maxDiameter - minDiameter) / 2) - diameterReductionDiff);

        return { d: `M ${Math.round(width*0.1)} ${Math.round(height*0.775)} L ${width*0.5 - ((width*0.2 + diameterReductionDiffInverse))} ${absolutePositionHeight}` };
    });

    const heightTop = useAnimatedProps(() => {
        let absolutePositionHeight = props.absolutePositionHeight.value;

        return { d: `M ${width*0.5} ${Math.round(height*0.36)} L ${width*0.5} ${Math.round(absolutePositionHeight)}` };
    });

    const heightBottom = useAnimatedProps(() => {
        let absolutePositionHeight = props.absolutePositionHeight.value;

        return { d: `M ${width*0.5} ${Math.round(height*0.775)} L ${width*0.5} ${Math.round(absolutePositionHeight)}` };
    });


    useEffect(() => {
        props.currentDiameterRedConc.addListener((value) => { 
            (value.value != 0 ? setcurrentMinDiameter(() => "yellow") : setcurrentMinDiameter(() => "white"));
        })
    })


    return (

        <G>
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1" stroke={"lime"} animatedProps={ heightTop } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1" stroke={"deepskyblue"} animatedProps={ heightBottom } />

            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="2.75" stroke={"white"} animatedProps={ reducerSuperior } />

            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="2.75" stroke={currentMinDiameter} animatedProps={ rightSideBottom } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="2.75" stroke={currentMinDiameter} animatedProps={ leftSideBottom } />

            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="2.75" stroke={"magenta"} d={`M ${width*0.3} ${Math.round(height*0.36)} L ${width*0.7} ${Math.round(height*0.36)}`} />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="2.75" stroke={"aqua"} d={`M ${width*0.1} ${Math.round(height*0.775)} L ${width*0.9} ${Math.round(height*0.775)}`} />
        </G>
    )
}






