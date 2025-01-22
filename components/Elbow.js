import React, { useState, useEffect } from 'react';
import { Animated, Dimensions } from "react-native";
import { G, Path, Circle } from 'react-native-svg';

import * as functions from "../library/functions.js";

import { ListCurvesStd } from  "./ListCurvesStd";
import { ReTextSvg } from  "./ReTextSvg";

export function Elbow (props) {

    const [scale, setScale] = useState(1);

    const { width, height } = Dimensions.get("window");

    const PathAnimated = Animated.createAnimatedComponent(Path);
    const CircleAnimated = Animated.createAnimatedComponent(Circle);
    const ReTextSvgAnimated = Animated.createAnimatedComponent(ReTextSvg);


    useEffect(() => {
        functions.adjustSvgToScreen(setScale);
    })


    return (
        <G style={[{ transform: [{ scale }] }]}>
            <Path strokeLinecap="square" fill="none" strokeWidth="0.5" stroke="red" strokeDasharray="18 10 5 10" d={`M ${width*0.52} 0 A ${width*0.52} ${width*0.52}, 0, 0, 0, 0 -${width*0.52}`} />

            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3.25" stroke="#3D3D3D" d={`M ${width*0.24} 0 A ${width*0.24} ${width*0.24}, 0, 0, 0, 0 -${width*0.24}`} />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3.25" stroke="#3D3D3D" d={`M ${width*0.8} 0 A ${width*0.8} ${width*0.8}, 0, 0, 0,  0 -${width*0.8}`} />




            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3.25" stroke={"#3D3D3D"} d={`M ${width*0.24} 0 L ${width*0.8} 0`} />




            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="3.25" stroke="#3D3D3D" d={`M 0 -${width*0.24} L 0 -${width*0.8}`} />              
            
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1, stroke: "#2ecc71"} ]} d={ props.pathRadiusLeft } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1, stroke: "#2ecc71"} ]} d={ props.pathRadiusRight } />                              

            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} style={[ {strokeWidth: 1.25, fill: "none", stroke: "white"} ]} d={ props.pathAngle } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" style={[ {strokeWidth: 1.25, stroke: "darkgray"} ]} d={ props.pathIntrado } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" style={[ {strokeWidth: 1.25, stroke: "darkgray"} ]} d={ props.pathExtrado } />

            <CircleAnimated cx={width*0.52}  cy={props.circleRadius} r={3.5} fill={"#2ecc71"} /> 

            { (props.checkboxDatasInterfaceState == true ? 
                <G>
                    <ListCurvesStd idSettingsDatas={props.idSettingsDatas} norme={props.norme} curvesMeasure={props.curvesMeasure} idSettingsMeasure={props.idSettingsMeasure} currentDiameter={props.currentDiameter} formatElbow={props.formatElbow} />
                    <ReTextSvgAnimated x={width*0.52} y={-(width*0.52)} fill={"#2ecc71"} fontSize={(height > 1200 ? height*0.035 : height*0.025)} letterSpacing={props.letterSpacingInterpolate} textAnchor={"middle"} name={props.radius} transform={`rotate(${(270)} ${(width*0.81)} ${-(width*0.3)}) translate(${(width*0.3)} ${-3})`}></ReTextSvgAnimated>
                </G> :
            false) }
        </G>
    )

}

