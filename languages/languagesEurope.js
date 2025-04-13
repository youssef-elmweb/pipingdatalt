import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const languagesEurope = [
    {
        id: 'fr', 
        selected: true,
        label: 'Français',
        value: 'french',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'de',
        label: 'Deutsh',
        value: 'deutsh',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'en',
        label: 'English',
        value: 'english',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'es',
        label: 'Español',
        value: 'espanol',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'po',
        label: 'Portuguese',
        value: 'português',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'ne',
        label: 'Nederlands',
        value: 'Nederlands',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'ro',
        label: 'Romanian',
        value: 'Română',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'it',
        label: 'Italiano',
        value: 'italian',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    },
    {
        id: 'cs',
        label: 'Český',
        value: 'czech',
        color: "white",
        labelStyle: {color: "white", fontSize: height*0.015},
        containerStyle: {width: width*0.35, paddingLeft: width*0.06, justifyContent: "flex-start"}
    }
];

export default {
    languagesEurope
}