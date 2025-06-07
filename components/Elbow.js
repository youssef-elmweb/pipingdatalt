import {React, useState, useEffect } from 'react';
import { Dimensions } from "react-native";

import * as functions from "../library/functions.js";

import { G, Path, Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';

import { DATAS_TRIGONOMETRICS } from '../datas/datas_trigonometrics.js';


export function Elbow (props) {

    const [scale, setScale] = useState(1);

    const { width } = Dimensions.get("window");
    const radiusIntra = (width*0.24);
    const radiusExtra = (width*0.8);

    const PathAnimated = Animated.createAnimatedComponent(Path);
    const CircleAnimated = Animated.createAnimatedComponent(Circle); 


    const pathAngle = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
    
        return  {   d: `M ${Math.cos(angle) * width*0.24} ${-Math.sin(angle) * width*0.24} L ${Math.cos(angle) * width*0.8} ${-Math.sin(angle) * width*0.8}`,
                    stroke: props.angleBegin.value ? "white" : "white",
                    strokeWidth: props.angleBegin.value ? "5" : "2.75",
                };
    });

    const pathRadiusRight = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
    
        return { d: `M ${width*0.52} ${0} L ${width*0.52} -${Math.tan((angle/2))*(width*0.52)}` };
    });

    const pathRadiusLeft = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
    
        return { d: `M ${Math.cos(angle) * (width*0.52)} ${(-Math.sin(angle)) * (width*0.52)} L ${width*0.52} -${Math.tan((angle/2))*(width*0.52)}` };
    });

    const circleRadius = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
    
        return { cy: `-${Math.tan((angle/2))*(width*0.52)}` };
    });

    const pathExtrado = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
        let x = Math.cos(angle);
        let y = -Math.sin(angle);
    
        return  { 
                    d: `M ${radiusExtra}, 0 A ${radiusExtra}, ${radiusExtra} 0 0 0, ${x * radiusExtra}, ${y * radiusExtra}`, 
                    stroke: props.angleBegin.value ? "white" : "white",
                    strokeWidth: props.angleBegin.value ? "5.5" : "2.75"
                };
    });

    const pathIntrado = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
        let x = Math.cos(angle);
        let y = -Math.sin(angle);
    
        return  { 
                    d: `M ${radiusIntra}, 0 A ${radiusIntra}, ${radiusIntra} 0 0 0, ${x * radiusIntra}, ${y * radiusIntra}`, 
                    stroke: props.angleBegin.value ? "white" : "white",
                    strokeWidth: props.angleBegin.value ? "5.5" : "2.75"
                };
    });

    const pathBaseStatic = useAnimatedProps(() => {
        return  { 
                    stroke: props.angleBegin.value ? "white" : "white",
                    strokeWidth: props.angleBegin.value ? "5.5" : "2.75"
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
    
    
    useEffect(() => {
        functions.adjustSvgToScreen(setScale);
    }, [])


    return (
        <G style={[ { transform: [{ scale }] } ]}>
            <Path strokeLinecap="square" fill="none" strokeWidth="0.5" stroke="red" strokeDasharray="18 10 5 10" d={`M ${width*0.52} 0 A ${width*0.52} ${width*0.52}, 0, 0, 0, 0 -${width*0.52}`} />
        
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke="#3D3D3D" d={`M ${width*0.24} 0 A ${width*0.24} ${width*0.24}, 0, 0, 0, 0 -${width*0.24}`} />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke="#3D3D3D" d={`M ${width*0.8} 0 A ${width*0.8} ${width*0.8}, 0, 0, 0,  0 -${width*0.8}`} />
        
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" d={`M ${width*0.24} 0 L ${width*0.8} 0`} animatedProps={ pathBaseStatic } style={ [highlightStyle] } />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke="#3D3D3D" d={`M 0 -${width*0.24} L 0 -${width*0.8}`} />             
        
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1, stroke: "lime"} ]} animatedProps={ pathRadiusLeft } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1, stroke: "lime"} ]} animatedProps={ pathRadiusRight } />                       
    
        
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" animatedProps={ pathIntrado } style={ [highlightStyle] } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" animatedProps={ pathExtrado } style={ [highlightStyle] } />

            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" animatedProps={ pathAngle } style={ [highlightStyle] } />
        
            <CircleAnimated cx={width*0.52} fill={"#2ecc71"} r={"3.5"} animatedProps={ circleRadius } />
        </G>
    )

}

