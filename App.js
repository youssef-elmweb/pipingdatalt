//////////////////////////////////////////////////////////////////////////////////////////
import { React, useRef, useEffect, useState } from "react";
import { View, Text, Image, Switch, Pressable, TouchableHighlight, StyleSheet, useWindowDimensions, Animated as AnimNat, Platform, Dimensions } from "react-native";

import * as functions from "./library/functions.js";

import { useSharedValue, runOnUI } from 'react-native-reanimated';

import { ValidatedValue } from "./components/ValidatedValue.js";
import Slider from '@react-native-community/slider';

import { ConsentProvider } from "./components/ads/ads_manager/ConsentContext.js";

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
import { ModalInfos } from "./components/modals/ModalInfos.js";
import { ModalPremium } from "./components/modals/ModalPremium.js";

import { ViewElbow } from "./components/view/ViewElbow";
import { ViewReducer } from "./components/view/ViewReducer.js";

import { ValuesElbow } from "./components/ValuesElbow.js";
import { ValuesReducers } from "./components/ValuesReducers.js";

import { InterstitialAdInitial } from "./components/ads/interstitial_ads_initial/InterstitialAdInitial.js";
import ModalConsent from "./components/modals/ModalConsent.js";
import { showAdIfReady, showAdInterfaceIfReady } from "./components/ads/ads_manager/adsmanager.js";


export default function App() {

    ////////////////////// HOOKS ///////////////////////////////////////
    const [statusModalLanguages, setStatusModalLanguages] = useState(false);
    const [idLanguage, setIdLanguage] = useState('en');
    ////////////////////// HOOKS ///////////////////////////////////////


    //////////////////// CONSTANTS /////////////////////////////////////
    ///////////////// constants values /////////////////////////////////
    const { height, width } = useWindowDimensions();
    ///////////////// constants values /////////////////////////////////

    ///////////// constants api Animated ///////////////////////////////
    const ValidatedValueAnimated = AnimNat.createAnimatedComponent(ValidatedValue);

    const angleBaseShared = useSharedValue(DATAS_ELBOWS.angle);
    const absoluteHeightBaseShared = useSharedValue(DATAS_REDUCER.positionDiamReducerInferior);

    const ANGLE = useRef(new AnimNat.Value(DATAS_ELBOWS.angle)).current;
    
    const INTRA = useRef(new AnimNat.Value(DATAS_ELBOWS.intra)).current;
    const EXTRA = useRef(new AnimNat.Value(DATAS_ELBOWS.extra)).current;
    const RADIUS = useRef(new AnimNat.Value(DATAS_ELBOWS.radius)).current;

    const DIAMETER_INFERIOR_REDUCER = useRef(new AnimNat.Value(0)).current; // index of diameters array
    const DIAMETER_SUPERIOR_REDUCER = useRef(new AnimNat.Value(1)).current; // index of diameters array
    const ABSOLUTE_POSITION_HEIGHT = useRef(new AnimNat.Value(DATAS_REDUCER.absolutePositionHeight)).current;
    const HEIGHT_REDUCER_TOP = useRef(new AnimNat.Value(DATAS_REDUCER.heightReducerTop)).current;
    const HEIGHT_REDUCER_BOTTOM = useRef(new AnimNat.Value(DATAS_REDUCER.heightReducerBottom)).current;
    const CURVE_REDUCER_TOP = useRef(new AnimNat.Value(DATAS_REDUCER.curveReducerTop)).current;
    const CURVE_REDUCER_BOTTOM = useRef(new AnimNat.Value(DATAS_REDUCER.curveReducerBottom)).current;
    const CURVE_REDUCER_TOP_EXC = useRef(new AnimNat.Value(DATAS_REDUCER.curveReducerTopExc)).current;
    const CURVE_REDUCER_BOTTOM_EXC = useRef(new AnimNat.Value(DATAS_REDUCER.curveReducerBottomExc)).current;
    const CURRENT_DIAMETER_REDUCER_CONC_EXC = useRef(new AnimNat.Value(DATAS_REDUCER.currentDiameterRedConcExc)).current;

    const FORMAT = useRef(new AnimNat.Value(3)).current;
    const DIAMETER = useRef(new AnimNat.Value(0)).current; // index of diameters array
    const NORME = useRef(new AnimNat.Value(2)).current;

    const BASEANGLE = useRef(new AnimNat.Value(0)).current;
    const BASEDATAS = useRef(new AnimNat.Value(2)).current;
    const MEASUREUNIT = useRef(new AnimNat.Value(0)).current;
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

    const [currentDiameterForSlider, setCurrentDiameterForSlider] = useState(0);
    const [currentDiameterForSliderReducerInf, setCurrentDiameterForSliderReducerInf] = useState(0);
    const [currentDiameterForSliderReducerSup, setCurrentDiameterForSliderReducerSup] = useState(1); 
    
    const [isShown, setIsShown] = useState(false); // Show or Hide the purple box
    const [labelNorme, setLabelNorme] = useState("iso/ansi");
    const [statutSwitch, setStatutSwitch] = useState(true);
    const [colorSwitch, setColorSwitch] = useState("silver");

    const [statusModalSettings, setStatusModalSettings] = useState(false);

    const [statusModalUtilities, setStatusModalUtilities] = useState(false);
    const [statusModalPrinters, setStatusModalPrinters] = useState(false);
    const [statusModalInfos, setStatusModalInfos] = useState(false);
    const [statusModalConsent, setStatusModalConsent] = useState(false);
    const [statusModalPremium, setStatusModalPremium] = useState(false);

    const [idSettingsMeasure, setIdSettingsMeasure] = useState(0);
    const [idSettingsDiameter, setIdSettingsDiameter] = useState(0);
    const [idSettingsAngle, setIdSettingsAngle] = useState(0);
    const [idSettingsDatas, setIdSettingsDatas] = useState(2);

    const [checkboxDatasInterfaceState, setCheckboxDatasInterfaceState] = useState(true);

    const [colorDatasCurves, setColorDatasCurves] = useState("white");


    useEffect(() => {
        if (idSettingsMeasure === 1) {
            const newId = idSettingsDatas === 1 ? 1 : 2;
            
            if (idSettingsDatas !== newId) {
                setIdSettingsDatas(newId);
            }
        }
    }, []);
    //////////////////  HOOKS //////////////////////////////////////////


    ///////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////

    /////////////////////////////////////////////////////// ELBOW ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getDatasElbows = (datas = DATAS_ELBOWS) => {
        return datas;
    }

    const makeDatasElbowByAngle = (datas) => { // callback datas argument is return of getDatasElbows
        if (datas.angle) {
            ANGLE.setValue(Number.parseFloat(datas.angle.toFixed(idSettingsAngle)));
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
            makeColorDatasCurves();
    }     

    const addAnglePrecision = () => { 
        let anglePrecision;

            if (BASEANGLE._value == 1 && ANGLE._value < parseFloat(90).toFixed(0)) {
                anglePrecision = 0.1;

                    runOnUI(updateAngleBaseShared)(anglePrecision);
                    ANGLE.setValue(parseFloat((ANGLE._value + anglePrecision).toFixed(1)));

            }   else if (BASEANGLE._value == 2 && ANGLE._value < parseFloat(90).toFixed(0)) {
                anglePrecision = 0.01;

                    runOnUI(updateAngleBaseShared)(anglePrecision);
                    ANGLE.setValue(parseFloat((ANGLE._value + anglePrecision).toFixed(2)));
                }
    } 

    const subtractAnglePrecision = () => { 
        let anglePrecision;

        if (BASEANGLE._value == 1 && ANGLE._value > parseFloat(1).toFixed(0)) {
            anglePrecision = 0.1;

                ANGLE.setValue(parseFloat((ANGLE._value - anglePrecision).toFixed(1))); 
                runOnUI(subtractAngleBaseShared)(anglePrecision);

        }   else if (BASEANGLE._value == 2 && ANGLE._value > parseFloat(1).toFixed(0)) {
            anglePrecision = 0.01;

                ANGLE.setValue(parseFloat((ANGLE._value - anglePrecision).toFixed(2)));
                runOnUI(subtractAngleBaseShared)(anglePrecision);
            }
    } 

    const updateAngleBaseShared = (value) => {
        "worklet"
        angleBaseShared.value = parseFloat((angleBaseShared.value + value));
    }

    const subtractAngleBaseShared = (value) => {
        "worklet"
        angleBaseShared.value = parseFloat((angleBaseShared.value - value));
    }
    /////////////////////////////////////////////////////// ELBOW ////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////// REDUCER ///////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getDatasReducer = (datas) => { 
        ABSOLUTE_POSITION_HEIGHT.setValue(Number.parseFloat(datas.absolutePositionHeight.toFixed(idSettingsDatas)));
        HEIGHT_REDUCER_TOP.setValue(Number.parseFloat(datas.heightReducerTop.toFixed(idSettingsDatas)));
        CURVE_REDUCER_TOP.setValue(Number.parseFloat(datas.curveReducerTop.toFixed(idSettingsDatas)));
        CURVE_REDUCER_TOP_EXC.setValue(Number.parseFloat(datas.curveReducerTopExc.toFixed(idSettingsDatas)));
        HEIGHT_REDUCER_BOTTOM.setValue(Number.parseFloat(datas.heightReducerBottom.toFixed(idSettingsDatas)));
        CURVE_REDUCER_BOTTOM.setValue(Number.parseFloat(datas.curveReducerBottom.toFixed(idSettingsDatas)));
        CURVE_REDUCER_BOTTOM_EXC.setValue(Number.parseFloat(datas.curveReducerBottomExc.toFixed(idSettingsDatas)));
        CURRENT_DIAMETER_REDUCER_CONC_EXC.setValue(Number.parseFloat(datas.currentDiameterRedConcExc.toFixed((ABSOLUTE_POSITION_HEIGHT._value <= DATAS_REDUCER.positionDiamReducerInferior || ABSOLUTE_POSITION_HEIGHT._value >= DATAS_REDUCER.heightRemainder ? 1 : idSettingsDatas))));
    }

    const makeDatasReducer = (diameterSup, diameterInf, nextAbsolutePositionHeight) => { 
        const tabValuesReducer = {};

        const absolutePositionHeightLocal = nextAbsolutePositionHeight ?? parseFloat(ABSOLUTE_POSITION_HEIGHT._value);
        let heightReducerPath = parseFloat(DATAS_REDUCER.heightRemainder - absolutePositionHeightLocal.toFixed(2));

        let heightReducer = (diameterSup - diameterInf) * 3;
        let diameterReductionDiff = ((diameterSup - diameterInf) * 0.5);
        let diameterReductionDiffExc = (diameterSup - diameterInf);
        let angle = Math.asin(heightReducer / Math.hypot(heightReducer, diameterReductionDiff)) * DATAS_TRIGONOMETRICS.oneRad;
        let angleExc = Math.asin(heightReducer / Math.hypot(heightReducer, diameterReductionDiffExc)) * DATAS_TRIGONOMETRICS.oneRad;

        tabValuesReducer.absolutePositionHeight = Number.parseFloat(absolutePositionHeightLocal);

        tabValuesReducer.heightReducerTop = Number.parseFloat(((heightReducer) - ((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath)).toFixed(1));
        tabValuesReducer.curveReducerTop = tabValuesReducer.heightReducerTop / Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad); 
        tabValuesReducer.curveReducerTopExc = tabValuesReducer.heightReducerTop / Math.sin(angleExc * DATAS_TRIGONOMETRICS.oneDegreRad); 
        

        tabValuesReducer.heightReducerBottom = Number.parseFloat(((heightReducer / DATAS_REDUCER.reducerHeight) * heightReducerPath).toFixed(1));
        tabValuesReducer.curveReducerBottom = tabValuesReducer.heightReducerBottom / Math.sin(angle * DATAS_TRIGONOMETRICS.oneDegreRad);
        tabValuesReducer.curveReducerBottomExc = tabValuesReducer.heightReducerBottom / Math.sin(angleExc * DATAS_TRIGONOMETRICS.oneDegreRad);
        

        tabValuesReducer.currentDiameterReductionDiff = Math.cos(angle * DATAS_TRIGONOMETRICS.oneDegreRad) * tabValuesReducer.curveReducerBottom;
        tabValuesReducer.currentDiameterRedConcExc = DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value] + ((diameterReductionDiff - tabValuesReducer.currentDiameterReductionDiff) * 2);

        return tabValuesReducer;
    }
    
    const makeAddDatasReducer = (diameterSup, diameterInf, valuePrecision) => {
        
        const precision = valuePrecision ?? 0;

        runOnUI(addAbsoluteHeightBaseShared)(precision);

        let nextAbsolutePositionHeight = parseFloat(ABSOLUTE_POSITION_HEIGHT._value - precision); 

        const datasReducer = makeDatasReducer(diameterSup, diameterInf, nextAbsolutePositionHeight); 

        return datasReducer;
    }

    const makeSubtractDatasReducer = (diameterSup, diameterInf, valuePrecision) => {
        
        const precision = valuePrecision ?? 0;

        runOnUI(subtractAbsoluteHeightBaseShared)(precision);

        let nextAbsolutePositionHeight = parseFloat(ABSOLUTE_POSITION_HEIGHT._value + precision); 

        const datasReducer = makeDatasReducer(diameterSup, diameterInf, nextAbsolutePositionHeight); 

        return datasReducer;
    }

    const subtractDatasReducerPrecision = (diameterSup, diameterInf) => {
        if (ABSOLUTE_POSITION_HEIGHT._value < DATAS_REDUCER.heightRemainder) {
            let valuePrecisionLocal = (idSettingsDatas === 2 ? 0.01 : (idSettingsDatas === 1 ? 0.1 : 1));

            const valuesReducer = makeSubtractDatasReducer(diameterSup, diameterInf, valuePrecisionLocal);

            getDatasReducer(valuesReducer);
        } else {
            CURRENT_DIAMETER_REDUCER_CONC_EXC.setValue(diameterSup);
            runOnUI(subtractAbsoluteHeightBaseShared)(DATAS_REDUCER.heightRemainder - absoluteHeightBaseShared.value);
            return;
        }
    }
    
    const addDatasReducerPrecision = (diameterSup, diameterInf) => {
        if (ABSOLUTE_POSITION_HEIGHT._value <= DATAS_REDUCER.heightRemainder && ABSOLUTE_POSITION_HEIGHT._value > DATAS_REDUCER.positionDiamReducerInferior ) {
            let valuePrecisionLocal = (idSettingsDatas === 2 ? 0.01 : (idSettingsDatas === 1 ? 0.1 : 1));

            const valuesReducer = makeAddDatasReducer(diameterSup, diameterInf, valuePrecisionLocal);

            getDatasReducer(valuesReducer);
        } else {
            CURRENT_DIAMETER_REDUCER_CONC_EXC.setValue(diameterInf);
            runOnUI(subtractAbsoluteHeightBaseShared)(absoluteHeightBaseShared.value - DATAS_REDUCER.positionDiamReducerInferior);
            return;
        }
    }

    const makePrecisionDatasReducer = (precisionDatasReducer) => { 
        let diameterSuperior = (DIAMETER_SUPERIOR_REDUCER._value == 0 ? DATAS_PIPES[1][NORME._value] : DATAS_PIPES[DIAMETER_SUPERIOR_REDUCER._value][NORME._value]);
        let diameterInferior = DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value];

        precisionDatasReducer(diameterSuperior, diameterInferior);
    }

    const getHeightsReducerByDiamSuperior = (value) => { 
        let diameterSup = (value == 0 ? DATAS_PIPES[1][NORME._value] : DATAS_PIPES[value][NORME._value]);
        let diameterInf = DATAS_PIPES[DIAMETER_INFERIOR_REDUCER._value][NORME._value];

        const valuesReducer = makeDatasReducer(diameterSup, diameterInf);
        
        ABSOLUTE_POSITION_HEIGHT.setValue(parseFloat(valuesReducer.absolutePositionHeight.toFixed(2)));
        CURRENT_DIAMETER_REDUCER_CONC_EXC.setValue(Number.parseFloat(valuesReducer.currentDiameterRedConcExc.toFixed((ABSOLUTE_POSITION_HEIGHT._value == DATAS_REDUCER.positionDiamReducerInferior || ABSOLUTE_POSITION_HEIGHT._value == DATAS_REDUCER.heightRemainder ? 1 : idSettingsDatas)))); //valueDecimalLocal
        if (Math.round(ABSOLUTE_POSITION_HEIGHT._value) >= Math.round(DATAS_REDUCER.heightRemainder)) { // voir >= ou <= pour plus de sécurité

            HEIGHT_REDUCER_TOP.setValue(parseFloat((valuesReducer.heightReducerTop).toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_TOP.setValue(Number.parseFloat(valuesReducer.curveReducerTop.toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_TOP_EXC.setValue(Number.parseFloat(valuesReducer.curveReducerTopExc.toFixed(idSettingsDatas))); //valueDecimalLocal
        } else if (Math.round(ABSOLUTE_POSITION_HEIGHT._value) <= Math.round(DATAS_REDUCER.positionDiamReducerInferior)) {

            HEIGHT_REDUCER_BOTTOM.setValue(parseFloat((valuesReducer.heightReducerBottom).toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_BOTTOM.setValue(Number.parseFloat(valuesReducer.curveReducerBottom.toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_BOTTOM_EXC.setValue(Number.parseFloat(valuesReducer.curveReducerBottomExc.toFixed(idSettingsDatas))); //valueDecimalLocal
        } else {
            let valuesReducer = makeDatasReducer(diameterSup, diameterInf);
            getDatasReducer(valuesReducer);   
        }
    }

    const getHeightsReducerByDiamInferior = (value) => { 
        let diameterSup = DATAS_PIPES[DIAMETER_SUPERIOR_REDUCER._value][NORME._value];
        let diameterInf = DATAS_PIPES[value][NORME._value];

        const valuesReducer = makeDatasReducer(diameterSup, diameterInf);

        ABSOLUTE_POSITION_HEIGHT.setValue(parseFloat(valuesReducer.absolutePositionHeight.toFixed(2)));
        CURRENT_DIAMETER_REDUCER_CONC_EXC.setValue(Number.parseFloat(valuesReducer.currentDiameterRedConcExc.toFixed((ABSOLUTE_POSITION_HEIGHT._value == DATAS_REDUCER.positionDiamReducerInferior || ABSOLUTE_POSITION_HEIGHT._value == DATAS_REDUCER.heightRemainder ? 1 : idSettingsDatas)))); //valueDecimalLocal
        if (Math.round(ABSOLUTE_POSITION_HEIGHT._value) >= Math.round(DATAS_REDUCER.heightRemainder)) { // voir >= ou <= pour plus de sécurité

            HEIGHT_REDUCER_TOP.setValue(parseFloat((valuesReducer.heightReducerTop).toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_TOP.setValue(Number.parseFloat(valuesReducer.curveReducerTop.toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_TOP_EXC.setValue(Number.parseFloat(valuesReducer.curveReducerTopExc.toFixed(idSettingsDatas))); //valueDecimalLocal
        } else if (Math.round(ABSOLUTE_POSITION_HEIGHT._value) <= Math.round(DATAS_REDUCER.positionDiamReducerInferior)) {

            HEIGHT_REDUCER_BOTTOM.setValue(parseFloat((valuesReducer.heightReducerBottom).toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_BOTTOM.setValue(Number.parseFloat(valuesReducer.curveReducerBottom.toFixed(idSettingsDatas))); //valueDecimalLocal
            CURVE_REDUCER_BOTTOM_EXC.setValue(Number.parseFloat(valuesReducer.curveReducerBottomExc.toFixed(idSettingsDatas))); //valueDecimalLocal
        } else {
            let valuesReducer = makeDatasReducer(diameterSup, diameterInf);
            getDatasReducer(valuesReducer);  
        } 
    }

    const addAbsoluteHeightBaseShared = (value) => {
        "worklet"
        absoluteHeightBaseShared.value = parseFloat((absoluteHeightBaseShared.value - value));
    }

    const subtractAbsoluteHeightBaseShared = (value) => {
        "worklet"
        absoluteHeightBaseShared.value = parseFloat((absoluteHeightBaseShared.value + value));
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////// REDUCER ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const toggleTheBox = () => { // This function will be triggered when the Switch changes
        setIsShown((previousState) => !previousState);
        setLabelNorme((value) => (value === "iso" ? "ansi" : "iso"));
        (labelNorme === "iso" ? NORME.setValue(6) : NORME.setValue(2));
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
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeColorDatasCurves = () => {
        (DATAS_ELBOWS.roundAngles.includes(ANGLE._value) ? setColorDatasCurves(() => "deepskyblue") : setColorDatasCurves(() => "white"));
    }

    const setCurrentInterface = (currentInterface) => {
        setElbowLayer(currentInterface);
    }

    const makeCheckboxDatasInterfaceState = () => {
        setCheckboxDatasInterfaceState(!checkboxDatasInterfaceState);
    }
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    const makeStatusModalSettings = () => {
        setStatusModalSettings(false);
        BASEANGLE.setValue(idSettingsAngle);
        MEASUREUNIT.setValue(idSettingsMeasure);
        BASEDATAS.setValue(idSettingsDatas);
        MEASUREUNIT.setValue(idSettingsMeasure);
        ANGLE.setValue(Number.parseFloat(ANGLE._value.toFixed(idSettingsAngle)));
        makeDatasElbowByAngle(getDatasElbows);
    }

    const makeStatusModalLanguages = () => {
        setStatusModalLanguages(false);
    }
    ////////////////////////////////////////////////////////////////////////
   
    ////////////////////////////////////////////////////////////////////////
    const makeStatusModalUtilities = () => {
        setStatusModalUtilities(!statusModalUtilities); 
        showAdIfReady();
    }

    const makeStatusModalPrinters = () => {
        setStatusModalUtilities(() => !statusModalUtilities); 
        setStatusModalPrinters(() => !statusModalPrinters); 
    }

    const makeStatusModalInfos = () => {
        setStatusModalUtilities(() => !statusModalUtilities); 
        setStatusModalInfos(() => !statusModalInfos); 
    }

    const makeStatusModalConsent = () => {
        setStatusModalUtilities(() => !statusModalUtilities); 
        setStatusModalConsent(() => !statusModalConsent); 
    }

    const makeStatusModalPremium = () => {
        setStatusModalUtilities(() => !statusModalUtilities); 
        setStatusModalPremium(() => !statusModalPremium); 
    }

    const makeStatusModalPremiumOnModalPremium = () => {
        setStatusModalPremium(false);
    }
    ////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////


    return (
        <View style={[ styles.container, { flex: 1, flexDirection: "column" } ]}>
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   HEADER   //////////////////////////////////////////////////*/}

            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   MODALS   //////////////////////////////////////////////////*/}
            <ConsentProvider>
                <InterstitialAdInitial />

                <ModalSettings style={{ flex: 1, marginLeft: 200, textAlign: "center", alignSelf: "center" }} idLanguage={idLanguage} statusModalSettings={statusModalSettings} checkboxDatasInterfaceState={checkboxDatasInterfaceState} idSettingsMeasure={idSettingsMeasure} idSettingsDiameter={idSettingsDiameter} idSettingsAngle={idSettingsAngle} idSettingsDatas={idSettingsDatas} setIdSettingsMeasure={ setIdSettingsMeasure } setIdSettingsDiameter={ setIdSettingsDiameter } setIdSettingsAngle={ setIdSettingsAngle } setIdSettingsDatas={ setIdSettingsDatas } makeCheckboxDatasInterfaceState={ makeCheckboxDatasInterfaceState } makeStatusModalSettings={ makeStatusModalSettings } />
                <ModalLanguages idLanguage={idLanguage} statusModalLanguages={ statusModalLanguages } setIdLanguage={ setIdLanguage } makeStatusModalLanguages={ makeStatusModalLanguages } />

                <ModalUtilities idLanguage={idLanguage} statusModalUtilities={statusModalUtilities} setStatusModalPremium={setStatusModalPremium} makeStatusModalUtilities={ makeStatusModalUtilities } makeStatusModalPrinters={ makeStatusModalPrinters } makeStatusModalInfos={ makeStatusModalInfos } makeStatusModalConsent={makeStatusModalConsent} makeStatusModalPremium={makeStatusModalPremium} />
                
                <ModalPrinters idLanguage={idLanguage} statusModalPrinters={statusModalPrinters} makeStatusModalPrinters={ makeStatusModalPrinters } />

                <ModalInfos idLanguage={idLanguage} statusModalInfos={statusModalInfos} makeStatusModalInfos={makeStatusModalInfos} />

                <ModalConsent statusModalConsent={statusModalConsent || null} setStatusModalConsent={setStatusModalConsent} />

                <ModalPremium idLanguage={idLanguage} statusModalPremium={statusModalPremium} makeStatusModalPremiumOnModalPremium={makeStatusModalPremiumOnModalPremium} setIdLanguage={ setIdLanguage } makeStatusModalPremium={makeStatusModalPremium} />

                {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                {/*/////////////////////////////////////////////   MODALS   //////////////////////////////////////////////////*/}

            {(elbowLayer ?
            <View style={[ { minHeight: height*0.325, maxHeight: height*0.325, paddingTop: Number.parseFloat(height*0.06), justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}>
                <View style={[ { width: width, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" } ]}>
                    <View style={[ { width: width, paddingLeft: width*0.035, paddingRight: width*0.035, flexDirection: "row", justifyContent: "center", alignItems: "center" } ]}>
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

                        <View style={[ {height: width*0.1, marginTop: (height > 1200 ? (height*0.045) : (height*0.0075)), flex: (height > 700 ? width*0.30 : width*0.53), justifyContent: "flex-start", alignContent: "flex-start", alignItems: "center"} ]}>
                            <Text style={[ {height: width*0.1, fontSize: width*0.025, color: "#D1D1D1"} ]}>{`${languages[0][idLanguage].unit} | ${languages[0][idLanguage][UNITS_MEASURES[idSettingsMeasure].label]}`}</Text>
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
                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === "elbow" ? "forestgreen" : "tomato")} onPress={ () => { setCurrentInterface("elbow"); setCurrentDiameterForSlider(currentDiameter); showAdInterfaceIfReady(); } }>
                            <Image alt={"elbow"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/elbow.png')} />
                        </Pressable>

                        <Pressable style={[ styles.menuBox ]} backgroundColor={(elbowLayer === 'reducer' ? "forestgreen" : "tomato")} onPress={ () => { setCurrentInterface("reducer"); setCurrentDiameterForSliderReducerInf(currentDiameterInferiorReducer); setCurrentDiameterForSliderReducerSup(currentDiameterSuperiorReducer); } }>
                            <Image alt={"reducer"} style={[ { width: width*0.08, height: width*0.08 } ]} source={require('./assets/images/reducer_conc.png')} />
                        </Pressable>

                        <Pressable style={[ styles.labelTopBar, { flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "silver" } ]} onPress={ () => { setStatusModalPremium(() => true); } }>
                            <Text key={"pro"} style={[ styles.labelTopBar, { width: width*0.25, height: width*0.06, lineHeight: width*0.06, fontSize: width*0.035, fontWeight: "bold", letterSpacing: 1 } ]}>{functions.firstLetterToUpperCase(languages[0][idLanguage].pro)}</Text>                        
                        </Pressable>
                    </View>
                </View>

                <View style={[ { width: width*0.98, minHeight: height*0.08, maxHeight: height*0.08, marginTop: height*0.0025, flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" } ]}>                  
                    {
                        <View style={[ { width: width*0.98, flexDirection: "column", alignItems: "flex-end", backgroundColor: "transparent" } ]}>
                            <View style={[ { width: width*0.95, minHeight: height*0.08, maxHeight: height*0.08, flexDirection: "row", backgroundColor: "transparent" } ]}>
                                
                                {( elbowLayer == "elbow" ?
                                    <ValuesElbow idLanguage={idLanguage} sizeText={sizeText} currentDiameter={currentDiameter} norme={NORME} angle={ANGLE} intra={INTRA} extra={EXTRA} radius={RADIUS} colorDatasCurves={colorDatasCurves} idSettingsDiameter={idSettingsDiameter} />
                                : false )}

                                {(elbowLayer == "reducer" ?
                                    <ValuesReducers sizeText={sizeText} idSettingsDiameter={idSettingsDiameter} currentReducer={currentReducer} norme={NORME} currentDiameterInferiorReducer={currentDiameterInferiorReducer} currentDiameterSuperiorReducer={currentDiameterSuperiorReducer} curveReducerTop={CURVE_REDUCER_TOP} curveReducerBottom={CURVE_REDUCER_BOTTOM} curveReducerTopExc={CURVE_REDUCER_TOP_EXC} curveReducerBottomExc={CURVE_REDUCER_BOTTOM_EXC} heightReducerTop={HEIGHT_REDUCER_TOP} heightReducerBottom={HEIGHT_REDUCER_BOTTOM} />                               
                                : false )}

                            </View>

                            <View style={[ { width: (elbowLayer == "elbow" ? width*0.3 : width*0.95), marginTop: height*0.005, flexDirection: "row", justifyContent: "flex-end", backgroundColor: "transparent" } ]}>
                                {(elbowLayer == "reducer" ?
                                    <View style={[ { flexDirection: "row", alignItems: "center", backgroundColor: "transparent" } ]}>
                                        <View style={[ { width: width*0.5, flexDirection: "row", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <View style={[ { width: width*0.175, flexDirection: "row", alignItems: "center", backgroundColor: "transparent" } ]}>
                                                <Text style={[ styles.labelTopBar, {width: width*0.15, minHeight: height*0.025, maxHeight: height*0.025, lineHeight: height*0.025, fontSize: width*0.03 } ]}>
                                                    {`\u2015`}
                                                </Text>
                                            </View>

                                            <View style={[ { width: width*0.275, backgroundColor: "transparent"} ]}>
                                                <ValidatedValueAnimated style={[ styles.datasTopBar ]} fontSize={sizeText} color={"white"} valueForCheck={ CURRENT_DIAMETER_REDUCER_CONC_EXC } />
                                            </View>
                                        </View>

                                        <View style={[ { width: width*0.15, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "transparent" } ]}>
                                            <TouchableHighlight key={"reducers"} style={[ { width: width*0.085, height: width*0.085, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "white", borderTopRightRadius: 25, borderBottomRightRadius: 25, borderBottomLeftRadius: 25, borderTopLeftRadius: 25, backgroundColor: "#414141" } ]} activeOpacity={0.25} onPress={ () => setCurrentReducer(() => (currentReducer == "reducer-conc" ? "reducer-exc" : "reducer-conc")) }>
                                                {
                                                    (
                                                        currentReducer == "reducer-conc" ?
                                                            <Image alt={"reducer"} style={[ { width: width*0.085, height: width*0.085 } ]} source={require('./assets/images/reducer_conc.png')} /> :
                                                            <Image alt={"reducer"} style={[ { width: width*0.085, height: width*0.085 } ]} source={require('./assets/images/reducer_exc.png')} />
                                                    )
                                                }
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                : false) }

                                {(elbowLayer == "elbow" ? 
                                    (idSettingsAngle != 0 ?
                                        <View style={[ {minHeight: height*0.05, maxHeight: height*0.05, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", backgroundColor: "transparent"} ]}> 
                                            <View style={[ {width: width*0.3, flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end", alignSelf: "center"} ]}>
                                                <TouchableHighlight style={[ {width: width*0.1, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 3.5, borderBottomRightRadius: 3.5, borderBottomLeftRadius: 7.5, borderTopLeftRadius: 7.5, backgroundColor: "#414141"}]} activeOpacity={0.25} onPress={ () => { subtractAnglePrecision(); makeDatasElbowByAngle(getDatasElbows); } }>
                                                    <Text style={[ {fontSize: width*0.05, fontWeight: "bold", lineHeight: width*0.05, color: "whitesmoke"} ]}>-</Text>
                                                </TouchableHighlight>

                                                <TouchableHighlight style={[ {width: width*0.1, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 7.5, borderBottomRightRadius: 7.5, borderBottomLeftRadius: 3.5, borderTopLeftRadius: 3.5, backgroundColor: "#414141"} ]} activeOpacity={0.25} onPress={ () => { addAnglePrecision(); makeDatasElbowByAngle(getDatasElbows); } }>
                                                    <Text style={[ {fontSize: width*0.05, lineHeight: width*0.05, color: "whitesmoke"} ]}>+</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>  
                                    : <View style={[ {width: width*0.3, minHeight: height*0.05, maxHeight: height*0.05, backgroundColor: "transparent"} ]}></View>) :
                                false)}

                                {(elbowLayer == "reducer" ? 
                                    <View style={[ {minHeight: height*0.05, maxHeight: height*0.05, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", backgroundColor: "transparent"} ]}> 
                                        <View style={[ {width: width*0.3, flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end", alignSelf: "center"} ]}>
                                            <TouchableHighlight style={[ {width: width*0.1, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 3.5, borderBottomRightRadius: 3.5, borderBottomLeftRadius: 7.5, borderTopLeftRadius: 7.5, backgroundColor: "#414141"}]} activeOpacity={0.25} onPress={ () => { makePrecisionDatasReducer(subtractDatasReducerPrecision); } }>
                                                <Text style={[ {fontSize: width*0.05, fontWeight: "bold", lineHeight: width*0.05, color: "whitesmoke"} ]}>-</Text>
                                            </TouchableHighlight>

                                            <TouchableHighlight style={[ {width: width*0.1, height: width*0.065, justifyContent: "center", alignItems: "center", borderTopRightRadius: 7.5, borderBottomRightRadius: 7.5, borderBottomLeftRadius: 3.5, borderTopLeftRadius: 3.5, backgroundColor: "#414141"} ]} activeOpacity={0.25} onPress={ () => { makePrecisionDatasReducer(addDatasReducerPrecision); } }>
                                                <Text style={[ {fontSize: width*0.05, lineHeight: width*0.05, color: "whitesmoke"} ]}>+</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View> :
                                false)}
                            </View>
                        </View>
                    }
                </View>                 
            </View> : false)}
            </ConsentProvider>
            {/*/////////////////////////////////////////////   HEADER   //////////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}


            {/*/////////////////////////////////////////   INTERFACE VIEW   //////////////////////////////////////////////*/}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {(elbowLayer == "elbow" ?
                <ViewElbow sizeText={sizeText} baseAngle={BASEANGLE} angle={angleBaseShared} curvesMeasure={ {angle: ANGLE, intra: INTRA, extra: EXTRA} } format={formatElbow} currentDiameter={currentDiameter} norme={NORME} formatElbow={formatElbow} measureUnit={MEASUREUNIT} idSettingsMeasure={idSettingsMeasure} idSettingsAngle={idSettingsAngle} idSettingsDatas={idSettingsDatas} checkboxDatasInterfaceState={checkboxDatasInterfaceState} shareAngleElbow={makeDatasElbowByAngle} />                                                        
            : false)}

            {(elbowLayer == "reducer" ?
                <ViewReducer sizeText={sizeText} baseDatas={BASEDATAS} absoluteHeight={absoluteHeightBaseShared} currentDiameterInferiorReducer={currentDiameterInferiorReducer} currentDiameterSuperiorReducer={currentDiameterSuperiorReducer} diameterSuperiorReducer={DIAMETER_SUPERIOR_REDUCER} diameterInferiorReducer={DIAMETER_INFERIOR_REDUCER} absolutePositionHeight={ABSOLUTE_POSITION_HEIGHT} currentReducer={currentReducer} currentDiameterRedConcExc={CURRENT_DIAMETER_REDUCER_CONC_EXC} norme={NORME} idSettingsMeasure={idSettingsMeasure} idSettingsDatas={idSettingsDatas} checkboxDatasInterfaceState={checkboxDatasInterfaceState} shareDiameterAndHeight={getDatasReducer} /> 
            : false)}
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////   INTERFACE VIEW   //////////////////////////////////////////////*/}

            
            {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////   FOOTER   //////////////////////////////////////////////////*/}
            
            {(elbowLayer != "reducer" ?
                <View key={"square-screen-options-footer"} style={[ { width: width, minHeight: height*0.23, maxHeight: height*0.23, padding: 0, justifyContent: "flex-start", alignItems: "center", backgroundColor: "transparent" } ]}> 

                    <View style={[ { width: width*0.95, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center", backgroundColor: "transparent" } ]}>
                        <View style={[ {width: width*0.475, minHeight: height*0.075, maxHeight: height*0.075, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", backgroundColor: "transparent"} ]} key="bloc-formats" id="formats">
                            <Pressable style={[ styles.format, {width: width*0.125, height: height*0.045 } ]} backgroundColor={(formatElbow === 4 ? "forestgreen" : "#525252")} onPressOut={ () => { setFormatElbow(4), FORMAT.setValue(4); makeDatasElbowByAngle(getDatasElbows); }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`2D`}</Text></Pressable>
                            <Pressable style={[ styles.formatStd, {width: width*0.125, height: height*0.045} ]} backgroundColor={(formatElbow === 3 ? "forestgreen" : "#525252")} onPressOut={ () => { setFormatElbow(3), FORMAT.setValue(3); makeDatasElbowByAngle(getDatasElbows); }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`3D`}</Text></Pressable>
                            <Pressable style={[ styles.format, {width: width*0.125, height: height*0.045} ]} backgroundColor={(formatElbow === 5 ? "forestgreen" : "#525252")} onPressOut={ () => { setFormatElbow(5), FORMAT.setValue(5); makeDatasElbowByAngle(getDatasElbows); }}><Text style={[ {fontSize: width*0.04, fontWeight: '600', color: 'white'} ]}>{`5D`}</Text></Pressable>
                        </View>

                        <View style={[ {width: width*0.3, height: height*0.045, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: (Platform.OS != "ios" ? 5 : false), backgroundColor: (Platform.OS != "ios" ? "#525252" : false)} ]}>
                            <Text style={[ {fontSize: width*0.035, fontWeight: 'bold', color: 'white'} ]}>{labelNorme}</Text>
                            
                            {<Switch
                                trackColor={ {false: "#ddd", true: "#ddd"} }
                                thumbColor={isShown ? colorSwitch : colorSwitch}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={ () => { toggleTheBox(); makeDatasElbowByAngle(getDatasElbows);} }
                                value={isShown}
                                disabled={statutSwitch}
                            />}
                        </View>
                    </View> 

                    <View>
                        <Slider 
                            aria-label = {"diameter"}
                            thumbTintColor	= {"aqua"}
                            style = {[ {width: width*0.95, height: height*0.075} ]} 
                            minimumValue = {0}
                            maximumValue = {DATAS_PIPES.length-1}
                            step = {1}
                            value={ currentDiameterForSlider }
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
                                                    makeDatasElbowByAngle(getDatasElbows);
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
                        style = {[ {width: width*0.95, minHeight: height*0.075, maxHeight: height*0.075, backgroundColor: "transparent"} ]} 
                        minimumValue = {0}
                        maximumValue = {DATAS_PIPES.length-1}
                        step = {1}
                        value={ currentDiameterForSliderReducerInf }
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
                            style = {[ { width: width*0.95, height: height*0.075 } ]} 
                            minimumValue = {0}
                            maximumValue = {DATAS_PIPES.length-1}
                            step = {1}
                            value = { currentDiameterForSliderReducerSup }
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
        height: Dimensions.get("window").height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#252525",
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