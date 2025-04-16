import React, { useState } from "react";
import { Dimensions } from "react-native";
import { G } from 'react-native-svg';
import { ReTextSvg } from "./ReTextSvg.js";

import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import { DATAS_PIPES } from '../datas/datas_pipes.js';
import { DATAS_TRIGONOMETRICS } from "../datas/datas_trigonometrics.js";
import { UNITS_MEASURES } from '../datas/units_measures.js';

export function ListCurvesStd (props) {

    const [, setAngle] = useState(null);

    const { width, height } = Dimensions.get("window");


    useAnimatedReaction(
        () => props.angle.value,
        (newValue, oldValue) => {
            if (newValue !== oldValue) {
            runOnJS(setAngle)(newValue);
            }
        }
    );


    const TABINTRA = [];
    const TABEXTRA = [];
    const RADIUSEXTRA = (width*0.8);
    const RADIUSINTRA = (width*0.24);
    const UNITMEASURE = parseFloat(UNITS_MEASURES[props.idSettingsMeasure].unit).toFixed(props.idSettingsDatas);


    for (let i = 15; i < 76; i+=15) {
        TABINTRA.push(
            <ReTextSvg norme={props.norme} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} key={`angle_list_curv_intra_${i}`} fontSize={(height > 1200 ? height*0.035 : width*0.03)} curvesMeasure={props.curvesMeasure} x={Math.cos(i*DATAS_TRIGONOMETRICS.oneDegreRad) * (RADIUSINTRA+20)} y={-Math.sin(i*DATAS_TRIGONOMETRICS.oneDegreRad) * (RADIUSINTRA+20)} name={Number(parseFloat(((((DATAS_PIPES[props.currentDiameter][props.formatElbow] - (DATAS_PIPES[props.currentDiameter][props.norme] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * i) * UNITMEASURE).toFixed(props.idSettingsDatas))} i={i} />
        )
        TABEXTRA.push(
            <ReTextSvg norme={props.norme} idSettingsMeasure={props.idSettingsMeasure} idSettingsDatas={props.idSettingsDatas} key={`angle_list_curv_extra_${i}`} fontSize={(height > 1200 ? height*0.035 : width*0.03)} curvesMeasure={props.curvesMeasure} x={Math.cos(i*DATAS_TRIGONOMETRICS.oneDegreRad) * (RADIUSEXTRA+5)} y={-Math.sin(i*DATAS_TRIGONOMETRICS.oneDegreRad) * (RADIUSEXTRA+5)} name={Number(parseFloat((((((DATAS_PIPES[props.currentDiameter][props.norme] / 2) + (DATAS_PIPES[props.currentDiameter][props.formatElbow])) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * i) * UNITMEASURE).toFixed(props.idSettingsDatas))} i={i} />
        )
    }


    return (
        <G>
            <G>
                { TABINTRA }
            </G>

            <G>
                { TABEXTRA }
            </G>
        </G>
    )

}




