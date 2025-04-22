import { React, useRef, useEffect, useState } from "react";
import { View, Text, Image, Switch, StatusBar, Pressable, TouchableHighlight, StyleSheet, useWindowDimensions, Animated, Platform, Dimensions } from "react-native";

import { ReText } from  "./components/ReText";
import { ValidatedValue } from "./components/ValidatedValue.js";
import Slider from '@react-native-community/slider';

import { languages } from './languages/languages.js';

import { DATAS_PIPES } from './datas/datas_pipes.js';
import { DATAS_ELBOWS } from "./datas/datas_elbows.js";
import { DATAS_REDUCER } from "./datas/datas_reducers.js";
import { DATAS_TRIGONOMETRICS } from "./datas/datas_trigonometrics.js";
import { UNITS_MEASURES } from './datas/units_measures.js';

import { ModalSettings } from "./components/modals/ModalSettings.js";
import { ModalLanguages } from "./components/modals/ModalLanguages.js";
import { ModalUtilities } from "./components/modals/ModalUtilities.js";
import { ModalPrinters } from "./components/modals/ModalPrinters.js";

import { ViewElbow } from "./components/view/ViewElbow";
import { ViewReducer } from "./components/view/ViewReducer.js";


export default function App() {

    ////////////////////// HOOKS ///////////////////////////////////////
    const [statusModalLanguages, setStatusModalLanguages] = useState(false);
    const [idLanguage, setIdLanguage] = useState('en');

    const heightStautusBar = StatusBar.currentHeight;
    ////////////////////// HOOKS ///////////////////////////////////////


    //////////////////// CONSTANTS /////////////////////////////////////
    ///////////////// constants values /////////////////////////////////
    const { height, width } = useWindowDimensions();
    ///////////////// constants values /////////////////////////////////

    ///////////// constants api Animated ///////////////////////////////
    const ReTextAnimated = Animated.createAnimatedComponent(ReText); 
    const ValidatedValueAnimated = Animated.createAnimatedComponent(ValidatedValue);

    const ANGLE = useRef(new Animated.Value(DATAS_ELBOWS.angle)).current;
    
    const INTRA = useRef(new Animated.Value(DATAS_ELBOWS.intra)).current;
    const EXTRA = useRef(new Animated.Value(DATAS_ELBOWS.extra)).current;
    const RADIUS = useRef(new Animated.Value(DATAS_ELBOWS.radius)).current;

    const DIAMETER_INFERIOR_REDUCER = useRef(new Animated.Value(0)).current; // index of diameters array
    const DIAMETER_SUPERIOR_REDUCER = useRef(new Animated.Value(1)).current; // index of diameters array
    const ABSOLUTE_POSITION_HEIGHT = useRef(new Animated.Value(DATAS_REDUCER.absolutePositionHeight)).current;
    const CURRENT_DIAMETER_REDUCER_CONC = useRef(new Animated.Value(DATAS_REDUCER.currentDiameterRedConc)).current;
    const CURRENT_DIAMETER_REDUCER_EXC = useRef(new Animated.Value(DATAS_REDUCER.currentDiameterRedExc)).current;
    const HEIGHT_REDUCER_TOP = useRef(new Animated.Value(DATAS_REDUCER.heightReducerTop)).current;
    const HEIGHT_REDUCER_BOTTOM = useRef(new Animated.Value(DATAS_REDUCER.heightReducerBottom)).current;
    const CURVE_REDUCER_TOP = useRef(new Animated.Value(DATAS_REDUCER.curveReducerTop)).current;
    const CURVE_REDUCER_BOTTOM = useRef(new Animated.Value(DATAS_REDUCER.curveReducerBottom)).current;

    const FORMAT = useRef(new Animated.Value(3)).current;
    const DIAMETER = useRef(new Animated.Value(0)).current; // index of diameters array
    const NORME = useRef(new Animated.Value(2)).current;

    const BASEANGLE = useRef(new Animated.Value(0)).current;
    const BASEDATAS = useRef(new Animated.Value(2)).current;
    const MEASUREUNIT = useRef(new Animated.Value(0)).current;
    ///////////// constants api Animated ///////////////////////////////
    ///////////////// CONSTANTS ////////////////////////////////////////


    //////////////////  HOOKS //////////////////////////////////////////
    const [sizeText, setSizeText] = useState(width*0.0375);

    const [currentDiameter, setCurrentDiameter] = useState(0); // current line of array DATAS_PIPES
    const [elbowLayer, setElbowLayer] = useState("elbow");
    const [formatElbow, setFormatElbow] = useState(3); 

    const [currentDiameterSuperiorReducer, setCurrentDiameterSuperiorReducer] = useState(1);
    const [currentDiameterInferiorReducer, setCurrentDiameterInferiorReducer] = useState(0); // current line of array DATAS_PIPES
    const [currentReducer, setCurrentReducer] = useState("reducer-conc");
    
    const [isShown, setIsShown] = useState(false); // Show or Hide the purple box
    const [labelNorme, setLabelNorme] = useState("iso/ansi");
    const [statutSwitch, setStatutSwitch] = useState(true);
    const [colorSwitch, setColorSwitch] = useState("silver");

    const [statusModalSettings, setStatusModalSettings] = useState(false);
    const [statusModalUtilities, setStatusModalUtilities] = useState(false);
    const [statusModalPrinters, setStatusModalPrinters] = useState(false);

    const [idSettingsMeasure, setIdSettingsMeasure] = useState(0);
    const [idSettingsDiameter, setIdSettingsDiameter] = useState(0);
    const [idSettingsAngle, setIdSettingsAngle] = useState(0);
    const [idSettingsDatas, setIdSettingsDatas] = useState(2);

    const [checkboxDatasInterfaceState, setCheckboxDatasInterfaceState] = useState(true);

    const [tempElbowDiameterInferior, setTempElbowDiameterInferior] = useState(0);
    const [tempReducerDiameterInferior, setTempReducerDiameterInferior] = useState(1);
    const [tempReducerDiameterSuperior, setTempReducerDiameterSuperior] = useState(1); 
    

    useEffect(() => {
        makeFormat();
        MEASUREUNIT.setValue(idSettingsMeasure);
        BASEANGLE.setValue(idSettingsAngle);
        BASEDATAS.setValue(idSettingsDatas);

        setIdSettingsMeasure(() => idSettingsMeasure);
        setIdSettingsAngle(() => idSettingsAngle);
        (idSettingsMeasure === 1 ? (idSettingsDatas == 1 ? setIdSettingsDatas(1) : setIdSettingsDatas(2)) : setIdSettingsDatas(() => idSettingsDatas));
    })
    //////////////////  HOOKS //////////////////////////////////////////


    ///////////// INTERPOLATION GLOBAL /////////////////////////////////
    const colorDatasCurves = ANGLE.interpolate({ 
        inputRange: [1.00, 14.99, 15.00, 15.01, 29.99, 30.00, 30.01, 44.99, 45.00, 45.01, 59.99, 60, 60.01, 74.99, 75, 75.01, 89.99, 90], 
        outputRange: ["darkgray", "darkgray", "#3498db", "darkgray", "darkgray", "#3498db", "darkgray", "darkgray", "#3498db", "darkgray", "darkgray", "#3498db", "darkgray", "darkgray", "#3498db", "darkgray", "darkgray", "#3498db"], 
        extrapolate: "clamp" 
    })
    ///////////// INTERPOLATION GLOBAL /////////////////////////////////


    ///////////////// FUNCTIONS ////////////////////////////////////////
    const getDatasElbows = (datas) => {
        return datas;
    }

    const makeDatasElbowByAngle = (datas) => {
        if (datas.angle) {
            ANGLE.setValue(datas.angle);
        }

        if (Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[0].unit).toFixed(1)) <= 0.6) { // pour ne pas avoir undefined si valeur trop basse en mm
            RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(1)));
            INTRA.setValue(Number(parseFloat(((((DATAS_PIPES[DIAMETER._value][FORMAT._value] - (DATAS_PIPES[DIAMETER._value][NORME._value] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(1)));
            EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES[DIAMETER._value][NORME._value] / 2) + DATAS_PIPES[DIAMETER._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(1)));
        }
        if (Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[1].unit).toFixed(1)) <= 0.03) { // pour ne pas avoir undefined si valeur trop basse en pouces
            RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(2)));
            INTRA.setValue(Number(parseFloat(((((DATAS_PIPES[DIAMETER._value][FORMAT._value] - (DATAS_PIPES[DIAMETER._value][NORME._value] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(2)));
            EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES[DIAMETER._value][NORME._value] / 2) + DATAS_PIPES[DIAMETER._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(2)));
        }   else {
                RADIUS.setValue(Number(parseFloat(Math.tan((DATAS_TRIGONOMETRICS.oneDegreRad * ANGLE._value) / 2) * DATAS_PIPES[DIAMETER._value][FORMAT._value] * UNITS_MEASURES[MEASUREUNIT._value].unit).toFixed(BASEDATAS._value)));
                INTRA.setValue(Number(parseFloat(((((DATAS_PIPES[DIAMETER._value][FORMAT._value] - (DATAS_PIPES[DIAMETER._value][NORME._value] / 2)) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(BASEDATAS._value)));
                EXTRA.setValue(Number(parseFloat((((((DATAS_PIPES[DIAMETER._value][NORME._value] / 2) + DATAS_PIPES[DIAMETER._value][FORMAT._value]) * DATAS_TRIGONOMETRICS.piOverTwo) / 90) * ANGLE._value) * (UNITS_MEASURES[MEASUREUNIT._value].unit)).toFixed(BASEDATAS._value)));
            }
    }     

    const getDatasReducer = (datas) => { 
        ABSOLUTE_POSITION_HEIGHT.setValue(datas.absolutePositionHeight);
        HEIGHT_REDUCER_TOP.setValue(datas.heightReducerTop);
        HEIGHT_REDUCER_BOTTOM.setValue(datas.heightReducerBottom);
        CURVE_REDUCER_TOP.setValue(datas.curveReducerTop);
        CURVE_REDUCER_BOTTOM.setValue(datas.curveReducerBottom);
        CURRENT_DIAMETER_REDUCER_CONC.setValue(datas.currentDiameterRedConc);
        CURRENT_DIAMETER_REDUCER_EXC.setValue(datas.currentDiameterRedExc);
    }

    const makeHeightsReducerByDiam = (diameterSup, diameterInf) => {
        let heightReducerPath = Math.round(DATAS_REDUCER.heightRemainder - ABSOLUTE_POSITION_HEIGHT._value);

        let heightReducer = (diameterSup - diameterInf) * 3;
        let diameterReductionDiff = ((diameterSup - diameterInf) * 0.5);
        let angle = Math.asin(heightReducer / Math.hypot(heightReducer, diameterReductionDiff)) * DATAS_TRIGONOMETRICS.oneRad;

        let heightReducerTop = Number.parseFloat(((heightReducer) - ((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath)).toFixed(1));
        let heightReducerBottom = Number.parseFloat(((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath).toFixed(1));

        let curveReducerTop = heightReducerTop / Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad); 
        let curveReducerBottom = heightReducerBottom / Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad);

        let currentDiameterReductionDiff = Math.cos(angle * DATAS_TRIGONOMETRICS.oneDegreRad) * curveReducerBottom;
        
        let currentDiameterRedConc = DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value] + ((diameterReductionDiff - currentDiameterReductionDiff) * 2);
        let currentDiameterRedExc = DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value] + ((diameterReductionDiff - currentDiameterReductionDiff) * 2);

        HEIGHT_REDUCER_TOP.setValue(Math.round(heightReducerTop));
        HEIGHT_REDUCER_BOTTOM.setValue(Math.round(heightReducerBottom));
        CURVE_REDUCER_TOP.setValue(Math.round(curveReducerTop));
        CURVE_REDUCER_BOTTOM.setValue(Math.round(curveReducerBottom));
        CURRENT_DIAMETER_REDUCER_CONC.setValue(Number.parseFloat(currentDiameterRedConc.toFixed(1)));
        CURRENT_DIAMETER_REDUCER_EXC.setValue(Number.parseFloat(currentDiameterRedExc.toFixed(1)));
    }

    const getHeightsReducerByDiamSuperior = (value) => { 
        let diameterSuperior = (value == 0 ? DATAS_PIPES[1][NORME._value] : DATAS_PIPES[value][NORME._value]);
        let diameterInferior = DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value];

        makeHeightsReducerByDiam(diameterSuperior, diameterInferior);
    }

    const getHeightsReducerByDiamInferior = (value) => { 
        let diameterSuperior = DATAS_PIPES[DIAMETER_SUPERIOR_REDUCER._value][NORME._value];
        let diameterInferior = DATAS_PIPES[value][NORME._value];

        makeHeightsReducerByDiam(diameterSuperior, diameterInferior);  
    }

    const makeFormat = () => {
      makeDatasElbowByAngle(getDatasElbows);
      FORMAT.setValue(formatElbow);
      return FORMAT._value;
    }

    const toggleTheBox = () => { // This function will be triggered when the Switch changes
      setIsShown((previousState) => !previousState);
      setLabelNorme((value) => (value === "iso" ? "ansi" : "iso"));
      (labelNorme === "iso" ? NORME.setValue(6) : NORME.setValue(2));
      makeDatasElbowByAngle(DATAS_ELBOWS);
    };

    function decreaseText() {
      if (sizeText > width*0.03) { // 11 or sizeText is current initial state of size values
          setSizeText(sizeText-0.35); 
      }
    }

    function increaseText() {
      if (sizeText < width*0.04) { 
          setSizeText(sizeText+0.5); 
      }
    }

    const setCurrentInterface = (currentInterface) => {
      setElbowLayer(currentInterface);
    }

    const makeStatusModalSettings = () => {
      setStatusModalSettings(false);
    }

    const makeCheckboxDatasInterfaceState = () => {
      setCheckboxDatasInterfaceState(!checkboxDatasInterfaceState);
    }

    const makeStatusModalLanguages = () => {
      setStatusModalLanguages(false);
    }

    const makeStatusModalUtilities = () => {
      setStatusModalUtilities(false); 
    }

    const makeStatusModalPrinters = () => {
      setStatusModalUtilities(() => !statusModalUtilities); 
      setStatusModalPrinters(() => !statusModalPrinters); 
    }
    ///////////////// FUNCTIONS ////////////////////////////////////////


    return (
        <View style={[ styles.container ]}>
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   HEADER   //////////////////////////////////////////////////*/}
            
            <StatusBar style={"auto"} />

            <ModalUtilities idLanguage={idLanguage} statusModalUtilities={statusModalUtilities} makeStatusModalUtilities={makeStatusModalUtilities} makeStatusModalPrinters={makeStatusModalPrinters} />

            <ModalPrinters idLanguage={idLanguage} statusModalPrinters={statusModalPrinters} makeStatusModalPrinters={makeStatusModalPrinters} />

            <ModalSettings style={{ flex: 1, marginLeft: 200, textAlign: "center", alignSelf: "center" }} idLanguage={idLanguage} statusModalSettings={statusModalSettings} checkboxDatasInterfaceState={checkboxDatasInterfaceState} idSettingsMeasure={idSettingsMeasure} idSettingsDiameter={idSettingsDiameter} idSettingsAngle={idSettingsAngle} idSettingsDatas={idSettingsDatas} setIdSettingsMeasure={ setIdSettingsMeasure } setIdSettingsDiameter={ setIdSettingsDiameter } setIdSettingsAngle={ setIdSettingsAngle } setIdSettingsDatas={ setIdSettingsDatas } makeCheckboxDatasInterfaceState={ makeCheckboxDatasInterfaceState } makeStatusModalSettings={ makeStatusModalSettings } />

            <ModalLanguages idLanguage={idLanguage} statusModalLanguages={ statusModalLanguages } setIdLanguage={ setIdLanguage } makeStatusModalLanguages={ makeStatusModalLanguages } />

            {(elbowLayer ?
            <View style={[ { height: height*0.3, paddingTop: heightStautusBar, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}>
                <View style={[ { width: width, height: "35%", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" } ]}>
                    <View style={[ { width: width, height: "45%", paddingLeft: width*0.035, paddingRight: width*0.035, flexDirection: "row", justifyContent: "center", alignItems: "center" } ]}>
                        <View style={[ { flex: width*0.12 } ]}>
                            <Pressable style={[ {justifyContent: "center", alignItems: "flex-start"} ]} onPressOut={ () => setStatusModalUtilities(true) }>
                                <Image alt={"utility"} style={[ { width: width*0.075, height: width*0.075 } ]} source={require("./assets/images/utility.png")} />
                            </Pressable>
                        </View>

                        <View style={[ {flex: width*0.23, flexDirection: "row", justifyContent: "space-between", alignItems: "center"} ]}>
                            <TouchableHighlight style={[ {width: width*0.09, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 5, borderBottomRightRadius: 5, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, backgroundColor: "#313131"} ]} activeOpacity={0.25} onPressOut={ () => decreaseText() }>
                                <Image alt={"decrease"} style={[ {width: width*0.04, height: width*0.05} ]} source={require("./assets/images/text-decrease.png")} />
                            </TouchableHighlight>

                            <TouchableHighlight style={[ {width: width*0.09, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, backgroundColor: "#313131"} ]} activeOpacity={0.25} onPressOut={ () => increaseText() }>
                                <Image alt={"increase"} style={[ {width: width*0.04, height: width*0.05} ]} source={require("./assets/images/text-increase.png")} />
                            </TouchableHighlight>
                        </View>

                        <View style={[ {height: width*0.12, marginTop: (height > 1200 ? (height*0.045) : (height*0.0075)), flex: (height > 700 ? width*0.30 : width*0.53), justifyContent: "flex-start", alignContent: "flex-start", alignItems: "center"} ]}>
                            <Text style={[ {height: width*0.12, fontSize: width*0.025, color: "#D1D1D1"} ]}>{`${languages[0][idLanguage].unit} | ${languages[0][idLanguage][UNITS_MEASURES[idSettingsMeasure].label]}`}</Text>
                        </View>

                        <View style={[ {flex: width*0.35, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"} ]}>
                            <Pressable style={[ {marginRight: 25, justifyContent: "center", alignItems: (height > 700 ? "center" : "flex-start")} ]} onPressOut={ () => setStatusModalLanguages(true) }>
                                <Image alt={"languages"} style={[ {width: width*0.075, height: width*0.075} ]} source={require("./assets/images/languages.png")} />
                            </Pressable>

                            <Pressable style={[ {justifyContent: "center", alignItems: (height > 700 ? "center" : "flex-start")} ]} title={"settings"} onPressOut={ () => setStatusModalSettings(true) }>
                                <Image alt={"settings"} style={[ {width: width*0.075, height: width*0.075} ]} source={require("./assets/images/setting.png")} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={[ {width: width, padding: width*0.00725, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#313131"} ]}>
                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === "elbow" ? "forestgreen" : "tomato")} onPress={ () => { setCurrentInterface("elbow"); setTempElbowDiameterInferior(currentDiameter) } }>
                            <Image alt={"elbow"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === 'elbow-double' ? "forestgreen" : "tomato")} onPressOut={ () => { return false; } }>
                            <Image alt={"elbow-double"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow_double.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === 'elbow-double-oriented' ? "forestgreen" : "tomato")} onPressOut={ () => { return false; } }>
                            <Image alt={"elbow-double-oriented"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow_double_oriented.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === 'elbow-slices' ? "forestgreen" : "tomato")} onPressOut={ () => { return false; } }>
                            <Image alt={"elbow-slices"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow_slice.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === 'reducer' ? "forestgreen" : "tomato")} onPress={ () => { setCurrentInterface("reducer"); setTempReducerDiameterInferior(currentDiameterInferiorReducer); setTempReducerDiameterSuperior(currentDiameterSuperiorReducer); } }>
                            <Image alt={"reducer"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/reducer_conc.png')} />
                        </Pressable>
                    </View>
                </View>


                <View style={[ { width: width*0.98, minHeight: (height > 1200 ? height*0.025 : height*0.025), maxHeight: (height > 1200 ? height*0.025 : height*0.03), flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                    {
                        (elbowLayer != "reducer" ?
                            (elbowLayer != "elbow-slices" ?

                                <View style={[ { width: width*0.95, marginHorizontal: width*0.029, marginTop: (height > 1200 ? 0 : height*0.005), flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                                    <Text style={[ styles.labelTopBar, { width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03 } ]}>{`Ø`}</Text>
                                    <Text key={"intra-extra-values"} style={[ styles.labelTopBar, { width: width*0.375, marginHorizontal: width*0.01, lineHeight: height*0.0225, fontSize: width*0.03 } ]}>{`${languages[0][idLanguage].intra}/${languages[0][idLanguage].extra}`}</Text>
                                    <Text key={"radius-values"} style={[ styles.labelTopBar, { width: width*0.375, lineHeight: height*0.0225, fontSize: width*0.03 } ]}>{`${languages[0][idLanguage].angle}/${languages[0][idLanguage].radius}`}</Text>
                                </View>
                                
                            : 
                            
                            false) : 

                            <View style={[ { width: width*0.98, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                                <View style={[ { width: width*0.95, marginHorizontal: width*0.03, flexDirection: "row", backgroundColor: "transparent" } ]}>
                                    <View style={[ { width: width*0.25, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                                        <View style={[ { marginTop: (height > 1200 ? 0 : height*0.005), flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{`Ø inf`}</Text>
                                        </View>

                                        <View style={[ {paddingLeft: width*0.007, backgroundColor: "transparent"} ]}>
                                            <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="magenta" name={DATAS_PIPES[currentDiameterInferiorReducer][NORME._value]} />
                                            <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="magenta" name={(idSettingsDiameter == 0 ? `DN ${DATAS_PIPES[currentDiameterInferiorReducer][0]}` : `${DATAS_PIPES[currentDiameterInferiorReducer][idSettingsDiameter]} "`)} />
                                        </View>
                                    </View>

                                    <View style={[ { width: width*0.25, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                                        <View style={[ { lineHeight: height*0.0225, marginTop: (height > 1200 ? 0 : height*0.005), flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{`Ø sup`}</Text>
                                        </View>

                                        <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                                            <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="aqua" name={DATAS_PIPES[currentDiameterSuperiorReducer][NORME._value]} />
                                            <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="aqua" name={(idSettingsDiameter == 0 ? `DN ${DATAS_PIPES[currentDiameterSuperiorReducer][0]}` : `${DATAS_PIPES[currentDiameterSuperiorReducer][idSettingsDiameter]} "`)} />
                                        </View>
                                    </View>

                                    <View style={[ { width: width*0.25, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                                        <View style={[ { lineHeight: height*0.0225, marginTop: (height > 1200 ? 0 : height*0.005), flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{"/"}</Text>
                                        </View>

                                        <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                                            <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="white" valueForCheck={CURVE_REDUCER_TOP} />
                                            <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="yellow" valueForCheck={CURVE_REDUCER_BOTTOM} />
                                        </View>
                                    </View>

                                    <View style={[ { width: width*0.25, flexDirection: "column", justifyContent: "space-between", backgroundColor: "transparent" } ]}>
                                        <View style={[ { lineHeight: height*0.0225, marginTop: (height > 1200 ? 0 : height*0.005), flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <Text style={[ styles.labelTopBar, {width: width*0.15, lineHeight: height*0.0225, fontSize: width*0.03} ]}>{`H`}</Text>
                                        </View>

                                        <View style={[ {paddingLeft: width*0.007, justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                                            <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="lime" valueForCheck={ HEIGHT_REDUCER_TOP } />
                                            <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="deepskyblue" valueForCheck={ HEIGHT_REDUCER_BOTTOM } />
                                        </View>
                                    </View>
                                </View>

                                <View style={[ { width: width, marginTop: height*0.005, marginLeft: width*0.01, flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "transparent" } ]}>
                                    <View style={[ { width: width*0.5, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "transparent" } ]}>
                                        <View style={[ { width: width*0.2, flexDirection: "row", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <Text style={[ styles.labelTopBar, {width: width*0.15, minHeight: height*0.025, maxHeight: height*0.025, lineHeight: height*0.025, fontSize: width*0.03 } ]}>{`Ø`}</Text>
                                        </View>

                                        <View style={[ { width: width*0.3, backgroundColor: "transparent"} ]}>
                                            {(currentReducer == "reducer-conc" ? 
                                                <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="white" valueForCheck={ CURRENT_DIAMETER_REDUCER_CONC } />
                                            : false)}

                                            {(currentReducer == "reducer-exc" ? 
                                                <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="white" valueForCheck={ CURRENT_DIAMETER_REDUCER_EXC } />
                                            : false)}
                                        </View>
                                    </View>

                                    <View style={[ { width: width*0.3, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "transparent" } ]}>
                                        <TouchableHighlight key={"reducers"} style={[ { width: width*0.0725, height: width*0.0725, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "white", borderTopRightRadius: 25, borderBottomRightRadius: 25, borderBottomLeftRadius: 25, borderTopLeftRadius: 25, backgroundColor: "#414141" } ]} activeOpacity={0.25} onPress={ () => setCurrentReducer(() => (currentReducer == "reducer-conc" ? "reducer-exc" : "reducer-conc")) }>
                                            {
                                                (
                                                    currentReducer == "reducer-conc" ?
                                                        <Image alt={"reducer"} style={[ { width: width*0.0725, height: width*0.0725 } ]} source={require('./assets/images/reducer_conc.png')} /> :
                                                        <Image alt={"reducer"} style={[ { width: width*0.0725, height: width*0.0725 } ]} source={require('./assets/images/reducer_exc.png')} />
                                                )
                                            }
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </View>                 


                <View style={[ {width: width*0.911, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent"} ]}>
                    {(elbowLayer != "reducer" ?
                        <View style={[ {width: (height > 1200 ? width*0.25 : width*0.17), justifyContent: "space-between", alignItems: "flex-start", backgroundColor: "transparent"} ]}>
                            <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="aqua" name={DATAS_PIPES[currentDiameter][NORME._value]} />
                            <ReTextAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color="aqua" name={(idSettingsDiameter == 0 ? `DN ${DATAS_PIPES[currentDiameter][0]}` : `${DATAS_PIPES[currentDiameter][idSettingsDiameter]} "`)} />
                        </View> : 
                    false)}

                    <View style={[ {justifyContent: "center", alignItems: "center", backgroundColor: "transparent"} ]}>
                        <View style={[ {justifyContent: "center", alignItems: "center"} ]}>


                            {(elbowLayer == "elbow" ?
                                <View style={[ {width: width*0.405, paddingLeft: width*0.13} ]}>
                                    <ReTextAnimated fontSize={sizeText} color={colorDatasCurves} name={INTRA} />
                                    <ReTextAnimated fontSize={sizeText} color={colorDatasCurves} name={EXTRA} />
                                </View>
                            : false)}
                        </View>
                    </View>

                    <View style={[ {justifyContent: "center", alignItems: "center"} ]}>
                        <View style={[ {alignItems: "flex-end"} ]}>
                            <View style={[ {width: width*0.405} ]}>

                                {(elbowLayer == "elbow" ?
                                    [
                                        <ReTextAnimated key={`elbow-angle`} textAlign={"center"} fontSize={sizeText} color="white" angle={ANGLE} />,
                                        <ReTextAnimated key={`elbow-radius`} textAlign={"center"} fontSize={sizeText} color="#2ecc71" name={RADIUS} />
                                    ]
                                : false)}

                            </View>
                        </View>
                    </View>
                </View>
            </View> : false)}
            {/*/////////////////////////////////////////////   HEADER   //////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}


            {/*/////////////////////////////////////////   INTERFACE VIEW   //////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {(elbowLayer == "elbow" ?
                <ViewElbow elbowLayer={elbowLayer} baseAngle={BASEANGLE} shareAngleElbow={makeDatasElbowByAngle} curvesMeasure={ {angle: ANGLE, intra: INTRA, extra: EXTRA} } diameter={currentDiameter} format={formatElbow} currentDiameter={currentDiameter} norme={NORME._value} formatElbow={formatElbow} measureUnit={MEASUREUNIT} idSettingsMeasure={idSettingsMeasure} idSettingsAngle={idSettingsAngle} idSettingsDatas={idSettingsDatas} checkboxDatasInterfaceState={checkboxDatasInterfaceState} />                                                        
            : false)}

            {(elbowLayer == "reducer" ?
                <ViewReducer idLanguage={idLanguage} sizeText={sizeText} currentDiameterInferiorReducer={currentDiameterInferiorReducer} currentDiameterSuperiorReducer={currentDiameterSuperiorReducer} diameterSuperiorReducer={DIAMETER_SUPERIOR_REDUCER} diameterInferiorReducer={DIAMETER_INFERIOR_REDUCER} absolutePositionHeight={ABSOLUTE_POSITION_HEIGHT} currentReducer={currentReducer} currentDiameterRedConc={CURRENT_DIAMETER_REDUCER_CONC} currentDiameterRedExc={CURRENT_DIAMETER_REDUCER_EXC} norme={NORME} idSettingsMeasure={idSettingsMeasure} idSettingsDatas={idSettingsDatas} checkboxDatasInterfaceState={checkboxDatasInterfaceState} shareDiameterAndHeight={getDatasReducer} /> 
            : 
            false)}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////   INTERFACE VIEW   //////////////////////////////////////////////*/}

            
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   FOOTER   //////////////////////////////////////////////////*/}
            
            {(elbowLayer != "reducer" ?
                <View key={"square-screen-options-footer"} style={[ { width: width, height: height*0.23, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}> 

                    <View style={[ { width: width*0.95, height: height*0.1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", backgroundColor: "transparent" } ]}>
                        <View style={[ {width: width*0.475, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", backgroundColor: "transparent"} ]} key="bloc-formats" id="formats">
                            <Pressable style={[ styles.format, {width: width*0.125, height: height*0.045 } ]} backgroundColor={(formatElbow === 4 ? "forestgreen" : "#525252")} onPressOut={ () => { setFormatElbow(4), FORMAT.setValue(4), makeDatasElbowByAngle(DATAS_ELBOWS) }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`2D`}</Text></Pressable>
                            <Pressable style={[ styles.formatStd, {width: width*0.125, height: height*0.045} ]} backgroundColor={(formatElbow === 3 ? "forestgreen" : "#525252")} onPressOut={ () => { setFormatElbow(3), FORMAT.setValue(3), makeDatasElbowByAngle(DATAS_ELBOWS) }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`3D`}</Text></Pressable>
                            <Pressable style={[ styles.format, {width: width*0.125, height: height*0.045} ]} backgroundColor={(formatElbow === 5 ? "forestgreen" : "#525252")} onPressOut={ () => { setFormatElbow(5), FORMAT.setValue(5), makeDatasElbowByAngle(DATAS_ELBOWS) }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`5D`}</Text></Pressable>
                        </View>

                        <View style={[ {width: width*0.3, height: height*0.045, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: (Platform.OS != "ios" ? 5 : false), backgroundColor: (Platform.OS != "ios" ? "#525252" : false)} ]}>
                            <Text style={[ {fontSize: width*0.035, fontWeight: 'bold', color: 'white'} ]}>{labelNorme}</Text>
                            
                            {<Switch
                                trackColor={ {false: "#ddd", true: "#ddd"} }
                                thumbColor={isShown ? colorSwitch : colorSwitch}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleTheBox}
                                value={isShown}
                                disabled={statutSwitch}
                            />}
                        </View>
                    </View> 

                    <View>
                        <Slider 
                            aria-label = {"diameter"}
                            thumbTintColor	= {"aqua"}
                            style = {[ {width: width*0.97, height: height*0.03} ]} 
                            minimumValue = {0}
                            maximumValue = {DATAS_PIPES.length-1}
                            step = {1}
                            value={tempElbowDiameterInferior}
                            minimumTrackTintColor = {"white"}
                            maximumTrackTintColor = {"white"}
                            onValueChange = {
                                                (value) => {
                                                    if (DATAS_PIPES[value][6] === "sms") {
                                                        NORME.setValue(2); setLabelNorme(() => 'sms'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                    }   else if (DATAS_PIPES[value][6] === 73 || DATAS_PIPES[value][6] === 141 || DATAS_PIPES[value][2] === 76.1 || DATAS_PIPES[value][2] === 139.7) { 
                                                            (labelNorme === "ansi" ? NORME.setValue(6) : NORME.setValue(2)); (NORME._value === 2 ? setLabelNorme('iso') : setLabelNorme('ansi')); setStatutSwitch(false); setColorSwitch('forestgreen');
                                                        }   else {
                                                                NORME.setValue(2); setLabelNorme(() => 'iso/ansi'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                            }

                                                    setCurrentDiameter(value);
                                                    DIAMETER.setValue(value);
                                                    makeDatasElbowByAngle(DATAS_ELBOWS);
                                                }
                                            }
                        />
                    </View>
                </View> 
            : 

                <View key={"square-screen-options-footer"} style={[ { width: width, height: height*0.23, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}> 
                    <Slider 
                        aria-label = {"inferior-reducer"}
                        thumbTintColor	= {"magenta"}
                        style = {[ {width: width*0.97, height: height*0.1} ]} 
                        minimumValue = {0}
                        maximumValue = {DATAS_PIPES.length-1}
                        step = {1}
                        value={tempReducerDiameterInferior}
                        minimumTrackTintColor = {"white"}
                        maximumTrackTintColor = {"white"}
                        onValueChange = {
                                            (value) => {
                                                if (DATAS_PIPES[value][6] === "sms") {
                                                    NORME.setValue(2); setLabelNorme(() => 'sms'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                }   else if (DATAS_PIPES[value][6] === 73 || DATAS_PIPES[value][6] === 141 || DATAS_PIPES[value][2] === 76.1 || DATAS_PIPES[value][2] === 139.7) { 
                                                        (labelNorme === "ansi" ? NORME.setValue(6) : NORME.setValue(2)); (NORME._value === 2 ? setLabelNorme('iso') : setLabelNorme('ansi')); setStatutSwitch(false); setColorSwitch('forestgreen');
                                                    }   else {
                                                            NORME.setValue(2); setLabelNorme(() => 'iso/ansi'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                        }
                                                        
                                                if (DATAS_PIPES[value][NORME._value] < DATAS_PIPES[DIAMETER_SUPERIOR_REDUCER._value][NORME._value]) {
                                                    setCurrentDiameterInferiorReducer(value), 
                                                    DIAMETER_INFERIOR_REDUCER.setValue(value);
                                                    getHeightsReducerByDiamInferior(value);
                                                } 
                                            }
                                        }
                    />
            
                    <View>
                        <Slider 
                            aria-label = {"superior-reducer"}
                            thumbTintColor	= {"aqua"}
                            style = {[ {width: width*0.97, height: height*0.03} ]} 
                            minimumValue = {0}
                            maximumValue = {DATAS_PIPES.length-1}
                            step = {1}
                            value = {tempReducerDiameterSuperior}
                            minimumTrackTintColor = {"white"}
                            maximumTrackTintColor = {"white"}
                            onValueChange = {
                                                (value) => {
                                                    if (DATAS_PIPES[value][6] === "sms") {
                                                        NORME.setValue(2); setLabelNorme(() => 'sms'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                    }   else if (DATAS_PIPES[value][6] === 73 || DATAS_PIPES[value][6] === 141 || DATAS_PIPES[value][2] === 76.1 || DATAS_PIPES[value][2] === 139.7) { 
                                                            (labelNorme === "ansi" ? NORME.setValue(6) : NORME.setValue(2)); (NORME._value === 2 ? setLabelNorme('iso') : setLabelNorme('ansi')); setStatutSwitch(false); setColorSwitch('forestgreen');
                                                        }   else {
                                                                NORME.setValue(2); setLabelNorme(() => 'iso/ansi'); setIsShown(false); setStatutSwitch(true); setColorSwitch('silver');
                                                            }
                                                            
                                                    if (DATAS_PIPES[value][NORME._value] > DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value]) {
                                                        setCurrentDiameterSuperiorReducer(value);
                                                        DIAMETER_SUPERIOR_REDUCER.setValue(value);
                                                        getHeightsReducerByDiamSuperior(value);
                                                    }  
                                                }
                                            }
                        />
                    </View>
                </View>)}
            {/*/////////////////////////////////////////////   FOOTER   //////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#252525",
        height: Dimensions.get("window").height
    },
    elementSvg: {
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#252525" 
        
    },
    menuBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }, 
    labelTopBar: {
        fontWeight: "500",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#515151"
    },
    datasTopBar: {
        marginBottom: 7.5,
        paddingRight: 11,
        paddingLeft: 11,
        fontWeight: "500",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#515151"
    },
    blocNormes: {
        justifyContent: 'space-evenly',
        borderRadius: 5,
        backgroundColor: '#525252'
    },
    format: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    formatStd: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    spacer: {
        height: 8,
    }
});






