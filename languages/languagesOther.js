import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const languagesOther = [
    {
        id: 'ar', 
        label: 'عرب',
        value: 'arabe',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"} 
    },
    {
        id: 'hi',
        label: 'हिंदी',
        value: 'hindi',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'co',
        label: '한국인',
        value: 'corean',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'ru',
        label: 'Русский',
        value: 'russian',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'ma',
        label: '官話',
        value: 'mandarin',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'ur',
        label: 'اردو',
        value: 'urdu',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'ja',
        label: '日本語',
        value: 'japanese',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'tu',
        label: 'Türk',
        value: 'turkish',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'sw',
        label: 'Kiswahili',
        value: 'swahili',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    }
]

export default {
    languagesOther
}