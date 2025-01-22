import React, { useState, useEffect } from 'react';
import { Animated, Dimensions } from "react-native";
import { G, Path } from 'react-native-svg';


export function ExcentricReducer (props) {
    
    const [currentMinDiameter, setcurrentMinDiameter] = useState("white");

    const { width, height } = Dimensions.get("window");

    const PathAnimated = Animated.createAnimatedComponent(Path);


    useEffect(() => {
        props.currentDiameterRedExc.addListener((value) => { 
            (value.value != 0 ? setcurrentMinDiameter(() => "yellow") : setcurrentMinDiameter(() => "white"));
        })
    }) 


    return (

        <G>
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="0.5" stroke={"lime"} d={props.heightTop} />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="0.5" stroke={(currentMinDiameter == "white" ? "lime" : "deepskyblue")} d={props.heightBottom} />

            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1.25" stroke={"white"} d={ props.excentricRightSide } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1.25" stroke={"white"} d={ props.leftSide } />

            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1.25" stroke={currentMinDiameter} d={ props.rightSideBottom } />
            <PathAnimated strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1.25" stroke={currentMinDiameter} d={ props.excentricLeftSideBottom } />

            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1.25" stroke={"magenta"} d={`M ${width*0.3} ${Math.round(height*0.36)} L ${width*0.7} ${Math.round(height*0.36)}`} />
            <Path strokeLinecap="square" strokeLinejoin={"bevel"} fill="none" strokeWidth="1.25" stroke={"aqua"} d={`M ${width*0.1} ${Math.round(height*0.775)} L ${width*0.7} ${Math.round(height*0.775)}`} />
        </G>
    )
}