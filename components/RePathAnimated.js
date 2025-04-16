import React from 'react';

import { Path } from 'react-native-svg';
import Animated from 'react-native-reanimated';


export function RePathAnimated (props) {

    const PathAnimated = Animated.createAnimatedComponent(Path);


    return (                

        <PathAnimated strokeLinecap={props.strokeLinecap} strokeLinejoin={props.strokeLinejoin} style={[ props.animatedStyle, props.style ]} animatedProps={props.animatedProps} />
    )

}