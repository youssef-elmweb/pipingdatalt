import React, { Component } from 'react';
import { Text } from 'react-native-svg';

import { DATAS_ELBOWS } from '../datas/datas_elbows';

export class ReTextSvg extends Component {
    

    constructor(props) {
        super(props); 
    }


    render() {
        return (
            <Text i={this.props.i} fill={(this.props.fill || (DATAS_ELBOWS.roundAngles.includes(this.props.curvesMeasure.angle._value) && this.props.curvesMeasure.angle._value == this.props.i) ? "deepskyblue" : "white")} strokeWidth={this.props.strokeWidth} letterSpacing={this.props.letterSpacing} style={this.props.style} marginRight={this.props.marginRight} fontSize={this.props.fontSize} textAnchor={this.props.textAnchor} x={this.props.x} y={this.props.y} transform={this.props.transform} translate={this.props.translate} rotate={this.props.rotate} stroke={this.props.stroke} opacity={this.props.opacity}>{(this.props.name ? this.props.name : `${this.props.angle}°`)}</Text>
        )

    }
  
}



  






  


