import React, { Component } from 'react';
import { Text } from "react-native";

export class ReText extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={[{width: this.props.width, marginHorizontal: this.props.marginHorizontal, paddingHorizontal: this.props.paddingHorizontal, marginLeft: this.props.marginLeft, paddingLeft: this.props.paddingLeft, flex: this.props.flex, lineHeight: this.props.lineHeight, textAlign: this.props.textAlign, fontSize: this.props.fontSize, fontWeight: this.props.fontWeight, color: this.props.color, backgroundColor: this.props.backgroundColor}]}>{(this.props.name ? this.props.name : `${this.props.angle}°`)}</Text>
        )
    }
  
}



  


