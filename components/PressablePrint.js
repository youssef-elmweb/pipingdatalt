import React from 'react';
import { View, Image, Pressable, Dimensions } from "react-native";
import { HeadSvgPrint } from  "../components/HeadSvgPrint";

import { languages } from '../languages/languages.js';

export function PressablePrint (props) {

    const { width, height } = Dimensions.get("window");

    let tabLinesIsoSheet = [];
    let x = 4;
    let y = 2;
    
    // 70.695553 (100-29.304447) -> 3508-2480=1028 => 1028/(3508/100)=29.304447 coefficient l/L format A4
    
    for (let i = 0; i < 25; i++) {
        
        tabLinesIsoSheet.push(`<line x1=${0}% y1=${y}% x2=${x}% y2=${0}% stroke-width="0.15" stroke-opacity="0.5" stroke="#0abde3" />`);
        tabLinesIsoSheet.push(`<line x1=${0}% y1=${50+y}% x2=${100}% y2=${y}% stroke-width="0.15" stroke-opacity="0.5" stroke="#0abde3" />`);
    
        tabLinesIsoSheet.push(`<line x1=${100}% y1=${y}% x2=${100-x}% y2=${0}% stroke-width="0.15" stroke-opacity="0.5" stroke="#0abde3" />`);
        tabLinesIsoSheet.push(`<line x1=${0}% y1=${y}% x2=${100}% y2=${50+y}% stroke-width="0.15" stroke-opacity="0.5" stroke="#0abde3" />`);
    
        tabLinesIsoSheet.push(`<line x1=${0}% y1=${50+y}% x2=${100-x}% y2=${100}% stroke-width="0.15" stroke-opacity="0.5" stroke="#0abde3" />`);
        tabLinesIsoSheet.push(`<line x1=${x}% y1=${100}% x2=${100}% y2=${50+y}% stroke-width="0.15" stroke-opacity="0.5" stroke="#0abde3" />`);
    
        x+=4;
        y+=2;
    
    }
    
    x = 2;
    
    for (let i = 0; i < 49; i++) {
        
        tabLinesIsoSheet.push(`<line x1=${x}% y1="0%" x2=${x}% y2="100%" stroke-width="0.21" stroke-opacity="0.7" stroke="#0abde3" />`);
        x+=2;
    
    }

//////////////////////////////////////////////////////////////////////////////////////////
////////////// ABAC /////////////////////////
    const arrayPrintSheet = {
        "ABAC":  
            `<html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>

                <body style="text-align: center;">
                    <section style="margin: auto; text-align: center;">
                        <svg width="100%" height="9%" viewBox="0 0 2481 355" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;">
                            ${HeadSvgPrint}
                        </svg>
                            
                        <aside class="tableauDiam">
                            <table align="center">
                                <tr class="entete">
                                    <th colspan="6">${languages[0][props.idLanguage].abac_diam_radius}</th>
                                </tr>

                                <tr class="couleur">
                                    <th rowspan="2">${languages[0][props.idLanguage].inches}</th><th rowspan="2">${languages[0][props.idLanguage].nominal_diameter}</th><th rowspan="2">${languages[0][props.idLanguage].diameter}</th><th class="formats" colspan="3">${languages[0][props.idLanguage].format}</th>
                                </tr>

                                <tr class="formats">
                                    <td>2D</td><td>3D</td><td>5D</td>
                                </tr>

                                <tr>
                                    <td>1/2"</td><td>DN15</td><td>21,3mm</td><td>28mm</td><td>38.1mm</td><td>45mm</td>
                                </tr> 

                                <tr class="couleur">
                                    <td>3/4"</td><td>DN20</td><td>26,9mm</td><td>29mm</td><td>38.1mm</td><td>57.5mm</td>  
                                </tr> 

                                <tr>
                                    <td>1"</td><td>DN25</td><td>33,7mm</td><td>25mm</td><td>38.1mm</td><td>76mm</td>   
                                </tr>

                                <tr class="couleur">
                                    <td>1.1/4"</td><td>DN32</td><td>42,4mm</td><td>32mm</td><td>47.6mm</td><td>92.5mm</td>   
                                </tr> 

                                <tr>
                                    <td>1.1/2"</td><td>DN40</td><td>48,3mm</td><td>38mm</td><td>57.2mm</td><td>108mm</td>    
                                </tr>

                                <tr class="couleur">
                                    <td>2"</td><td>DN50</td><td>60,3mm</td><td>51mm</td><td>76.2mm</td><td>135mm</td>    
                                </tr>

                                <tr>
                                    <td>2.1/2"</td><td>DN65</td><td>76,1mm/73mm</td><td>63mm</td><td>95.4mm</td><td>175mm</td>    
                                </tr> 

                                <tr class="couleur">
                                    <td>3"</td><td>DN80</td><td>88,9mm</td><td>76.2mm</td><td>114.3mm</td><td>205mm</td>   
                                </tr> 

                                <tr>
                                    <td>4"</td><td>DN100</td><td>114,3mm</td><td>102mm</td><td>152.4mm</td><td>270mm</td>    
                                </tr>

                                <tr class="couleur">
                                    <td>5"</td><td>DN125</td><td>139,7mm/141mm</td><td>127mm</td><td>190.5mm</td><td>330mm</td>    
                                </tr> 

                                <tr>
                                    <td>6"</td><td>DN150</td><td>168,3mm</td><td>152mm</td><td>228.5mm</td><td>390mm</td>    
                                </tr>

                                <tr class="couleur">
                                    <td>8"</td><td>DN200</td><td>219,1mm</td><td>203mm</td><td>304.8mm</td><td>510mm</td>   
                                </tr>

                                <tr>
                                    <td>10"</td><td>DN250</td><td>273mm</td><td>254mm</td><td>381mm</td><td>650mm</td>    
                                </tr> 

                                <tr class="couleur">
                                    <td>12"</td><td>DN300</td><td>323,9mm</td><td>305mm</td><td>457mm</td><td>775mm</td>    
                                </tr> 

                                <tr>
                                    <td>14"</td><td>DN350</td><td>355,6mm</td><td>356mm</td><td>533mm</td><td>850mm</td>    
                                </tr>

                                <tr class="couleur">
                                    <td>16"</td><td>DN400</td><td>406,4mm</td><td>406mm</td><td>609.6mm</td><td>970mm</td>    
                                </tr> 

                                <tr>
                                    <td>18"</td><td>DN450</td><td>457mm</td><td>457mm</td><td>685.8mm</td><td>1122mm</td>    
                                </tr>

                                <tr class="couleur">
                                    <td>20"</td><td>DN500</td><td>508mm</td><td>508mm</td><td>762mm</td><td>1245mm</td> 
                                </tr>

                                <tr>
                                    <td>22"</td><td>DN550</td><td>559mm</td><td>559mm</td><td>838mm</td><td>1398mm</td>    
                                </tr>

                                <tr class="couleur">
                                    <td>24"</td><td>DN600</td><td>610mm</td><td>609.6mm</td><td>610mm</td><td>1524mm</td>    
                                </tr> 

                                <tr>
                                    <td>26"</td><td>DN650</td><td>660mm</td><td>660mm</td><td>991mm</td><td>1650mm</td>    
                                </tr> 

                                <tr class="couleur">
                                    <td>28"</td><td>DN700</td><td>711.2mm</td><td>711mm</td><td>1067mm</td><td>1778mm</td>    
                                </tr>

                                <tr>
                                    <td>30"</td><td>DN750</td><td>762mm</td><td>762mm</td><td>1143mm</td><td>1905mm</td>    
                                </tr> 

                                <tr class="couleur">
                                    <td>32"</td><td>DN800</td><td>812.8mm</td><td>813mm</td><td>1219mm</td><td>2033mm</td>   
                                </tr>

                                <tr>
                                    <td>34"</td><td>DN850</td><td>864mm</td><td>864mm</td><td>1295mm</td><td>2155mm</td>    
                                </tr> 

                                <tr class="couleur">
                                    <td>36"</td><td>DN900</td><td>914mm</td><td>914mm</td><td>1372mm</td><td>2285mm</td>    
                                </tr>

                                <tr>
                                    <td>38"</td><td>DN950</td><td>965mm</td><td>965mm</td><td>1448mm</td><td>2413mm</td>    
                                </tr> 

                                <tr class="couleur">
                                    <td>40"</td><td>DN1000</td><td>1016mm</td><td>1016mm</td><td>1524mm</td><td>2540mm</td>   
                                </tr>     
                                
                                <tr class="couleur">
                                    <td>42"</td><td>DN1050</td><td>1067mm</td><td>1067mm</td><td>1600mm</td><td>2665mm</td>   
                                </tr> 

                                <tr class="couleur">
                                    <td>44"</td><td>DN1100</td><td>1118mm</td><td>1118mm</td><td>1676mm</td><td>2790mm</td>   
                                </tr> 

                                <tr class="couleur">
                                    <td>46"</td><td>DN1150</td><td>1168mm</td><td>1168mm</td><td>1753mm</td><td>2915mm</td>   
                                </tr> 

                                <tr class="couleur">
                                    <td>48"</td><td>DN1200</td><td>1219mm</td><td>1219mm</td><td>1829mm</td><td>3050mm</td>   
                                </tr> 
                            </table>

                            <caption>${languages[0][props.idLanguage].caption_abac_diam_radius}</caption>
                        </aside>
                    <section style="margin: auto; text-align: center;">
                </body>
            </html>

            <style>
                body {
                    margin: auto;
                }

                table {
                    border-collapse: collapse;
                    width: 99%;
                    height: 87%;
                }

                .entete {
                    border: 1px solid black;
                    background-color: silver;
                }

                tr {
                    border: 1px solid black;
                    font-size: 2vw;
                }

                td, th {
                    border: solid black 1px;
                    text-align: center;
                    font-size: 2vw;
                }

                .formats {
                    width: 50%;
                    font-weight: bold;
                    background-color: #badc58;
                }

                caption {
                    font-size: 1vw;
                    font-weight: bold;
                }

                .couleur {
                    background-color: #ecf0f1;
                }
            </style>`,

        "ISOSHEETNOMENCLATURE":
        
            `<html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>
            
                <body style="text-align: center;">
                    <section style="margin: auto; text-align: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="99%" height="70.695553%">
                            <rect fill="transparent" width="99%" height="70.695553%" />
                                ${tabLinesIsoSheet}
                            </rect>
                        </svg>
                    </section>
            
                    <div class="table">
                        <table class="tableauDiam" align="center">
                            <caption>${languages[0][props.idLanguage].nomenclature}</caption>
                            <tr>
                                <th class="company" rowspan="2" align="left">${languages[0][props.idLanguage].company}</th><th class="accessories" colspan="6">${languages[0][props.idLanguage].accessories}</th> 
                            </tr>
            
                            <tr>
                                <th class="designation">${languages[0][props.idLanguage].designation}</th><th class="quantity">${languages[0][props.idLanguage].quantity}</th><th class="diameter">${languages[0][props.idLanguage].diameter}</th><th class="designation">${languages[0][props.idLanguage].designation}</th><th class="quantity">${languages[0][props.idLanguage].quantity}</th><th class="diameter">${languages[0][props.idLanguage].diameter}</th> 
                            </tr>
            
                            <tr>
                                <th class="project-manager" rowspan="3" align="left">${languages[0][props.idLanguage].project_manager}</th><td></td><td></td><td></td><td></td><td></td><td></td>
                            </tr> 
            
                            <tr>
                                <td></td><td></td><td></td><td></td><td></td><td></td>   
                            </tr> 
            
                            <tr>
                                <td></td><td></td><td></td><td></td><td></td><td></td>   
                            </tr>
            
                            <tr>
                                <th class="statut-date" rowspan="3"><span class="statut">${languages[0][props.idLanguage].status}</span><hr /><span class="date">${languages[0][props.idLanguage].made_on}</span></th><td></td><td></td><td></td><td></td><td></td><td></td>   
                            </tr>    
            
                            <tr>
                                <td></td><td></td><td></td><td></td><td></td><td></td>  
                            </tr> 
            
                            <tr>
                                <td></td><td></td><td></td><td></td><td></td><td></td>  
                            </tr>
                            
                        </table>
                    </div>
                </body>
            </html>
        
            <style type="text/css">
                body {
                    margin: auto;
                }
            
                table {
                    position: absolute;
                    width: 99%;
                    height: 18%; 
                    left: 0.5%;
                    bottom: 0%; 
                    border-collapse: collapse;
                    font-size: 1.5vw;
                }
            
                tr {
                    background-color: #f5f6fa;
                }
            
                td, th {
                    border: 1px solid black;
                    padding: 5px 0px;
                    text-align: center;
                }
            
                .company, .project-manager {
                    min-width: 60px;
                    vertical-align: top;
                    text-align: center;
                }
            
                .accessories, .designation, .quantity, .diameter {
                    height: 2.5%;
                }
            
                .designation {
                    min-width: 60px;
                }
            
                .statut-date {
                    min-width: 60px;
                    position: relative;
                }
                .statut, .date {
                    position: absolute; 
                }
                .statut {
                    top: 5%;
                    left: 3px;
                }
                .date {
                    top: 55%;
                    left: 3px;
                }
            
                hr {
                    box-shadow: none;
                    border: 0.25px solid black;
                }
            </style>`,

        "ISOSHEETANNOTATIONS":  
            `<html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>

                <body style="text-align: center;">
                    <section style="margin: auto; text-align: center;">
                        <svg width="100%" height="9%" viewBox="0 0 2481 355" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"> 
                            ${HeadSvgPrint}
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="99%" height="70.695553%">
                            <rect fill="transparent" width="99%" height="70.695553%" />
                                ${tabLinesIsoSheet}
                            </rect>
                        </svg>
                    </section>
                </body>
            </html>

            <style type="text/css">
                body {
                    margin: auto;
                }
            </style>`,

        "ISOSHEET":
            `<html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>
        
                <body style="text-align: center;">
                    <section style="margin: auto; text-align: center;">
                        <svg width="100%" height="9%" viewBox="0 0 2481 355" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;">
                            ${HeadSvgPrint}
                        </svg>
        
                        <svg xmlns="http://www.w3.org/2000/svg" width="99%" height="91%">
                            <rect fill="transparent" width="99%" height="91%" />
                                ${tabLinesIsoSheet}
                            </rect>
                        </svg>
                    </section>
                </body>
            </html>
    
            <style type="text/css">
                body {
                    margin: auto;
                }
            </style>`
    }
    
    x = 4;
    y = 2;

    const getprintSheet = (namePrintSheet) => {
        props.makePrintSheet(namePrintSheet);
    }

    return (
        <View>
            <Pressable makePrintSheet={props.makePrintSheet} onPress={(e) => { e.stopPropagation(); getprintSheet(arrayPrintSheet[props.namePrintSheet]); }}>
                <View style={[ {flexDirection: "row", justifyContent: "center", alignItems: "center"} ]}>
                    <Image alt={"print"} style={[ {width: (height < 1200 ? Number(width*0.12) : Number(70)), height: (height < 1200 ? Number(width*0.12) : Number(70))} ]} source={require("../assets/image/print.png")} />
                    <Image alt={"download"} style={[ {width: (height < 1200 ? Number(width*0.12) : Number(70)), height: (height < 1200 ? Number(width*0.12) : Number(70))} ]} source={require("../assets/image/download.png")} />
                </View>
            </Pressable>
        </View>
    )
}