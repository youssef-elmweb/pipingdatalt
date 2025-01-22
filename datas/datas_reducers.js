import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


const maxDiameter = Math.round(width*0.8);
const minDiameter = Math.round(width*0.4);


export const DATAS_REDUCER = { minDiameter: Math.round(width*0.4), maxDiameter: Math.round(width*0.8), curveReducerTop: 17, curveReducerBottom: 0, diameterReductionDiffBase: Math.round((maxDiameter-minDiameter) / 2), reducerHeight: Math.round(height*0.415), heightRemainder: Math.round(height - (height*0.225)), diamInf: 0, diamSup: 1, absolutePositionHeight: Math.round(height*0.775), currentDiameterRedConc: 26.9, currentDiameterRedExc: Math.round(minDiameter + (Math.round((maxDiameter-minDiameter) / 2))), heightReducerTop: Math.round(17), heightReducerBottom: 0 };


export default {
    DATAS_REDUCER
}