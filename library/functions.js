import { Alert, Share, Dimensions } from "react-native";

import { DATAS_TRIGONOMETRICS } from "../datas/datas_trigonometrics";

    const { width, height } = Dimensions.get("window");

    export function getHypotenuse(a, b) {
        "worklet";
        return (Math.sqrt((a * a) + (b * b)));
    }
    
    export function getAngleByAbscissa(adjacent, hypotenuse) { 
        "worklet";
        return Math.acos(adjacent / hypotenuse) / DATAS_TRIGONOMETRICS.oneDegreRad; // DEGREE
    }

    /*export function getDiameterAndHeight(value) { 
        
        let maxDiameter = (width*0.8);
        let minDiameter = (width*0.4);

        let heightRemainder = (height - (height*0.24));
        let reducerHeight = height*0.4;
        let reducerHeightRemainder = (heightRemainder - value);

        let adjacentBase = ((maxDiameter-minDiameter) / 2);
        console.log(Math.round(adjacentBase), "adjacentBase");

        let hypotenuseBase = Math.hypot(reducerHeight, adjacentBase);
        console.log(Math.round(hypotenuseBase), "hypotenuseBase");

        let angle = Math.asin(reducerHeight / hypotenuseBase) * DATAS_TRIGONOMETRICS.oneRad;
        console.log(Math.round(angle), "angle");
        
        let hypotenuse = reducerHeightRemainder / Math.sin(angle*DATAS_TRIGONOMETRICS.oneDegreRad);
        console.log(Math.round(hypotenuse), "hypotenuse");

        console.log(Math.round(reducerHeightRemainder), "opposé");

        let adjacent = Math.cos(angle*DATAS_TRIGONOMETRICS.oneDegreRad) * hypotenuse;
        console.log(Number(Math.round(adjacentBase) - Math.round(adjacent)), "adjacent");

        console.log(Math.round((maxDiameter - minDiameter) / 2), "adjacent de base");

        console.log("\n");

        return value;
    }*/

    export const onShare = async () => {
        "worklet";
        try {
            const result = await Share.share({
                message:
                'https://play.google.com/store/apps/details?id=com.trigotube&gl=FR',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            }   else if (result.action === Share.dismissedAction) {
                // dismissed
                }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    export const adjustSvgToScreen = (setScale) => {
        "worklet";
        let aspectRatio = width / height;
        let scaleValue = 1;

        if (aspectRatio > 0.75) {
            scaleValue = 0.65;
        }   else if (aspectRatio > 0.625 && aspectRatio <= 0.75) {
                scaleValue = 0.75;
            }   else if (aspectRatio <= 0.625) {
                    scaleValue = 1;
                }

        return setScale(scaleValue);
    };

    export const firstLetterToUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);