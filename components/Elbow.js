import {React, useState, useEffect } from 'react';
import { Dimensions } from "react-native";

import * as functions from "../library/functions.js";

import { G, Path, Circle } from 'react-native-svg';
import Animated, {  useAnimatedProps } from 'react-native-reanimated';

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
    
        return { d: `M ${Math.cos(angle) * width*0.24} ${-Math.sin(angle) * width*0.24} L ${Math.cos(angle) * width*0.8} ${-Math.sin(angle) * width*0.8}` };
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
    
        return { d: `M ${radiusExtra}, 0 A ${radiusExtra}, ${radiusExtra} 0 0 0, ${x * radiusExtra}, ${y * radiusExtra}` };
    });

    const pathIntrado = useAnimatedProps(() => {
        let angle = props.angle.value * DATAS_TRIGONOMETRICS.oneDegreRad;
        let x = Math.cos(angle);
        let y = -Math.sin(angle);
    
        return { d: `M ${radiusIntra}, 0 A ${radiusIntra}, ${radiusIntra} 0 0 0, ${x * radiusIntra}, ${y * radiusIntra}` };
    });
    

    useEffect(() => {
        functions.adjustSvgToScreen(setScale);
    })


    return (
        <G style={[ { transform: [{ scale }] } ]}>
            <Path strokeLinecap="square" fill="none" strokeWidth="0.5" stroke="red" strokeDasharray="18 10 5 10" d={`M ${width*0.52} 0 A ${width*0.52} ${width*0.52}, 0, 0, 0, 0 -${width*0.52}`} />
        
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke="#3D3D3D" d={`M ${width*0.24} 0 A ${width*0.24} ${width*0.24}, 0, 0, 0, 0 -${width*0.24}`} />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke="#3D3D3D" d={`M ${width*0.8} 0 A ${width*0.8} ${width*0.8}, 0, 0, 0,  0 -${width*0.8}`} />
        
        
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke={"white"} d={`M ${width*0.24} 0 L ${width*0.8} 0`} />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3" stroke="#3D3D3D" d={`M 0 -${width*0.24} L 0 -${width*0.8}`} />             
        
            
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1, stroke: "#2ecc71"} ]} animatedProps={pathRadiusLeft} />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1, stroke: "#2ecc71"} ]} animatedProps={pathRadiusRight} />                      
        
        
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 2.75, stroke: "white"} ]} animatedProps={pathAngle} /> 
        
        
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" style={[ {strokeWidth: 2.75, stroke: "white"} ]} animatedProps={pathIntrado} />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" style={[ {strokeWidth: 2.75, stroke: "white"} ]} animatedProps={pathExtrado} />
        
            <CircleAnimated cx={width*0.52} fill={"#2ecc71"} r={"3.5"} animatedProps={circleRadius} />
        </G>
    )

}

