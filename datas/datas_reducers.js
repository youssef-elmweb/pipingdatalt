import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


const maxDiameter = Math.round(width*0.8);
const minDiameter = Math.round(width*0.4); 


export const DATAS_REDUCER = { minDiameter: minDiameter, maxDiameter: maxDiameter, curveReducerTop: 0, curveReducerBottom: 11, curveReducerTopExc: 0, curveReducerBottomExc: 11, diameterReductionDiffBase: Math.round((maxDiameter-minDiameter) / 2), reducerHeight: Math.round(height*0.415), heightRemainder: Math.round(height - (height*0.225)), diamInf: 0, diamSup: 1, absolutePositionHeight: Math.round(height*0.775), currentDiameterRedConcExc: 25, heightReducerTop: 11, heightReducerBottom: 0 };


export default {
    DATAS_REDUCER
}