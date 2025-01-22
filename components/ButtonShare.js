import React from 'react';
import {View, Text, Pressable} from 'react-native';

import * as functions from "./../library/functions.js";

export function ButtonShare (props) {

  return (


    <Pressable onPress={functions.onShare}>
        <View onShare={functions.onShare}>
            <Text style={[ {fontSize: 15, color: "white"} ]}>{props.title}</Text>
        </View>
    </Pressable>

  )

}

