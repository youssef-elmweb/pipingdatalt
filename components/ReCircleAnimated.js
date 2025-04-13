import React from 'react';

import { Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';


export function ReCircleAnimated (props) {

    const CircleAnimated = Animated.createAnimatedComponent(Circle);


    return (                

        <CircleAnimated cx={props.cx} animatedProps={props.animatedProps} r={props.r} fill={props.fill} />
    )

}