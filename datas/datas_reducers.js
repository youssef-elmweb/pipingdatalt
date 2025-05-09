import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


const maxDiameter = Math.round(width*0.8);
const minDiameter = Math.round(width*0.4); 


export const DATAS_REDUCER = { minDiameter: minDiameter, maxDiameter: maxDiameter, curveReducerTop: 0, curveReducerBottom: 11.25, curveReducerTopExc: 0, curveReducerBottomExc: 11.7, diameterReductionDiffBase: Math.round((maxDiameter-minDiameter) / 2), reducerHeight: Math.round(height*0.415), positionDiamReducerInferior: (Math.round(height*0.36)), heightRemainder: Math.round(height - (height*0.225)), diamInf: 0, diamSup: 1, absolutePositionHeight: Math.round(height*0.36), currentDiameterRedConcExc: 21.3, heightReducerTop: 0, heightReducerBottom: 11.1 };


export default {
    DATAS_REDUCER
}