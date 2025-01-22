import { Alert, Share, Dimensions } from "react-native";

import { DATAS_TRIGONOMETRICS } from "../datas/datas_trigonometrics";

    const { width, height } = Dimensions.get("window");

    export function getHypotenuse(a, b) {
        return (Math.sqrt((a * a) + (b * b)));
    }
    
    export function getAngleByAbscissa(adjacent, hypotenuse) { 
        return Math.acos(adjacent / hypotenuse) / DATAS_TRIGONOMETRICS.oneDegreRad; // DEGREE
    }

    export const onShare = async () => {
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