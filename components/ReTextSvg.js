import React, { Component } from 'react';
import { Text } from 'react-native-svg';

export class ReTextSvg extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const roundAngles = [15, 30, 45, 60, 75, 90];

        console.log(this.props.curvesMeasure.intra._value);

        return (
            <Text i={this.props.i} fill={this.props.fill || ((((this.props.name == this.props.curvesMeasure.extra._value) || (this.props.name == this.props.curvesMeasure.intra._value)) && (roundAngles.includes(this.props.angle)) && (this.props.i == this.props.angle)) ? "#3498db" : "darkgray")} strokeWidth={this.props.strokeWidth} letterSpacing={this.props.letterSpacing} style={this.props.style} marginRight={this.props.marginRight} fontSize={this.props.fontSize} textAnchor={this.props.textAnchor} x={this.props.x} y={this.props.y} transform={this.props.transform} translate={this.props.translate} rotate={this.props.rotate} stroke={this.props.stroke} opacity={this.props.opacity}>{(this.props.name ? this.props.name : `${this.props.angle}°`)}</Text>
        )

    }
  
}



  






  


